#!/bin/bash
set -euo pipefail

echo "====================================================="
echo "🚀 Starting LEXGUARD Deployment to Google Cloud Run"
echo "====================================================="

# 1. Set your project context
PROJECT_ID="centering-helix-496607-c5"
REGION="us-central1"
SERVICE_NAME="lexguard"
GEMINI_SECRET_NAME="gemini-api-key"

echo "Setting project to ${PROJECT_ID}..."
gcloud config set project "${PROJECT_ID}"
gcloud config set run/region "${REGION}"

# 2. Enable necessary APIs (Cloud Run, Cloud Build, Artifact Registry)
echo "Enabling necessary GCP APIs..."
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com

echo "Ensuring GEMINI_API_KEY is stored in Secret Manager..."
if ! gcloud secrets describe "${GEMINI_SECRET_NAME}" > /dev/null 2>&1; then
  echo "Secret not found. You'll be prompted to enter the key securely."
  read -s -p "Enter GEMINI_API_KEY: " GEMINI_API_KEY
  echo
  if [ -z "${GEMINI_API_KEY}" ]; then
    echo "No key provided. Aborting."
    exit 1
  fi
  printf '%s' "${GEMINI_API_KEY}" | gcloud secrets create "${GEMINI_SECRET_NAME}" --data-file=- --replication-policy=automatic
fi

PROJECT_NUMBER="$(gcloud projects describe "${PROJECT_ID}" --format='value(projectNumber)')"
gcloud secrets add-iam-policy-binding "${GEMINI_SECRET_NAME}" \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# 3. Clean up any existing directory to prevent clone conflicts
if [ -d "LexGuard---PromtxWars-HVKR-" ]; then
  echo "Cleaning up existing repository folder..."
  rm -rf LexGuard---PromtxWars-HVKR-
fi

# 4. Clone your GitHub repository
echo "Cloning the LEXGUARD repository..."
git clone https://github.com/harteij19/LexGuard---PromtxWars-HVKR-
cd LexGuard---PromtxWars-HVKR-

# 5. Deploy directly from source to Cloud Run
echo "Deploying to Cloud Run... This will take a few minutes as it builds the Next.js container."
gcloud run deploy "${SERVICE_NAME}" \
  --source . \
  --allow-unauthenticated \
  --set-secrets "GEMINI_API_KEY=${GEMINI_SECRET_NAME}:latest"

echo "====================================================="
echo "✅ Deployment Complete! Check the Service URL above to access LEXGUARD."
echo "====================================================="

#!/bin/bash
set -e

echo "====================================================="
echo "🚀 Starting LEXGUARD Deployment to Google Cloud Run"
echo "====================================================="

# 1. Set your project context
echo "Setting project to centering-helix-496607-c5..."
gcloud config set project centering-helix-496607-c5

# 2. Enable necessary APIs (Cloud Run, Cloud Build, Artifact Registry)
echo "Enabling necessary GCP APIs..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

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
gcloud run deploy lexguard \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="GEMINI_API_KEY=[YOUR_API_KEY_HERE]"

echo "====================================================="
echo "✅ Deployment Complete! Check the Service URL above to access LEXGUARD."
echo "====================================================="

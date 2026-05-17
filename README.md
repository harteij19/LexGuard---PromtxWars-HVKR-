<p align="center">
  <img src="https://img.shields.io/badge/LEXGUARD-AI%20Contract%20Intelligence-blueviolet?style=for-the-badge&logo=shield&logoColor=white" alt="LEXGUARD" />
</p>

<h1 align="center">⚖️ LEXGUARD</h1>
<h3 align="center">AI Rights & Contract Intelligence System</h3>

<p align="center">
  <em>An adversarial multi-agent AI system that analyzes contracts, offer letters, quotations, ticket terms, and online policies to detect exploitative clauses, hidden liabilities, legal ambiguities, and real-world risks — before users agree to them.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/Gemini%201.5-Flash-blue?style=flat-square&logo=google" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer%20Motion-Animations-FF0055?style=flat-square&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white" />
</p>

---

## 🚀 The Problem

Every day, millions of people sign contracts, accept terms of service, and agree to privacy policies **without understanding what they're agreeing to**. Hidden clauses, exploitative terms, and legal jargon create an imbalance of power — leaving individuals vulnerable to:

- 🔴 Unilateral termination without notice
- 🔴 Unlimited intellectual property seizure
- 🔴 Excessive non-compete restrictions
- 🔴 Invasive data collection & surveillance
- 🔴 Hidden financial penalties & fee escalation

**LEXGUARD fixes this.** It puts the power of AI-driven legal intelligence in everyone's hands.

---

## 💡 The Solution

LEXGUARD uses a **multi-agent AI architecture** powered by **Google Gemini 1.5 Flash** to analyze any legal or quasi-legal document from 5 specialized perspectives simultaneously:

| Agent | Role |
|-------|------|
| ⚖️ **Legal Risk Agent** | Identifies exploitative clauses, one-sided obligations, and ambiguous language |
| 💰 **Financial Risk Agent** | Detects hidden fees, penalty clauses, and financial traps |
| 🔒 **Privacy Agent** | Analyzes data collection, surveillance, and consent issues |
| 👔 **Employment Risk Agent** | Reviews termination terms, non-competes, and IP assignments |
| 📝 **Simplifier Agent** | Translates all findings into plain, simple English |

Each clause is analyzed, scored, and explained in **simple human language** — so you understand exactly what you're signing.

---

## ✨ Key Features

### 📄 Smart Document Input
- **Drag-and-drop** PDF upload with automatic text extraction
- **Paste text** directly from any source
- **Sample contract** for instant demo

### 🤖 Cinematic AI Processing Pipeline
- Real-time animated multi-agent analysis
- 7 sequential processing stages with progress tracking
- Stage-by-stage agent status visualization

### 📊 Comprehensive Risk Dashboard
- **Animated Risk Score Circle** (0-100) with counting animation
- **Verdict Badge** — SAFE ✅ / CAUTION ⚠️ / DANGEROUS 🚫
- **Executive summary** with risk distribution breakdown
- **Multi-agent pipeline** visualization showing each agent's findings

### 📋 Clause-by-Clause Analysis
- Individual risk cards with severity badges (HIGH / MEDIUM / LOW)
- AI confidence percentages per finding
- **Original clause** text quoted directly
- **Plain-English explanation** anyone can understand
- **Actionable negotiation suggestions**
- Risk-level filtering (ALL / HIGH / MEDIUM / LOW)

### 📝 Document Highlight Viewer
- Full document displayed with **color-coded risk highlighting**
- 🔴 Red = High Risk | 🟡 Yellow = Medium Risk | 🟢 Green = Low Risk
- **Hover tooltips** showing risk explanations on highlighted text
- Toggle highlights on/off

### 💬 AI Contract Chat Assistant
- Floating chat panel for follow-up questions
- Contextual AI responses based on the uploaded contract
- Quick-question buttons for instant demo
- Typing indicator animations

### 🎨 Premium UI/UX
- Futuristic dark theme with neon purple/pink accents
- Canvas-based particle animation background
- Glassmorphism cards with hover glow effects
- Smooth Framer Motion transitions throughout
- Fully responsive design (desktop + mobile)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (Strict) |
| **Styling** | TailwindCSS 4 |
| **Animations** | Framer Motion + Canvas API |
| **AI Engine** | Google Gemini 1.5 Flash |
| **PDF Parsing** | pdf-parse |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
lexguard/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/route.ts       # Contract analysis API endpoint
│   │   │   └── chat/route.ts          # AI chat assistant endpoint
│   │   ├── globals.css                # Complete design system
│   │   ├── layout.tsx                 # Root layout with SEO metadata
│   │   └── page.tsx                   # Main app (landing + dashboard)
│   ├── components/
│   │   ├── AnimatedBackground.tsx     # Canvas particle system + gradient orbs
│   │   ├── Navbar.tsx                 # Sticky glassmorphism navigation
│   │   ├── FeatureCards.tsx           # Feature showcase section
│   │   ├── UploadSection.tsx          # File upload + text paste
│   │   ├── ProcessingAnimation.tsx    # Cinematic AI processing overlay
│   │   ├── RiskScore.tsx              # Animated circular risk gauge
│   │   ├── AgentPipeline.tsx          # Multi-agent pipeline visualization
│   │   ├── ClauseCards.tsx            # Expandable clause analysis cards
│   │   ├── DocumentViewer.tsx         # Highlighted document viewer
│   │   └── ChatAssistant.tsx          # Floating AI chat panel
│   ├── lib/
│   │   ├── gemini.ts                  # Gemini API integration
│   │   └── mockData.ts               # Demo fallback data
│   └── types/
│       └── index.ts                   # TypeScript type definitions
├── .env.local                         # API key (not committed)
├── next.config.ts                     # Next.js configuration
└── package.json
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/harteij19/LexGuard---PromtxWars-HVKR-.git
cd LexGuard---PromtxWars-HVKR-

# Install dependencies
npm install

# Set up environment variables
# Create .env.local and add your Gemini API key:
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **💡 No API key?** The app works with realistic mock data out of the box — perfect for demos!

### Get a Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

---

## 🎯 How It Works

```
User uploads document
        │
        ▼
   ┌─────────────┐
   │  PDF Parser  │  ← Extracts text from PDF/documents
   └──────┬──────┘
          │
          ▼
   ┌─────────────────────────────────────┐
   │     Multi-Agent Gemini Pipeline     │
   │                                     │
   │  ⚖️ Legal    → risk findings       │
   │  💰 Financial → risk findings       │
   │  🔒 Privacy   → risk findings       │
   │  👔 Employment → risk findings      │
   │  📝 Simplifier → plain English      │
   └──────┬──────────────────────────────┘
          │
          ▼
   ┌─────────────┐
   │  Risk Score  │  → Overall score (0-100)
   │  + Verdict   │  → SAFE / CAUTION / DANGEROUS
   │  + Clauses   │  → Individual clause analysis
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  Dashboard   │  → Interactive results UI
   │  + Chat AI   │  → Follow-up questions
   └─────────────┘
```

---

## 📸 Screenshots

### Landing Page
Futuristic hero section with animated particle background, gradient orbs, and glowing grid

### Analysis Dashboard
Animated risk score circle, verdict badge, executive summary, and multi-agent pipeline

### Clause Analysis
Expandable cards with risk badges, confidence scores, original clauses, plain-English explanations, and negotiation suggestions

### Document Viewer
Full contract text with color-coded risk highlighting and hover tooltips

### AI Chat Assistant
Floating chat panel with contextual AI responses about the uploaded contract

---

## 🏗️ Built With

- [Next.js](https://nextjs.org/) — React framework
- [Google Gemini AI](https://ai.google.dev/) — AI engine
- [TailwindCSS](https://tailwindcss.com/) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [Lucide Icons](https://lucide.dev/) — Icon library
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) — PDF text extraction

---

<p align="center">
  <strong>⚖️ LEXGUARD — Know Your Rights Before You Sign ⚖️</strong>
</p>

<p align="center">
  <em>Protecting people from exploitative contracts through the power of AI</em>
</p>

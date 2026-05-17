import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeContract(contractText: string): Promise<string> {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.1, // Highly deterministic for maximum accuracy
      topP: 0.8,
      topK: 40,
    }
  });

  const prompt = `You are LEXGUARD, an elite, highly precise AI contract intelligence system used by top-tier law firms.
Your objective is to provide a 100% accurate, flawless legal risk analysis of the provided document.

DOCUMENT TEXT:
---
${contractText}
---

You MUST respond with ONLY valid JSON (no markdown, no code blocks, no explanation outside JSON) in this exact format:
{
  "overallRisk": <number 0-100, calculated strictly based on sum of risks>,
  "verdict": "<SAFE|CAUTION|DANGEROUS>",
  "summary": "<2-3 sentence executive summary of critical liabilities>",
  "clauses": [
    {
      "risk": "<HIGH|MEDIUM|LOW>",
      "title": "<short descriptive title>",
      "clause": "<EXACT QUOTE from the document text - MUST be verbatim>",
      "explanation": "<detailed, legally accurate explanation of the risk>",
      "simpleExplanation": "<plain English translation without jargon>",
      "suggestion": "<highly actionable, specific negotiation tactic>",
      "agentSource": "<Legal|Financial|Privacy|Employment>",
      "confidence": <number 90-99, representing certainty of risk>
    }
  ],
  "agentResults": [
    { "agentName": "Legal Risk Agent", "riskScore": <0-100>, "findings": <number> },
    { "agentName": "Financial Risk Agent", "riskScore": <0-100>, "findings": <number> },
    { "agentName": "Privacy Agent", "riskScore": <0-100>, "findings": <number> },
    { "agentName": "Employment Risk Agent", "riskScore": <0-100>, "findings": <number> },
    { "agentName": "Simplifier Agent", "riskScore": 0, "findings": <number> }
  ],
  "consequences": [
    "<specific worst-case scenario 1 if signed>",
    "<specific worst-case scenario 2 if signed>"
  ],
  "trustMetrics": {
    "transparency": <0-100>,
    "fairness": <0-100>,
    "readability": <0-100>,
    "userSafety": <0-100>
  },
  "radarScores": {
    "financialRisk": <0-100>,
    "privacyRisk": <0-100>,
    "hiddenLiability": <0-100>,
    "terminationRisk": <0-100>,
    "dataExploitation": <0-100>,
    "ambiguityScore": <0-100>
  }
}

CRITICAL INSTRUCTIONS FOR MAXIMUM ACCURACY:
1. NO HALLUCINATIONS: Every "clause" MUST be an exact, verifiable verbatim quote from the provided text.
2. PRECISION SCORING: Calculate "overallRisk" and "radarScores" using logical deduction based purely on the text severity. 
3. Do NOT output anything other than raw, valid JSON.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export async function chatAboutContract(contractText: string, question: string, chatHistory: { role: string; content: string }[]): Promise<string> {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: { temperature: 0.2 } // High precision for chat
  });

  const historyContext = chatHistory
    .slice(-6)
    .map(msg => `${msg.role === 'user' ? 'User' : 'LEXGUARD'}: ${msg.content}`)
    .join('\n');

  const prompt = `You are LEXGUARD AI, an elite legal advisor. 
You provide extremely precise, accurate, and professional advice based ONLY on the provided document.

DOCUMENT:
---
${contractText}
---

HISTORY:
${historyContext}

QUESTION: ${question}

RULES:
- Be extremely precise. If a clause exists, quote it verbatim.
- Do not hallucinate legal terms not present in the document.
- Be concise, professional, and brutally honest about risks.
- Do NOT use markdown formatting. Use plain text.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

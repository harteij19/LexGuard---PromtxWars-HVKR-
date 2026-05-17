import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeContract(contractText: string): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0.1,
      topP: 0.7,
      topK: 20,
    }
  });

  const rules = `IMPORTANT RULES:
1. ONLY analyze information explicitly present in the uploaded contract.
2. NEVER invent durations, compensation terms, geographic restrictions, legal obligations, benefits, policies, or clauses.
3. Every risk must be tied to an exact quoted clause and direct implications only.
4. If information is missing, return: "NO SIGNIFICANT CLAUSE DETECTED".
5. DO NOT use generic legal assumptions.
6. DO NOT create hypothetical clauses.
7. If uncertain, say: "Insufficient information in the contract."
8. Preserve factual accuracy over creativity.
9. Every explanation must be source-grounded.
10. Never merge unrelated clauses together.`;

  const stage1Prompt = `You are LEXGUARD. Stage 1: clause extraction.
Extract ONLY clauses that exist in the document. Do NOT summarize.

DOCUMENT TEXT:
---
${contractText}
---

${rules}

Return ONLY valid JSON in this format:
{
  "clauses": [
    {
      "id": "clause-1",
      "clauseType": "<Non-Compete|Termination|IP|Arbitration|Monitoring|Compensation|Benefits|Confidentiality|Other>",
      "section": "<Section title from the document if present>",
      "riskCategory": "<Employment|Legal|Financial|Privacy>",
      "originalText": "<EXACT clause text from the document>"
    }
  ]
}`;

  const stage1 = await model.generateContent(stage1Prompt);
  const stage1Text = stage1.response.text();

  const stage2Prompt = `You are LEXGUARD. Stage 2: risk analysis for extracted clauses ONLY.
Use the provided clauses. Do NOT invent new details.

EXTRACTED CLAUSES JSON:
${stage1Text}

${rules}

Return ONLY valid JSON in this format:
{
  "clauses": [
    {
      "id": "<same id>",
      "section": "<section title>",
      "agent": "<Legal|Financial|Privacy|Employment>",
      "riskLevel": "<LOW|MEDIUM|HIGH>",
      "confidence": <0-100>,
      "originalClause": "<EXACT clause text, unchanged>",
      "riskReason": "<direct implication grounded in the clause>",
      "sourceGrounded": true
    }
  ]
}`;

  const stage2 = await model.generateContent(stage2Prompt);
  const stage2Text = stage2.response.text();

  const stage3Prompt = `You are LEXGUARD. Stage 3: human explanation and negotiation advice.
Only use the provided clauses. Do NOT add details.

ANALYZED CLAUSES JSON:
${stage2Text}

${rules}

Return ONLY valid JSON in this exact format:
{
  "overallRiskScore": <number 0-100>,
  "verdict": "SAFE" | "CAUTION" | "DANGEROUS",
  "clauses": [
    {
      "id": "<same id>",
      "section": "<section title>",
      "agent": "<Legal|Financial|Privacy|Employment>",
      "riskLevel": "<LOW|MEDIUM|HIGH>",
      "confidence": <0-100>,
      "originalClause": "<EXACT clause text, unchanged>",
      "riskReason": "<direct implication grounded in the clause>",
      "simpleExplanation": "<plain English explanation based only on the clause>",
      "negotiationAdvice": "<actionable advice based only on the clause>",
      "sourceGrounded": true
    }
  ]
}`;

  const stage3 = await model.generateContent(stage3Prompt);
  return stage3.response.text();
}

export async function chatAboutContract(contractText: string, question: string, chatHistory: { role: string; content: string }[]): Promise<string> {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    generationConfig: { temperature: 0.2 }
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
- If information is missing, say: "Insufficient information in the contract."
- Be concise, professional, and honest about risks.
- Do NOT use markdown formatting. Use plain text.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

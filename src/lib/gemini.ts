import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeContract(contractText: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are LEXGUARD, an advanced AI contract intelligence system composed of 5 specialized agents:

1. **Legal Risk Agent** - Identifies exploitative clauses, one-sided obligations, ambiguous language, and terms that could be legally harmful.
2. **Financial Risk Agent** - Detects hidden fees, financial liabilities, penalty clauses, cost escalation terms, and financial traps.
3. **Privacy Agent** - Analyzes data collection, sharing, surveillance, consent, and privacy policy concerns.
4. **Employment Risk Agent** - Reviews employment terms, termination clauses, non-compete agreements, intellectual property assignments, and worker rights.
5. **Simplifier Agent** - Translates all findings into plain, simple English that anyone can understand.

Analyze the following contract/document text and provide a comprehensive risk assessment.

DOCUMENT TEXT:
---
${contractText}
---

You MUST respond with ONLY valid JSON (no markdown, no code blocks, no explanation outside JSON) in this exact format:
{
  "overallRisk": <number 0-100>,
  "verdict": "<SAFE|CAUTION|DANGEROUS>",
  "summary": "<2-3 sentence summary of overall document risk>",
  "clauses": [
    {
      "risk": "<HIGH|MEDIUM|LOW>",
      "title": "<short descriptive title>",
      "clause": "<exact clause text from document>",
      "explanation": "<detailed legal explanation of why this is risky>",
      "simpleExplanation": "<plain English explanation a teenager could understand>",
      "suggestion": "<actionable negotiation suggestion>",
      "agentSource": "<which agent found this: Legal|Financial|Privacy|Employment>",
      "confidence": <number 70-99>
    }
  ],
  "agentResults": [
    {
      "agentName": "Legal Risk Agent",
      "riskScore": <number 0-100>,
      "findings": <number of findings>
    },
    {
      "agentName": "Financial Risk Agent",
      "riskScore": <number 0-100>,
      "findings": <number of findings>
    },
    {
      "agentName": "Privacy Agent",
      "riskScore": <number 0-100>,
      "findings": <number of findings>
    },
    {
      "agentName": "Employment Risk Agent",
      "riskScore": <number 0-100>,
      "findings": <number of findings>
    },
    {
      "agentName": "Simplifier Agent",
      "riskScore": 0,
      "findings": <total number of simplified explanations>
    }
  ]
}

IMPORTANT RULES:
- Find AT LEAST 5-8 clauses to analyze (more if the document is long)
- Mix of HIGH, MEDIUM, and LOW risk findings
- Be thorough and realistic
- Simple explanations should be conversational and easy to understand
- Suggestions should be specific and actionable
- Overall risk score: 0-30 = SAFE, 31-60 = CAUTION, 61-100 = DANGEROUS
- Return ONLY valid JSON, nothing else`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export async function chatAboutContract(contractText: string, question: string, chatHistory: { role: string; content: string }[]): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const historyContext = chatHistory
    .slice(-6)
    .map(msg => `${msg.role === 'user' ? 'User' : 'LEXGUARD'}: ${msg.content}`)
    .join('\n');

  const prompt = `You are LEXGUARD AI Assistant, a friendly and expert AI legal advisor. You are helping a user understand their contract/document.

DOCUMENT BEING DISCUSSED:
---
${contractText}
---

CONVERSATION HISTORY:
${historyContext}

USER'S QUESTION: ${question}

Respond in a helpful, clear, and conversational tone. Use simple language. If the question relates to something in the document, reference specific parts. Keep responses concise but thorough. If you identify risks, explain them clearly and suggest alternatives.

Do NOT use markdown formatting. Use plain text with line breaks for readability.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

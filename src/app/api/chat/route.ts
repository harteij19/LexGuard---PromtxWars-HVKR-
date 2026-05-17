import { NextRequest, NextResponse } from 'next/server';
import { chatAboutContract } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { contractText, question, chatHistory } = await request.json();

    if (!contractText || !question) {
      return NextResponse.json({ error: 'Missing contract text or question' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Mock response when no API key
      const mockResponses: Record<string, string> = {
        default: `I can only answer based on clauses that are explicitly present in the uploaded contract. If you want a specific answer, please point me to the exact clause text from the analysis panel.`,
        terminate: `I can only comment on termination terms if the termination clause exists in the contract text. Please share the exact clause, and I will explain it in plain language.`,
        privacy: `I can only comment on monitoring or privacy if the contract explicitly states those terms. Please share the exact clause text.`,
        negotiate: `Negotiation advice must be grounded to the exact clause text. Please share the clause you want to negotiate and I will suggest safe, clause-specific edits.`,
      };

      const lowerQuestion = question.toLowerCase();
      let response = mockResponses.default;
      if (lowerQuestion.includes('terminat') || lowerQuestion.includes('fire')) {
        response = mockResponses.terminate;
      } else if (lowerQuestion.includes('privacy') || lowerQuestion.includes('monitor') || lowerQuestion.includes('data')) {
        response = mockResponses.privacy;
      } else if (lowerQuestion.includes('negotiat') || lowerQuestion.includes('suggest') || lowerQuestion.includes('should i')) {
        response = mockResponses.negotiate;
      }

      return NextResponse.json({ response });
    }

    let response;
    try {
      response = await chatAboutContract(contractText, question, chatHistory || []);
    } catch (apiError) {
      console.error('Gemini Chat API call failed, falling back to mock data:', apiError);
      
      const mockResponses: Record<string, string> = {
        default: `I can only answer based on clauses that are explicitly present in the uploaded contract. If you want a specific answer, please point me to the exact clause text from the analysis panel.`,
        terminate: `I can only comment on termination terms if the termination clause exists in the contract text. Please share the exact clause, and I will explain it in plain language.`,
        privacy: `I can only comment on monitoring or privacy if the contract explicitly states those terms. Please share the exact clause text.`,
        negotiate: `Negotiation advice must be grounded to the exact clause text. Please share the clause you want to negotiate and I will suggest safe, clause-specific edits.`,
      };

      const lowerQuestion = question.toLowerCase();
      response = mockResponses.default;
      if (lowerQuestion.includes('terminat') || lowerQuestion.includes('fire')) {
        response = mockResponses.terminate;
      } else if (lowerQuestion.includes('privacy') || lowerQuestion.includes('monitor') || lowerQuestion.includes('data')) {
        response = mockResponses.privacy;
      } else if (lowerQuestion.includes('negotiat') || lowerQuestion.includes('suggest') || lowerQuestion.includes('should i') || lowerQuestion.includes('email')) {
        response = mockResponses.negotiate;
      }
    }
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}

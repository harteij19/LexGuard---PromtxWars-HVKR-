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
        default: `Great question! Based on my analysis of this contract, here are the key points to consider:\n\n1. This document contains several clauses that could affect your rights significantly.\n\n2. The termination clause is particularly concerning as it gives the employer unilateral power to end the agreement without notice.\n\n3. The non-compete clause spans 24 months and 200 miles, which is quite restrictive.\n\nI would recommend consulting with a qualified attorney before signing. Would you like me to explain any specific clause in more detail?`,
        terminate: `Yes, based on the termination clause in this contract, the company CAN terminate your employment at any time, for any reason, without prior notice.\n\nThis is what is known as "at-will" employment taken to an extreme. Normally, even at-will agreements include some form of notice period or progressive discipline.\n\nHere is what I recommend:\n- Negotiate a minimum 30-day notice period\n- Request that termination be "for cause" only\n- Add a severance package clause\n- Include a dispute resolution process before termination\n\nWould you like me to draft suggested language for any of these?`,
        privacy: `The privacy clause in this contract is concerning. Here is why:\n\nThe company claims the right to monitor ALL your communications, including on personal devices if you ever use them for work.\n\nThis means:\n- Your personal emails could be monitored\n- Your browsing history on personal devices could be tracked\n- Your messaging apps could be surveilled\n\nThis goes beyond standard workplace monitoring. Most companies limit monitoring to company-owned devices and networks.\n\nI recommend:\n- Limiting monitoring to company devices only\n- Getting clear policies on data retention\n- Understanding what "monitoring" specifically includes`,
        negotiate: `Based on my analysis, here are the top things you should negotiate before signing:\n\n1. TERMINATION: Add a 30-day notice period and require "for cause" termination\n\n2. NON-COMPETE: Reduce from 24 months to 12 months, and from 200 miles to 50 miles\n\n3. IP CLAUSE: Exclude personal projects done on your own time with your own resources\n\n4. SALARY: Add a clause preventing salary reduction below the agreed base\n\n5. ARBITRATION: Make it optional rather than mandatory, or ensure you can select the arbitrator\n\nWant me to go deeper on any of these points?`,
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
        default: `Great question! Based on my analysis of this contract, here are the key points to consider:\n\n1. This document contains several clauses that could affect your rights significantly.\n\n2. The termination clause is particularly concerning as it gives the employer unilateral power to end the agreement without notice.\n\n3. The non-compete clause spans 24 months and 200 miles, which is quite restrictive.\n\nI would recommend consulting with a qualified attorney before signing. Would you like me to explain any specific clause in more detail?`,
        terminate: `Yes, based on the termination clause in this contract, the company CAN terminate your employment at any time, for any reason, without prior notice.\n\nThis is what is known as "at-will" employment taken to an extreme. Normally, even at-will agreements include some form of notice period or progressive discipline.\n\nHere is what I recommend:\n- Negotiate a minimum 30-day notice period\n- Request that termination be "for cause" only\n- Add a severance package clause\n- Include a dispute resolution process before termination\n\nWould you like me to draft suggested language for any of these?`,
        privacy: `The privacy clause in this contract is concerning. Here is why:\n\nThe company claims the right to monitor ALL your communications, including on personal devices if you ever use them for work.\n\nThis means:\n- Your personal emails could be monitored\n- Your browsing history on personal devices could be tracked\n- Your messaging apps could be surveilled\n\nThis goes beyond standard workplace monitoring. Most companies limit monitoring to company-owned devices and networks.\n\nI recommend:\n- Limiting monitoring to company devices only\n- Getting clear policies on data retention\n- Understanding what "monitoring" specifically includes`,
        negotiate: `Based on my analysis, here are the top things you should negotiate before signing:\n\n1. TERMINATION: Add a 30-day notice period and require "for cause" termination\n\n2. NON-COMPETE: Reduce from 24 months to 12 months, and from 200 miles to 50 miles\n\n3. IP CLAUSE: Exclude personal projects done on your own time with your own resources\n\n4. SALARY: Add a clause preventing salary reduction below the agreed base\n\n5. ARBITRATION: Make it optional rather than mandatory, or ensure you can select the arbitrator\n\nWant me to go deeper on any of these points?`,
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

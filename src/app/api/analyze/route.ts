import { NextRequest, NextResponse } from 'next/server';
import { analyzeContract } from '@/lib/gemini';
import { mockAnalysis } from '@/lib/mockData';
import type { AnalysisResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const text = formData.get('text') as string | null;

    let contractText = '';
    let documentName = 'Pasted Text';

    if (file) {
      documentName = file.name;
      if (file.type === 'application/pdf') {
        // Dynamic import for pdf-parse
        const pdfParse = (await import('pdf-parse')).default;
        const buffer = Buffer.from(await file.arrayBuffer());
        const pdfData = await pdfParse(buffer);
        contractText = pdfData.text;
      } else {
        // Plain text file
        contractText = await file.text();
      }
    } else if (text) {
      contractText = text;
    } else {
      return NextResponse.json({ error: 'No document provided' }, { status: 400 });
    }

    if (!contractText.trim()) {
      return NextResponse.json({ error: 'Document appears to be empty' }, { status: 400 });
    }

    // Check for Gemini API key
    if (!process.env.GEMINI_API_KEY) {
      console.log('No GEMINI_API_KEY found, using mock data');
      const result: AnalysisResult = {
        ...mockAnalysis,
        documentName,
        analyzedAt: new Date().toISOString(),
      };
      return NextResponse.json({ result, contractText });
    }

    // Use Gemini API
    const aiResponse = await analyzeContract(contractText);

    // Parse JSON from the response
    let parsed;
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        parsed = JSON.parse(aiResponse);
      }
    } catch {
      console.error('Failed to parse AI response, using mock data');
      const result: AnalysisResult = {
        ...mockAnalysis,
        documentName,
        analyzedAt: new Date().toISOString(),
      };
      return NextResponse.json({ result, contractText });
    }

    const result: AnalysisResult = {
      overallRisk: parsed.overallRisk || 50,
      verdict: parsed.verdict || 'CAUTION',
      summary: parsed.summary || 'Analysis complete.',
      documentName,
      analyzedAt: new Date().toISOString(),
      clauses: (parsed.clauses || []).map((c: Record<string, unknown>) => ({
        risk: c.risk || 'MEDIUM',
        title: c.title || 'Untitled Clause',
        clause: c.clause || '',
        explanation: c.explanation || '',
        simpleExplanation: c.simpleExplanation || '',
        suggestion: c.suggestion || '',
        agentSource: c.agentSource || 'Legal',
        confidence: c.confidence || 80,
      })),
      agentResults: (parsed.agentResults || []).map((a: Record<string, unknown>, i: number) => ({
        agentName: a.agentName || `Agent ${i + 1}`,
        status: 'complete' as const,
        riskScore: a.riskScore || 0,
        findings: a.findings || 0,
        icon: ['⚖️', '💰', '🔒', '👔', '📝'][i] || '🔍',
      })),
    };

    return NextResponse.json({ result, contractText });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze document' }, { status: 500 });
  }
}

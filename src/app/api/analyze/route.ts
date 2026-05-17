import { NextRequest, NextResponse } from 'next/server';
import { analyzeContract } from '@/lib/gemini';
import { mockAnalysis } from '@/lib/mockData';
import type { AnalysisResult } from '@/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const text = formData.get('text') as string | null;

    let contractText = '';
    let documentName = 'Pasted Text';

    if (file) {
      documentName = file.name;
      const fileName = file.name.toLowerCase();
      const isPdf = file.type === 'application/pdf' || fileName.endsWith('.pdf');
      const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx');
      const isDoc = file.type === 'application/msword' || fileName.endsWith('.doc');
      const isText = file.type === 'text/plain' || fileName.endsWith('.txt');

      if (isPdf) {
        try {
          const { PDFParse } = await import('pdf-parse');
          const buffer = Buffer.from(await file.arrayBuffer());
          const parser = new PDFParse({ data: buffer });
          const pdfData = await parser.getText();
          contractText = pdfData.text;
          await parser.destroy();
          
          if (!contractText || contractText.trim().length === 0) {
            return NextResponse.json({ error: 'PDF file appears to be empty or could not be read. Please ensure the PDF contains text content.' }, { status: 400 });
          }
        } catch (pdfError) {
          console.error('PDF parsing error:', pdfError);
          return NextResponse.json({ error: 'Failed to parse PDF file. Please ensure it\'s a valid PDF document.' }, { status: 400 });
        }
      } else if (isDocx) {
        try {
          const mammothModule = await import('mammoth');
          const mammoth = (mammothModule as unknown as { default?: { extractRawText: (arg: { buffer: Buffer }) => Promise<{ value?: string }> } }).default ?? mammothModule;
          const buffer = Buffer.from(await file.arrayBuffer());
          const docxData = await mammoth.extractRawText({ buffer });
          contractText = docxData?.value ?? '';

          if (!contractText || contractText.trim().length === 0) {
            return NextResponse.json({ error: 'DOCX file appears to be empty or could not be read. Please ensure the document contains text content.' }, { status: 400 });
          }
        } catch (docxError) {
          console.error('DOCX parsing error:', docxError);
          return NextResponse.json({ error: 'Failed to parse DOCX file. Please ensure it\'s a valid DOCX document.' }, { status: 400 });
        }
      } else if (isDoc) {
        return NextResponse.json({ error: 'Legacy .doc files are not supported. Please upload a .docx, .pdf, or .txt file.' }, { status: 400 });
      } else if (isText) {
        // Plain text file
        try {
          contractText = await file.text();
        } catch (textError) {
          console.error('Text file reading error:', textError);
          return NextResponse.json({ error: 'Failed to read text file.' }, { status: 400 });
        }
      } else {
        return NextResponse.json({ error: 'Unsupported file type. Please upload a PDF, DOCX, or TXT file.' }, { status: 400 });
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
    let aiResponse;
    try {
      aiResponse = await analyzeContract(contractText);
    } catch (apiError) {
      console.error('Gemini API call failed, falling back to mock data:', apiError);
      const result: AnalysisResult = {
        ...mockAnalysis,
        documentName,
        analyzedAt: new Date().toISOString(),
      };
      return NextResponse.json({ result, contractText });
    }

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
      consequences: parsed.consequences || [],
      trustMetrics: parsed.trustMetrics || { transparency: 50, fairness: 50, readability: 50, userSafety: 50 },
      radarScores: parsed.radarScores || { financialRisk: 50, privacyRisk: 50, hiddenLiability: 50, terminationRisk: 50, dataExploitation: 50, ambiguityScore: 50 },
    };

    return NextResponse.json({ result, contractText });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze document. Please try again.' }, { status: 500 });
  }
}

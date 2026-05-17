import { NextRequest, NextResponse } from 'next/server';
import { createRequire } from 'node:module';
import { analyzeContract } from '@/lib/gemini';
import type { AnalysisResult } from '@/types';

export const runtime = 'nodejs';

const require = createRequire(import.meta.url);

const riskWeights = {
  HIGH: 80,
  MEDIUM: 50,
  LOW: 20,
};

const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];

const normalizeText = (text: string) => text
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const extractNumbers = (text: string) => text.match(/\b\d+(?:\.\d+)?\b/g) || [];

const hasAllNumbers = (clause: string, source: string) => {
  const clauseNums = extractNumbers(clause);
  if (clauseNums.length === 0) return true;
  return clauseNums.every(num => source.includes(num));
};

const hasAllMonths = (clause: string, source: string) => {
  const clauseNorm = normalizeText(clause);
  const sourceNorm = normalizeText(source);
  return months.every(m => !clauseNorm.includes(m) || sourceNorm.includes(m));
};

const tokenOverlapRatio = (clause: string, source: string) => {
  const clauseTokens = normalizeText(clause).split(' ').filter(t => t.length > 2);
  if (clauseTokens.length === 0) return 0;
  const sourceSet = new Set(normalizeText(source).split(' ').filter(t => t.length > 2));
  const matches = clauseTokens.filter(t => sourceSet.has(t)).length;
  return matches / clauseTokens.length;
};

const isClauseGrounded = (clause: string, source: string) => {
  if (!clause) return false;
  const clauseNorm = normalizeText(clause);
  const sourceNorm = normalizeText(source);
  if (!clauseNorm || !sourceNorm) return false;
  if (sourceNorm.includes(clauseNorm)) return true;
  if (!hasAllNumbers(clause, source)) return false;
  if (!hasAllMonths(clause, source)) return false;
  return tokenOverlapRatio(clause, source) >= 0.9 && clauseNorm.split(' ').length >= 6;
};

const computeOverallRisk = (clauses: { riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' }[]) => {
  if (!clauses.length) return 0;
  const total = clauses.reduce((sum, clause) => sum + (riskWeights[clause.riskLevel] || 0), 0);
  return Math.min(100, Math.round(total / clauses.length));
};

const computeVerdict = (score: number) => {
  if (score <= 30) return 'SAFE';
  if (score <= 60) return 'CAUTION';
  return 'DANGEROUS';
};

const computeTrustMetrics = (clauses: { riskLevel: 'HIGH' | 'MEDIUM' | 'LOW'; sourceGrounded: boolean }[]) => {
  const groundedRatio = clauses.length ? clauses.filter(c => c.sourceGrounded).length / clauses.length : 1;
  const high = clauses.filter(c => c.riskLevel === 'HIGH').length;
  const med = clauses.filter(c => c.riskLevel === 'MEDIUM').length;
  const transparency = Math.min(95, Math.round(60 + groundedRatio * 40));
  const fairness = Math.max(20, Math.round(70 - high * 6 - med * 3));
  const readability = 72;
  const userSafety = Math.max(20, Math.round(80 - high * 8 - med * 4));
  return { transparency, fairness, readability, userSafety };
};

const computeRadarScores = (clauses: { agent: string; riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' }[]) => {
  const scoreFor = (agent: string) => {
    const items = clauses.filter(c => c.agent === agent);
    if (!items.length) return 15;
    return Math.min(100, Math.round(items.reduce((sum, c) => sum + (riskWeights[c.riskLevel] || 0), 0) / items.length));
  };
  return {
    financialRisk: scoreFor('Financial'),
    privacyRisk: scoreFor('Privacy'),
    hiddenLiability: scoreFor('Legal'),
    terminationRisk: scoreFor('Employment'),
    dataExploitation: scoreFor('Privacy'),
    ambiguityScore: Math.min(100, Math.round((scoreFor('Legal') + scoreFor('Employment')) / 2)),
  };
};

const computeAgentResults = (clauses: { agent: string; riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' }[]) => {
  const agents = ['Legal', 'Financial', 'Privacy', 'Employment'];
  return [
    ...agents.map(agent => {
      const items = clauses.filter(c => c.agent === agent);
      const riskScore = items.length
        ? Math.round(items.reduce((sum, c) => sum + (riskWeights[c.riskLevel] || 0), 0) / items.length)
        : 0;
      return {
        agentName: `${agent} Risk Agent`,
        status: 'complete' as const,
        riskScore,
        findings: items.length,
        icon: agent === 'Legal' ? '⚖️' : agent === 'Financial' ? '💰' : agent === 'Privacy' ? '🔒' : '👔',
      };
    }),
    { agentName: 'Simplifier Agent', status: 'complete' as const, riskScore: 0, findings: clauses.length, icon: '📝' },
  ];
};

const buildSummary = (clauses: { riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' }[]) => {
  if (!clauses.length) return 'NO SIGNIFICANT CLAUSE DETECTED';
  const high = clauses.filter(c => c.riskLevel === 'HIGH').length;
  const med = clauses.filter(c => c.riskLevel === 'MEDIUM').length;
  const low = clauses.filter(c => c.riskLevel === 'LOW').length;
  return `Grounded analysis detected ${clauses.length} clause(s): ${high} high, ${med} medium, ${low} low. Review the high and medium risk clauses before signing.`;
};

const detectRiskLevel = (text: string) => {
  const lower = text.toLowerCase();
  const highSignals = ['terminate', 'termination', 'non-compete', 'arbitration', 'waive', 'indemnify', 'ownership', 'assign', 'liability'];
  const medSignals = ['monitor', 'privacy', 'audit', 'policy', 'modify', 'notice', 'discretion'];
  if (highSignals.some(s => lower.includes(s))) return 'HIGH' as const;
  if (medSignals.some(s => lower.includes(s))) return 'MEDIUM' as const;
  return 'LOW' as const;
};

const detectAgent = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('privacy') || lower.includes('monitor') || lower.includes('data')) return 'Privacy';
  if (lower.includes('compensation') || lower.includes('payment') || lower.includes('fee') || lower.includes('price')) return 'Financial';
  if (lower.includes('employment') || lower.includes('termination') || lower.includes('non-compete')) return 'Employment';
  return 'Legal';
};

const extractSections = (text: string) => {
  const blocks = text
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(Boolean);

  if (!blocks.length) return [] as { section: string; clause: string }[];

  return blocks.map((block, index) => {
    const lines = block.split(/\n/).map(l => l.trim()).filter(Boolean);
    const firstLine = lines[0] || '';
    const section = firstLine.length <= 80 ? firstLine : `Section ${index + 1}`;
    return { section, clause: block };
  });
};

const buildDeterministicResult = (contractText: string, documentName: string): AnalysisResult => {
  const sections = extractSections(contractText).slice(0, 12);
  const clauses = sections.map((section, i) => {
    const riskLevel = detectRiskLevel(section.clause);
    const agent = detectAgent(section.clause);
    return {
      id: `clause-${i + 1}`,
      section: section.section,
      agent,
      riskLevel,
      confidence: riskLevel === 'HIGH' ? 72 : riskLevel === 'MEDIUM' ? 64 : 55,
      originalClause: section.clause,
      riskReason: riskLevel === 'LOW'
        ? 'NO SIGNIFICANT CLAUSE DETECTED'
        : 'Potential risk detected based on explicit clause language.',
      simpleExplanation: riskLevel === 'LOW'
        ? 'No major risks detected in this clause.'
        : 'This clause could affect your rights based on the exact wording.',
      negotiationAdvice: riskLevel === 'LOW'
        ? 'No changes suggested.'
        : 'Consider clarifying or narrowing this clause during negotiation.',
      sourceGrounded: true,
    };
  }).filter(c => c.originalClause);

  const overallRiskScore = computeOverallRisk(clauses);
  const verdict = computeVerdict(overallRiskScore);
  const trustMetrics = computeTrustMetrics(clauses);
  const radarScores = computeRadarScores(clauses);
  const agentResults = computeAgentResults(clauses);
  const consequences = clauses.filter(c => c.riskLevel !== 'LOW').slice(0, 3).map(c => c.riskReason);

  return {
    overallRiskScore,
    verdict,
    summary: buildSummary(clauses),
    documentName,
    analyzedAt: new Date().toISOString(),
    clauses,
    agentResults,
    consequences,
    trustMetrics,
    radarScores,
  };
};

const extractPdfText = async (buffer: Buffer) => {
  const pdfParse = require('pdf-parse/lib/pdf-parse.js') as (dataBuffer: Buffer, options?: { max?: number }) => Promise<{ text?: string }>;
  // Load the parser entry directly to avoid pdf-parse's package index debug path under bundlers.
  const pdfData = await pdfParse(buffer, { max: 0 });
  return pdfData?.text || '';
};

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
          const buffer = Buffer.from(await file.arrayBuffer());
          contractText = await extractPdfText(buffer);
          
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
      console.log('No GEMINI_API_KEY found, using deterministic fallback');
      const result = buildDeterministicResult(contractText, documentName);
      return NextResponse.json({ result, contractText });
    }

    // Use Gemini API
    let aiResponse;
    try {
      aiResponse = await analyzeContract(contractText);
    } catch (apiError) {
      console.error('Gemini API call failed, falling back to deterministic data:', apiError);
      const result = buildDeterministicResult(contractText, documentName);
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
      console.error('Failed to parse AI response, using deterministic data');
      const result = buildDeterministicResult(contractText, documentName);
      return NextResponse.json({ result, contractText });
    }

    const rawClauses = (parsed.clauses || []) as Record<string, unknown>[];
    const normalizedClauses = rawClauses.map((c: Record<string, unknown>, i: number) => {
      const originalClause = String(c.originalClause || '').trim();
      const riskLevel = (String(c.riskLevel || 'MEDIUM').toUpperCase() as 'HIGH' | 'MEDIUM' | 'LOW');
      const agent = String(c.agent || 'Legal');
      const clause = {
        id: String(c.id || `clause-${i + 1}`),
        section: String(c.section || 'Unlabeled Section'),
        agent,
        riskLevel: riskLevel === 'HIGH' || riskLevel === 'MEDIUM' || riskLevel === 'LOW' ? riskLevel : 'MEDIUM',
        confidence: Math.max(0, Math.min(100, Number(c.confidence || 70))),
        originalClause,
        riskReason: String(c.riskReason || 'Insufficient information in the contract.'),
        simpleExplanation: String(c.simpleExplanation || 'Insufficient information in the contract.'),
        negotiationAdvice: String(c.negotiationAdvice || 'Clause requires human legal review.'),
        sourceGrounded: Boolean(c.sourceGrounded),
      };

      const grounded = isClauseGrounded(clause.originalClause, contractText);
      clause.sourceGrounded = grounded;
      return clause;
    }).filter(c => c.originalClause && c.sourceGrounded);

    const overallRiskScore = typeof parsed.overallRiskScore === 'number'
      ? Math.max(0, Math.min(100, Math.round(parsed.overallRiskScore)))
      : computeOverallRisk(normalizedClauses);

    const verdictValue = String(parsed.verdict || '').toUpperCase();
    const verdict = ['SAFE', 'CAUTION', 'DANGEROUS'].includes(verdictValue)
      ? (verdictValue as 'SAFE' | 'CAUTION' | 'DANGEROUS')
      : computeVerdict(overallRiskScore);

    const trustMetrics = computeTrustMetrics(normalizedClauses);
    const radarScores = computeRadarScores(normalizedClauses);
    const agentResults = computeAgentResults(normalizedClauses);
    const consequences = normalizedClauses
      .filter(c => c.riskLevel !== 'LOW')
      .slice(0, 3)
      .map(c => c.riskReason);

    const result: AnalysisResult = {
      overallRiskScore,
      verdict,
      summary: buildSummary(normalizedClauses),
      documentName,
      analyzedAt: new Date().toISOString(),
      clauses: normalizedClauses,
      agentResults,
      consequences,
      trustMetrics,
      radarScores,
    };

    return NextResponse.json({ result, contractText });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze document. Please try again.' }, { status: 500 });
  }
}

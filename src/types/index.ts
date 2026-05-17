export interface ClauseAnalysis {
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  clause: string;
  explanation: string;
  simpleExplanation: string;
  suggestion: string;
  agentSource: string;
  confidence: number;
}

export interface AnalysisResult {
  overallRisk: number;
  verdict: 'SAFE' | 'CAUTION' | 'DANGEROUS';
  summary: string;
  clauses: ClauseAnalysis[];
  documentName: string;
  analyzedAt: string;
  agentResults: AgentResult[];
  consequences: string[];
  trustMetrics: TrustMetrics;
  radarScores: RadarScores;
}

export interface AgentResult {
  agentName: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  riskScore: number;
  findings: number;
  icon: string;
}

export interface TrustMetrics {
  transparency: number;
  fairness: number;
  readability: number;
  userSafety: number;
}

export interface RadarScores {
  financialRisk: number;
  privacyRisk: number;
  hiddenLiability: number;
  terminationRisk: number;
  dataExploitation: number;
  ambiguityScore: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

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
}

export interface AgentResult {
  agentName: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  riskScore: number;
  findings: number;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ProcessingStage {
  label: string;
  status: 'pending' | 'active' | 'complete';
  icon: string;
}

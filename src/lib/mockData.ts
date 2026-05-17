import { AnalysisResult } from '@/types';

export const mockAnalysis: AnalysisResult = {
  overallRiskScore: 68,
  verdict: 'CAUTION',
  summary: 'Grounded analysis detected 4 clauses with elevated risk based on exact contract language. Review the termination, IP ownership, non-compete, and monitoring sections before signing.',
  documentName: 'Employment_Agreement_2024.pdf',
  analyzedAt: new Date().toISOString(),
  consequences: [
    'Termination can occur without notice or stated cause based on the termination clause.',
    'IP ownership is broad and may cover work created outside work hours.',
    'Non-compete limits working with competitors for 24 months after termination.',
  ],
  trustMetrics: {
    transparency: 62,
    fairness: 48,
    readability: 71,
    userSafety: 58,
  },
  radarScores: {
    financialRisk: 44,
    privacyRisk: 63,
    hiddenLiability: 52,
    terminationRisk: 78,
    dataExploitation: 56,
    ambiguityScore: 41,
  },
  clauses: [
    {
      id: 'clause-1',
      section: 'Termination',
      agent: 'Employment',
      riskLevel: 'HIGH',
      confidence: 94,
      originalClause: 'The Company reserves the right to terminate this agreement at any time, for any reason, with or without cause, and without prior notice to the Employee.',
      riskReason: 'The clause explicitly allows termination at any time without cause or notice, which is one-sided and reduces job security.',
      simpleExplanation: 'They can end your job at any time without a reason or warning.',
      negotiationAdvice: 'Ask for a notice period or severance for termination without cause.',
      sourceGrounded: true
    },
    {
      id: 'clause-2',
      section: 'Intellectual Property',
      agent: 'Legal',
      riskLevel: 'HIGH',
      confidence: 91,
      originalClause: 'All work, inventions, creations, and intellectual property developed by the Employee during the term of employment, whether during working hours or otherwise, shall be the sole property of the Company.',
      riskReason: 'The wording claims ownership of all creations during employment, including work outside working hours.',
      simpleExplanation: 'Anything you create while employed could belong to the company, even if done on your own time.',
      negotiationAdvice: 'Limit IP ownership to work created on company time or using company resources.',
      sourceGrounded: true
    },
    {
      id: 'clause-3',
      section: 'Non-Compete',
      agent: 'Employment',
      riskLevel: 'HIGH',
      confidence: 93,
      originalClause: 'For a period of 24 months following termination, the Employee shall not engage in any business that competes with the Company within a 200-mile radius of any Company office.',
      riskReason: 'The clause restricts working for competitors for 24 months and adds a geographic limit, which can limit employment options.',
      simpleExplanation: 'You could be blocked from working with competitors for 2 years within 200 miles.',
      negotiationAdvice: 'Reduce the time period and narrow the geographic scope.',
      sourceGrounded: true
    },
    {
      id: 'clause-4',
      section: 'Monitoring and Privacy',
      agent: 'Privacy',
      riskLevel: 'MEDIUM',
      confidence: 87,
      originalClause: 'The Company may monitor all employee communications, including email, messaging, internet usage, and device activity on company-provided and personal devices used for work purposes.',
      riskReason: 'The clause allows monitoring of communications and device activity, including personal devices used for work.',
      simpleExplanation: 'They can monitor work-related communications and device activity, including personal devices used for work.',
      negotiationAdvice: 'Ask to limit monitoring to company devices and clarify what data is collected.',
      sourceGrounded: true
    }
  ],
  agentResults: [
    { agentName: 'Legal Risk Agent', status: 'complete', riskScore: 75, findings: 3, icon: '⚖️' },
    { agentName: 'Financial Risk Agent', status: 'complete', riskScore: 58, findings: 2, icon: '💰' },
    { agentName: 'Privacy Agent', status: 'complete', riskScore: 65, findings: 1, icon: '🔒' },
    { agentName: 'Employment Risk Agent', status: 'complete', riskScore: 82, findings: 2, icon: '👔' },
    { agentName: 'Simplifier Agent', status: 'complete', riskScore: 0, findings: 8, icon: '📝' },
  ]
};

export const sampleContractText = `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into as of January 15, 2024, by and between TechCorp Industries, Inc. ("Company") and the undersigned employee ("Employee").

1. POSITION AND DUTIES
The Employee is hired for the position of Senior Software Engineer. The Employee agrees to perform all duties as assigned by the Company, including but not limited to additional responsibilities as determined by management at its sole discretion.

2. COMPENSATION
The Employee shall receive an annual base salary of $120,000, payable in bi-weekly installments. The Company reserves the right to adjust compensation, benefits, and bonus structures at its sole discretion with 14 days written notice.

3. TERMINATION
The Company reserves the right to terminate this agreement at any time, for any reason, with or without cause, and without prior notice to the Employee. The Employee may terminate this agreement with 30 days written notice.

4. INTELLECTUAL PROPERTY
All work, inventions, creations, and intellectual property developed by the Employee during the term of employment, whether during working hours or otherwise, shall be the sole property of the Company. This includes any inventions, patents, copyrights, or trade secrets.

5. NON-COMPETE
For a period of 24 months following termination, the Employee shall not engage in any business that competes with the Company within a 200-mile radius of any Company office. This includes employment, consulting, or ownership interests in competing businesses.

6. CONFIDENTIALITY
The Employee agrees to maintain the confidentiality of all proprietary information, trade secrets, and business strategies for a period of 5 years following termination. Violation of this clause may result in legal action and financial damages.

7. MONITORING AND PRIVACY
The Company may monitor all employee communications, including email, messaging, internet usage, and device activity on company-provided and personal devices used for work purposes. The Employee consents to such monitoring as a condition of employment.

8. DISPUTE RESOLUTION
Any disputes arising from this agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, waiving the right to a jury trial. All arbitration shall take place in the Company's headquarters jurisdiction.

9. BENEFITS
Employees are eligible for health insurance, dental, and vision benefits after a 90-day probationary period. The Company reserves the right to modify benefit plans at any time.

10. GOVERNING LAW
This Agreement shall be governed by the laws of the State of Delaware, without regard to conflict of law principles.

Employee Signature: _______________
Date: _______________

Company Representative: _______________
Title: Chief Human Resources Officer
Date: _______________`;

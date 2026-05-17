import { AnalysisResult } from '@/types';

export const mockAnalysis: AnalysisResult = {
  overallRisk: 72,
  verdict: 'CAUTION',
  summary: 'This employment contract contains several concerning clauses that could limit your rights and financial interests. While the base terms are standard, key areas around termination, IP assignment, and non-compete deserve careful review before signing.',
  documentName: 'Employment_Agreement_2024.pdf',
  analyzedAt: new Date().toISOString(),
  consequences: [
    'Employer may terminate your position without any notice or explanation',
    'All personal side projects and inventions could become company property',
    'You may be unable to work in your industry for 2 years after leaving',
    'Your personal devices and communications may be monitored',
    'Your salary could be reduced at any time with just 14 days notice',
    'You waive your right to take legal disputes to court',
  ],
  trustMetrics: {
    transparency: 35,
    fairness: 28,
    readability: 42,
    userSafety: 31,
  },
  radarScores: {
    financialRisk: 58,
    privacyRisk: 65,
    hiddenLiability: 72,
    terminationRisk: 82,
    dataExploitation: 60,
    ambiguityScore: 48,
  },
  clauses: [
    {
      risk: 'HIGH',
      title: 'Unilateral Termination Without Cause',
      clause: 'The Company reserves the right to terminate this agreement at any time, for any reason, with or without cause, and without prior notice to the Employee.',
      explanation: 'This clause gives the employer absolute power to fire you without any explanation or warning. There is no requirement for progressive discipline, performance improvement plans, or even a stated reason. This is heavily one-sided.',
      simpleExplanation: 'They can fire you anytime they want, for no reason at all, without even telling you in advance. You have zero protection.',
      suggestion: 'Request a mandatory 30-day written notice period and require termination to be "for cause" with documented reasons. Add a severance clause for termination without cause.',
      agentSource: 'Employment',
      confidence: 95
    },
    {
      risk: 'HIGH',
      title: 'Unlimited Intellectual Property Assignment',
      clause: 'All work, inventions, creations, and intellectual property developed by the Employee during the term of employment, whether during working hours or otherwise, shall be the sole property of the Company.',
      explanation: 'This clause claims ownership of ALL your creative work — even side projects, personal inventions, and work done on your own time with your own resources. This goes far beyond standard employment IP clauses.',
      simpleExplanation: 'Anything you create — even your weekend side project or that app idea you had in the shower — technically belongs to them while you work there.',
      suggestion: 'Limit IP assignment to work created using company resources during company time and directly related to company business. Explicitly exclude personal projects.',
      agentSource: 'Legal',
      confidence: 92
    },
    {
      risk: 'HIGH',
      title: 'Excessive Non-Compete Clause',
      clause: 'For a period of 24 months following termination, the Employee shall not engage in any business that competes with the Company within a 200-mile radius of any Company office.',
      explanation: 'A 24-month non-compete covering 200 miles is excessively broad. In many jurisdictions, this may be unenforceable, but it could still be used to threaten or intimidate. It effectively prevents you from working in your field for 2 years.',
      simpleExplanation: 'After you leave, you cannot work for any similar company within 200 miles for 2 full years. That basically means switching careers or moving far away.',
      suggestion: 'Negotiate down to 6-12 months, limit geographic scope to 25-50 miles, and narrow to only direct competitors. Request compensation during the non-compete period.',
      agentSource: 'Employment',
      confidence: 94
    },
    {
      risk: 'MEDIUM',
      title: 'Broad Data Collection & Monitoring',
      clause: 'The Company may monitor all employee communications, including email, messaging, internet usage, and device activity on company-provided and personal devices used for work purposes.',
      explanation: 'This allows the company to monitor your personal devices if you ever use them for work. The scope is vague and could be interpreted very broadly, potentially infringing on your privacy even outside work hours.',
      simpleExplanation: 'They can read your emails, track your browsing, and monitor your phone if you ever check work messages on it. Your personal phone could become their surveillance tool.',
      suggestion: 'Limit monitoring to company-provided devices only. Exclude personal devices. Request clear policies on what is monitored and how data is stored/deleted.',
      agentSource: 'Privacy',
      confidence: 88
    },
    {
      risk: 'MEDIUM',
      title: 'Unilateral Salary Modification',
      clause: 'The Company reserves the right to adjust compensation, benefits, and bonus structures at its sole discretion with 14 days written notice.',
      explanation: 'While salary adjustments are normal, allowing the company to reduce your pay with only 14 days notice and without your consent is concerning. This effectively means your agreed salary is not guaranteed.',
      simpleExplanation: 'They can cut your pay or remove your bonuses whenever they want — they just have to tell you 2 weeks ahead. You cannot say no.',
      suggestion: 'Add a floor clause preventing reduction below the initial agreed salary. Require mutual consent for compensation changes. Negotiate for a minimum annual increase tied to inflation.',
      agentSource: 'Financial',
      confidence: 86
    },
    {
      risk: 'MEDIUM',
      title: 'Mandatory Arbitration Clause',
      clause: 'Any disputes arising from this agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, waiving the right to a jury trial.',
      explanation: 'Mandatory arbitration removes your right to take the company to court. Arbitrators are often perceived as more favorable to employers. You also waive your right to participate in class action lawsuits.',
      simpleExplanation: 'If they wrong you, you cannot sue them in court. Instead, a private judge (often friendlier to companies) decides your fate. No jury, no public trial.',
      suggestion: 'Try to negotiate optional (not mandatory) arbitration, or at minimum, ensure you can choose the arbitrator and that the company pays all arbitration fees.',
      agentSource: 'Legal',
      confidence: 85
    },
    {
      risk: 'LOW',
      title: 'Standard Confidentiality Agreement',
      clause: 'The Employee agrees to maintain the confidentiality of all proprietary information, trade secrets, and business strategies for a period of 5 years following termination.',
      explanation: 'A 5-year confidentiality period is within industry norms. The clause is reasonably scoped to proprietary information and trade secrets, which is standard practice.',
      simpleExplanation: 'You cannot share company secrets for 5 years after leaving. This is pretty normal and fair — most companies have something like this.',
      suggestion: 'This clause is reasonable. Ensure "proprietary information" is clearly defined to avoid overly broad interpretation.',
      agentSource: 'Legal',
      confidence: 90
    },
    {
      risk: 'LOW',
      title: 'Benefits Enrollment Period',
      clause: 'Employees are eligible for health insurance, dental, and vision benefits after a 90-day probationary period.',
      explanation: 'A 90-day waiting period for benefits is standard practice in many companies. While not ideal, it falls within normal industry expectations.',
      simpleExplanation: 'You will not get health insurance for the first 3 months. This is common but means you need to have your own coverage during that time.',
      suggestion: 'Ask if they can waive or reduce the probationary period, especially if you are leaving another job with existing coverage.',
      agentSource: 'Financial',
      confidence: 82
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

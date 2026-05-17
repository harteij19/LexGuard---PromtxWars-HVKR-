'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle2, Zap } from 'lucide-react';
import type { ClauseAnalysis } from '@/types';

interface ClauseCardsProps {
  clauses: ClauseAnalysis[];
}

export default function ClauseCards({ clauses }: ClauseCardsProps) {
  if (!clauses || clauses.length === 0) {
    return (
      <div className="glass-card p-8 border border-white/[0.08]">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">No Verified Clauses</p>
        <p className="text-white text-lg font-bold">Clause requires human legal review.</p>
        <p className="text-gray-400 text-sm mt-2">No clause could be verified against the source document.</p>
      </div>
    );
  }

  const extractKeywords = (text: string) => {
    const haystack = text.toLowerCase();
    const keywords = [
      'terminate', 'termination', 'non-compete', 'arbitration', 'monitor', 'confidential', 'compensation',
      'benefits', 'intellectual property', 'ownership', 'liability', 'policy', 'assignment', 'jurisdiction',
      'notice', 'severance', 'restrict', 'privacy', 'audit', 'dispute'
    ];
    return keywords.filter(k => haystack.includes(k)).slice(0, 6);
  };

  return (
    <div className="space-y-6">
      {clauses.map((clause, i) => {
        const isHigh = clause.riskLevel === 'HIGH';
        const isMed = clause.riskLevel === 'MEDIUM';
        const keywords = extractKeywords(clause.originalClause);
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 border-l-4 ${isHigh ? 'border-l-[#FF4A4A]' : isMed ? 'border-l-[#FFB020]' : 'border-l-[#C5F852]'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-start">
                <div className={`mt-1 flex-shrink-0 ${isHigh ? 'text-[#FF4A4A]' : isMed ? 'text-[#FFB020]' : 'text-[#C5F852]'}`}>
                  {isHigh ? <AlertTriangle className="w-6 h-6" /> : isMed ? <Info className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>{clause.section}</h4>
                  <div className="flex gap-3 items-center">
                    <span className={`risk-badge ${isHigh ? 'risk-badge-high' : isMed ? 'risk-badge-medium' : 'risk-badge-low'}`}>
                      {clause.riskLevel} RISK
                    </span>
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{clause.agent} Agent</span>
                    {clause.sourceGrounded && (
                      <span className="text-xs font-bold uppercase tracking-widest text-[#C5F852] bg-[#C5F852]/10 border border-[#C5F852]/20 px-2 py-0.5 rounded-full">
                        Source Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0B0B] rounded-2xl p-6 border border-white/[0.05]">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Original Text</p>
                <p className="text-gray-400 text-sm font-mono leading-relaxed border-l-2 border-white/[0.1] pl-4 italic">"{clause.originalClause}"</p>
              </div>
              <div className="space-y-4">
                <div className="bg-[#1A1A1A] rounded-2xl p-5 border border-white/[0.05]">
                  <p className="text-[#C5F852] text-xs font-bold uppercase tracking-widest mb-2">AI Translation</p>
                  <p className="text-white text-sm leading-relaxed font-medium">{clause.simpleExplanation}</p>
                </div>
                <div className="bg-[#141414] rounded-2xl p-5 border border-[#C5F852]/20">
                  <p className="text-[#C5F852] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Zap className="w-3 h-3" /> Actionable Advice
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed font-medium">{clause.negotiationAdvice}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#0F0F0F] rounded-2xl p-6 border border-white/[0.08]">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Why This Was Flagged</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-[#C5F852] text-xs font-bold uppercase tracking-widest mb-2">Risk Reason</p>
                  <p className="text-gray-300 text-sm leading-relaxed font-medium">{clause.riskReason}</p>
                </div>
                <div>
                  <p className="text-[#C5F852] text-xs font-bold uppercase tracking-widest mb-2">Detected Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {keywords.length ? keywords.map(k => (
                      <span key={k} className="text-xs font-bold uppercase tracking-widest text-gray-400 bg-[#141414] border border-white/[0.08] px-2 py-1 rounded-full">
                        {k}
                      </span>
                    )) : (
                      <span className="text-xs text-gray-500">No significant keywords detected</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[#C5F852] text-xs font-bold uppercase tracking-widest mb-2">AI Confidence</p>
                  <p className="text-white text-2xl font-black" style={{ fontFamily: 'Space Grotesk' }}>{clause.confidence}%</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Verified Against Source Document</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

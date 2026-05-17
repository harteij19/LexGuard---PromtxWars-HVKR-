'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Info, CheckCircle2, Zap } from 'lucide-react';
import type { ClauseAnalysis } from '@/types';

interface ClauseCardsProps {
  clauses: ClauseAnalysis[];
}

export default function ClauseCards({ clauses }: ClauseCardsProps) {
  if (!clauses || clauses.length === 0) return null;

  return (
    <div className="space-y-6">
      {clauses.map((clause, i) => {
        const isHigh = clause.risk === 'HIGH';
        const isMed = clause.risk === 'MEDIUM';
        
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
                  <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>{clause.title}</h4>
                  <div className="flex gap-3 items-center">
                    <span className={`risk-badge ${isHigh ? 'risk-badge-high' : isMed ? 'risk-badge-medium' : 'risk-badge-low'}`}>
                      {clause.risk} RISK
                    </span>
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{clause.agentSource} Agent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0B0B] rounded-2xl p-6 border border-white/[0.05]">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Original Text</p>
                <p className="text-gray-400 text-sm font-mono leading-relaxed border-l-2 border-white/[0.1] pl-4 italic">"{clause.clause}"</p>
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
                  <p className="text-gray-300 text-sm leading-relaxed font-medium">{clause.suggestion}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

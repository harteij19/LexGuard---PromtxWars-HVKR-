'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';
import type { ClauseAnalysis } from '@/types';

interface DocumentViewerProps {
  contractText: string;
  clauses: ClauseAnalysis[];
}

export default function DocumentViewer({ contractText, clauses }: DocumentViewerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Very naive highlighting for demo purposes
  const renderHighlightedText = () => {
    let text = contractText;
    
    // Simple highlight
    clauses.forEach(clause => {
      if (clause.originalClause && text.includes(clause.originalClause)) {
        const riskClass = clause.riskLevel === 'HIGH' ? 'highlight-high' : clause.riskLevel === 'MEDIUM' ? 'highlight-medium' : 'highlight-low';
        text = text.replace(
          clause.originalClause,
          `<span class="${riskClass}" title="${clause.simpleExplanation}">${clause.originalClause}</span>`
        );
      }
    });

    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
    <div className="glass-card flex flex-col h-[800px]">
      <div className="p-6 border-b border-white/[0.05] flex items-center justify-between bg-[#141414]">
        <h3 className="text-white font-bold text-lg uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk' }}>Original Document</h3>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clauses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#0B0B0B] border border-white/[0.08] rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#C5F852] transition-colors font-medium"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 font-mono text-sm leading-loose text-gray-400 bg-[#0B0B0B]">
        {renderHighlightedText()}
      </div>

      <div className="p-4 bg-[#141414] border-t border-white/[0.05] flex gap-6 justify-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#FF4A4A]/20 border border-[#FF4A4A]"></span>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#FFB020]/20 border border-[#FFB020]"></span>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-[#C5F852]/20 border border-[#C5F852]"></span>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Low Risk</span>
        </div>
      </div>
    </div>
  );
}

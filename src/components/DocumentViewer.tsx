'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FileText, Eye, EyeOff } from 'lucide-react';
import type { ClauseAnalysis } from '@/types';

interface DocumentViewerProps {
  contractText: string;
  clauses: ClauseAnalysis[];
}

export default function DocumentViewer({ contractText, clauses }: DocumentViewerProps) {
  const [showHighlights, setShowHighlights] = useState(true);
  const [hoveredClause, setHoveredClause] = useState<ClauseAnalysis | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const getHighlightedText = () => {
    if (!showHighlights) return contractText;

    let result = contractText;

    // Sort clauses by length (longest first) to prevent nested replacements
    const sortedClauses = [...clauses].sort((a, b) => b.clause.length - a.clause.length);

    sortedClauses.forEach((clause, idx) => {
      const escapedClause = clause.clause.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedClause})`, 'gi');
      const riskClass =
        clause.risk === 'HIGH'
          ? 'highlight-high'
          : clause.risk === 'MEDIUM'
          ? 'highlight-medium'
          : 'highlight-low';

      result = result.replace(
        regex,
        `<span class="${riskClass}" data-clause-idx="${idx}">$1</span>`
      );
    });

    return result;
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const clauseIdx = target.getAttribute('data-clause-idx');
    if (clauseIdx !== null) {
      const sortedClauses = [...clauses].sort((a, b) => b.clause.length - a.clause.length);
      const clause = sortedClauses[parseInt(clauseIdx)];
      if (clause) {
        setHoveredClause(clause);
        const rect = target.getBoundingClientRect();
        setTooltipPos({
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
      }
    }
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute('data-clause-idx') !== null) {
      setHoveredClause(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700/30">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" />
          Document Viewer
        </h3>
        <button
          onClick={() => setShowHighlights(!showHighlights)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors bg-dark-700 px-3 py-1.5 rounded-lg"
        >
          {showHighlights ? (
            <>
              <EyeOff className="w-4 h-4" /> Hide Highlights
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" /> Show Highlights
            </>
          )}
        </button>
      </div>

      {/* Legend */}
      {showHighlights && (
        <div className="flex items-center gap-4 px-5 py-3 border-b border-gray-700/20 bg-dark-800/30">
          <span className="text-xs text-gray-500">Legend:</span>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-red-500/30 border border-red-500/50"></span>
            <span className="text-xs text-gray-400">High Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-amber-500/30 border border-amber-500/50"></span>
            <span className="text-xs text-gray-400">Medium Risk</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-green-500/30 border border-green-500/50"></span>
            <span className="text-xs text-gray-400">Low Risk</span>
          </div>
        </div>
      )}

      {/* Document Text */}
      <div
        className="p-6 max-h-[500px] overflow-y-auto text-sm text-gray-300 leading-[1.8] whitespace-pre-wrap relative"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
      />

      {/* Tooltip */}
      {hoveredClause && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${Math.min(tooltipPos.x, window.innerWidth - 320)}px`,
            top: `${tooltipPos.y - 10}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="risk-tooltip">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={
                  hoveredClause.risk === 'HIGH'
                    ? 'risk-badge-high'
                    : hoveredClause.risk === 'MEDIUM'
                    ? 'risk-badge-medium'
                    : 'risk-badge-low'
                }
              >
                {hoveredClause.risk} RISK
              </span>
              <span className="text-gray-400 text-xs font-medium">{hoveredClause.title}</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{hoveredClause.simpleExplanation}</p>
            <p className="text-purple-400 text-xs mt-2 font-medium">💡 {hoveredClause.suggestion}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

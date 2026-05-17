'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, AlertCircle, CheckCircle, Lightbulb, MessageSquare } from 'lucide-react';
import type { ClauseAnalysis } from '@/types';

interface ClauseCardsProps {
  clauses: ClauseAnalysis[];
}

function ClauseCard({ clause, index }: { clause: ClauseAnalysis; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const riskConfig = {
    HIGH: {
      badge: 'risk-badge-high',
      cardBorder: 'clause-card-high',
      icon: AlertTriangle,
      iconColor: 'text-red-400',
      glowClass: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]',
      confidenceBg: 'bg-red-500/10',
      confidenceText: 'text-red-400',
    },
    MEDIUM: {
      badge: 'risk-badge-medium',
      cardBorder: 'clause-card-medium',
      icon: AlertCircle,
      iconColor: 'text-amber-400',
      glowClass: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
      confidenceBg: 'bg-amber-500/10',
      confidenceText: 'text-amber-400',
    },
    LOW: {
      badge: 'risk-badge-low',
      cardBorder: 'clause-card-low',
      icon: CheckCircle,
      iconColor: 'text-green-400',
      glowClass: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]',
      confidenceBg: 'bg-green-500/10',
      confidenceText: 'text-green-400',
    },
  };

  const config = riskConfig[clause.risk];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card ${config.cardBorder} ${config.glowClass} overflow-hidden transition-all duration-300`}
    >
      {/* Header - Always Visible */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className={config.badge}>{clause.risk} RISK</span>
                <span className={`text-xs ${config.confidenceText} ${config.confidenceBg} px-2 py-0.5 rounded-full`}>
                  {clause.confidence}% confidence
                </span>
                <span className="text-xs text-gray-500 bg-dark-700 px-2 py-0.5 rounded-full">
                  {clause.agentSource} Agent
                </span>
              </div>
              <h4 className="text-white font-semibold text-base">{clause.title}</h4>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500 flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Simple explanation always shown */}
        <div className="mt-3 ml-8">
          <p className="text-gray-400 text-sm leading-relaxed flex items-start gap-2">
            <MessageSquare className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            {clause.simpleExplanation}
          </p>
        </div>
      </div>

      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 space-y-4 border-t border-gray-700/30 pt-4">
          {/* Original Clause */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Original Clause</p>
            <div className="bg-dark-800/80 rounded-xl p-4 border border-gray-700/30">
              <p className="text-gray-300 text-sm italic leading-relaxed">&ldquo;{clause.clause}&rdquo;</p>
            </div>
          </div>

          {/* Detailed Explanation */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Why This Is Risky</p>
            <p className="text-gray-400 text-sm leading-relaxed">{clause.explanation}</p>
          </div>

          {/* Suggestion */}
          <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl p-4 border border-purple-500/10">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-purple-400 uppercase tracking-wider mb-1 font-medium">Negotiation Suggestion</p>
                <p className="text-gray-300 text-sm leading-relaxed">{clause.suggestion}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ClauseCards({ clauses }: ClauseCardsProps) {
  const [filter, setFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');

  const filteredClauses = filter === 'ALL'
    ? clauses
    : clauses.filter(c => c.risk === filter);

  const counts = {
    ALL: clauses.length,
    HIGH: clauses.filter(c => c.risk === 'HIGH').length,
    MEDIUM: clauses.filter(c => c.risk === 'MEDIUM').length,
    LOW: clauses.filter(c => c.risk === 'LOW').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="text-xl">📋</span>
          Clause-by-Clause Analysis
          <span className="text-xs text-gray-500 bg-dark-700 px-2 py-1 rounded-full ml-2">
            {clauses.length} clauses
          </span>
        </h3>

        <div className="flex gap-2">
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                filter === level
                  ? level === 'HIGH'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : level === 'MEDIUM'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : level === 'LOW'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-dark-700 text-gray-400 border border-transparent hover:border-gray-600/50'
              }`}
            >
              {level} ({counts[level]})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredClauses.map((clause, i) => (
          <ClauseCard key={`${clause.title}-${i}`} clause={clause} index={i} />
        ))}
      </div>
    </div>
  );
}

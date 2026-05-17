'use client';

import { motion } from 'framer-motion';
import { Activity, CheckCircle2 } from 'lucide-react';
import type { AgentResult } from '@/types';

interface AgentPipelineProps {
  agents: AgentResult[];
}

export default function AgentPipeline({ agents }: AgentPipelineProps) {
  return (
    <div className="glass-card p-10">
      <div className="flex items-center gap-3 mb-10">
        <Activity className="w-6 h-6 text-[#C5F852]" />
        <h3 className="text-white font-bold text-xl uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>Multi-Agent Intelligence Pipeline</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.05] -translate-y-1/2 z-0" />

        {agents.map((agent, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.2 }}
            className="relative z-10 flex flex-col items-center flex-1"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-2xl relative
              ${agent.status === 'complete' ? 'bg-[#C5F852] text-black shadow-[0_0_20px_rgba(197,248,82,0.3)]' : 'bg-[#141414] border border-white/[0.08] text-gray-500'}
            `}>
              {agent.icon}
              {agent.status === 'complete' && (
                <div className="absolute -top-2 -right-2 bg-black rounded-full border border-[#C5F852]">
                  <CheckCircle2 className="w-5 h-5 text-[#C5F852]" />
                </div>
              )}
            </div>
            <h4 className="text-white font-bold text-sm mb-1 text-center uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>{agent.agentName}</h4>
            <div className="flex items-center gap-2 mt-2">
               <span className="text-xs font-bold text-[#C5F852] bg-[#C5F852]/10 px-2 py-0.5 rounded-full border border-[#C5F852]/20">Risk: {agent.riskScore}%</span>
               <span className="text-xs text-gray-500 font-bold">{agent.findings} Findings</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

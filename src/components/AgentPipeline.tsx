'use client';

import { motion } from 'framer-motion';
import type { AgentResult } from '@/types';

interface AgentPipelineProps {
  agents: AgentResult[];
}

export default function AgentPipeline({ agents }: AgentPipelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card p-6 md:p-8"
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <span className="text-xl">🤖</span>
        Multi-Agent Analysis Pipeline
      </h3>

      {/* Desktop: Horizontal Pipeline */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Connection line */}
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-dark-600 z-0">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #ec4899, #6366f1, #22d3ee, #a855f7)',
              }}
            />
          </div>

          {agents.map((agent, i) => (
            <motion.div
              key={agent.agentName}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.3, duration: 0.5, type: 'spring' }}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              {/* Agent Circle */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(168,85,247,0.2)',
                    '0 0 25px rgba(168,85,247,0.4)',
                    '0 0 10px rgba(168,85,247,0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="w-16 h-16 rounded-full bg-dark-800 border border-purple-500/30 flex items-center justify-center"
              >
                <span className="text-2xl">{agent.icon}</span>
              </motion.div>

              {/* Agent Name */}
              <div className="text-center">
                <p className="text-xs font-medium text-gray-300 max-w-[100px]">
                  {agent.agentName.replace(' Agent', '')}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {agent.findings} findings
                </p>
              </div>

              {/* Risk Score Mini */}
              {agent.agentName !== 'Simplifier Agent' && (
                <div
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    agent.riskScore > 60
                      ? 'bg-red-500/15 text-red-400'
                      : agent.riskScore > 30
                      ? 'bg-amber-500/15 text-amber-400'
                      : 'bg-green-500/15 text-green-400'
                  }`}
                >
                  {agent.riskScore}%
                </div>
              )}

              {/* Checkmark */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.3 }}
                className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <span className="text-green-400 text-xs">✓</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical Pipeline */}
      <div className="md:hidden space-y-4">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.agentName}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-center gap-4 p-3 rounded-xl bg-dark-800/50 border border-purple-500/10"
          >
            <div className="w-12 h-12 rounded-full bg-dark-700 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">{agent.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{agent.agentName}</p>
              <p className="text-xs text-gray-500">{agent.findings} findings</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {agent.agentName !== 'Simplifier Agent' && (
                <span
                  className={`text-xs font-bold ${
                    agent.riskScore > 60
                      ? 'text-red-400'
                      : agent.riskScore > 30
                      ? 'text-amber-400'
                      : 'text-green-400'
                  }`}
                >
                  {agent.riskScore}%
                </span>
              )}
              <span className="text-green-400 text-xs">✓ Done</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

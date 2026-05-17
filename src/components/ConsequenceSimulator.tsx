'use client';

import { motion } from 'framer-motion';
import { AlertOctagon, ArrowRight } from 'lucide-react';

interface ConsequenceSimulatorProps {
  consequences: string[];
}

export default function ConsequenceSimulator({ consequences }: ConsequenceSimulatorProps) {
  if (!consequences || consequences.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      className="glass-card p-10 flex flex-col justify-center border-[#FF4A4A]/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-[#FF4A4A]/10 flex items-center justify-center border border-[#FF4A4A]/20">
           <AlertOctagon className="w-5 h-5 text-[#FF4A4A]" />
        </div>
        <div>
          <h3 className="text-white font-bold text-xl uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>
            Impact Simulator
          </h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">AI Predicted Consequences</p>
        </div>
      </div>

      <div className="space-y-4">
        {consequences.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.2 }}
            className="flex gap-4 p-4 rounded-2xl bg-[#0B0B0B] border border-white/[0.05] group hover:border-[#FF4A4A]/30 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-[#FF4A4A] flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
            <p className="text-gray-300 text-sm leading-relaxed font-medium">{c}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

interface TrustMetricsProps {
  metrics: {
    transparency: number;
    fairness: number;
    readability: number;
    userSafety: number;
  };
}

export default function TrustMetrics({ metrics }: TrustMetricsProps) {
  const items = [
    { label: 'Transparency', val: metrics.transparency },
    { label: 'Fairness', val: metrics.fairness },
    { label: 'Readability', val: metrics.readability },
    { label: 'User Safety', val: metrics.userSafety },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
      className="glass-card p-10 flex flex-col justify-center relative overflow-hidden">
      
      {/* Background graphic */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12 pointer-events-none">
        <ShieldCheck className="w-64 h-64 text-white" />
      </div>

      <h3 className="text-white font-bold text-xl mb-8 flex items-center gap-3 uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>
        <ShieldCheck className="w-6 h-6 text-[#C5F852]" />
        Trust & Safety
      </h3>

      <div className="space-y-6 relative z-10">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{item.label}</span>
              <span className={`text-sm font-black ${item.val < 50 ? 'text-[#FF4A4A]' : 'text-white'}`} style={{ fontFamily: 'Space Grotesk' }}>{item.val}%</span>
            </div>
            <div className="h-2 w-full bg-[#0B0B0B] rounded-full overflow-hidden border border-white/[0.05]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.val}%` }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                className={`h-full rounded-full ${item.val < 50 ? 'bg-[#FF4A4A]' : 'bg-[#C5F852]'}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

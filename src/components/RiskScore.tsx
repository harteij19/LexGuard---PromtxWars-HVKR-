'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RiskScoreProps {
  score: number;
  verdict: 'SAFE' | 'CAUTION' | 'DANGEROUS';
  confidence?: number;
}

export default function RiskScore({ score, verdict, confidence = 98 }: RiskScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedConf, setAnimatedConf] = useState(0);

  useEffect(() => {
    let current = 0;
    const inc = score / 60;
    const timer = setInterval(() => {
      current += inc;
      if (current >= score) { current = score; clearInterval(timer); }
      setAnimatedScore(Math.round(current));
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  useEffect(() => {
    let current = 0;
    const inc = confidence / 60;
    const timer = setInterval(() => {
      current += inc;
      if (current >= confidence) { current = confidence; clearInterval(timer); }
      setAnimatedConf(Math.round(current));
    }, 16);
    return () => clearInterval(timer);
  }, [confidence]);

  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (animatedScore / 100) * circumference;

  const getColor = () => {
    if (score <= 30) return { stroke: '#C5F852', glow: 'rgba(197,248,82,0.3)', text: 'text-[#C5F852]' };
    if (score <= 60) return { stroke: '#FFB020', glow: 'rgba(255,176,32,0.3)', text: 'text-[#FFB020]' };
    return { stroke: '#FF4A4A', glow: 'rgba(255,74,74,0.3)', text: 'text-[#FF4A4A]' };
  };
  const colors = getColor();

  const vc = {
    SAFE: { label: 'SAFE TO SIGN', color: 'text-[#C5F852]', bg: 'bg-[#C5F852]/10', border: 'border-[#C5F852]/20', icon: '✅' },
    CAUTION: { label: 'REVIEW REQUIRED', color: 'text-[#FFB020]', bg: 'bg-[#FFB020]/10', border: 'border-[#FFB020]/20', icon: '⚠️' },
    DANGEROUS: { label: 'DO NOT SIGN', color: 'text-[#FF4A4A]', bg: 'bg-[#FF4A4A]/10', border: 'border-[#FF4A4A]/20', icon: '🚫' },
  }[verdict];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8 w-full">
      <div className="flex w-full justify-between items-center mb-[-1rem]">
         <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Risk Index</span>
         <div className="flex items-center gap-2 bg-[#0B0B0B] rounded-full px-3 py-1 border border-white/[0.05]">
           <span className="w-1.5 h-1.5 bg-[#C5F852] rounded-full"></span>
           <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">AI Conf: {animatedConf}%</span>
         </div>
      </div>

      <div className="risk-ring relative my-4">
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 60px ${colors.glow}` }} />
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="90" className="risk-ring-bg" />
          <motion.circle cx="110" cy="110" r="90" className="risk-ring-fill" stroke={colors.stroke}
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            style={{ filter: `drop-shadow(0 0 10px ${colors.glow})` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span className={`text-7xl font-black ${colors.text} tracking-tighter`}
            style={{ textShadow: `0 0 20px ${colors.glow}`, fontFamily: 'Space Grotesk' }}>
            {animatedScore}
          </motion.span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className={`${vc.bg} ${vc.border} border rounded-2xl px-8 py-5 flex items-center gap-4 w-full justify-center`}>
        <span className="text-2xl">{vc.icon}</span>
        <div>
          <p className={`${vc.color} font-black text-sm tracking-widest uppercase`} style={{ fontFamily: 'Space Grotesk' }}>{vc.label}</p>
          <p className="text-gray-400 text-xs mt-1 font-medium">Final AI Verdict</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface RiskScoreProps {
  score: number;
  verdict: 'SAFE' | 'CAUTION' | 'DANGEROUS';
}

export default function RiskScore({ score, verdict }: RiskScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = score / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        current = score;
        clearInterval(timer);
      }
      setAnimatedScore(Math.round(current));
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 85;
  const dashOffset = circumference - (animatedScore / 100) * circumference;

  const getColor = () => {
    if (score <= 30) return { stroke: '#22c55e', glow: 'rgba(34, 197, 94, 0.3)', text: 'text-green-400', bg: 'from-green-500/10 to-emerald-500/10' };
    if (score <= 60) return { stroke: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)', text: 'text-amber-400', bg: 'from-amber-500/10 to-yellow-500/10' };
    return { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)', text: 'text-red-400', bg: 'from-red-500/10 to-orange-500/10' };
  };

  const colors = getColor();

  const verdictConfig = {
    SAFE: { label: 'SAFE TO SIGN', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', icon: '✅' },
    CAUTION: { label: 'REVIEW CAREFULLY', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: '⚠️' },
    DANGEROUS: { label: 'DO NOT SIGN', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '🚫' },
  };

  const vc = verdictConfig[verdict];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6"
    >
      {/* Circle */}
      <div className="risk-circle relative">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle cx="100" cy="100" r="85" className="risk-circle-bg" />
          {/* Animated fill circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="85"
            className="risk-circle-fill"
            stroke={colors.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              filter: `drop-shadow(0 0 10px ${colors.glow})`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`text-5xl font-bold ${colors.text}`}
            style={{
              textShadow: `0 0 20px ${colors.glow}`,
            }}
          >
            {animatedScore}
          </motion.span>
          <span className="text-gray-500 text-xs uppercase tracking-widest mt-1">Risk Score</span>
        </div>
      </div>

      {/* Verdict Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className={`${vc.bg} ${vc.border} border rounded-2xl px-6 py-3 flex items-center gap-3`}
      >
        <span className="text-xl">{vc.icon}</span>
        <div>
          <p className={`${vc.color} font-bold text-sm tracking-wider`}>{vc.label}</p>
          <p className="text-gray-500 text-xs mt-0.5">Should I Sign This?</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

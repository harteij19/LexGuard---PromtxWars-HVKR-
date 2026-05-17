'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LiveStats() {
  const [stats, setStats] = useState({
    analyzed: 14205,
    risksFound: 89432,
    saved: 4.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        analyzed: prev.analyzed + Math.floor(Math.random() * 3),
        risksFound: prev.risksFound + Math.floor(Math.random() * 8),
        saved: prev.saved + (Math.random() * 0.01)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 border-y border-white/[0.05] bg-[#0B0B0B] py-8 mt-12 mb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-gradient-to-r from-transparent via-[#C5F852]/5 to-transparent skew-x-[-45deg] animate-pulse" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          
          <div className="flex items-center gap-4 border-r border-white/[0.05] pr-8 last:border-0 last:pr-0">
            <div className="w-2 h-2 rounded-full bg-[#C5F852] animate-pulse shadow-[0_0_10px_#C5F852]" />
            <div>
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-1">Documents Analyzed</p>
              <p className="text-3xl font-black text-white tracking-tighter" style={{ fontFamily: 'Space Grotesk' }}>
                {stats.analyzed.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-r border-white/[0.05] pr-8 last:border-0 last:pr-0">
            <div className="w-2 h-2 rounded-full bg-[#FF4A4A] animate-pulse shadow-[0_0_10px_#FF4A4A]" />
            <div>
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-1">Liabilities Detected</p>
              <p className="text-3xl font-black text-white tracking-tighter" style={{ fontFamily: 'Space Grotesk' }}>
                {stats.risksFound.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-r border-white/[0.05] pr-8 last:border-0 last:pr-0">
            <div className="w-2 h-2 rounded-full bg-[#C5F852] animate-pulse shadow-[0_0_10px_#C5F852]" />
            <div>
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-1">Est. Capital Saved</p>
              <p className="text-3xl font-black text-[#C5F852] tracking-tighter" style={{ fontFamily: 'Space Grotesk' }}>
                ${stats.saved.toFixed(2)}M+
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

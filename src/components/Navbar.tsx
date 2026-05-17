'use client';

import { Shield, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-white/[0.05]">
      <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo(0,0)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#C5F852] blur-md opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <Shield className="w-8 h-8 text-[#C5F852] relative z-10" />
          </div>
          <span className="text-xl font-black text-white tracking-widest uppercase" style={{ fontFamily: 'Space Grotesk' }}>
            LEXGUARD
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <a href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors hidden md:block uppercase tracking-widest">
            Methodology
          </a>
          <a href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors hidden md:block uppercase tracking-widest">
            Enterprise
          </a>
          <a href="https://github.com/harteij19/LexGuard---PromtxWars-HVKR-" target="_blank" rel="noreferrer"
             className="btn-secondary flex items-center gap-2 !px-5 !py-2.5">
            <span className="text-xs font-bold uppercase tracking-widest">GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </nav>
  );
}

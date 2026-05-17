'use client';

import { motion } from 'framer-motion';
import { Shield, Github } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-purple-500/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                boxShadow: '0 0 15px rgba(168,85,247,0.3)',
              }}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LEXGUARD
                </span>
              </h1>
              <p className="text-[10px] text-gray-500 -mt-0.5 tracking-widest uppercase">
                AI Contract Intelligence
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 bg-dark-700 px-3 py-1.5 rounded-full border border-gray-700/50">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Powered by Gemini AI
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

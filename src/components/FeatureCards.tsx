'use client';

import { ShieldAlert, Eye, Scale, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <ShieldAlert className="w-8 h-8 text-[#C5F852]" />,
    title: 'Liability Detection',
    description: 'Instantly highlights asymmetric indemnification and hidden financial traps.',
  },
  {
    icon: <Eye className="w-8 h-8 text-[#C5F852]" />,
    title: 'Privacy Scanning',
    description: 'Detects exploitative data usage, unauthorized monitoring, and IP forfeiture.',
  },
  {
    icon: <Scale className="w-8 h-8 text-[#C5F852]" />,
    title: 'Fairness Analysis',
    description: 'Calculates structural imbalances in termination rights and non-compete clauses.',
  },
  {
    icon: <Fingerprint className="w-8 h-8 text-[#C5F852]" />,
    title: 'Deception Radar',
    description: 'Identifies intentionally ambiguous language designed to confuse signatories.',
  },
];

export default function FeatureCards() {
  return (
    <section className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
         <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
            Military-Grade <span className="text-[#C5F852]">Scanning</span>
         </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/[0.05]">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

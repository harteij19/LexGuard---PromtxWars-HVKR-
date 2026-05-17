'use client';

import { motion } from 'framer-motion';
import { Shield, FileSearch, Brain, Lock, Scale } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Risk Detection',
    description: 'Identifies exploitative clauses, hidden liabilities, and one-sided obligations before you sign.',
    gradient: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
  {
    icon: FileSearch,
    title: 'Plain-English Explanations',
    description: 'Translates complex legal jargon into simple language anyone can understand.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Brain,
    title: 'AI Negotiation Suggestions',
    description: 'Get actionable recommendations on how to negotiate better terms and protect your interests.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Scale,
    title: 'Multi-Agent Intelligence',
    description: 'Five specialized AI agents analyze your contract from legal, financial, privacy, and employment perspectives.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Lock,
    title: 'Privacy Risk Analysis',
    description: 'Detects data collection, surveillance, and consent issues in privacy policies and terms of service.',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
];

export default function FeatureCards() {
  return (
    <section className="relative z-10 py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Powered by Multi-Agent AI
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Five specialized AI agents work together to analyze every aspect of your contract
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`glass-card p-6 cursor-default ${i === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 border ${feature.borderColor}`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

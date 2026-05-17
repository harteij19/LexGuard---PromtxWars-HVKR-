'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

const stages = [
  { label: 'Initializing AI Agents', icon: '🧠', duration: 1200 },
  { label: 'Parsing Legal Clauses', icon: '📄', duration: 1500 },
  { label: 'Detecting Financial Risks', icon: '💰', duration: 1300 },
  { label: 'Analyzing Privacy Concerns', icon: '🔒', duration: 1400 },
  { label: 'Evaluating Employment Terms', icon: '👔', duration: 1200 },
  { label: 'Simplifying Legal Language', icon: '✍️', duration: 1100 },
  { label: 'Generating Risk Report', icon: '📊', duration: 1000 },
];

interface ProcessingAnimationProps {
  onComplete: () => void;
}

export default function ProcessingAnimation({ onComplete }: ProcessingAnimationProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    if (currentStage >= stages.length) {
      setTimeout(onComplete, 600);
      return;
    }

    const timer = setTimeout(() => {
      setCompletedStages(prev => [...prev, currentStage]);
      setCurrentStage(prev => prev + 1);
    }, stages[currentStage].duration);

    return () => clearTimeout(timer);
  }, [currentStage, onComplete]);

  const progress = ((currentStage) / stages.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-lg w-full mx-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-purple-500/30 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
              boxShadow: '0 0 40px rgba(168,85,247,0.2), 0 0 80px rgba(168,85,247,0.1)',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              ⚡
            </motion.span>
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Contract</h2>
          <p className="text-gray-400 text-sm">Multi-agent AI pipeline in progress</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #ec4899, #6366f1)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
            <span className="text-xs text-gray-500">{currentStage}/{stages.length} agents</span>
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-3">
          {stages.map((stage, i) => {
            const isComplete = completedStages.includes(i);
            const isActive = currentStage === i;

            return (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-purple-500/10 border border-purple-500/20'
                    : isComplete
                    ? 'bg-green-500/5 border border-green-500/10'
                    : 'bg-dark-800/50 border border-transparent'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <AnimatePresence mode="wait">
                    {isComplete ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        key="loading"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Loader2 className="w-5 h-5 text-purple-400" />
                      </motion.div>
                    ) : (
                      <span className="text-lg opacity-40">{stage.icon}</span>
                    )}
                  </AnimatePresence>
                </div>
                <span
                  className={`text-sm font-medium transition-colors ${
                    isComplete
                      ? 'text-green-400'
                      : isActive
                      ? 'text-purple-300'
                      : 'text-gray-500'
                  }`}
                >
                  {stage.label}
                  {isActive && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-1"
                    >
                      ...
                    </motion.span>
                  )}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

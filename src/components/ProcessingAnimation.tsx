'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FileSearch, ShieldAlert, Cpu, Eye, Scale, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: <FileSearch className="w-6 h-6" />, text: 'Extracting clauses...' },
  { icon: <Cpu className="w-6 h-6" />, text: 'Running Neural NLP models...' },
  { icon: <ShieldAlert className="w-6 h-6" />, text: 'Cross-referencing liability databases...' },
  { icon: <Eye className="w-6 h-6" />, text: 'Detecting privacy loopholes...' },
  { icon: <Scale className="w-6 h-6" />, text: 'Calculating fairness metrics...' },
  { icon: <CheckCircle2 className="w-6 h-6" />, text: 'Compiling final intelligence report...' },
];

interface ProcessingAnimationProps {
  onComplete: () => void;
}

export default function ProcessingAnimation({ onComplete }: ProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500 + Math.random() * 1000); // 1.5s to 2.5s per step
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0B0B]/90 backdrop-blur-2xl">
      <div className="max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-12 relative">
          <div className="w-32 h-32 relative flex items-center justify-center">
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-t-[#C5F852] border-r-[#C5F852] border-b-transparent border-l-transparent"
            />
            {/* Inner spinning ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-b-[#C5F852] border-l-[#C5F852] border-t-transparent border-r-transparent opacity-50"
            />
            {/* Center icon */}
            <Cpu className="w-10 h-10 text-[#C5F852] animate-pulse" />
          </div>
          <h2 className="text-3xl font-black mt-8 text-white tracking-widest uppercase" style={{ fontFamily: 'Space Grotesk' }}>
            SCANNING...
          </h2>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep;

            return (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                  ${isActive ? 'bg-[#C5F852] text-black shadow-[0_0_20px_rgba(197,248,82,0.4)]' : isPast ? 'bg-[#1A1A1A] text-[#C5F852] border border-[#C5F852]/30' : 'bg-[#141414] text-gray-700 border border-white/[0.05]'}
                `}>
                  {isPast ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                </div>
                <p className={`font-bold uppercase tracking-widest text-xs transition-all duration-500
                  ${isActive ? 'text-white' : isPast ? 'text-gray-400' : 'text-gray-700'}
                `} style={{ fontFamily: 'Space Grotesk' }}>
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

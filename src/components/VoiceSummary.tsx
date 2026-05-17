'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import type { AnalysisResult } from '@/types';

interface VoiceSummaryProps {
  analysis: AnalysisResult;
}

export default function VoiceSummary({ analysis }: VoiceSummaryProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSynth(window.speechSynthesis);
    }
    return () => {
      if (synth) synth.cancel();
    };
  }, [synth]);

  const toggleVoice = () => {
    if (!synth) return;

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
    } else {
      const highRiskCount = analysis.clauses.filter(c => c.riskLevel === 'HIGH').length;
      let text = `LexGuard Analysis Complete. Overall risk score is ${analysis.overallRiskScore} out of 100. Verdict: ${analysis.verdict}. `;
      text += `We detected ${highRiskCount} high risk clauses. `;
      text += `Executive summary: ${analysis.summary}`;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsPlaying(false);
      utterance.rate = 1.05;
      
      synth.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleVoice}
      className={`voice-btn flex items-center gap-3 ${isPlaying ? 'bg-[#C5F852]/10 border-[#C5F852]' : 'bg-[#141414] border-white/[0.1] hover:bg-[#1A1A1A] hover:border-[#C5F852]/50'}`}
      style={{ fontFamily: 'Space Grotesk' }}
    >
      {isPlaying ? (
        <>
           <Volume2 className="w-5 h-5 text-[#C5F852] animate-pulse" />
           <span className="text-[#C5F852] font-bold uppercase tracking-widest text-xs">Playing Summary</span>
           <div className="flex gap-1 h-3 ml-2">
             <div className="w-1 bg-[#C5F852] animate-[bounce_1s_infinite] delay-75"></div>
             <div className="w-1 bg-[#C5F852] animate-[bounce_1s_infinite] delay-150"></div>
             <div className="w-1 bg-[#C5F852] animate-[bounce_1s_infinite] delay-300"></div>
           </div>
        </>
      ) : (
        <>
          <Play className="w-4 h-4 text-white" />
          <span className="text-white font-bold uppercase tracking-widest text-xs">Audio Briefing</span>
        </>
      )}
    </button>
  );
}

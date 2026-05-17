'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, RefreshCw, Copy, CheckCircle2 } from 'lucide-react';
import type { ClauseAnalysis } from '@/types';

interface NegotiationAIProps {
  clauses: ClauseAnalysis[];
  contractText: string;
}

export default function NegotiationAI({ clauses }: NegotiationAIProps) {
  const [emailDraft, setEmailDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateEmail = () => {
    setIsGenerating(true);
    
    // Simulate generation for demo since we already have the suggestions
    setTimeout(() => {
      const highRisks = clauses.filter(c => c.riskLevel === 'HIGH');
      const medRisks = clauses.filter(c => c.riskLevel === 'MEDIUM');
      
      let draft = `Dear [Counterparty Name],\n\nThank you for sending over the agreement. I am excited to move forward, but after a review of the document, I have a few points I would like to negotiate to ensure a fair and balanced arrangement for both parties.\n\n`;
      
      if (highRisks.length > 0) {
        draft += `CRITICAL CONCERNS:\n`;
        highRisks.forEach((r, i) => {
          draft += `${i + 1}. Regarding "${r.section}": ${r.negotiationAdvice}\n`;
        });
        draft += '\n';
      }

      if (medRisks.length > 0) {
        draft += `POINTS FOR CLARIFICATION:\n`;
        medRisks.slice(0, 2).forEach((r, i) => {
          draft += `${i + 1}. Regarding "${r.section}": ${r.negotiationAdvice}\n`;
        });
        draft += '\n';
      }

      draft += `I am happy to jump on a brief call to discuss these points if that would be easier. Let me know what you think.\n\nBest regards,\n[Your Name]`;
      
      setEmailDraft(draft);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="negotiation-panel p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-white font-bold text-xl flex items-center gap-3 uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>
            <Mail className="w-6 h-6 text-[#C5F852]" />
            Auto-Negotiator
          </h3>
          <p className="text-gray-400 text-sm mt-1 font-medium">Generate a professional pushback email based on AI findings.</p>
        </div>
        
        <button
          onClick={generateEmail}
          disabled={isGenerating}
          className="btn-primary flex items-center gap-2 !px-6 !py-3 uppercase tracking-wide text-sm"
        >
          {isGenerating ? (
             <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
             <Mail className="w-4 h-4" />
          )}
          {isGenerating ? 'Drafting...' : 'Generate Email'}
        </button>
      </div>

      <div className="relative">
        <div className={`w-full min-h-[300px] bg-[#0B0B0B] border border-white/[0.08] rounded-2xl p-6 font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed ${!emailDraft ? 'flex items-center justify-center text-center' : ''}`}>
          {isGenerating ? (
            <div className="flex flex-col items-center text-[#C5F852]">
              <RefreshCw className="w-8 h-8 animate-spin mb-4" />
              <p className="font-bold uppercase tracking-widest text-xs" style={{ fontFamily: 'Space Grotesk' }}>Synthesizing Legal Arguments...</p>
            </div>
          ) : emailDraft ? (
            emailDraft
          ) : (
            <p className="text-gray-600 font-medium italic">Click "Generate Email" to draft a negotiation letter.</p>
          )}
        </div>

        {emailDraft && !isGenerating && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={copyToClipboard}
            className="absolute top-4 right-4 bg-[#141414] hover:bg-white hover:text-black text-gray-400 border border-white/[0.1] rounded-full p-2.5 transition-colors shadow-lg"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-[#C5F852]" /> : <Copy className="w-4 h-4" />}
          </motion.button>
        )}
      </div>
    </div>
  );
}

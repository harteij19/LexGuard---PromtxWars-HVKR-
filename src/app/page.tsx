'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ArrowLeft, ArrowRight, BarChart3, FileText, Activity } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import FeatureCards from '@/components/FeatureCards';
import UploadSection from '@/components/UploadSection';
import ProcessingAnimation from '@/components/ProcessingAnimation';
import RiskScore from '@/components/RiskScore';
import AgentPipeline from '@/components/AgentPipeline';
import ClauseCards from '@/components/ClauseCards';
import DocumentViewer from '@/components/DocumentViewer';
import ChatAssistant from '@/components/ChatAssistant';
import DangerRadar from '@/components/DangerRadar';
import TrustMetrics from '@/components/TrustMetrics';
import ConsequenceSimulator from '@/components/ConsequenceSimulator';
import LiveStats from '@/components/LiveStats';
import NegotiationAI from '@/components/NegotiationAI';
import VoiceSummary from '@/components/VoiceSummary';
import type { AnalysisResult } from '@/types';

type AppView = 'landing' | 'processing' | 'dashboard';

export default function Home() {
  const [view, setView] = useState<AppView>('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [contractText, setContractText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'clauses' | 'document' | 'negotiation'>('clauses');
  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnalyze = async (file: File | null, text: string | null) => {
    setIsLoading(true);
    setView('processing');

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else if (text) {
        formData.append('text', text);
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Analysis failed');
      }

      const data = await res.json();
      setAnalysis(data.result);
      setContractText(data.contractText);
    } catch (error) {
      console.error('Analysis error:', error);
    }

    setIsLoading(false);
  };

  const handleProcessingComplete = () => {
    setView('dashboard');
  };

  const handleBackToHome = () => {
    setView('landing');
    setAnalysis(null);
    setContractText('');
    setActiveTab('clauses');
  };

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />

      <AnimatePresence mode="wait">
        {view === 'processing' && (
          <ProcessingAnimation onComplete={handleProcessingComplete} />
        )}

        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-16">
              
              {/* Massive Rotating 3D Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{ 
                  opacity: { duration: 2 },
                  scale: { duration: 2, ease: "easeOut" },
                  rotate: { duration: 40, repeat: Infinity, ease: "linear" } 
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
                style={{ mixBlendMode: 'screen' }}
              >
                <img 
                  src="/sapforce-orb.png" 
                  alt="3D Abstract Core" 
                  className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] object-contain opacity-80"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-center max-w-5xl mx-auto relative z-10"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-[#141414] border border-white/[0.08] rounded-full px-5 py-2 mb-8 shadow-2xl"
                >
                  <span className="w-2 h-2 bg-[#C5F852] rounded-full animate-pulse shadow-[0_0_10px_#C5F852]"></span>
                  <span className="text-sm text-gray-300 font-medium" style={{ fontFamily: 'Space Grotesk' }}>High-Precision AI Contract Intelligence</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-7xl md:text-9xl font-black mb-6 uppercase text-white"
                  style={{ fontFamily: 'Space Grotesk', letterSpacing: '-0.04em', lineHeight: '0.9' }}
                >
                  LEXGUARD<span className="text-[#C5F852]">.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl md:text-2xl text-white font-medium mb-10 max-w-3xl mx-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: 'Inter', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,1)' }}
                >
                  Upload any contract, offer letter, or policy. Our elite AI pipeline brutally exposes hidden liabilities, financial traps, and exploitative clauses before you sign.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <button onClick={scrollToUpload} className="btn-primary text-lg flex items-center gap-3 mx-auto uppercase">
                    Scan Document Now <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{
                  opacity: { delay: 1.5 },
                  y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute bottom-10 cursor-pointer text-gray-600 hover:text-[#C5F852] transition-colors"
                onClick={scrollToUpload}
              >
                <ChevronDown className="w-8 h-8" />
              </motion.div>
            </section>

            <LiveStats />
            <FeatureCards />

            <div ref={uploadRef}>
              <UploadSection onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            <footer className="relative z-10 py-12 text-center border-t border-white/[0.04]">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-[#C5F852]" />
                <span className="text-sm font-bold text-white uppercase" style={{ fontFamily: 'Space Grotesk', letterSpacing: '0.1em' }}>
                  LEXGUARD
                </span>
              </div>
              <p className="text-gray-500 text-xs">
                Built with Deep AI Intelligence • Top-Tier Legal Precision
              </p>
            </footer>
          </motion.div>
        )}

        {view === 'dashboard' && analysis && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 pt-24 pb-24 px-4"
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleBackToHome}
                  className="btn-secondary flex items-center gap-2 !px-5 !py-2.5 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-bold">RETURN HOME</span>
                </motion.button>

                <div className="flex-1 text-center hidden md:block">
                  <div className="inline-flex items-center gap-2 bg-[#141414] border border-white/[0.08] rounded-full px-5 py-2">
                    <Activity className="w-4 h-4 text-[#C5F852]" />
                    <span className="text-sm text-gray-300 font-medium" style={{ fontFamily: 'Space Grotesk' }}>Intelligence Report Generated</span>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                   <VoiceSummary analysis={analysis} />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <h2 className="text-4xl md:text-6xl font-black mb-4 text-white uppercase tracking-tight" style={{ fontFamily: 'Space Grotesk' }}>
                  DOCUMENT <span className="text-[#C5F852]">ANALYSIS</span>
                </h2>
                <p className="text-gray-400 flex items-center gap-3 text-lg">
                  <FileText className="w-5 h-5 text-[#C5F852]" />
                  <span className="font-medium text-white">{analysis.documentName}</span>
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="glass-card p-10 flex flex-col items-center justify-center relative">
                  <RiskScore score={analysis.overallRisk} verdict={analysis.verdict} confidence={analysis.clauses[0]?.confidence || 98} />
                </div>
                <DangerRadar scores={analysis.radarScores || { financialRisk: 50, privacyRisk: 50, hiddenLiability: 50, terminationRisk: 50, dataExploitation: 50, ambiguityScore: 50 }} />
                <TrustMetrics metrics={analysis.trustMetrics || { transparency: 50, fairness: 50, readability: 50, userSafety: 50 }} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                 <div className="glass-card p-10 flex flex-col justify-center">
                    <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3 uppercase" style={{ fontFamily: 'Space Grotesk' }}>
                      <BarChart3 className="w-6 h-6 text-[#C5F852]" />
                      Executive Summary
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-8 text-base">{analysis.summary}</p>

                    <div className="space-y-5">
                      {[
                        { label: 'High Risk', count: analysis.clauses.filter(c => c.risk === 'HIGH').length, color: 'bg-[#FF4A4A]', textColor: 'text-[#FF4A4A]' },
                        { label: 'Medium Risk', count: analysis.clauses.filter(c => c.risk === 'MEDIUM').length, color: 'bg-[#FFB020]', textColor: 'text-[#FFB020]' },
                        { label: 'Low Risk', count: analysis.clauses.filter(c => c.risk === 'LOW').length, color: 'bg-[#C5F852]', textColor: 'text-[#C5F852]' },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-4">
                          <span className={`text-sm ${item.textColor} font-bold w-24 uppercase tracking-wide`} style={{ fontFamily: 'Space Grotesk' }}>{item.label}</span>
                          <div className="flex-1 h-3 bg-black rounded-full overflow-hidden border border-white/[0.05]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.count / Math.max(analysis.clauses.length, 1)) * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full ${item.color} rounded-full`}
                            />
                          </div>
                          <span className="text-sm text-white w-8 text-right font-bold">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <ConsequenceSimulator consequences={analysis.consequences || []} />
              </div>

              <div className="mb-10">
                <AgentPipeline agents={analysis.agentResults} />
              </div>

              <div className="flex flex-wrap gap-4 mb-10 border-b border-white/[0.05] pb-6">
                <button
                  onClick={() => setActiveTab('clauses')}
                  className={`px-8 py-4 rounded-full font-bold text-sm transition-all flex items-center gap-3 uppercase ${
                    activeTab === 'clauses'
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-[#141414] text-gray-400 hover:text-white border border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  <span className="text-lg">📋</span> Clause Findings
                </button>
                <button
                  onClick={() => setActiveTab('document')}
                  className={`px-8 py-4 rounded-full font-bold text-sm transition-all flex items-center gap-3 uppercase ${
                    activeTab === 'document'
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-[#141414] text-gray-400 hover:text-white border border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  <span className="text-lg">📄</span> Document Viewer
                </button>
                <button
                  onClick={() => setActiveTab('negotiation')}
                  className={`px-8 py-4 rounded-full font-bold text-sm transition-all flex items-center gap-3 uppercase ${
                    activeTab === 'negotiation'
                      ? 'bg-[#C5F852] text-black shadow-[0_0_20px_rgba(197,248,82,0.3)]'
                      : 'bg-[#141414] text-gray-400 hover:text-white border border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  <span className="text-lg">🤝</span> Auto-Negotiate
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'clauses' ? (
                  <motion.div key="clauses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <ClauseCards clauses={analysis.clauses} />
                  </motion.div>
                ) : activeTab === 'document' ? (
                  <motion.div key="document" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <DocumentViewer contractText={contractText} clauses={analysis.clauses} />
                  </motion.div>
                ) : (
                  <motion.div key="negotiation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <NegotiationAI clauses={analysis.clauses} contractText={contractText} />
                  </motion.div>
                )}
              </AnimatePresence>

              <ChatAssistant contractText={contractText} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

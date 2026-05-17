'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ArrowLeft, Sparkles, BarChart3, FileText } from 'lucide-react';
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
import type { AnalysisResult } from '@/types';

type AppView = 'landing' | 'processing' | 'dashboard';

export default function Home() {
  const [view, setView] = useState<AppView>('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [contractText, setContractText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'clauses' | 'document'>('clauses');
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
      // Even on error, the mock data will be returned by the API
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
        {/* ==================== PROCESSING OVERLAY ==================== */}
        {view === 'processing' && (
          <ProcessingAnimation onComplete={handleProcessingComplete} />
        )}

        {/* ==================== LANDING PAGE ==================== */}
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
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-center max-w-4xl mx-auto"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-8"
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-purple-300 font-medium">Powered by Multi-Agent Gemini AI</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-6xl md:text-8xl font-black tracking-tight mb-4"
                >
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #a855f7, #ec4899, #6366f1)',
                    }}
                  >
                    LEXGUARD
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl md:text-2xl text-gray-400 font-light mb-4"
                >
                  AI Rights & Contract Intelligence System
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                  Upload any contract, offer letter, privacy policy, or legal document.
                  Our AI agents detect exploitative clauses, hidden liabilities, and financial risks
                  — explained in simple human language before you sign.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <button onClick={scrollToUpload} className="btn-primary text-lg">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Analyze Contract
                    </span>
                  </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex items-center justify-center gap-8 mt-16 flex-wrap"
                >
                  {[
                    { value: '5', label: 'AI Agents' },
                    { value: '50+', label: 'Risk Checks' },
                    { value: '<30s', label: 'Analysis Time' },
                    { value: '99%', label: 'Accuracy' },
                  ].map((stat, i) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{
                  opacity: { delay: 1.5 },
                  y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute bottom-8 cursor-pointer"
                onClick={scrollToUpload}
              >
                <ChevronDown className="w-6 h-6 text-purple-400/50" />
              </motion.div>
            </section>

            {/* Feature Cards */}
            <FeatureCards />

            {/* Upload Section */}
            <div ref={uploadRef}>
              <UploadSection onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            {/* Footer */}
            <footer className="relative z-10 py-12 text-center border-t border-gray-800/50">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LEXGUARD
                </span>
              </div>
              <p className="text-gray-500 text-xs">
                Built with Gemini AI • Protecting Your Rights Through Intelligence
              </p>
            </footer>
          </motion.div>
        )}

        {/* ==================== ANALYSIS DASHBOARD ==================== */}
        {view === 'dashboard' && analysis && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 pt-20 pb-24 px-4"
          >
            <div className="max-w-6xl mx-auto">
              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">Back to Home</span>
              </motion.button>

              {/* Dashboard Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Analysis Complete
                  </span>
                </h2>
                <p className="text-gray-400 flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  {analysis.documentName}
                </p>
              </motion.div>

              {/* Risk Score + Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="glass-card p-8 flex items-center justify-center">
                  <RiskScore score={analysis.overallRisk} verdict={analysis.verdict} />
                </div>
                <div className="glass-card p-8 flex flex-col justify-center">
                  <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    Executive Summary
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{analysis.summary}</p>

                  {/* Risk Distribution Mini-Chart */}
                  <div className="space-y-3">
                    {[
                      { label: 'High Risk', count: analysis.clauses.filter(c => c.risk === 'HIGH').length, color: 'bg-red-500', textColor: 'text-red-400' },
                      { label: 'Medium Risk', count: analysis.clauses.filter(c => c.risk === 'MEDIUM').length, color: 'bg-amber-500', textColor: 'text-amber-400' },
                      { label: 'Low Risk', count: analysis.clauses.filter(c => c.risk === 'LOW').length, color: 'bg-green-500', textColor: 'text-green-400' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className={`text-xs ${item.textColor} w-20`}>{item.label}</span>
                        <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.count / Math.max(analysis.clauses.length, 1)) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agent Pipeline */}
              <div className="mb-10">
                <AgentPipeline agents={analysis.agentResults} />
              </div>

              {/* Tab Switcher */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('clauses')}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    activeTab === 'clauses'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-dark-700 text-gray-400 hover:text-white border border-gray-700/50'
                  }`}
                >
                  📋 Clause Analysis
                </button>
                <button
                  onClick={() => setActiveTab('document')}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    activeTab === 'document'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-dark-700 text-gray-400 hover:text-white border border-gray-700/50'
                  }`}
                >
                  📄 Document Viewer
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'clauses' ? (
                  <motion.div
                    key="clauses"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <ClauseCards clauses={analysis.clauses} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="document"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <DocumentViewer contractText={contractText} clauses={analysis.clauses} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Assistant */}
              <ChatAssistant contractText={contractText} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

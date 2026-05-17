'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, Sparkles, Clipboard } from 'lucide-react';
import { sampleContractText } from '@/lib/mockData';

interface UploadSectionProps {
  onAnalyze: (file: File | null, text: string | null) => void;
  isLoading: boolean;
}

export default function UploadSection({ onAnalyze, isLoading }: UploadSectionProps) {
  const [mode, setMode] = useState<'upload' | 'paste'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (mode === 'upload' && file) {
      onAnalyze(file, null);
    } else if (mode === 'paste' && text.trim()) {
      onAnalyze(null, text);
    }
  };

  const loadSample = () => {
    setText(sampleContractText);
    setMode('paste');
  };

  const canSubmit = (mode === 'upload' && file) || (mode === 'paste' && text.trim());

  return (
    <section id="upload-section" className="relative z-10 py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Upload Your Document
            </span>
          </h2>
          <p className="text-gray-400">
            Upload a PDF, text file, or paste your contract directly
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setMode('upload')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm ${
              mode === 'upload'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-dark-700 text-gray-400 hover:text-white border border-gray-700/50'
            }`}
          >
            <Upload className="w-4 h-4 inline-block mr-2 -mt-0.5" />
            Upload File
          </button>
          <button
            onClick={() => setMode('paste')}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm ${
              mode === 'paste'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-dark-700 text-gray-400 hover:text-white border border-gray-700/50'
            }`}
          >
            <Clipboard className="w-4 h-4 inline-block mr-2 -mt-0.5" />
            Paste Text
          </button>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'upload' ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`glass-card p-12 cursor-pointer transition-all duration-300 text-center ${
                  isDragging
                    ? 'border-purple-500/50 neon-glow-purple'
                    : 'hover:border-purple-500/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <AnimatePresence mode="wait">
                  {file ? (
                    <motion.div
                      key="file-selected"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                        <FileText className="w-8 h-8 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-lg">{file.name}</p>
                        <p className="text-gray-500 text-sm mt-1">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-gray-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-file"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center border border-purple-500/20"
                      >
                        <Upload className="w-8 h-8 text-purple-400" />
                      </motion.div>
                      <div>
                        <p className="text-gray-300 font-medium">
                          Drop your document here or click to browse
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          Supports PDF, TXT, DOC files
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="paste"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card p-6">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your contract, offer letter, privacy policy, or any legal document here..."
                  className="w-full h-64 bg-transparent text-gray-300 placeholder-gray-600 border-none outline-none resize-none text-sm leading-relaxed"
                />
                <div className="flex justify-between items-center pt-4 border-t border-gray-700/30">
                  <p className="text-gray-500 text-xs">
                    {text.length} characters
                  </p>
                  <button
                    onClick={loadSample}
                    className="text-purple-400 hover:text-purple-300 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Load Sample Contract
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isLoading}
            className={`btn-primary flex items-center gap-3 text-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none ${
              isLoading ? 'animate-pulse' : ''
            }`}
          >
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              {isLoading ? 'Analyzing...' : 'Analyze with AI'}
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

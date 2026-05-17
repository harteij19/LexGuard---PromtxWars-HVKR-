'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadSectionProps {
  onAnalyze: (file: File | null, text: string | null) => void;
  isLoading: boolean;
}

export default function UploadSection({ onAnalyze, isLoading }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setText('');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setText('');
    }
  };

  const handleLoadSample = async () => {
    try {
      const res = await fetch('/sample_contract.txt');
      const sampleText = await res.text();
      setText(sampleText);
      setFile(null);
    } catch (error) {
      console.error('Failed to load sample', error);
    }
  };

  return (
    <section id="upload-section" className="relative z-10 py-24 px-4 max-w-5xl mx-auto w-full">
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5F852]/5 blur-[80px]" />

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white uppercase" style={{ fontFamily: 'Space Grotesk' }}>INITIATE <span className="text-[#C5F852]">ANALYSIS</span></h2>
          <p className="text-gray-400 font-medium tracking-wide">Upload a PDF or paste document text directly</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* File Upload Zone */}
          <div
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-[28px] p-8 flex flex-col items-center justify-center transition-all min-h-[300px]
              ${dragActive ? 'border-[#C5F852] bg-[#C5F852]/5' : 'border-white/[0.1] bg-[#141414] hover:border-white/[0.2] hover:bg-[#1A1A1A]'}
            `}
          >
            <input type="file" accept=".pdf,.docx,.doc,.txt" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center z-20">
                  <div className="w-16 h-16 bg-[#C5F852]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#C5F852]/30">
                    <FileText className="w-8 h-8 text-[#C5F852]" />
                  </div>
                  <p className="text-white font-bold mb-2 truncate max-w-[200px]" style={{ fontFamily: 'Space Grotesk' }}>{file.name}</p>
                  <p className="text-gray-500 text-sm mb-4">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button onClick={(e) => { e.preventDefault(); setFile(null); }} className="relative z-30 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mx-auto font-bold uppercase tracking-widest">
                    <X className="w-3 h-3" /> Remove File
                  </button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6 border border-white/[0.05] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <Upload className="w-8 h-8 text-[#C5F852]" />
                  </div>
                  <p className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Drag & Drop Document</p>
                  <p className="text-gray-500 text-sm mb-6 font-medium">Supports PDF, DOCX, TXT</p>
                  <div className="btn-secondary pointer-events-none uppercase text-sm tracking-wide">Browse Files</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Text Input Zone */}
          <div className="flex flex-col h-[300px] relative">
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setFile(null); }}
              placeholder="Or paste contract text here..."
              className="flex-1 w-full bg-[#141414] border border-white/[0.1] rounded-[28px] p-6 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#C5F852] focus:ring-1 focus:ring-[#C5F852]/50 transition-all resize-none font-medium text-sm leading-relaxed"
            />
            
            <div className="absolute bottom-6 right-6">
              <button 
                onClick={handleLoadSample}
                className="text-xs bg-[#1A1A1A] hover:bg-white hover:text-black border border-white/[0.1] text-gray-400 px-4 py-2 rounded-full transition-colors font-bold uppercase tracking-widest"
              >
                Load Sample Contract
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onAnalyze(file, text)}
            disabled={(!file && !text.trim()) || isLoading}
            className="btn-primary w-full md:w-auto min-w-[300px] disabled:opacity-50 disabled:cursor-not-allowed text-lg py-5 uppercase tracking-wide"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Initializing Pipeline...
              </span>
            ) : 'Analyze with AI'}
          </button>
        </div>
      </div>
    </section>
  );
}

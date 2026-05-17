'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';
import type { ChatMessage } from '@/types';

interface ChatAssistantProps {
  contractText: string;
}

export default function ChatAssistant({ contractText }: ChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your LEXGUARD AI. I\'ve brutally analyzed your contract. Ask me anything about your liabilities:\n\n• "Can they fire me without cause?"\n• "What is my biggest financial risk?"\n• "Is my data being sold?"',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractText,
          question: userMessage.content,
          chatHistory: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I apologize, but I could not process your question. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'System error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const quickQuestions = [
    'Can they fire me without cause?',
    'What is my biggest financial risk?',
    'Is my data being sold?',
  ];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center pulse-animation border-2 border-black"
            style={{
              background: '#C5F852',
            }}
          >
            <MessageCircle className="w-7 h-7 text-black" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-50 ${
              isMinimized
                ? 'bottom-8 right-8 w-80'
                : 'bottom-8 right-8 w-[400px] h-[650px] max-h-[85vh]'
            }`}
          >
            <div className={`chat-container flex flex-col ${isMinimized ? '' : 'h-full'} overflow-hidden`}>
              <div className="flex items-center justify-between p-5 bg-[#0B0B0B] border-b border-white/[0.05]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C5F852] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>LEXGUARD AI</h4>
                    <p className="text-[#C5F852] text-[10px] flex items-center gap-1.5 font-bold tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 bg-[#C5F852] rounded-full animate-pulse shadow-[0_0_8px_#C5F852]"></span>
                      Systems Active
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 rounded-full hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors">
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#141414]">
                    {messages.map(msg => (
                      <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-[#0B0B0B] flex items-center justify-center flex-shrink-0 border border-white/[0.1]">
                            <Bot className="w-4 h-4 text-[#C5F852]" />
                          </div>
                        )}
                        <div className={`max-w-[80%] p-4 text-sm leading-relaxed shadow-lg ${
                            msg.role === 'user'
                              ? 'chat-message-user text-white font-medium'
                              : 'chat-message-ai text-gray-300'
                          }`} style={{ whiteSpace: 'pre-wrap' }}>
                          {msg.content}
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-black" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-[#0B0B0B] flex items-center justify-center flex-shrink-0 border border-white/[0.1]">
                          <Bot className="w-4 h-4 text-[#C5F852]" />
                        </div>
                        <div className="chat-message-ai p-4 flex gap-1.5 items-center">
                          <div className="typing-dot w-2 h-2 rounded-full"></div>
                          <div className="typing-dot w-2 h-2 rounded-full"></div>
                          <div className="typing-dot w-2 h-2 rounded-full"></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {messages.length <= 1 && (
                    <div className="px-5 pb-3 pt-2 bg-[#141414] flex flex-wrap gap-2">
                      {quickQuestions.map(q => (
                        <button key={q} onClick={() => setInput(q)}
                          className="text-[11px] font-bold bg-[#1A1A1A] text-gray-300 px-4 py-2 rounded-full border border-white/[0.08] hover:bg-white hover:text-black transition-colors uppercase tracking-wide">
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="p-4 bg-[#0B0B0B] border-t border-white/[0.05]">
                    <div className="flex gap-3">
                      <input
                         value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                         placeholder="Query AI..."
                         className="flex-1 bg-[#1A1A1A] text-white text-sm rounded-full px-5 py-3 border border-white/[0.08] focus:border-[#C5F852] focus:outline-none focus:ring-1 focus:ring-[#C5F852]/50 placeholder-gray-600 transition-all font-medium"
                      />
                      <button onClick={sendMessage} disabled={!input.trim() || isLoading}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-[#C5F852] hover:bg-[#D4FF66] shadow-[0_0_15px_rgba(197,248,82,0.2)]">
                        <Send className="w-5 h-5 text-black ml-1" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

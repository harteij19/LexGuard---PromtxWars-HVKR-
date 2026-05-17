'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { RadarScores } from '@/types';

interface DangerRadarProps {
  scores: RadarScores;
}

const labels = [
  { key: 'financialRisk' as const, label: 'Financial', angle: -90 },
  { key: 'privacyRisk' as const, label: 'Privacy', angle: -30 },
  { key: 'hiddenLiability' as const, label: 'Liability', angle: 30 },
  { key: 'terminationRisk' as const, label: 'Termination', angle: 90 },
  { key: 'dataExploitation' as const, label: 'Data Exploit', angle: 150 },
  { key: 'ambiguityScore' as const, label: 'Ambiguity', angle: 210 },
];

export default function DangerRadar({ scores }: DangerRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 300;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = 100;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Draw rings
    for (let i = 1; i <= 4; i++) {
      const r = (maxR / 4) * i;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + i * 0.02})`;
      ctx.lineWidth = 1;
      if (i === 4) ctx.setLineDash([2, 4]); // Dotted outer ring
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw axes
    labels.forEach(l => {
      const rad = (l.angle * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(rad) * maxR, cy + Math.sin(rad) * maxR);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw data polygon
    const values = labels.map(l => scores[l.key] / 100);
    ctx.beginPath();
    values.forEach((v, i) => {
      const rad = (labels[i].angle * Math.PI) / 180;
      const x = cx + Math.cos(rad) * maxR * v;
      const y = cy + Math.sin(rad) * maxR * v;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    // Fill
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    gradient.addColorStop(0, 'rgba(197, 248, 82, 0.25)'); // Lime Green
    gradient.addColorStop(1, 'rgba(197, 248, 82, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Stroke
    ctx.strokeStyle = '#C5F852';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw dots
    values.forEach((v, i) => {
      const rad = (labels[i].angle * Math.PI) / 180;
      const x = cx + Math.cos(rad) * maxR * v;
      const y = cy + Math.sin(rad) * maxR * v;

      // Dot
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = v > 0.6 ? '#FF4A4A' : v > 0.4 ? '#FFB020' : '#C5F852';
      ctx.fill();
    });
  }, [scores]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      className="glass-card p-10 flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 w-full uppercase tracking-wide" style={{ fontFamily: 'Space Grotesk' }}>
        <span className="text-[#C5F852]">⌖</span> Danger Radar
      </h3>
      <div className="relative">
        <canvas ref={canvasRef} className="radar-glow" style={{ width: '300px', height: '300px' }} />
        {/* Labels */}
        {labels.map(l => {
          const rad = (l.angle * Math.PI) / 180;
          const r = 135;
          const x = 150 + Math.cos(rad) * r;
          const y = 150 + Math.sin(rad) * r;
          const val = scores[l.key];
          return (
            <div key={l.key} className="absolute text-center" style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest" style={{ fontFamily: 'Space Grotesk' }}>{l.label}</p>
              <p className={`text-sm font-black ${val > 60 ? 'text-[#FF4A4A]' : val > 40 ? 'text-[#FFB020]' : 'text-[#C5F852]'}`} style={{ fontFamily: 'Space Grotesk' }}>
                {val}%
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

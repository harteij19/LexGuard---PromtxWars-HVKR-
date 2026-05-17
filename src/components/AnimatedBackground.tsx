'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; s: number; vx: number; vy: number; a: number }[] = [];
    let w = 0, h = 0;
    let animationFrameId: number;
    let rotationAngle = 0;

    const init = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      particles = [];
      const numParticles = Math.floor((w * h) / 12000); // Dense star-like particles for Sapforce vibe
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          s: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          a: Math.random() * 0.5 + 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw massive rotating geometric element
      ctx.save();
      ctx.translate(w / 2, h / 2);
      rotationAngle += 0.001; // Slow rotation
      ctx.rotate(rotationAngle);
      
      // Outer dashed ring
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(w, h) * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      // Inner polygon wireframe
      ctx.beginPath();
      const sides = 6;
      const radius = Math.min(w, h) * 0.3;
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        
        // Connect to center
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(197, 248, 82, 0.05)'; // Subtle lime
      ctx.setLineDash([]);
      ctx.stroke();
      
      ctx.restore();

      // Draw subtle noise/particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 248, 82, ${p.a})`; // Lime green particles
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);
    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[url('/dimmed-bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.05] mix-blend-screen" />
      <div className="mesh-bg" />
      <div className="grid-overlay" />
      <div className="hero-glow" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
    </div>
  );
}

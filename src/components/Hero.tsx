import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Gamepad2, ChevronDown, MapPin } from 'lucide-react';
import { audioService } from '../services/audioService';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle Animated Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor(width / 24), 50);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#00f0ff' : '#ffffff',
      alpha: Math.random() * 0.35 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = (1 - dist / 120) * 0.08;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#090909]">
      {/* Background Esports Arena Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=85"
          alt="Basavraj Gaming Arena Esports Lounge"
          className="w-full h-full object-cover object-center opacity-30 filter contrast-125 saturate-125"
        />
        {/* Dark Vignette Overlay for Crisp Typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/85 via-[#090909]/90 to-[#090909]" />
      </div>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 z-10 cyber-grid opacity-20 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 glass-panel px-4 py-1.5 rounded-full border border-emerald-500/30 text-xs font-mono text-white mb-8 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-emerald-400">OPEN TODAY • 9 AM – 11 PM</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span className="text-white/80">HUBLI, KARNATAKA</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-tight font-display mb-6 uppercase"
        >
          PLAY. COMPETE. <br />
          <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
            DOMINATE.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-10 max-w-2xl"
        >
          Hubli's premium gaming destination.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          <button
            onClick={() => {
              audioService.playClickSound();
              onOpenBooking();
            }}
            className="btn-blue w-full sm:w-auto px-9 py-4 text-sm font-mono tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl"
          >
            <Calendar className="w-5 h-5" />
            <span>BOOK A SESSION</span>
          </button>

          <a
            href="#games"
            onClick={() => audioService.playHoverSound()}
            className="btn-glass w-full sm:w-auto px-9 py-4 rounded-full text-sm font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2.5"
          >
            <Gamepad2 className="w-4 h-4 text-[#00f0ff]" />
            <span>EXPLORE GAMES</span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <a
          href="#live-status"
          className="flex flex-col items-center gap-2 text-white/40 hover:text-[#00f0ff] transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#00f0ff]" />
        </a>
      </div>
    </section>
  );
};

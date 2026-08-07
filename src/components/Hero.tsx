import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronDown, Sparkles, ShieldCheck, MapPin, Award, Tv, Cpu } from 'lucide-react';
import { audioService } from '../services/audioService';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive Canvas Particle Mesh Background
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

    const particleCount = Math.min(Math.floor(width / 22), 60);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1,
      color: '#00f0ff',
      alpha: Math.random() * 0.4 + 0.1,
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

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = (1 - dist / 130) * 0.12;
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#090909]">
      {/* Background Hero Image with Dark Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=85"
          alt="Basavraj Gaming Centre PS5 Arena"
          className="w-full h-full object-cover object-center opacity-25 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/90 via-[#090909]/95 to-[#090909]" />
      </div>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 z-10 cyber-grid opacity-15 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Location & Award Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-white/15 text-xs font-mono text-cyan-300 mb-8 shadow-lg"
        >
          <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span>HUBLI, KARNATAKA</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-white/90">PREMIUM CONSOLE ARENA</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-display mb-6"
        >
          Level Up Your <br />
          <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00f0ff] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]">
            Gaming Experience
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl font-light mb-10 leading-relaxed"
        >
          The Most Premium Gaming Destination in Hubli. <br className="hidden sm:inline" />
          <span className="text-white/60 text-base sm:text-lg">
            PlayStation 5 Console Stations • 4K 120Hz Displays • Luxury Seating
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
        >
          <button
            onClick={() => {
              audioService.playClickSound();
              onOpenBooking();
            }}
            className="btn-gradient w-full sm:w-auto px-8 py-4 text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Now</span>
          </button>

          <a
            href="#pricing"
            onClick={() => audioService.playHoverSound()}
            className="btn-glass w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <Tag className="w-4 h-4 text-[#00f0ff]" />
            <span>View Pricing</span>
          </a>
        </motion.div>

        {/* Key Arena Features Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-left">
          <div className="glass-card p-4 rounded-2xl border border-white/10">
            <div className="text-[#00f0ff] font-mono text-xs mb-1 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" /> HARDWARE
            </div>
            <div className="text-white font-bold text-base font-display">PlayStation 5</div>
            <div className="text-white/50 text-xs">Latest Gen Consoles</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-white/10">
            <div className="text-emerald-400 font-mono text-xs mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> VISUALS
            </div>
            <div className="text-white font-bold text-base font-display">4K 120Hz Displays</div>
            <div className="text-white/50 text-xs">HDR OLED Gaming</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-white/10">
            <div className="text-amber-400 font-mono text-xs mb-1 flex items-center gap-1">
              <Tv className="w-3.5 h-3.5" /> PRICING
            </div>
            <div className="text-white font-bold text-base font-display">Starts ₹100/hr</div>
            <div className="text-white/50 text-xs">Unbeatable Rates</div>
          </div>
          <div className="glass-card p-4 rounded-2xl border border-white/10">
            <div className="text-cyan-400 font-mono text-xs mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> TIMINGS
            </div>
            <div className="text-white font-bold text-base font-display">9 AM – 11 PM</div>
            <div className="text-white/50 text-xs">Open 7 Days a Week</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#arena"
          className="mt-14 flex flex-col items-center gap-2 text-white/40 hover:text-[#00f0ff] transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL DOWN</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#00f0ff]" />
        </a>
      </div>
    </section>
  );
};

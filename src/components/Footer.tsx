import React from 'react';
import { Gamepad2, Heart, ArrowUp, Phone, MapPin, Sparkles } from 'lucide-react';
import { audioService } from '../services/audioService';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioService.playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#090909] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Ambient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#9d4edd] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#090909] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-[#00f0ff]" />
                </div>
              </div>
              <span className="font-display font-extrabold text-xl tracking-wider text-white">
                BASAVRAJ
              </span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              Hubli's premier PlayStation 5 console arena featuring 4K 120Hz OLED displays, luxury seating, and real-time online booking.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff]">
              <Sparkles className="w-3.5 h-3.5" /> Level Up Your Game Today
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display tracking-wider uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-white/70">
              <li><a href="#hero" className="hover:text-[#00f0ff] transition-colors">Home</a></li>
              <li><a href="#arena" className="hover:text-[#00f0ff] transition-colors">Gaming Arena</a></li>
              <li><a href="#pricing" className="hover:text-[#00f0ff] transition-colors">Hourly Rates</a></li>
              <li><a href="#availability" className="hover:text-[#00f0ff] transition-colors">Live Availability</a></li>
              <li><a href="#gallery" className="hover:text-[#00f0ff] transition-colors">Arena Gallery</a></li>
            </ul>
          </div>

          {/* Business Info */}
          <div className="space-y-3 font-mono text-xs">
            <h4 className="text-sm font-bold text-white font-display tracking-wider uppercase font-sans">
              Arena Information
            </h4>
            <div className="space-y-2 text-white/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" /> Hubli, Karnataka, India
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 9916879803
              </p>
              <p className="text-white/50 pt-1">
                Operating Hours:<br />
                <strong className="text-emerald-400 font-sans">Every Day: 9:00 AM – 11:00 PM</strong>
              </p>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-display tracking-wider uppercase">
              Pricing Overview
            </h4>
            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-white/60">1 Player:</span>
                <span className="text-[#00f0ff] font-bold">₹100/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">2 Players:</span>
                <span className="text-[#00f0ff] font-bold">₹150/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">3 Players:</span>
                <span className="text-[#00f0ff] font-bold">₹250/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">4 Players:</span>
                <span className="text-[#00f0ff] font-bold">₹300/hr</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-mono">
          <p>© {new Date().getFullYear()} Basavraj Gaming Centre. All rights reserved.</p>
          
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for Hubli Gamers</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#00f0ff]/20 hover:text-[#00f0ff] text-white/80 transition-colors border border-white/10 flex items-center gap-1.5"
          >
            <ArrowUp className="w-4 h-4" />
            <span>TOP</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

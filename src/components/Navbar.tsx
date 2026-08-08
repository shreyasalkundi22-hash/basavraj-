import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { audioService } from '../services/audioService';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'GAMES', href: '#games' },
    { name: 'PRICING', href: '#pricing' },
    { name: 'BOOK', href: '#booking-section' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'LEADERBOARD', href: '#leaderboard' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#090909]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: GAMING ADDA */}
        <a
          href="#hero"
          className="flex items-center gap-3 group"
          onClick={() => audioService.playHoverSound()}
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#0077b6] p-0.5 shadow-lg group-hover:shadow-[#00f0ff]/40 transition-all duration-300">
            <div className="w-full h-full bg-[#090909] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-[#00f0ff] group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg md:text-xl tracking-wider text-white group-hover:text-cyan-300 transition-colors uppercase">
              GAMING ADDA
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase -mt-1 flex items-center gap-1.5 font-bold">
              PREMIUM LOUNGE
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-5 py-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => audioService.playHoverSound()}
              className="px-3.5 py-1.5 text-xs font-mono font-bold text-white/80 hover:text-[#00f0ff] rounded-full hover:bg-white/5 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              audioService.playClickSound();
              onOpenBooking();
            }}
            className="btn-blue px-6 py-2.5 text-xs font-mono tracking-wider uppercase flex items-center gap-2 group shadow-lg"
          >
            <Calendar className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>BOOK NOW</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00f0ff]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden glass-panel border-b border-white/10 overflow-hidden mt-3 px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-emerald-400 font-mono font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> OPEN TODAY • 9:00 AM – 11:00 PM
                </span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    audioService.playClickSound();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm font-mono font-bold text-white/90 hover:text-[#00f0ff] hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  audioService.playClickSound();
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-blue mt-2 py-3 text-center text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> BOOK NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

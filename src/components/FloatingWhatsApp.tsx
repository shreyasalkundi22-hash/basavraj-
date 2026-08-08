import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { audioService } from '../services/audioService';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappMessage = encodeURIComponent("Hi Basavraj Gaming Arena, I would like to book a gaming session.");
  const whatsappUrl = `https://wa.me/919916879803?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip on hover */}
      {isHovered && (
        <span className="hidden sm:inline-block glass-panel px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-white shadow-xl border border-emerald-500/40">
          Book a Session
        </span>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => {
          setIsHovered(true);
          audioService.playHoverSound();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => audioService.playClickSound()}
        aria-label="Book a Session on WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 border-2 border-white/20 hover:scale-110 transition-all duration-300 group"
      >
        <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
};

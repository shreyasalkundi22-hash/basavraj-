import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageSquare, Navigation, Sparkles, ShieldCheck } from 'lucide-react';
import { audioService } from '../services/audioService';

export const Contact: React.FC = () => {
  const whatsappMessage = encodeURIComponent("Hi Gaming Adda, I would like to book a gaming session.");
  const whatsappUrl = `https://wa.me/919916879803?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-24 relative bg-[#090909] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>FIND US IN HUBLI</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-extrabold text-white font-display uppercase tracking-tight mb-3"
          >
            READY TO <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00f0ff] bg-clip-text text-transparent">PLAY?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/80 text-lg sm:text-xl font-light"
          >
            Visit Gaming Adda in Hubli.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Details & Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Info Glass Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#0077b6] p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full bg-[#090909] rounded-[14px] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Gaming Adda
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> OPEN TODAY • 9:00 AM – 11:00 PM
                  </span>
                </div>
              </div>

              {/* Detail Items */}
              <div className="space-y-5 font-mono text-sm">
                
                {/* Address Placeholder */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#00f0ff] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase block mb-0.5">Address</span>
                    <span className="text-white font-semibold">Hubli, Karnataka, India</span>
                    <p className="text-white/60 text-xs mt-0.5 font-sans">
                      2 PS5 4K 120Hz OLED Stations Lounge
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase block mb-0.5">Phone Number</span>
                    <a
                      href="tel:+919916879803"
                      onClick={() => audioService.playClickSound()}
                      className="text-white font-bold hover:text-[#00f0ff] transition-colors"
                    >
                      +91 9916879803
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase block mb-0.5">Opening Hours</span>
                    <span className="text-white font-semibold">Every Day: 9:00 AM – 11:00 PM</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons: [ GET DIRECTIONS ], [ CALL NOW ], [ BOOK ON WHATSAPP ] */}
              <div className="pt-4 flex flex-col gap-3 font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://maps.google.com/?q=Hubli,Karnataka"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioService.playClickSound()}
                    className="btn-glass py-3.5 rounded-2xl text-xs uppercase tracking-wider font-bold text-center flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-[#00f0ff]" /> GET DIRECTIONS
                  </a>

                  <a
                    href="tel:+919916879803"
                    onClick={() => audioService.playClickSound()}
                    className="btn-blue py-3.5 text-xs uppercase tracking-wider font-bold text-center flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> CALL NOW
                  </a>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioService.playClickSound()}
                  className="btn-glass py-3.5 rounded-2xl text-xs uppercase tracking-wider font-bold text-center flex items-center justify-center gap-2 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20"
                >
                  <MessageSquare className="w-4 h-4" /> BOOK ON WHATSAPP
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Google Maps Embed Centered on Hubli */}
          <div className="lg:col-span-7 glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[420px]">
            <iframe
              title="Gaming Adda Hubli Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61541.51786524317!2d75.0970364!3d15.3647083!2m3!1f0!2f5!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d72f9b8c0a59%3A0x6b8dd8f85f8c85c2!2sHubballi%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[420px]"
            />
            
            {/* Floating Overlay Badge on Map */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 glass-panel p-4 rounded-2xl border border-white/20 shadow-xl flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#00f0ff]" /> Hubli, Karnataka
                </div>
                <span className="text-[10px] font-mono text-white/60">Gaming Adda</span>
              </div>
              
              <a
                href="https://maps.google.com/?q=Hubli,Karnataka"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioService.playClickSound()}
                className="btn-glass px-4 py-2 rounded-xl text-xs font-mono font-bold text-[#00f0ff] flex items-center gap-1.5 shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" /> Directions
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

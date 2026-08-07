import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, MessageSquare, Navigation, Sparkles, ShieldCheck } from 'lucide-react';
import { audioService } from '../services/audioService';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative bg-[#090909] overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>VISIT OUR ARENA IN HUBLI</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4"
          >
            Contact & <span className="bg-gradient-to-r from-[#00f0ff] via-white to-[#9d4edd] bg-clip-text text-transparent">Arena Location</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Drop by for a gaming session or give us a call for instant station inquiries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Details & Action Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Main Info Glass Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#9d4edd] p-0.5 shadow-lg flex items-center justify-center">
                  <div className="w-full h-full bg-[#090909] rounded-[14px] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Basavraj Gaming Centre
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> OPEN TODAY • 9:00 AM – 11:00 PM
                  </span>
                </div>
              </div>

              {/* Detail Items */}
              <div className="space-y-4 font-mono text-sm">
                
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#00f0ff] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase block">Location</span>
                    <span className="text-white font-semibold">Hubli, Karnataka, India</span>
                    <p className="text-white/60 text-xs mt-0.5 font-sans">
                      Central Hubli Console Gaming Zone
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase block">Phone Number</span>
                    <a
                      href="tel:+919916879803"
                      onClick={() => audioService.playClickSound()}
                      className="text-[#00f0ff] font-bold hover:underline"
                    >
                      +91 9916879803
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-purple-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase block">Opening Hours</span>
                    <span className="text-white font-semibold">Every Day: 9:00 AM – 11:00 PM</span>
                  </div>
                </div>

              </div>

              {/* Direct Action Buttons */}
              <div className="pt-4 grid grid-cols-2 gap-3">
                <a
                  href="tel:+919916879803"
                  onClick={() => audioService.playClickSound()}
                  className="btn-gradient py-3 text-xs uppercase tracking-wider font-bold text-center flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Us Now
                </a>

                <a
                  href="https://wa.me/919916879803?text=Hi%20Basavraj%20Gaming%20Centre!%20I%20want%20to%20query%20about%20PS5%20slot%20availability."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioService.playClickSound()}
                  className="btn-glass py-3 rounded-full text-xs uppercase tracking-wider font-bold text-center flex items-center justify-center gap-2 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Google Maps Embed Centered on Hubli */}
          <div className="lg:col-span-7 glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[400px]">
            <iframe
              title="Basavraj Gaming Centre Hubli Map"
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
                <span className="text-[10px] font-mono text-white/60">Easily Accessible Location</span>
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

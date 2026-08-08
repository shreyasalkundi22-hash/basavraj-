import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles } from 'lucide-react';
import { audioService } from '../services/audioService';

interface GamingPassProps {
  onOpenBooking: () => void;
}

export const GamingPass: React.FC<GamingPassProps> = ({ onOpenBooking }) => {
  const benefits = [
    'Priority station booking lock',
    'Exclusive member hourly discounts',
    'Free entry to monthly tournaments',
    'Special monthly gaming offers & perks',
    'Official Leaderboard participation',
  ];

  return (
    <section className="py-24 relative bg-[#090909] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1 rounded-full border border-red-500/30 text-xs font-mono text-red-400 mb-4"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>VIP MEMBERSHIP CONCEPT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight mb-4"
          >
            BASAVRAJ <span className="bg-gradient-to-r from-white to-[#ff1e42] bg-clip-text text-transparent">GAMING PASS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Level up your gaming frequency with our monthly VIP All-Access Pass.
          </motion.p>
        </div>

        {/* Membership Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-[#ff1e42]/40 relative overflow-hidden shadow-2xl max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#ff1e42] uppercase block mb-1 font-bold">
                VIP ALL-ACCESS MEMBERSHIP
              </span>
              <h3 className="text-2xl font-extrabold text-white font-display">
                BASAVRAJ GAMING PASS
              </h3>
            </div>

            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white font-display">₹999</span>
                <span className="text-white/60 text-xs font-mono">/ month</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Cancel anytime</span>
            </div>
          </div>

          {/* Benefits List */}
          <ul className="py-8 space-y-4 font-sans text-sm text-white/90">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#ff1e42]/20 border border-[#ff1e42]/50 text-[#ff1e42] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* CTA Trigger */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                audioService.playClickSound();
                onOpenBooking();
              }}
              className="btn-red w-full py-4 text-sm font-mono tracking-wider uppercase font-bold flex items-center justify-center gap-2 shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>GET GAMING PASS</span>
            </button>

            <span className="text-[11px] font-mono text-white/40 text-center block">
              Note: Sample membership concept — pricing & benefits customizable upon launch.
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

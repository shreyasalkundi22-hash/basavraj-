import React from 'react';
import { motion } from 'framer-motion';
import { Users, User, Calendar, Check, Sparkles, Flame } from 'lucide-react';
import type { PricingTier } from '../types';
import { audioService } from '../services/audioService';

interface PricingProps {
  onSelectTier: (playerCount: number) => void;
}

const pricingTiers: PricingTier[] = [
  {
    id: '1-player',
    players: '1 Player',
    playerCount: 1,
    price: 100,
    period: 'per hour',
    features: [
      'Dedicated PS5 Console Station',
      '55" 4K OLED HDR 120Hz TV',
      '1 DualSense Wireless Controller',
      'Pro Secretlab Recliner',
      'Air Conditioned Comfort',
      'All Top AAA Games Access',
    ],
    gradient: 'from-[#ff1e42] to-[#cc0020]',
  },
  {
    id: '2-players',
    players: '2 Players',
    playerCount: 2,
    price: 150,
    period: 'per hour',
    popular: true,
    features: [
      'Dual Multiplayer Console Setup',
      '55" 4K 120Hz Split Screen Display',
      '2 DualSense Wireless Controllers',
      'Co-op & Versus Tournament Games',
      'Pro Ergonomic Gaming Chairs',
      'AC Lounge & High Speed Wi-Fi',
    ],
    gradient: 'from-[#ff1e42] to-[#cc0020]',
  },
  {
    id: '3-players',
    players: '3 Players',
    playerCount: 3,
    price: 250,
    period: 'per hour',
    features: [
      'Triple Player Party Station',
      '55" Ultra HD HDR Big Screen',
      '3 DualSense Wireless Controllers',
      'FIFA, EA FC, WWE & Co-op Titles',
      'Spacious Seating Arrangement',
      'Custom Atmosphere Lounge',
    ],
    gradient: 'from-[#ff1e42] to-[#cc0020]',
  },
  {
    id: '4-players',
    players: '4 Players',
    playerCount: 4,
    price: 300,
    period: 'per hour',
    features: [
      'Full Squad Arena Station',
      '55" 4K 120Hz Display',
      '4 DualSense Wireless Controllers',
      'Squad Battle Royale & Sports Games',
      'VIP Couch Seating Zone',
      'Complimentary Ambient Audio Headsets',
    ],
    gradient: 'from-[#ff1e42] to-[#cc0020]',
  },
];

export const Pricing: React.FC<PricingProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-24 relative bg-[#090909] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1 rounded-full border border-red-500/30 text-xs font-mono text-red-400 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT HOURLY PRICING</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight mb-2"
          >
            STARTS AT <span className="bg-gradient-to-r from-white to-[#ff1e42] bg-clip-text text-transparent">₹100 / HOUR</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Gaming for everyone. Premium experience.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => audioService.playHoverSound()}
              className={`glass-card rounded-3xl p-6 relative flex flex-col justify-between border ${
                tier.popular
                  ? 'border-[#ff1e42] shadow-2xl shadow-red-950/40 bg-gradient-to-b from-white/[0.08] to-white/[0.02]'
                  : 'border-white/10 hover:border-[#ff1e42]/40'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 glass-panel px-4 py-1 rounded-full border border-[#ff1e42] bg-[#ff1e42]/20 text-[#ff1e42] text-[10px] font-mono font-extrabold tracking-widest uppercase flex items-center gap-1 shadow-lg">
                  <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                  MOST POPULAR SQUAD
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono tracking-widest text-[#ff1e42] uppercase flex items-center gap-1.5 font-bold">
                    {tier.playerCount === 1 ? <User className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                    {tier.players}
                  </span>
                </div>

                {/* Price & Book Now Row */}
                <div className="flex items-center justify-between gap-2 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                        ₹{tier.price}
                      </span>
                      <span className="text-white/60 text-xs font-mono">/hr</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">₹{Math.round(tier.price / tier.playerCount)} / player</span>
                  </div>

                  {/* Book Now Button */}
                  <button
                    onClick={() => {
                      audioService.playClickSound();
                      onSelectTier(tier.playerCount);
                    }}
                    className="btn-red px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg group shrink-0"
                  >
                    <Calendar className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                    <span>BOOK NOW</span>
                  </button>
                </div>

                {/* Features list */}
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="text-xs text-white/80 flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#ff1e42]/20 text-[#ff1e42] flex items-center justify-center shrink-0 mt-0.5 border border-[#ff1e42]/40">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Quick Trigger */}
              <button
                onClick={() => {
                  audioService.playClickSound();
                  onSelectTier(tier.playerCount);
                }}
                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#ff1e42] hover:border-[#ff1e42] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>SELECT {tier.players.toUpperCase()}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

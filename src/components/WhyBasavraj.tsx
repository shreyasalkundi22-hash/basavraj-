import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Trophy, Tag, Sparkles } from 'lucide-react';
import { audioService } from '../services/audioService';

export const WhyBasavraj: React.FC = () => {
  const features = [
    {
      icon: Gamepad2,
      title: 'PREMIUM GAMING',
      description: 'High-quality gaming experience on raw PS5 hardware, DualSense Edge controllers, and 4K OLED displays.',
      tag: '4K OLED • PS5',
    },
    {
      icon: Zap,
      title: 'HIGH PERFORMANCE',
      description: 'Smooth and immersive gameplay with 120 FPS high refresh rate, ultra-fast SSDs, and gigabit fiber latency.',
      tag: '120 FPS • 1 Gbps',
    },
    {
      icon: Trophy,
      title: 'COMPETITIVE GAMING',
      description: 'Challenge your friends, participate in weekend tournaments, and climb the Basavraj Leaderboard.',
      tag: 'LEADERBOARD',
    },
    {
      icon: Tag,
      title: '₹100 / HOUR',
      description: 'Affordable premium gaming. Unbeatable hourly rates with zero hidden charges or setup fees.',
      tag: 'UNBEATABLE VALUE',
    },
  ];

  return (
    <section className="py-24 relative bg-[#090909] overflow-hidden">
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
            <span>THE GAMING ADDA ADVANTAGE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight mb-4"
          >
            WHY <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00f0ff] bg-clip-text text-transparent">GAMING ADDA</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Engineered from the ground up for gamers who demand top-tier hardware, ultra-fast servers, and luxury comfort.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => audioService.playHoverSound()}
                className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-white/10 hover:border-[#00f0ff]/40 transition-all duration-300 group"
              >
                <div>
                  {/* Icon Emblem */}
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00f0ff]/40 group-hover:bg-[#00f0ff]/10 transition-all">
                    <Icon className="w-7 h-7 text-[#00f0ff] group-hover:scale-110 transition-transform" />
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#00f0ff] uppercase block mb-1">
                    {item.tag}
                  </span>

                  <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-xs leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

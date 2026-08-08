import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Tv, Armchair, Wind, Wifi, Disc, Sparkles, Volume2 } from 'lucide-react';
import type { ArenaFeature } from '../types';
import { audioService } from '../services/audioService';

const arenaFeatures: ArenaFeature[] = [
  {
    id: 'ps5',
    title: 'PlayStation 5',
    subtitle: 'Next-Gen Power',
    iconName: 'Gamepad2',
    description: 'Experience true 4K gaming, ultra-fast SSD load times, and ray tracing graphics on raw PS5 hardware.',
    specs: ['Ultra High-Speed SSD', 'Custom AMD Zen 2 CPU', 'Ray Tracing Tech'],
    badge: 'FLAGSHIP',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'displays',
    title: 'Ultra HD Displays',
    subtitle: '120Hz OLED Clarity',
    iconName: 'Tv',
    description: 'Massive 4K Ultra HD screens featuring 120Hz high refresh rate and HDR10+ for buttery-smooth visual fidelity.',
    specs: ['55" 4K OLED Screens', '120 FPS High Refresh', 'Auto Low Latency'],
    badge: '120Hz HDR',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'seating',
    title: 'Comfortable Seating',
    subtitle: 'Pro Gaming Chairs',
    iconName: 'Armchair',
    description: 'Ergonomic pro-gaming recliners with memory foam lumbar support engineered for endless multi-hour gaming sessions.',
    specs: ['Multi-Tilt Lock', 'Memory Foam Cushions', 'Breathable Leatherette'],
    badge: 'ERGONOMIC',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ac',
    title: 'Air Conditioned',
    subtitle: 'Climate Controlled Zone',
    iconName: 'Wind',
    description: 'Chill out in a perfectly maintained 21°C dual-zone climate-controlled lounge, regardless of Hubli weather outside.',
    specs: ['Dual-Zone Cooling', 'HEPA Air Purifiers', 'Constant 21°C Ambiance'],
    badge: 'CHILLED',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'internet',
    title: 'Fast Internet',
    subtitle: 'Gigabit Fiber Optic',
    iconName: 'Wifi',
    description: 'Ultra-low ping multiplayer matchmaking with 1 Gbps dedicated symmetrical fiber internet link.',
    specs: ['1 Gbps Fiber Link', '<5ms Latency Servers', 'Zero Packet Loss'],
    badge: 'GIGABIT',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'controllers',
    title: 'Premium Controllers',
    subtitle: 'DualSense Wireless',
    iconName: 'Disc',
    description: 'DualSense controllers featuring immersive haptic feedback and dynamic adaptive triggers for total game immersion.',
    specs: ['Adaptive Triggers', 'Haptic Touch Feedback', 'Precision Thumbsticks'],
    badge: 'HAPTICS',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'squad-zone',
    title: 'Squad Battle Stations',
    subtitle: 'Co-op & Tournament Zone',
    iconName: 'Sparkles',
    description: 'Spacious 4-player multiplayer lounge setups for EA FC, FIFA, Tekken, and Mortal Kombat head-to-head battles.',
    specs: ['Quad Controller Setup', 'Wide Angle Viewing', 'Split-Screen Optimised'],
    badge: 'MULTIPLAYER',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'audio',
    title: 'Immersive Audio',
    subtitle: 'Dolby Atmos 3D',
    iconName: 'Volume2',
    description: 'High-definition 3D spatial surround sound headsets and soundbars so you hear every footstep and gunshot clearly.',
    specs: ['3D Spatial Sound', 'Active Noise Isolation', 'Crystal Microphones'],
    badge: 'DOLBY 3D',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  },
];

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-[#00f0ff]" />;
    case 'Tv': return <Tv className="w-6 h-6 text-purple-400" />;
    case 'Armchair': return <Armchair className="w-6 h-6 text-cyan-400" />;
    case 'Wind': return <Wind className="w-6 h-6 text-blue-400" />;
    case 'Wifi': return <Wifi className="w-6 h-6 text-emerald-400" />;
    case 'Disc': return <Disc className="w-6 h-6 text-[#00f0ff]" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#00f0ff]" />;
    case 'Volume2': return <Volume2 className="w-6 h-6 text-[#9d4edd]" />;
    default: return <Gamepad2 className="w-6 h-6 text-[#00f0ff]" />;
  }
};

export const GamingArena: React.FC = () => {
  return (
    <section id="arena" className="py-24 relative bg-[#090909] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-white/15 text-xs font-mono text-cyan-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>PREMIUM GAMING INFRASTRUCTURE</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4"
          >
            The Ultimate <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00f0ff] bg-clip-text text-transparent">Gaming Arena</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Every station at Basavraj Gaming Centre is meticulously built for maximum performance, ultra low latency, and deep gaming immersion.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {arenaFeatures.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onMouseEnter={() => audioService.playHoverSound()}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-white/10 hover:border-[#00f0ff]/40 transition-all duration-300"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter saturate-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/50 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-3 right-3 glass-panel px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-[#00f0ff] border border-[#00f0ff]/30">
                    {feature.badge}
                  </span>

                  {/* Icon floating */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl glass-panel flex items-center justify-center border border-white/20 shadow-lg">
                    {renderIcon(feature.iconName)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[11px] font-mono tracking-widest text-[#00f0ff] uppercase">
                    {feature.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white font-display mt-0.5 mb-2 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Specs List Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-white/[0.02]">
                <ul className="space-y-1.5">
                  {feature.specs.map((spec: string, i: number) => (
                    <li key={i} className="text-[11px] text-white/70 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

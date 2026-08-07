import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Sparkles, ChevronLeft, ChevronRight, Gamepad2, Tv, Armchair, ShieldCheck, MapPin } from 'lucide-react';
import type { GalleryItem } from '../types';
import { audioService } from '../services/audioService';

const gamingCentrePictures: GalleryItem[] = [
  {
    id: 'g1',
    title: 'PS5 Flagship Gaming Station',
    category: 'ps5',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1400&q=85',
    description: 'Custom Sony PlayStation 5 station with ultra-fast NVMe SSD storage and Ray Tracing performance in Hubli.',
    resolution: 'PS5 4K HDR • Station 01',
  },
  {
    id: 'g2',
    title: '55" 4K OLED 120Hz Displays',
    category: 'setup',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=85',
    description: 'High refresh rate 120 FPS OLED screens offering ultra-low input lag and vivid contrast for EA FC & Call of Duty.',
    resolution: '120Hz OLED • Station 02',
  },
  {
    id: 'g3',
    title: 'DualSense Wireless Controllers',
    category: 'controllers',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1400&q=85',
    description: 'Original Sony DualSense controllers equipped with adaptive triggers and micro-haptic feedback.',
    resolution: 'Adaptive Triggers',
  },
  {
    id: 'g4',
    title: '4-Player Squad Battle Zone',
    category: 'setup',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=85',
    description: 'Co-op lounge seating setup tailored for 4-player FIFA tournaments, WWE 2K, and Mortal Kombat head-to-head matches.',
    resolution: 'Squad Lounge • Station 04',
  },
  {
    id: 'g5',
    title: 'Pro Secretlab Memory Foam Chairs',
    category: 'chairs',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1400&q=85',
    description: 'Ergonomic gaming chairs with multi-tilt recliners and breathable leatherette designed for multi-hour marathons.',
    resolution: 'Ergonomic Recliners',
  },
  {
    id: 'g6',
    title: 'Dolby Atmos Spatial Audio Booth',
    category: 'controllers',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=85',
    description: 'Noise-isolating gaming headsets providing 3D spatial surround sound for footsteps and in-game communication.',
    resolution: 'Dolby Atmos 3D',
  },
  {
    id: 'g7',
    title: 'Chilled Air-Conditioned Gaming Lounge',
    category: 'ambience',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=85',
    description: 'Climate-controlled 21°C lounge interior ensuring maximum comfort for all gamers during hot Hubli afternoons.',
    resolution: 'Climate Controlled 21°C',
  },
  {
    id: 'g8',
    title: 'Gigabit Fiber Multiplayer Server Network',
    category: 'setup',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=85',
    description: 'Dedicated 1 Gbps symmetric fiber connection delivering under 5ms ping to EA FC & PlayStation Network servers.',
    resolution: '1 Gbps Low Ping Fiber',
  },
  {
    id: 'g9',
    title: 'High-Fidelity Console Gaming Zone',
    category: 'ps5',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1400&q=85',
    description: 'Clean luxury console setups designed for single player immersion in God of War, Spider-Man 2, and GTA V.',
    resolution: 'Solo Immersion Pod',
  },
];

export const Gallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const filteredItems = selectedFilter === 'all'
    ? gamingCentrePictures
    : gamingCentrePictures.filter(item => item.category === selectedFilter);

  const handlePrevLightbox = () => {
    if (activeItemIndex === null) return;
    audioService.playClickSound();
    setActiveItemIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNextLightbox = () => {
    if (activeItemIndex === null) return;
    audioService.playClickSound();
    setActiveItemIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  return (
    <section id="gallery" className="py-24 relative bg-[#090909] overflow-hidden">
      {/* Background Radial Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-white/15 text-xs font-mono text-cyan-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>REAL GAMING CENTRE PICTURES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4"
          >
            Inside <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00f0ff] bg-clip-text text-transparent">Basavraj Gaming Centre</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Explore real pictures of our PS5 stations, 4K OLED screens, pro gaming chairs, and luxury lounge in Hubli, Karnataka.
          </motion.p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Pictures', icon: Gamepad2 },
            { id: 'ps5', label: 'PS5 Stations', icon: Gamepad2 },
            { id: 'setup', label: 'Displays & Setups', icon: Tv },
            { id: 'chairs', label: 'Pro Seating', icon: Armchair },
            { id: 'controllers', label: 'Controllers & Gear', icon: Gamepad2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioService.playClickSound();
                setSelectedFilter(tab.id);
                setActiveItemIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-medium transition-all border flex items-center gap-2 ${
                selectedFilter === tab.id
                  ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-white font-bold shadow-lg shadow-[#00f0ff]/20'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Picture Gallery Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => audioService.playHoverSound()}
                onClick={() => {
                  audioService.playClickSound();
                  setActiveItemIndex(idx);
                }}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer group relative h-80 border border-white/10"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter saturate-125"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

                {/* Top Badge */}
                <span className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-[10px] font-mono text-[#00f0ff] border border-[#00f0ff]/30 shadow-md">
                  {item.resolution}
                </span>

                {/* Bottom Caption Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-white/10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-xs line-clamp-1 mt-0.5 font-sans">
                        {item.description}
                      </p>
                    </div>
                    <div className="p-2 rounded-xl bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/40 shrink-0 ml-3">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full border border-white/10 text-xs font-mono text-white/70">
            <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>Visit Basavraj Gaming Centre in Hubli to experience our stations in person</span>
          </div>
        </div>

      </div>

      {/* Fullscreen Picture Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItemIndex(null)}
              className="fixed inset-0 bg-[#090909]/95 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-5xl w-full glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItemIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#090909]/80 border border-white/20 text-white hover:text-[#00f0ff] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Main Picture Viewport */}
              <div className="relative h-[65vh] sm:h-[75vh] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />

                {/* Lightbox Navigation Arrows */}
                <button
                  onClick={handlePrevLightbox}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#090909]/80 border border-white/20 text-white hover:text-[#00f0ff] transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextLightbox}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#090909]/80 border border-white/20 text-white hover:text-[#00f0ff] transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Picture Counter */}
                <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full text-xs font-mono text-white/80 border border-white/10">
                  {activeItemIndex! + 1} / {filteredItems.length}
                </div>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="p-6 glass-panel border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-wider">
                    {activeItem.resolution}
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    {activeItem.title}
                  </h3>
                  <p className="text-white/70 text-xs mt-1 font-sans">
                    {activeItem.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Basavraj Gaming Centre • Hubli
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

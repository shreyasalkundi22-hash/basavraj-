import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { ReviewItem } from '../types';
import { audioService } from '../services/audioService';

const reviewsData: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Praveen Kulkarni',
    handle: '@praveen_gamer_hubli',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Amazing setup and a really fun gaming experience! The 4K 120Hz OLED displays run EA FC 25 at buttery smooth frame rates.',
    favoriteGame: 'EA FC 25 / FIFA',
    date: '2 days ago',
  },
  {
    id: 'r2',
    name: 'Abhishek Patil',
    handle: '@abhi_squad_leader',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Great place to spend time with friends. We booked the 4-player squad station for a weekend Tekken tournament. Zero lag!',
    favoriteGame: 'Call of Duty & Tekken 8',
    date: '1 week ago',
  },
  {
    id: 'r3',
    name: 'Vikram Joshi',
    handle: '@vikram_hubli_pro',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Clean setup and smooth gaming experience. The online station status and WhatsApp booking make it so convenient.',
    favoriteGame: 'God of War Ragnarök',
    date: '3 days ago',
  },
  {
    id: 'r4',
    name: 'Kavya Hegde',
    handle: '@kavya_gameon',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'A true high-end esports lounge in Hubli! The Secretlab chairs and Dolby 3D spatial headsets make multi-hour gaming feel effortless.',
    favoriteGame: 'Spider-Man 2',
    date: '5 days ago',
  },
];

export const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    audioService.playClickSound();
    setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const handleNext = () => {
    audioService.playClickSound();
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const current = reviewsData[currentIndex];

  return (
    <section id="reviews" className="py-24 relative bg-[#090909] overflow-hidden border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLAYER REVIEWS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight mb-4"
          >
            GAMER <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00f0ff] bg-clip-text text-transparent">FEEDBACK</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            See what Hubli players have to say about their experience at Gaming Adda.
          </motion.p>
        </div>

        {/* Testimonial Glass Card Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl relative overflow-hidden"
            >
              {/* Quote Watermark Icon */}
              <Quote className="absolute top-6 right-8 w-24 h-24 text-white/5 pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                {/* Gamer Profile */}
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#00f0ff] shadow-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white font-display">
                        {current.name}
                      </h3>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                    </div>
                    <span className="text-xs font-mono text-[#00f0ff]">{current.handle}</span>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1.5 glass-panel px-4 py-2 rounded-full border border-amber-400/30">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs font-mono text-amber-300 font-bold ml-1">5.0</span>
                </div>
              </div>

              {/* Comment Body */}
              <p className="text-white/90 text-base sm:text-xl font-light leading-relaxed mb-8 italic font-sans">
                "{current.comment}"
              </p>

              {/* Footer Specs */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-mono">
                <span className="text-white/60">
                  Favorite Title: <strong className="text-[#00f0ff]">{current.favoriteGame}</strong>
                </span>
                <span className="text-white/40">{current.date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Arrow Controls */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviewsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    audioService.playClickSound();
                    setCurrentIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-[#00f0ff]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

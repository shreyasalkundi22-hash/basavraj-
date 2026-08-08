import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, ArrowRight, Sparkles } from 'lucide-react';
import type { GameItem } from '../types';
import { audioService } from '../services/audioService';

interface ChooseYourBattleProps {
  onPlayGame: (gameTitle: string) => void;
}

const gamesList: GameItem[] = [
  {
    id: 'ea-fc',
    title: 'EA Sports FC 25',
    genre: 'Sports / Football',
    players: '1 - 4 Players',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    badge: 'MOST POPULAR',
  },
  {
    id: 'gta-v',
    title: 'Grand Theft Auto V',
    genre: 'Action / Open World',
    players: 'Single & Online',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    badge: '4K 120 FPS',
  },
  {
    id: 'cod',
    title: 'Call of Duty: MW III',
    genre: 'First-Person Shooter',
    players: '1 - 4 Multiplayer',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    badge: 'ESPORTS TITLES',
  },
  {
    id: 'mk1',
    title: 'Mortal Kombat 1',
    genre: 'Fighting / Action',
    players: '1 v 1 Versus',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    badge: 'TOURNAMENT',
  },
  {
    id: 'wwe',
    title: 'WWE 2K24',
    genre: 'Sports / Wrestling',
    players: '1 - 4 Players',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    badge: 'CO-OP FAVORITE',
  },
  {
    id: 'rocket-league',
    title: 'Rocket League',
    genre: 'Esports / Action Sports',
    players: '1 - 4 Squad',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
    badge: 'RANKED ARENA',
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    genre: 'Sandbox / Adventure',
    players: 'Multiplayer Co-op',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    badge: 'CREATIVE ZONE',
  },
];

export const ChooseYourBattle: React.FC<ChooseYourBattleProps> = ({ onPlayGame }) => {
  return (
    <section id="games" className="py-24 relative bg-[#090909] overflow-hidden">
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
            <span>PLAYSTATION 5 LIBRARY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight mb-4"
          >
            CHOOSE YOUR <span className="bg-gradient-to-r from-white to-[#ff1e42] bg-clip-text text-transparent">BATTLE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Play top esports and console titles loaded on all PS5 4K 120Hz stations.
          </motion.p>
        </div>

        {/* Games Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gamesList.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onMouseEnter={() => audioService.playHoverSound()}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-white/10 hover:border-[#ff1e42]/50 transition-all duration-300"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter saturate-125 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/40 to-transparent" />
                  
                  {/* Badge */}
                  {game.badge && (
                    <span className="absolute top-3 right-3 glass-panel px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider text-[#ff1e42] border border-[#ff1e42]/30">
                      {game.badge}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/70 flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-[#ff1e42]" />
                    {game.players}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[11px] font-mono tracking-widest text-[#ff1e42] uppercase block mb-1">
                    {game.genre}
                  </span>
                  <h3 className="text-xl font-bold text-white font-display group-hover:text-red-400 transition-colors">
                    {game.title}
                  </h3>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => {
                    audioService.playClickSound();
                    onPlayGame(game.title);
                  }}
                  className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#ff1e42] hover:border-[#ff1e42] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>PLAY NOW</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

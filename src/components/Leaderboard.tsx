import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Flame, Sparkles } from 'lucide-react';
import type { LeaderboardEntry } from '../types';
import { audioService } from '../services/audioService';

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    player: 'Abhishek "Apex" Patil',
    handle: '@apex_abhi',
    wins: 142,
    points: 2850,
    favoriteGame: 'EA FC 25',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 2,
    player: 'Praveen Kulkarni',
    handle: '@praveen_hubli',
    wins: 118,
    points: 2360,
    favoriteGame: 'Tekken 8',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 3,
    player: 'Vikram Joshi',
    handle: '@vikram_v2',
    wins: 96,
    points: 1920,
    favoriteGame: 'Call of Duty',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 4,
    player: 'Kavya Hegde',
    handle: '@kavya_slayer',
    wins: 84,
    points: 1680,
    favoriteGame: 'Mortal Kombat 1',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 5,
    player: 'Rohan Deshpande',
    handle: '@rohan_desh',
    wins: 72,
    points: 1440,
    favoriteGame: 'WWE 2K24',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
];

interface LeaderboardProps {
  onOpenBooking: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onOpenBooking }) => {
  return (
    <section id="leaderboard" className="py-24 relative bg-[#090909] border-t border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1 rounded-full border border-amber-500/30 text-xs font-mono text-amber-300 mb-4"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>HUBLI ARENA RANKINGS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight mb-4"
          >
            BASAVRAJ <span className="bg-gradient-to-r from-amber-300 via-white to-[#00f0ff] bg-clip-text text-transparent">LEADERBOARD</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Compete in weekly console tournaments and rank among Hubli's top players.
          </motion.p>
        </div>

        {/* Leaderboard Table Container */}
        <div className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-xs font-mono text-white/50 uppercase">
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Player</th>
                  <th className="py-4 px-6">Favorite Title</th>
                  <th className="py-4 px-6 text-right">Wins</th>
                  <th className="py-4 px-6 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-mono">
                {leaderboardData.map((row) => {
                  let rankBadge = <span className="text-white/60 font-bold">#{row.rank}</span>;
                  if (row.rank === 1) rankBadge = <Crown className="w-5 h-5 text-amber-400 fill-amber-400 inline" />;
                  if (row.rank === 2) rankBadge = <Crown className="w-5 h-5 text-slate-300 fill-slate-300 inline" />;
                  if (row.rank === 3) rankBadge = <Crown className="w-5 h-5 text-amber-700 fill-amber-700 inline" />;

                  return (
                    <motion.tr
                      key={row.rank}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                      onMouseEnter={() => audioService.playHoverSound()}
                      className="transition-colors"
                    >
                      <td className="py-4 px-6 font-extrabold text-base">
                        {rankBadge}
                      </td>
                      <td className="py-4 px-6 font-sans font-bold text-white flex items-center gap-3">
                        <img
                          src={row.avatar}
                          alt={row.player}
                          className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
                        />
                        <div>
                          <div className="text-white">{row.player}</div>
                          <div className="text-xs font-mono text-[#00f0ff]">{row.handle}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-white/70 text-xs">
                        {row.favoriteGame}
                      </td>
                      <td className="py-4 px-6 text-right text-emerald-400 font-bold">
                        {row.wins} W
                      </td>
                      <td className="py-4 px-6 text-right text-[#00f0ff] font-extrabold text-base font-display">
                        {row.points.toLocaleString()} PTS
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* CTA Footer Row */}
          <div className="p-6 bg-white/[0.02] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-mono text-white/80">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Think you can take the #1 spot?</span>
            </div>

            <button
              onClick={() => {
                audioService.playClickSound();
                onOpenBooking();
              }}
              className="btn-blue px-6 py-2.5 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>JOIN TOURNAMENT</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

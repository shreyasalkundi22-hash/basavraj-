import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, Clock, Play } from 'lucide-react';
import type { GamingStation } from '../types';
import { audioService } from '../services/audioService';

interface LiveStationStatusProps {
  onSelectStation: (stationId: string) => void;
}

const initialStations: GamingStation[] = [
  { id: 'st-1', name: 'STATION 01', status: 'available', specs: 'PS5 • 55" 4K 120Hz OLED Display' },
  { id: 'st-2', name: 'STATION 02', status: 'available', specs: 'PS5 • 55" 4K 120Hz OLED Display' },
];

export const LiveStationStatus: React.FC<LiveStationStatusProps> = ({ onSelectStation }) => {
  const [stations] = useState<GamingStation[]>(initialStations);

  return (
    <section id="live-status" className="py-20 relative bg-[#090909] border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 glass-panel px-4 py-1 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REAL-TIME ARENA TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
              LIVE STATION STATUS (2 PS5 SCREENS)
            </h2>
          </div>

          {/* Small Status Line */}
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <Clock className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>Updated just now</span>
          </div>
        </div>

        {/* Stations Grid: Exactly 2 Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {stations.map((station, idx) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onMouseEnter={() => audioService.playHoverSound()}
              className={`glass-card rounded-3xl p-8 border flex flex-col justify-between transition-all ${
                station.status === 'available'
                  ? 'border-emerald-500/30 hover:border-emerald-400'
                  : 'border-white/10 opacity-75'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-base font-mono font-extrabold text-white tracking-wider flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-[#00f0ff]" />
                    {station.name}
                  </span>

                  {/* Status Pill */}
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold tracking-widest uppercase flex items-center gap-1.5 border ${
                      station.status === 'available'
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                        : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        station.status === 'available' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    {station.status === 'available' ? 'AVAILABLE' : 'OCCUPIED'}
                  </span>
                </div>

                <p className="text-xs font-mono text-white/70 mb-6">
                  {station.specs}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-white/50">
                  {station.status === 'available' ? 'Ready for instant booking' : `In session: ${station.currentTitle || 'Playing'}`}
                </span>

                {station.status === 'available' && (
                  <button
                    onClick={() => {
                      audioService.playClickSound();
                      onSelectStation(station.id);
                    }}
                    className="btn-blue px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>CLAIM SCREEN</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

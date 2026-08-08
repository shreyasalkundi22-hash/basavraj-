import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, Clock, Play } from 'lucide-react';
import type { GamingStation } from '../types';
import { audioService } from '../services/audioService';

interface LiveStationStatusProps {
  onSelectStation: (stationId: string) => void;
}

const initialStations: GamingStation[] = [
  { id: 'st-1', name: 'STATION 01', status: 'available', specs: 'PS5 • 55" 4K 120Hz OLED' },
  { id: 'st-2', name: 'STATION 02', status: 'available', specs: 'PS5 • 55" 4K 120Hz OLED' },
  { id: 'st-3', name: 'STATION 03', status: 'available', specs: 'PS5 • 55" 4K 120Hz OLED' },
  { id: 'st-4', name: 'STATION 04', status: 'occupied', specs: 'PS5 Squad Lounge • EA FC 25', currentTitle: 'EA FC 25' },
  { id: 'st-5', name: 'STATION 05', status: 'available', specs: 'PS5 • 55" 4K 120Hz OLED' },
  { id: 'st-6', name: 'STATION 06', status: 'available', specs: 'PS5 Pro • 55" 4K 120Hz OLED' },
];

export const LiveStationStatus: React.FC<LiveStationStatusProps> = ({ onSelectStation }) => {
  const [stations] = useState<GamingStation[]>(initialStations);

  return (
    <section id="live-status" className="py-20 relative bg-[#090909] border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 glass-panel px-4 py-1 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REAL-TIME ARENA TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
              LIVE STATION STATUS
            </h2>
          </div>

          {/* Small Status Line */}
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <Clock className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>Updated just now</span>
          </div>
        </div>

        {/* Stations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station, idx) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onMouseEnter={() => audioService.playHoverSound()}
              className={`glass-card rounded-3xl p-6 border flex flex-col justify-between transition-all ${
                station.status === 'available'
                  ? 'border-emerald-500/30 hover:border-emerald-400'
                  : 'border-white/10 opacity-75'
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-mono font-extrabold text-white tracking-wider flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-[#00f0ff]" />
                    {station.name}
                  </span>

                  {/* Status Pill */}
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-extrabold tracking-widest uppercase flex items-center gap-1.5 border ${
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

                <p className="text-xs font-mono text-white/60 mb-6">
                  {station.specs}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/40">
                  {station.status === 'available' ? 'Ready for booking' : `In session: ${station.currentTitle || 'Playing'}`}
                </span>

                {station.status === 'available' && (
                  <button
                    onClick={() => {
                      audioService.playClickSound();
                      onSelectStation(station.id);
                    }}
                    className="btn-red px-3.5 py-1.5 text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 shadow-md"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>CLAIM</span>
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

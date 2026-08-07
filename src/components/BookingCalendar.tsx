import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { getSlotsForDate, getDayAvailabilityStatus } from '../services/bookingService';
import type { HourlySlot } from '../types';
import { audioService } from '../services/audioService';

interface BookingCalendarProps {
  onSelectSlot: (date: string, slot: HourlySlot) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onSelectSlot }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [slots, setSlots] = useState<HourlySlot[]>([]);
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, 'available' | 'limited' | 'full'>>({});

  // Refresh slots for selected date
  const refreshSlots = (dateStr: string) => {
    const data = getSlotsForDate(dateStr);
    setSlots(data);
  };

  // Listen for real-time booking updates
  useEffect(() => {
    refreshSlots(selectedDateStr);

    const handleUpdate = () => {
      refreshSlots(selectedDateStr);
    };

    window.addEventListener('bgc-booking-updated', handleUpdate);
    return () => window.removeEventListener('bgc-booking-updated', handleUpdate);
  }, [selectedDateStr]);

  // Calendar month navigation
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    audioService.playClickSound();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    audioService.playClickSound();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // Populate availability status for visible calendar days
  useEffect(() => {
    const map: Record<string, 'available' | 'limited' | 'full'> = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      // Format YYYY-MM-DD
      const dateStr = d.toISOString().split('T')[0];
      map[dateStr] = getDayAvailabilityStatus(dateStr);
    }
    setAvailabilityMap(map);
  }, [year, month, daysInMonth]);

  return (
    <section id="availability" className="py-24 relative bg-[#090909] overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>LIVE OPERATIONAL AVAILABILITY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4"
          >
            Live Availability <span className="bg-gradient-to-r from-white via-emerald-300 to-[#00f0ff] bg-clip-text text-transparent">Calendar</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Apple iOS 26 Liquid Glass live calendar. Select a date to inspect hourly station slots from 9:00 AM to 11:00 PM.
          </motion.p>
        </div>

        {/* Calendar Grid & Hourly Slots Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: iOS Liquid Calendar App Card */}
          <div className="lg:col-span-5 glass-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl">
            
            {/* Month Header Controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {monthNames[month]} {year}
                  </h3>
                  <span className="text-[11px] font-mono text-white/50">9 AM – 11 PM Active Slots</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Status Legend */}
            <div className="flex items-center justify-around text-[11px] font-mono mb-6 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                <span className="text-white/70">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                <span className="text-white/70">Filling Fast</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500" />
                <span className="text-white/70">Fully Booked</span>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs text-white/40 mb-2">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            {/* Calendar Days Matrix */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {/* Empty leading padding cells */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 rounded-xl bg-transparent" />
              ))}

              {/* Days of Month */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const d = new Date(year, month, dayNum);
                const dateStr = d.toISOString().split('T')[0];
                const isSelected = dateStr === selectedDateStr;
                const isToday = dateStr === todayStr;
                const status = availabilityMap[dateStr] || 'available';

                const isPast = d < new Date(new Date().setHours(0, 0, 0, 0));

                let statusDotColor = 'bg-emerald-400';
                if (status === 'limited') statusDotColor = 'bg-amber-400';
                if (status === 'full') statusDotColor = 'bg-rose-500';

                return (
                  <button
                    key={dateStr}
                    disabled={isPast}
                    onClick={() => {
                      audioService.playClickSound();
                      setSelectedDateStr(dateStr);
                    }}
                    className={`h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 ${
                      isPast
                        ? 'opacity-25 cursor-not-allowed'
                        : isSelected
                        ? 'bg-gradient-to-br from-[#00f0ff] to-[#0077b6] text-white font-extrabold shadow-lg shadow-[#00f0ff]/30 scale-105 border border-white/40'
                        : isToday
                        ? 'bg-white/10 text-white font-bold border border-[#00f0ff]/60 hover:bg-white/20'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/5'
                    }`}
                  >
                    <span className="text-xs">{dayNum}</span>
                    {!isPast && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                          isSelected ? 'bg-white' : statusDotColor
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Hourly Slot Selector */}
          <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-0.5">
                    <Clock className="w-4 h-4" /> Hourly Slots
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </h3>
                </div>
                <div className="glass-panel px-3 py-1 rounded-full text-xs font-mono text-white/70 border border-white/10">
                  {slots.filter(s => !s.isBooked).length} Free Slots Available
                </div>
              </div>

              {/* Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {slots.map((slot) => (
                    <motion.div
                      key={slot.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                        slot.isBooked
                          ? 'bg-rose-950/20 border-rose-500/30 text-white/40'
                          : 'bg-white/5 border-white/10 hover:border-[#00f0ff]/50 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {slot.isBooked ? (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        <div>
                          <div className={`text-xs font-mono font-bold ${slot.isBooked ? 'text-white/40 line-through' : 'text-white'}`}>
                            {slot.label}
                          </div>
                          <span className={`text-[10px] font-mono ${slot.isBooked ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {slot.isBooked ? `Reserved by ${slot.bookedBy || 'Player'}` : 'Available for Booking'}
                          </span>
                        </div>
                      </div>

                      {/* Right Action Button */}
                      {slot.isBooked ? (
                        <button
                          disabled
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-mono font-bold cursor-not-allowed shrink-0"
                        >
                          Already Booked
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            audioService.playClickSound();
                            onSelectSlot(selectedDateStr, slot);
                          }}
                          className="btn-gradient px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase shrink-0 shadow-md"
                        >
                          Book Now
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Guarantee */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-white/50">
              <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
              <span>Instant slot reservation locked to prevent double-booking.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

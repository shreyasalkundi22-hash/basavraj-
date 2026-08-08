import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle, Sparkles, ShieldCheck, Gamepad2, Users, User, Phone, MessageSquare, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getSlotsForDateAndStation, getDayAvailabilityStatusForStation, createBooking, getOwnerWhatsAppUrl, calculateBookingPrice, GAMING_STATIONS } from '../services/bookingService';
import type { HourlySlot, BookingRequest } from '../types';
import { audioService } from '../services/audioService';

interface BookingCalendarProps {
  onBookingComplete?: (booking: BookingRequest) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ onBookingComplete }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  // Active Station Selection (Station 01 or Station 02)
  const [activeStationId, setActiveStationId] = useState<string>('st-1');

  const [slots, setSlots] = useState<HourlySlot[]>([]);
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, 'available' | 'limited' | 'full'>>({});

  // Modal / Form state for slot booking
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<HourlySlot | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [playerCount, setPlayerCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash'>('upi');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  // Refresh slots for selected date & station
  const refreshSlots = (dateStr: string, stationId: string) => {
    const data = getSlotsForDateAndStation(dateStr, stationId);
    setSlots(data);
  };

  // Listen for real-time booking updates
  useEffect(() => {
    refreshSlots(selectedDateStr, activeStationId);

    const handleUpdate = () => {
      refreshSlots(selectedDateStr, activeStationId);
    };

    window.addEventListener('bgc-booking-updated', handleUpdate);
    return () => window.removeEventListener('bgc-booking-updated', handleUpdate);
  }, [selectedDateStr, activeStationId]);

  // Calendar month calculations
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

  // Populate availability status map for calendar days
  useEffect(() => {
    const map: Record<string, 'available' | 'limited' | 'full'> = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const dateStr = d.toISOString().split('T')[0];
      map[dateStr] = getDayAvailabilityStatusForStation(dateStr, activeStationId);
    }
    setAvailabilityMap(map);
  }, [year, month, daysInMonth, activeStationId]);

  const activeStationObj = GAMING_STATIONS.find(s => s.id === activeStationId) || GAMING_STATIONS[0];

  const handleSlotClick = (slot: HourlySlot) => {
    if (slot.isBooked) return;
    audioService.playClickSound();
    setSelectedSlotForBooking(slot);
    setErrorMsg('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlotForBooking) return;

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const price = calculateBookingPrice(playerCount);

    const result = await createBooking({
      name,
      phone,
      date: selectedDateStr,
      slotId: selectedSlotForBooking.id,
      slotLabel: selectedSlotForBooking.label,
      stationId: activeStationId,
      stationName: activeStationObj.name,
      playerCount,
      price,
      paymentMethod,
    });

    setLoading(false);

    if (result.success && result.booking) {
      audioService.playSuccessChime();
      
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#0077b6', '#00f5d4', '#ffffff'],
        });
      } catch {
        // Confetti fallback
      }

      setConfirmedBooking(result.booking);
      refreshSlots(selectedDateStr, activeStationId);
      if (onBookingComplete) onBookingComplete(result.booking);
    } else {
      setErrorMsg(result.message);
    }
  };

  const closeBookingModal = () => {
    setSelectedSlotForBooking(null);
    setConfirmedBooking(null);
    setName('');
    setPhone('');
    setErrorMsg('');
  };

  return (
    <section id="booking-calendar" className="py-24 relative bg-[#090909] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>REAL-TIME STATION CALENDAR</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4 uppercase"
          >
            BOOK YOUR <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00f0ff] bg-clip-text text-transparent">GAMING SESSION</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Select your date and gaming station to view live available & booked slots (9:00 AM – 11:00 PM).
          </motion.p>
        </div>

        {/* Station Selection Tabs (STATION 01 & STATION 02) */}
        <div className="flex justify-center mb-10">
          <div className="glass-panel p-1.5 rounded-2xl border border-white/10 flex items-center gap-2">
            {GAMING_STATIONS.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  audioService.playClickSound();
                  setActiveStationId(st.id);
                }}
                className={`px-6 py-3 rounded-xl text-xs font-mono font-extrabold tracking-wider uppercase transition-all flex items-center gap-2.5 ${
                  activeStationId === st.id
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#0077b6] text-white shadow-lg shadow-cyan-950/50 scale-105 border border-white/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>{st.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-cyan-300 font-normal">
                  PS5 4K OLED
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid & Hourly Slots Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: iOS Liquid Calendar Card */}
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
                  <span className="text-[11px] font-mono text-cyan-300 font-semibold">
                    Showing {activeStationObj.name}
                  </span>
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
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 rounded-xl bg-transparent" />
              ))}

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

          {/* Right Column: Live Time Slots for Selected Date & Station */}
          <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-0.5 font-bold">
                    <Clock className="w-4 h-4" /> Time Slots ({activeStationObj.name})
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
                <div className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-mono text-emerald-400 border border-emerald-500/30 font-bold">
                  {slots.filter(s => !s.isBooked).length} Available
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
                          ? 'bg-rose-950/20 border-rose-500/30 text-white/90'
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
                          <div className={`text-xs font-mono font-bold ${slot.isBooked ? 'text-white/80' : 'text-white'}`}>
                            {slot.label}
                          </div>
                          
                          {/* DISPLAY BOOKED PERSON'S NAME (PRIVACY PROTECTED) */}
                          <div className={`text-[11px] font-mono mt-0.5 ${slot.isBooked ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}`}>
                            {slot.isBooked ? (
                              <span className="flex items-center gap-1">
                                🔴 BOOKED • Booked by: <strong className="text-white underline decoration-rose-500/50">{slot.bookedBy || 'Gamer'}</strong>
                              </span>
                            ) : (
                              '🟢 AVAILABLE'
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Action Button */}
                      {slot.isBooked ? (
                        <button
                          disabled
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-mono font-bold cursor-not-allowed shrink-0"
                        >
                          Booked
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSlotClick(slot)}
                          className="btn-blue px-3.5 py-1.5 text-[11px] font-mono font-bold tracking-wider uppercase shrink-0 shadow-md"
                        >
                          Book Slot
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Guarantee */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00f0ff]" /> Double-booking protection enabled
              </span>
              <span className="text-emerald-400 font-bold">₹100 / hr per player</span>
            </div>
          </div>

        </div>
      </div>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {selectedSlotForBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBookingModal}
              className="fixed inset-0 bg-[#090909]/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden my-8"
            >
              <button
                onClick={closeBookingModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {confirmedBooking ? (
                /* CONFIRMED BOOKING VIEW */
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  
                  <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-extrabold flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> BOOKING CONFIRMED ✓
                  </span>
                  
                  <h3 className="text-2xl font-extrabold text-white font-display mt-1 mb-2">
                    Station Reserved!
                  </h3>
                  
                  <p className="text-white/70 text-xs mb-6 max-w-sm mx-auto">
                    Your station at Gaming Adda is locked under ID: <strong className="text-[#00f0ff]">{confirmedBooking.id}</strong>.
                  </p>

                  {/* Receipt Summary */}
                  <div className="glass-panel p-5 rounded-2xl border border-white/15 text-left mb-6 font-mono space-y-2.5 text-xs">
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-white/50">Full Name:</span>
                      <span className="text-white font-bold">{confirmedBooking.name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-white/50">Date & Time:</span>
                      <span className="text-emerald-400 font-bold">{confirmedBooking.date} ({confirmedBooking.slotLabel})</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-white/50">Station:</span>
                      <span className="text-cyan-300 font-bold">{confirmedBooking.stationName}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/10">
                      <span className="text-white/50">Players:</span>
                      <span className="text-white">{confirmedBooking.playerCount} Player(s)</span>
                    </div>
                    <div className="flex justify-between pt-1 text-sm font-bold">
                      <span className="text-white">Total Amount:</span>
                      <span className="text-xl text-[#00f0ff] font-display">₹{confirmedBooking.price}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <a
                      href={getOwnerWhatsAppUrl(confirmedBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-blue w-full py-4 text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl"
                    >
                      <MessageSquare className="w-4 h-4" /> CONTACT US ON WHATSAPP
                    </a>
                    
                    <button
                      onClick={closeBookingModal}
                      className="btn-glass w-full py-3 rounded-full text-xs font-mono uppercase font-bold"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* FORM INPUT VIEW */
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-1 font-bold">
                      <Gamepad2 className="w-4 h-4" /> Confirm Your Slot
                    </div>
                    <h3 className="text-2xl font-extrabold text-white font-display">
                      {activeStationObj.name} Session
                    </h3>
                    <p className="text-white/60 text-xs">
                      {selectedDateStr} • {selectedSlotForBooking.label}
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#00f0ff]" /> Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#00f0ff] text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#00f0ff]" /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99168 79803"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#00f0ff] text-white text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#00f0ff]" /> Number of Players (₹100/hr each)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setPlayerCount(count)}
                            className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                              playerCount === count
                                ? 'bg-[#00f0ff] border-[#00f0ff] text-[#090909] shadow-md'
                                : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                            }`}
                          >
                            {count} {count === 1 ? 'Player' : 'Players'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                        {(['upi', 'card', 'cash'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`py-2 rounded-xl border text-center uppercase font-bold transition-all ${
                              paymentMethod === method
                                ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-md'
                                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                            }`}
                          >
                            {method === 'upi' ? 'UPI / QR' : method === 'card' ? 'Card' : 'Pay at Venue'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Total Summary Bar */}
                    <div className="glass-panel p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-white/50 uppercase block">Total Rate</span>
                        <span className="text-2xl font-extrabold text-[#00f0ff] font-display">
                          ₹{calculateBookingPrice(playerCount)}
                        </span>
                        <span className="text-[10px] font-mono text-white/50 block">({playerCount} × ₹100/hr)</span>
                      </div>
                      <div className="text-right text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Double Booking Protected
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-blue w-full py-4 text-sm font-mono font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>CONFIRMING...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" /> CONFIRM BOOKING (₹{calculateBookingPrice(playerCount)})
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Gamepad2, Sparkles, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { createBooking, getOwnerWhatsAppUrl, OWNER_PHONE_DISPLAY } from '../services/bookingService';
import type { BookingRequest } from '../types';
import { audioService } from '../services/audioService';

interface BookingSectionProps {
  onBookingComplete?: (booking: BookingRequest) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onBookingComplete }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(todayStr);
  const [slotId, setSlotId] = useState('14:00');
  const [playerCount, setPlayerCount] = useState(1);
  const [stationId, setStationId] = useState('st-1');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash'>('upi');

  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  const calculatePrice = (count: number) => {
    switch (count) {
      case 1: return 100;
      case 2: return 150;
      case 3: return 250;
      case 4: return 300;
      default: return 100;
    }
  };

  const slotLabels: Record<string, string> = {
    "09:00": "09:00 AM - 10:00 AM",
    "10:00": "10:00 AM - 11:00 AM",
    "11:00": "11:00 AM - 12:00 PM",
    "12:00": "12:00 PM - 01:00 PM",
    "13:00": "01:00 PM - 02:00 PM",
    "14:00": "02:00 PM - 03:00 PM",
    "15:00": "03:00 PM - 04:00 PM",
    "16:00": "04:00 PM - 05:00 PM",
    "17:00": "05:00 PM - 06:00 PM",
    "18:00": "06:00 PM - 07:00 PM",
    "19:00": "07:00 PM - 08:00 PM",
    "20:00": "08:00 PM - 09:00 PM",
    "21:00": "09:00 PM - 10:00 PM",
    "22:00": "10:00 PM - 11:00 PM",
  };

  const stationOptions = [
    { id: 'st-1', name: 'STATION 01 (PS5 • 4K OLED)' },
    { id: 'st-2', name: 'STATION 02 (PS5 • 4K OLED)' },
    { id: 'st-3', name: 'STATION 03 (PS5 • 4K OLED)' },
    { id: 'st-4', name: 'STATION 04 (PS5 Squad Lounge)' },
    { id: 'st-5', name: 'STATION 05 (PS5 • 4K OLED)' },
    { id: 'st-6', name: 'STATION 06 (PS5 Pro • 4K OLED)' },
  ];

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    const price = calculatePrice(playerCount);

    const result = await createBooking({
      name,
      phone,
      date,
      slotId,
      slotLabel: slotLabels[slotId] || '02:00 PM - 03:00 PM',
      playerCount,
      stationId,
      price,
      paymentMethod,
    });

    setLoading(false);

    if (result.success && result.booking) {
      audioService.playSuccessChime();
      setConfirmedBooking(result.booking);
      if (onBookingComplete) onBookingComplete(result.booking);
    }
  };

  const whatsappMessage = encodeURIComponent("Hi Basavraj Gaming Arena, I would like to book a gaming session.");
  const directWhatsappUrl = `https://wa.me/919916879803?text=${whatsappMessage}`;

  return (
    <section id="booking-section" className="py-24 relative bg-[#090909] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1 rounded-full border border-red-500/30 text-xs font-mono text-red-400 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTANT SESSION RESERVATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display uppercase tracking-tight mb-4"
          >
            BOOK YOUR <span className="bg-gradient-to-r from-white to-[#ff1e42] bg-clip-text text-transparent">SESSION</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/70 text-base sm:text-lg"
          >
            Select your date, slot, player count, and gaming station to instantly lock your station.
          </motion.p>
        </div>

        {/* Booking Form Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          {confirmedBooking ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#ff1e42]/20 border border-[#ff1e42] mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#ff1e42]" />
              </div>
              <h3 className="text-2xl font-extrabold text-white font-display uppercase mb-2">
                BOOKING CONFIRMED!
              </h3>
              <p className="text-xs font-mono text-white/70 mb-6 max-w-md mx-auto">
                Station locked under ID: <strong className="text-[#ff1e42]">{confirmedBooking.id}</strong>. Showing details to owner at {OWNER_PHONE_DISPLAY}.
              </p>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left font-mono text-xs space-y-3 mb-6 max-w-md mx-auto">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Gamer Name:</span>
                  <span className="text-white font-bold">{confirmedBooking.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Date & Slot:</span>
                  <span className="text-emerald-400 font-bold">{confirmedBooking.date} ({confirmedBooking.slotLabel})</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50">Squad Size:</span>
                  <span className="text-white">{confirmedBooking.playerCount} Player(s)</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-[#ff1e42] font-display text-lg">₹{confirmedBooking.price}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getOwnerWhatsAppUrl(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red px-6 py-3 text-xs font-mono uppercase font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>NOTIFY OWNER ON WHATSAPP</span>
                </a>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="btn-glass px-6 py-3 rounded-full text-xs font-mono uppercase font-bold"
                >
                  BOOK ANOTHER
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#ff1e42] text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99168 79803"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#ff1e42] text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#ff1e42]" /> 1. Select Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#ff1e42] text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#ff1e42]" /> 2. Time Slot (9 AM - 11 PM)
                  </label>
                  <select
                    value={slotId}
                    onChange={(e) => setSlotId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-white/15 focus:border-[#ff1e42] text-white text-xs outline-none transition-colors font-mono"
                  >
                    {Object.entries(slotLabels).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Players & Gaming Station */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#ff1e42]" /> 3. Number of Players
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setPlayerCount(count)}
                        className={`py-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                          playerCount === count
                            ? 'bg-[#ff1e42] border-[#ff1e42] text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        {count}P
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5 text-[#ff1e42]" /> 4. Gaming Station
                  </label>
                  <select
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-white/15 focus:border-[#ff1e42] text-white text-xs outline-none transition-colors font-mono"
                  >
                    {stationOptions.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
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
                      className={`py-2.5 rounded-xl border text-center uppercase font-bold transition-all ${
                        paymentMethod === method
                          ? 'bg-[#ff1e42]/20 border-[#ff1e42] text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {method === 'upi' ? 'UPI / QR' : method === 'card' ? 'Card' : 'Pay at Venue'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Total Row */}
              <div className="glass-panel p-5 rounded-2xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-white/50 uppercase block">Estimated Total</span>
                  <span className="text-3xl font-extrabold text-white font-display">
                    ₹{calculatePrice(playerCount)} <span className="text-xs text-white/50 font-mono font-normal">/ session</span>
                  </span>
                </div>

                <div className="text-right text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant Station Lock
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-red py-4 text-sm font-mono tracking-wider uppercase font-bold shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>LOCKING STATION...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> CONFIRM BOOKING
                    </>
                  )}
                </button>

                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glass py-4 rounded-full text-sm font-mono tracking-wider uppercase font-bold text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> BOOK VIA WHATSAPP
                </a>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};

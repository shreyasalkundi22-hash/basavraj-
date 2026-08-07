import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, Users, CreditCard, QrCode, Banknote, Sparkles, CheckCircle2, ShieldCheck, Gamepad2, MessageSquare, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createBooking, getOwnerWhatsAppUrl, OWNER_PHONE_DISPLAY } from '../services/bookingService';
import type { HourlySlot, BookingRequest } from '../types';
import { audioService } from '../services/audioService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
  initialSlot?: HourlySlot | null;
  initialPlayers?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialDate,
  initialSlot,
  initialPlayers = 1,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(initialDate || todayStr);
  const [slotId, setSlotId] = useState(initialSlot?.id || '14:00');
  const [playerCount, setPlayerCount] = useState(initialPlayers);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cash'>('upi');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  // Sync state when props change
  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialSlot) setSlotId(initialSlot.id);
    if (initialPlayers) setPlayerCount(initialPlayers);
  }, [initialDate, initialSlot, initialPlayers]);

  if (!isOpen) return null;

  // Calculate pricing based on player count
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    const price = calculatePrice(playerCount);

    const result = await createBooking({
      name,
      phone,
      email,
      date,
      slotId,
      slotLabel: slotLabels[slotId] || '02:00 PM - 03:00 PM',
      playerCount,
      price,
      paymentMethod,
    });

    setLoading(false);

    if (result.success && result.booking) {
      audioService.playSuccessChime();
      
      // Fire confetti burst
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

      // Auto trigger opening WhatsApp with booking & amount details to owner (+91 9916879803)
      setTimeout(() => {
        try {
          window.open(getOwnerWhatsAppUrl(result.booking!), '_blank');
        } catch {
          // Window popup fallback
        }
      }, 500);
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-[#090909]/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {confirmedBooking ? (
            /* Booking Confirmation View */
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00f0ff] to-[#0077b6] p-0.5 mx-auto mb-4 shadow-xl shadow-[#00f0ff]/30 flex items-center justify-center">
                <div className="w-full h-full bg-[#090909] rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-[#00f0ff]" />
                </div>
              </div>

              <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> BOOKING CONFIRMED
              </span>
              
              <h3 className="text-2xl font-extrabold text-white font-display mt-1 mb-2">
                Get Ready to Play!
              </h3>
              
              <p className="text-white/70 text-xs mb-6 max-w-sm mx-auto">
                Your station at Basavraj Gaming Centre has been locked. Notification payload dispatched to owner ({OWNER_PHONE_DISPLAY}).
              </p>

              {/* Glass Receipt Card */}
              <div className="glass-panel p-5 rounded-2xl border border-white/15 text-left mb-6 font-mono space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs text-white/50">BOOKING ID:</span>
                  <span className="text-sm font-bold text-[#00f0ff]">{confirmedBooking.id}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Gamer Name:</span>
                  <span className="text-white font-semibold">{confirmedBooking.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Customer Phone:</span>
                  <span className="text-white font-semibold">{confirmedBooking.phone}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Date & Slot:</span>
                  <span className="text-emerald-400 font-semibold">{confirmedBooking.date} ({confirmedBooking.slotLabel})</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Squad Size:</span>
                  <span className="text-white">{confirmedBooking.playerCount} Gamer(s)</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="text-white/50">Payment Mode:</span>
                  <span className="text-cyan-300 uppercase font-bold">{confirmedBooking.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-white/10 font-bold">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-xl text-[#00f0ff] font-display">₹{confirmedBooking.price}</span>
                </div>
              </div>

              {/* Owner Notification Dispatch Bar */}
              <div className="mb-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div>
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Sent to Owner ({OWNER_PHONE_DISPLAY})
                  </div>
                  <span className="text-[11px] text-white/60 font-mono">Total Rate: ₹{confirmedBooking.price} + Booking Pass</span>
                </div>
                <a
                  href={getOwnerWhatsAppUrl(confirmedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioService.playClickSound()}
                  className="btn-glass px-4 py-2 rounded-xl text-xs font-mono font-bold text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20 flex items-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Owner
                </a>
              </div>

              <button
                onClick={handleResetAndClose}
                className="btn-gradient w-full py-3.5 text-sm uppercase tracking-wider font-bold"
              >
                Done
              </button>
            </div>
          ) : (
            /* Booking Form View */
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase tracking-wider mb-1">
                  <Gamepad2 className="w-4 h-4 text-[#00f0ff]" /> Instant Slot Lock
                </div>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  Book PS5 Gaming Station
                </h3>
                <p className="text-white/60 text-xs">
                  Basavraj Gaming Centre • Hubli, Karnataka
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Gamer Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#00f0ff]" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Basavraj Patil"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#00f0ff] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1">
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
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-white/40" /> Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="gamer@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#00f0ff] text-white text-sm outline-none transition-colors"
                  />
                </div>

                {/* Date & Slot Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" /> Select Date
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-[#00f0ff] text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#00f0ff]" /> Time Slot (9 AM - 11 PM)
                    </label>
                    <select
                      value={slotId}
                      onChange={(e) => setSlotId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#121216] border border-white/15 focus:border-[#00f0ff] text-white text-xs outline-none transition-colors"
                    >
                      {Object.entries(slotLabels).map(([id, label]) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Number of Players */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#00f0ff]" /> Number of Players
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setPlayerCount(count)}
                        className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                          playerCount === count
                            ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] shadow-md shadow-[#00f0ff]/20'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        {count} {count === 1 ? 'Player' : 'Players'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'upi'
                          ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-white font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-[#00f0ff]" />
                      <span>UPI / QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-cyan-400" />
                      <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2.5 rounded-xl border text-xs font-mono flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === 'cash'
                          ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <Banknote className="w-4 h-4 text-emerald-400" />
                      <span>Pay at Venue</span>
                    </button>
                  </div>
                </div>

                {/* Price Total Summary Bar */}
                <div className="glass-panel p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-white/50 uppercase block">Total Rate</span>
                    <span className="text-2xl font-extrabold text-[#00f0ff] font-display">
                      ₹{calculatePrice(playerCount)}
                    </span>
                  </div>
                  <div className="text-right text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Notifies Owner +91 9916879803
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gradient w-full py-4 text-sm font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-pulse">Locking Slot & Notifying Owner...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Confirm Booking (₹{calculatePrice(playerCount)})
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

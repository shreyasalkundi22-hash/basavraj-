import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ShieldCheck, Trash2, XCircle, Phone, Calendar, RefreshCw, UserCheck, Gamepad2, Plus } from 'lucide-react';
import { getStoredBookings, cancelBookingInStorage, deleteBookingInStorage, saveBooking, generateBookingId, HOURLY_TIME_SLOTS, GAMING_STATIONS } from '../services/bookingService';
import type { BookingRequest } from '../types';
import { audioService } from '../services/audioService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterStation, setFilterStation] = useState<string>('all');

  // Manual booking creation form state
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualDate, setManualDate] = useState(new Date().toISOString().split('T')[0]);
  const [manualSlotId, setManualSlotId] = useState('14:00');
  const [manualStationId, setManualStationId] = useState('st-1');
  const [manualPlayers, setManualPlayers] = useState(1);

  const loadData = () => {
    setBookings(getStoredBookings());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      const handleUpdate = () => loadData();
      window.addEventListener('bgc-booking-updated', handleUpdate);
      return () => window.removeEventListener('bgc-booking-updated', handleUpdate);
    }
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin' || password === '9916879803' || password === '1234') {
      audioService.playSuccessChime();
      setIsAuthenticated(true);
      setAuthError('');
      loadData();
    } else {
      audioService.playClickSound();
      setAuthError('Invalid Admin Password. Access Denied.');
    }
  };

  const handleCancelBooking = (id: string) => {
    audioService.playClickSound();
    cancelBookingInStorage(id);
    loadData();
  };

  const handleDeleteBooking = (id: string) => {
    audioService.playClickSound();
    deleteBookingInStorage(id);
    loadData();
  };

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const slotObj = HOURLY_TIME_SLOTS.find(s => s.id === manualSlotId) || HOURLY_TIME_SLOTS[0];
    const stObj = GAMING_STATIONS.find(s => s.id === manualStationId) || GAMING_STATIONS[0];

    const newBooking: BookingRequest = {
      id: generateBookingId(),
      name: manualName,
      phone: manualPhone || '+91 9916879803',
      date: manualDate,
      slotId: manualSlotId,
      slotLabel: slotObj.label,
      stationId: manualStationId,
      stationName: stObj.name,
      playerCount: manualPlayers,
      price: manualPlayers * 100,
      paymentMethod: 'cash',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    saveBooking(newBooking);
    audioService.playSuccessChime();
    setShowManualAdd(false);
    setManualName('');
    setManualPhone('');
    loadData();
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterDate && b.date !== filterDate) return false;
    if (filterStation !== 'all' && b.stationId !== filterStation) return false;
    return true;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#090909]/90 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {!isAuthenticated ? (
            /* ADMIN LOGIN FORM */
            <div className="max-w-md mx-auto py-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#00f0ff]/20">
                <Lock className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-extrabold text-white font-display uppercase tracking-wider mb-2">
                Owner / Admin Portal
              </h3>
              <p className="text-xs font-mono text-white/60 mb-6">
                Protected area for Gaming Adda (+91 9916879803) management.
              </p>

              {authError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1.5 uppercase font-bold">
                    Enter Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password (e.g. admin)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#00f0ff] text-white text-sm outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-blue w-full py-3.5 text-xs font-mono font-bold tracking-wider uppercase shadow-xl flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" /> UNLOCK ADMIN DASHBOARD
                </button>
              </form>
            </div>
          ) : (
            /* ADMIN DASHBOARD VIEW */
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase font-bold">
                    <UserCheck className="w-4 h-4" /> Protected Owner Management
                  </div>
                  <h3 className="text-2xl font-extrabold text-white font-display">
                    Gaming Adda • Booking Manager
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowManualAdd(!showManualAdd)}
                    className="btn-blue px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Manual Reserve
                  </button>
                  <button
                    onClick={loadData}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                    title="Refresh Data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Manual Booking Drawer */}
              <AnimatePresence>
                {showManualAdd && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-cyan-500/30 mb-6 font-mono text-xs space-y-4"
                  >
                    <h4 className="font-bold text-white uppercase flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4 text-[#00f0ff]" /> Manually Mark Slot as Booked
                    </h4>

                    <form onSubmit={handleCreateManualBooking} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Customer Name"
                        value={manualName}
                        onChange={(e) => setManualName(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={manualPhone}
                        onChange={(e) => setManualPhone(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs outline-none"
                      />
                      <input
                        type="date"
                        value={manualDate}
                        onChange={(e) => setManualDate(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs outline-none"
                      />
                      <select
                        value={manualStationId}
                        onChange={(e) => setManualStationId(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-[#121216] border border-white/15 text-white text-xs outline-none"
                      >
                        {GAMING_STATIONS.map(st => (
                          <option key={st.id} value={st.id}>{st.name}</option>
                        ))}
                      </select>
                      <select
                        value={manualSlotId}
                        onChange={(e) => setManualSlotId(e.target.value)}
                        className="px-3 py-2 rounded-xl bg-[#121216] border border-white/15 text-white text-xs outline-none"
                      >
                        {HOURLY_TIME_SLOTS.map(sl => (
                          <option key={sl.id} value={sl.id}>{sl.label}</option>
                        ))}
                      </select>
                      <select
                        value={manualPlayers}
                        onChange={(e) => setManualPlayers(Number(e.target.value))}
                        className="px-3 py-2 rounded-xl bg-[#121216] border border-white/15 text-white text-xs outline-none"
                      >
                        <option value={1}>1 Player (₹100)</option>
                        <option value={2}>2 Players (₹200)</option>
                        <option value={3}>3 Players (₹300)</option>
                        <option value={4}>4 Players (₹400)</option>
                      </select>
                      <button
                        type="submit"
                        className="btn-blue py-2 text-xs font-bold uppercase rounded-xl"
                      >
                        SAVE BOOKING
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#00f0ff]" />
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs outline-none"
                    />
                    {filterDate && (
                      <button onClick={() => setFilterDate('')} className="text-white/40 hover:text-white">Clear</button>
                    )}
                  </div>

                  <select
                    value={filterStation}
                    onChange={(e) => setFilterStation(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-[#121216] border border-white/15 text-white text-xs outline-none"
                  >
                    <option value="all">All Stations</option>
                    {GAMING_STATIONS.map(st => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <span className="text-white/60 font-bold">
                  Total Bookings: {filteredBookings.length}
                </span>
              </div>

              {/* Bookings Table */}
              <div className="max-h-[420px] overflow-y-auto rounded-2xl border border-white/10">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-white/50 uppercase">
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Phone (Owner Only)</th>
                      <th className="py-3 px-4">Date & Slot</th>
                      <th className="py-3 px-4">Station</th>
                      <th className="py-3 px-4">Players & Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-white/40">
                          No bookings found for selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4 font-bold text-white">
                            {b.name}
                            <span className="block text-[10px] text-white/40">{b.id}</span>
                          </td>
                          <td className="py-3 px-4 text-cyan-300 font-bold">
                            <a href={`tel:${b.phone}`} className="flex items-center gap-1 hover:underline">
                              <Phone className="w-3 h-3" /> {b.phone}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-white/80">
                            <div>{b.date}</div>
                            <div className="text-[10px] text-emerald-400">{b.slotLabel}</div>
                          </td>
                          <td className="py-3 px-4 text-cyan-400 font-bold">
                            {b.stationName}
                          </td>
                          <td className="py-3 px-4 text-white/80">
                            <div>{b.playerCount} Gamer(s)</div>
                            <div className="text-emerald-400 font-bold">₹{b.price}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                              b.status === 'cancelled'
                                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                                : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            }`}>
                              {b.status || 'confirmed'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {b.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleCancelBooking(b.id)}
                                  className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  title="Cancel Booking (Make Slot Available)"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                title="Delete Booking Permanent"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

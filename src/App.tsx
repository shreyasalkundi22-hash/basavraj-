import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GamingArena } from './components/GamingArena';
import { Pricing } from './components/Pricing';
import { BookingCalendar } from './components/BookingCalendar';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import type { HourlySlot } from './types';
import { Calendar, Sparkles } from 'lucide-react';
import { audioService } from './services/audioService';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<HourlySlot | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<number>(1);

  const handleOpenBooking = () => {
    setSelectedDate(undefined);
    setSelectedSlot(null);
    setSelectedPlayers(1);
    setIsBookingOpen(true);
  };

  const handleSelectPricingTier = (players: number) => {
    setSelectedPlayers(players);
    setSelectedSlot(null);
    setIsBookingOpen(true);
  };

  const handleSelectCalendarSlot = (date: string, slot: HourlySlot) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
    setIsBookingOpen(true);
  };

  return (
    <>
      {/* Cinematic Startup Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-[#090909] text-white selection:bg-[#00f0ff]/30 selection:text-[#00f0ff] relative">
        {/* Custom Reactive Cursor */}
        <CustomCursor />

        {/* Liquid Glass Navigation */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Main Content Sections */}
        <main>
          <Hero onOpenBooking={handleOpenBooking} />
          <GamingArena />
          <Pricing onSelectTier={handleSelectPricingTier} />
          <BookingCalendar onSelectSlot={handleSelectCalendarSlot} />
          <Gallery />
          <Reviews />
          <Contact />
        </main>

        {/* Glass Footer */}
        <Footer />

        {/* Global Floating Glass Booking Trigger (Mobile & Desktop) */}
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => {
              audioService.playClickSound();
              handleOpenBooking();
            }}
            className="btn-gradient px-5 py-3.5 rounded-full text-xs font-extrabold tracking-wider uppercase flex items-center gap-2.5 shadow-2xl shadow-[#00f0ff]/30 border border-white/20 hover:scale-105 transition-transform"
          >
            <Calendar className="w-4 h-4 text-white animate-pulse" />
            <span className="hidden sm:inline">Book Station Now</span>
            <span className="sm:hidden">Book Now</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

        {/* Smart Glass Booking Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialDate={selectedDate}
          initialSlot={selectedSlot}
          initialPlayers={selectedPlayers}
        />
      </div>
    </>
  );
}

export default App;

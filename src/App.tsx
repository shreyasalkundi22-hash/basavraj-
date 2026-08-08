import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveStationStatus } from './components/LiveStationStatus';
import { BookingCalendar } from './components/BookingCalendar';
import { WhyBasavraj } from './components/WhyBasavraj';
import { ChooseYourBattle } from './components/ChooseYourBattle';
import { Pricing } from './components/Pricing';
import { Leaderboard } from './components/Leaderboard';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { ShieldCheck } from 'lucide-react';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const scrollToBooking = () => {
    const el = document.getElementById('booking-calendar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPricingTier = (_players: number) => {
    scrollToBooking();
  };

  const handlePlayGame = (_gameTitle: string) => {
    scrollToBooking();
  };

  const handleSelectStation = (_stationId: string) => {
    scrollToBooking();
  };

  return (
    <>
      {/* Startup Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-[#090909] text-white selection:bg-[#00f0ff]/30 selection:text-[#00f0ff] relative font-sans">
        {/* Animated Custom Cursor */}
        <CustomCursor />

        {/* Sticky Glass Navbar */}
        <Navbar onOpenBooking={scrollToBooking} />

        {/* Main Content Sections */}
        <main>
          <Hero onOpenBooking={scrollToBooking} />
          
          <LiveStationStatus onSelectStation={handleSelectStation} />

          {/* DEDICATED CALENDAR BOOKING SYSTEM */}
          <BookingCalendar />

          <WhyBasavraj />

          <ChooseYourBattle onPlayGame={handlePlayGame} />

          <Pricing onSelectTier={handleSelectPricingTier} />

          <Leaderboard onOpenBooking={scrollToBooking} />

          <Gallery />

          <Reviews />

          <Contact />
        </main>

        {/* Owner Admin Access Button Bar (Bottom Left) */}
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="glass-panel px-3.5 py-2 rounded-full text-xs font-mono font-bold text-white/80 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all flex items-center gap-1.5 shadow-xl border border-white/10"
            title="Owner Admin Booking Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="hidden sm:inline">Owner Login</span>
          </button>
        </div>

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />

        {/* Glass Footer */}
        <Footer />

        {/* Protected Owner Admin Modal */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </div>
    </>
  );
}

export default App;

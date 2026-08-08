import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveStationStatus } from './components/LiveStationStatus';
import { WhyBasavraj } from './components/WhyBasavraj';
import { ChooseYourBattle } from './components/ChooseYourBattle';
import { Pricing } from './components/Pricing';
import { BookingSection } from './components/BookingSection';
import { Leaderboard } from './components/Leaderboard';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import type { HourlySlot } from './types';

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

  const handlePlayGame = (_gameTitle: string) => {
    handleOpenBooking();
  };

  const handleSelectStation = (_stationId: string) => {
    handleOpenBooking();
  };

  return (
    <>
      {/* Startup Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className="min-h-screen bg-[#090909] text-white selection:bg-[#00f0ff]/30 selection:text-[#00f0ff] relative font-sans">
        {/* Animated Custom Cursor */}
        <CustomCursor />

        {/* Sticky Glass Navbar */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Main Content Sections */}
        <main>
          <Hero onOpenBooking={handleOpenBooking} />
          <LiveStationStatus onSelectStation={handleSelectStation} />
          <WhyBasavraj />
          <ChooseYourBattle onPlayGame={handlePlayGame} />
          <Pricing onSelectTier={handleSelectPricingTier} />
          <BookingSection />
          <Leaderboard onOpenBooking={handleOpenBooking} />
          <Gallery />
          <Reviews />
          <Contact />
        </main>

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />

        {/* Glass Footer */}
        <Footer />

        {/* Global Glass Booking Modal */}
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

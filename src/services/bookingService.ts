import type { HourlySlot, BookingRequest, GamingStation } from '../types';

export const OWNER_PHONE_DISPLAY = '+91 9916879803';
export const OWNER_PHONE_NUMBER = '919916879803';

// Price Configuration: ₹100 per person / hour
export const HOURLY_RATE_PER_PLAYER = 100;

export const calculateBookingPrice = (playerCount: number): number => {
  return (playerCount || 1) * HOURLY_RATE_PER_PLAYER;
};

// Configurable Stations (Easily scalable to 3+ stations later)
export const GAMING_STATIONS: GamingStation[] = [
  { id: 'st-1', name: 'STATION 01', status: 'available', specs: 'PS5 • 55" 4K 120Hz OLED Display' },
  { id: 'st-2', name: 'STATION 02', status: 'available', specs: 'PS5 • 55" 4K 120Hz OLED Display' },
];

export const HOURLY_TIME_SLOTS = [
  { id: "09:00", label: "9:00 AM – 10:00 AM", hour24: 9 },
  { id: "10:00", label: "10:00 AM – 11:00 AM", hour24: 10 },
  { id: "11:00", label: "11:00 AM – 12:00 PM", hour24: 11 },
  { id: "12:00", label: "12:00 PM – 1:00 PM", hour24: 12 },
  { id: "13:00", label: "1:00 PM – 2:00 PM", hour24: 13 },
  { id: "14:00", label: "2:00 PM – 3:00 PM", hour24: 14 },
  { id: "15:00", label: "3:00 PM – 4:00 PM", hour24: 15 },
  { id: "16:00", label: "4:00 PM – 5:00 PM", hour24: 16 },
  { id: "17:00", label: "5:00 PM – 6:00 PM", hour24: 17 },
  { id: "18:00", label: "6:00 PM – 7:00 PM", hour24: 18 },
  { id: "19:00", label: "7:00 PM – 8:00 PM", hour24: 19 },
  { id: "20:00", label: "8:00 PM – 9:00 PM", hour24: 20 },
  { id: "21:00", label: "9:00 PM – 10:00 PM", hour24: 21 },
  { id: "22:00", label: "10:00 PM – 11:00 PM", hour24: 22 },
];

const STORAGE_KEY = 'GAMING_ADDA_BOOKINGS_PERSISTENT_V2';

// Initial seed bookings for initial demo presentation
const getDefaultBookings = (): BookingRequest[] => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrow = tomorrowObj.toISOString().split('T')[0];

  return [
    {
      id: 'ADDA-8841',
      name: 'Rahul',
      phone: '+91 9845123456',
      date: today,
      slotId: '10:00',
      slotLabel: '10:00 AM – 11:00 AM',
      stationId: 'st-1',
      stationName: 'STATION 01',
      playerCount: 1,
      price: 100,
      paymentMethod: 'upi',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'ADDA-8842',
      name: 'Karan',
      phone: '+91 9741987654',
      date: today,
      slotId: '16:00',
      slotLabel: '4:00 PM – 5:00 PM',
      stationId: 'st-2',
      stationName: 'STATION 02',
      playerCount: 2,
      price: 200,
      paymentMethod: 'cash',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'ADDA-8843',
      name: 'Arjun',
      phone: '+91 9900112233',
      date: tomorrow,
      slotId: '19:00',
      slotLabel: '7:00 PM – 8:00 PM',
      stationId: 'st-1',
      stationName: 'STATION 01',
      playerCount: 3,
      price: 300,
      paymentMethod: 'upi',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
  ];
};

export const getStoredBookings = (): BookingRequest[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultBookings();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading persistent bookings:', err);
    return getDefaultBookings();
  }
};

export const saveBooking = (booking: BookingRequest): void => {
  const existing = getStoredBookings();
  // Filter out any previous booking with same ID if updating
  const filtered = existing.filter(b => b.id !== booking.id);
  const updated = [booking, ...filtered];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  // Dispatch custom event for real-time reactive sync across components
  window.dispatchEvent(new CustomEvent('bgc-booking-updated', { detail: booking }));
};

export const cancelBookingInStorage = (bookingId: string): boolean => {
  const existing = getStoredBookings();
  const updated = existing.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('bgc-booking-updated', { detail: { bookingId, action: 'cancel' } }));
  return true;
};

export const deleteBookingInStorage = (bookingId: string): boolean => {
  const existing = getStoredBookings();
  const updated = existing.filter(b => b.id !== bookingId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('bgc-booking-updated', { detail: { bookingId, action: 'delete' } }));
  return true;
};

export const getSlotsForDateAndStation = (dateStr: string, stationId: string): HourlySlot[] => {
  const allBookings = getStoredBookings();
  // Only active confirmed bookings for target date & station
  const activeBookings = allBookings.filter(
    b => b.date === dateStr && b.stationId === stationId && b.status !== 'cancelled'
  );
  
  const bookedSlotMap = new Map<string, BookingRequest>();
  activeBookings.forEach(b => bookedSlotMap.set(b.slotId, b));

  return HOURLY_TIME_SLOTS.map(slot => {
    const booking = bookedSlotMap.get(slot.id);
    const isBooked = !!booking;
    return {
      ...slot,
      stationId,
      isBooked,
      // PRIVACY RULE: Show ONLY customer name, NEVER phone numbers on public calendar
      bookedBy: booking ? booking.name : undefined,
      playerCount: booking ? booking.playerCount : undefined,
    };
  });
};

export const getDayAvailabilityStatusForStation = (dateStr: string, stationId: string): 'available' | 'limited' | 'full' => {
  const slots = getSlotsForDateAndStation(dateStr, stationId);
  const bookedCount = slots.filter(s => s.isBooked).length;
  const total = slots.length;

  if (bookedCount >= total) return 'full';
  if (bookedCount >= total / 3) return 'limited';
  return 'available';
};

export const generateBookingId = (): string => {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ADDA-${rand}`;
};

export const generateOwnerWhatsAppMessage = (b: BookingRequest): string => {
  return `Hi Basavraj Gaming Arena, I have booked a gaming session.

Name: ${b.name}
Date: ${b.date}
Time: ${b.slotLabel}
Station: ${b.stationName}
Players: ${b.playerCount} (${b.playerCount} × ₹100 = ₹${b.price})`;
};

export const getOwnerWhatsAppUrl = (b: BookingRequest): string => {
  const text = generateOwnerWhatsAppMessage(b);
  return `https://wa.me/${OWNER_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const createBooking = async (
  requestData: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; bookingId: string; message: string; booking?: BookingRequest }> => {
  await new Promise(resolve => setTimeout(resolve, 400));

  const stationId = requestData.stationId || 'st-1';
  const stationName = requestData.stationName || (stationId === 'st-2' ? 'STATION 02' : 'STATION 01');

  // DOUBLE-BOOKING PROTECTION: Re-validate DATE + TIME SLOT + STATION
  const existingSlots = getSlotsForDateAndStation(requestData.date, stationId);
  const targetSlot = existingSlots.find(s => s.id === requestData.slotId);

  if (targetSlot?.isBooked) {
    return {
      success: false,
      bookingId: '',
      message: `Sorry! This slot on ${stationName} was just booked by ${targetSlot.bookedBy || 'another gamer'}. Please choose an available time slot or switch stations.`,
    };
  }

  const bookingId = generateBookingId();
  const fullBooking: BookingRequest = {
    ...requestData,
    stationId,
    stationName,
    id: bookingId,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  saveBooking(fullBooking);

  return {
    success: true,
    bookingId,
    message: 'Booking confirmed successfully! Slot locked.',
    booking: fullBooking,
  };
};

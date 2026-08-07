import type { HourlySlot, BookingRequest } from '../types';

const HOURLY_TIME_SLOTS = [
  { id: "09:00", label: "09:00 AM - 10:00 AM", hour24: 9 },
  { id: "10:00", label: "10:00 AM - 11:00 AM", hour24: 10 },
  { id: "11:00", label: "11:00 AM - 12:00 PM", hour24: 11 },
  { id: "12:00", label: "12:00 PM - 01:00 PM", hour24: 12 },
  { id: "13:00", label: "01:00 PM - 02:00 PM", hour24: 13 },
  { id: "14:00", label: "02:00 PM - 03:00 PM", hour24: 14 },
  { id: "15:00", label: "03:00 PM - 04:00 PM", hour24: 15 },
  { id: "16:00", label: "04:00 PM - 05:00 PM", hour24: 16 },
  { id: "17:00", label: "05:00 PM - 06:00 PM", hour24: 17 },
  { id: "18:00", label: "06:00 PM - 07:00 PM", hour24: 18 },
  { id: "19:00", label: "07:00 PM - 08:00 PM", hour24: 19 },
  { id: "20:00", label: "08:00 PM - 09:00 PM", hour24: 20 },
  { id: "21:00", label: "09:00 PM - 10:00 PM", hour24: 21 },
  { id: "22:00", label: "10:00 PM - 11:00 PM", hour24: 22 },
];

const STORAGE_KEY = 'BGC_BOOKINGS_STORAGE_V1';

// Seed initial realistic bookings for demonstration
const getDefaultBookings = (): BookingRequest[] => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrow = tomorrowObj.toISOString().split('T')[0];

  return [
    {
      id: 'BGC-8841-A',
      name: 'Rohan Patil',
      phone: '+91 9845123456',
      email: 'rohan.p@gmail.com',
      date: today,
      slotId: '14:00',
      slotLabel: '02:00 PM - 03:00 PM',
      playerCount: 2,
      price: 150,
      paymentMethod: 'upi',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'BGC-8842-B',
      name: 'Aditya Kulkarni',
      phone: '+91 9741987654',
      date: today,
      slotId: '18:00',
      slotLabel: '06:00 PM - 07:00 PM',
      playerCount: 4,
      price: 300,
      paymentMethod: 'card',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'BGC-8843-C',
      name: 'Sneha Hubli',
      phone: '+91 9900112233',
      date: tomorrow,
      slotId: '19:00',
      slotLabel: '07:00 PM - 08:00 PM',
      playerCount: 2,
      price: 150,
      paymentMethod: 'upi',
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
    console.error('Error reading bookings:', err);
    return getDefaultBookings();
  }
};

export const saveBooking = (booking: BookingRequest): void => {
  const existing = getStoredBookings();
  const updated = [booking, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  
  // Dispatch custom event for real-time reactive sync across components
  window.dispatchEvent(new CustomEvent('bgc-booking-updated', { detail: booking }));
};

export const getSlotsForDate = (dateStr: string): HourlySlot[] => {
  const bookings = getStoredBookings().filter(b => b.date === dateStr);
  const bookedSlotIds = new Set(bookings.map(b => b.slotId));

  return HOURLY_TIME_SLOTS.map(slot => {
    const isBooked = bookedSlotIds.has(slot.id);
    const booking = bookings.find(b => b.slotId === slot.id);
    return {
      ...slot,
      isBooked,
      bookedBy: booking ? booking.name : undefined,
      playerCount: booking ? booking.playerCount : undefined,
    };
  });
};

export const getDayAvailabilityStatus = (dateStr: string): 'available' | 'limited' | 'full' => {
  const slots = getSlotsForDate(dateStr);
  const bookedCount = slots.filter(s => s.isBooked).length;
  const total = slots.length;

  if (bookedCount >= total - 1) return 'full';
  if (bookedCount >= total / 3) return 'limited';
  return 'available';
};

export const generateBookingId = (): string => {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `BGC-${year}-${rand}`;
};

export const createBooking = async (
  requestData: Omit<BookingRequest, 'id' | 'createdAt'>
): Promise<{ success: boolean; bookingId: string; message: string }> => {
  // Simulate network delay for premium feel
  await new Promise(resolve => setTimeout(resolve, 600));

  // Check double booking
  const existingSlots = getSlotsForDate(requestData.date);
  const targetSlot = existingSlots.find(s => s.id === requestData.slotId);

  if (targetSlot?.isBooked) {
    return {
      success: false,
      bookingId: '',
      message: 'Sorry! This slot was just booked by another player. Please select another time.',
    };
  }

  const bookingId = generateBookingId();
  const fullBooking: BookingRequest = {
    ...requestData,
    id: bookingId,
    createdAt: new Date().toISOString(),
  };

  saveBooking(fullBooking);

  return {
    success: true,
    bookingId,
    message: 'Booking confirmed successfully! See you at Basavraj Gaming Centre.',
  };
};

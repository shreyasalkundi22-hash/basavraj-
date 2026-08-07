export interface HourlySlot {
  id: string; // e.g. "09:00"
  label: string; // e.g. "9:00 AM - 10:00 AM"
  hour24: number; // 9
  isBooked: boolean;
  bookedBy?: string;
  playerCount?: number;
}

export interface DayAvailability {
  dateString: string; // YYYY-MM-DD
  slots: HourlySlot[];
}

export interface BookingRequest {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  slotId: string; // "09:00"
  slotLabel: string;
  playerCount: number;
  price: number;
  paymentMethod: 'upi' | 'card' | 'cash';
  createdAt: string;
}

export interface PricingTier {
  id: string;
  players: string;
  playerCount: number;
  price: number;
  period: string;
  popular?: boolean;
  features: string[];
  gradient: string;
}

export interface ArenaFeature {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  specs: string[];
  badge: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'ps5' | 'setup' | 'ambience' | 'controllers' | 'chairs';
  image: string;
  description: string;
  resolution: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteGame: string;
  date: string;
}

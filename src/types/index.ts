export interface HourlySlot {
  id: string; // e.g. "09:00"
  label: string; // e.g. "09:00 AM - 10:00 AM"
  hour24: number; // 9
  stationId: string; // "st-1" | "st-2"
  isBooked: boolean;
  bookedBy?: string; // Name of person who booked (e.g. "Rahul")
  playerCount?: number;
}

export interface DayAvailability {
  dateString: string; // YYYY-MM-DD
  slots: HourlySlot[];
}

export interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  slotId: string; // "09:00"
  slotLabel: string;
  stationId?: string; // "st-1" | "st-2"
  stationName?: string; // "STATION 01" | "STATION 02"
  playerCount: number;
  price: number;
  paymentMethod: 'upi' | 'card' | 'cash';
  createdAt: string;
  status?: 'confirmed' | 'cancelled';
}

export interface GamingStation {
  id: string;
  name: string;
  status: 'available' | 'occupied';
  specs: string;
  currentTitle?: string;
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

export interface GameItem {
  id: string;
  title: string;
  genre: string;
  image: string;
  players: string;
  badge?: string;
}

export interface LeaderboardEntry {
  rank: number;
  player: string;
  handle: string;
  wins: number;
  points: number;
  favoriteGame: string;
  avatar: string;
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

export interface GalleryItem {
  id: string;
  title: string;
  category: 'setups' | 'controllers' | 'screens' | 'ambience' | 'players' | 'interior';
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

export type ServiceType = 'instant' | 'rental' | 'outstation' | 'airport' | 'self-drive';

export type VehicleTier = 'mini' | 'hatchback' | 'sedan' | 'suv' | 'premium';

export type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export type PaymentMethodType = 'upi' | 'cash' | 'card' | 'wallet';

export interface BookingState {
  serviceType: ServiceType;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  returnDate?: string;
  rentalPackage?: string; // e.g. "4 Hours / 40 km"
  rentalDurationHours?: number;
  flightNumber?: string;
  terminal?: string;
  tripType?: 'one-way' | 'round-trip';
  passengers: number;
  luggageCount: number;
  selectedVehicleTier: VehicleTier;
  estimatedPrice: number;
  estimatedDuration: string;
  estimatedDistance: string;
}

export interface Vehicle {
  id: string;
  name: string;
  tier: VehicleTier;
  brand: string;
  model: string;
  tagline: string;
  description: string;
  image: string;
  seats: number;
  luggage: number;
  hasAC: boolean;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol / CNG' | 'Diesel' | '100% Electric' | 'Hybrid';
  baseFare: number;
  ratePerKm: number;
  perMinuteRate: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  specs: {
    bootSpace?: string;
    mileageOrRange?: string;
    comfortRating: string;
    safetyAirbags?: string;
    acceleration?: string;
    range?: string;
    audioSystem?: string;
  };
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  rating: number;
  tripsCount: number;
  avatar: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleColor: string;
  otp: string;
  languages: string[];
}

export interface FareBreakdown {
  baseFare: number;
  distanceFare: number;
  estimatedDistance: string;
  estimatedDuration: string;
  driverAllowance: number;
  tollsAndParking: number;
  taxesAndGst: number;
  discount: number;
  totalFare: number;
}

export interface CustomerBooking {
  id: string; // e.g. WV-IN-74921
  serviceType: ServiceType;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  returnDate?: string;
  rentalPackage?: string;
  flightNumber?: string;
  terminal?: string;
  tripType?: 'one-way' | 'round-trip';
  passengers: number;
  luggageCount: number;
  vehicleTier: VehicleTier;
  vehicleName: string;
  vehicleModel: string;
  vehicleImage: string;
  status: BookingStatus;
  fareBreakdown: FareBreakdown;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  driver?: DriverInfo;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: string;
  trackingProgress: number; // 0 to 100 for simulated route
  trackingStatusText: string;
  notes?: string;
}

export interface SavedAddress {
  id: string;
  label: string; // Home, Office, Airport, Parents
  tag: 'home' | 'work' | 'airport' | 'other';
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  alertOnRideStart: boolean;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  title: string;
  description: string;
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
  bookingId?: string;
  paymentMethod?: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  city: string;
  walletBalance: number;
  coins: number;
  memberTier: 'Classic' | 'Silver' | 'Gold' | 'Black Privileged';
  savedAddresses: SavedAddress[];
  emergencyContacts: EmergencyContact[];
  preferences: {
    acPreference: 'moderate' | 'chill' | 'off';
    quietRide: boolean;
    assistLuggage: boolean;
    preferredLanguage: string;
  };
}

export interface PromoOffer {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  description: string;
  minBookingAmount: number;
  validTill: string;
  serviceApplicable?: ServiceType;
}

export interface ServiceCardData {
  id: ServiceType;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  startingPrice: string;
  image: string;
  perks: string[];
  idealFor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  tripType: string;
  route: string;
  verified: boolean;
}

export interface WhyChooseItem {
  iconName: string;
  title: string;
  description: string;
  highlight: string;
  badge?: string;
}

export interface HowItWorksStep {
  step: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  iconName: string;
}

export type PortalType = 'customer' | 'driver' | 'admin';

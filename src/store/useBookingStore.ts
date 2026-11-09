import { create } from 'zustand';
import { BookingState, ServiceType, VehicleTier } from '../types';

interface BookingStore extends BookingState {
  setServiceType: (serviceType: ServiceType) => void;
  setPickupLocation: (location: string) => void;
  setDestination: (destination: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setReturnDate: (returnDate: string) => void;
  setRentalPackage: (pkg: string) => void;
  setRentalDurationHours: (hours: number) => void;
  setFlightNumber: (flightNumber: string) => void;
  setTerminal: (terminal: string) => void;
  setTripType: (tripType: 'one-way' | 'round-trip') => void;
  setPassengers: (passengers: number) => void;
  setLuggageCount: (luggage: number) => void;
  setSelectedVehicleTier: (tier: VehicleTier) => void;
  setBookingData: (data: Partial<BookingState>) => void;
  resetBooking: () => void;
  getCalculatedEstimate: () => {
    fare: number;
    duration: string;
    distance: string;
    baseFare: number;
    distanceFare: number;
    tollsAndParking: number;
    driverAllowance: number;
    taxesAndGst: number;
  };
}

const getTodayDateString = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

const getNowTimeString = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 20);
  return now.toTimeString().slice(0, 5);
};

export const calculateIndianPrice = (
  service: ServiceType,
  tier: VehicleTier,
  pickup: string,
  destination: string,
  hours?: number,
  tripType: 'one-way' | 'round-trip' = 'one-way'
) => {
  const tierRates: Record<VehicleTier, { base: number; perKm: number; multiplier: number }> = {
    mini: { base: 70, perKm: 11.5, multiplier: 1.0 },
    hatchback: { base: 90, perKm: 13.0, multiplier: 1.15 },
    sedan: { base: 130, perKm: 15.5, multiplier: 1.4 },
    suv: { base: 190, perKm: 19.0, multiplier: 1.8 },
    premium: { base: 290, perKm: 24.0, multiplier: 2.4 },
  };

  const rates = tierRates[tier] || tierRates.sedan;

  let estKm = 16.5;
  let duration = '35 mins';
  let tolls = 0;
  let driverAllowance = 0;

  if (service === 'airport') {
    estKm = 24.5;
    duration = '45 mins';
    tolls = 75; // Airport parking & access toll
  } else if (service === 'outstation') {
    estKm = tripType === 'round-trip' ? 320 : 160;
    duration = tripType === 'round-trip' ? 'Full Day' : '3h 30m';
    tolls = 180;
    driverAllowance = 400; // Standard Indian driver outstation day/night allowance
  } else if (service === 'rental') {
    const hrs = hours || 4;
    estKm = hrs * 10;
    duration = `${hrs} Hours Reserved`;
    tolls = 50;
  } else if (service === 'self-drive') {
    estKm = 250;
    duration = '24 Hours Slot';
  } else {
    // Instant
    const len = (pickup.length + destination.length) % 15;
    estKm = Math.max(6, 10 + len * 1.5);
    duration = `${Math.round(estKm * 2.2)} mins`;
    if (estKm > 20) tolls = 55;
  }

  let distanceFare = Math.round(estKm * rates.perKm);
  let baseFare = rates.base;

  if (service === 'rental') {
    const hrs = hours || 4;
    baseFare = Math.round(350 * rates.multiplier);
    distanceFare = Math.round((hrs * 180) * rates.multiplier);
  } else if (service === 'self-drive') {
    baseFare = Math.round(1299 * rates.multiplier);
    distanceFare = 0;
  }

  const subtotal = baseFare + distanceFare + tolls + driverAllowance;
  const taxesAndGst = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST for commercial transport
  const fare = Math.round(subtotal + taxesAndGst);

  return {
    fare,
    distance: `${estKm.toFixed(1)} km`,
    duration,
    baseFare,
    distanceFare,
    tollsAndParking: tolls,
    driverAllowance,
    taxesAndGst,
  };
};

const initialBookingState: BookingState = {
  serviceType: 'instant',
  pickupLocation: 'T. Nagar (Panagal Park), Chennai',
  destination: 'Chennai International Airport (MAA - T1 Domestic)',
  date: getTodayDateString(),
  time: getNowTimeString(),
  returnDate: '',
  rentalPackage: '4 Hours / 40 km',
  rentalDurationHours: 4,
  flightNumber: '',
  terminal: 'T1 Domestic',
  tripType: 'one-way',
  passengers: 2,
  luggageCount: 2,
  selectedVehicleTier: 'sedan',
  estimatedPrice: 485,
  estimatedDuration: '40 mins',
  estimatedDistance: '18.5 km',
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialBookingState,

  setServiceType: (serviceType) => {
    set((state) => {
      const est = calculateIndianPrice(
        serviceType,
        state.selectedVehicleTier,
        state.pickupLocation,
        state.destination,
        state.rentalDurationHours,
        state.tripType
      );
      return {
        serviceType,
        estimatedPrice: est.fare,
        estimatedDistance: est.distance,
        estimatedDuration: est.duration,
      };
    });
  },

  setPickupLocation: (pickupLocation) => {
    set((state) => {
      const est = calculateIndianPrice(
        state.serviceType,
        state.selectedVehicleTier,
        pickupLocation,
        state.destination,
        state.rentalDurationHours,
        state.tripType
      );
      return { pickupLocation, estimatedPrice: est.fare, estimatedDistance: est.distance, estimatedDuration: est.duration };
    });
  },

  setDestination: (destination) => {
    set((state) => {
      const est = calculateIndianPrice(
        state.serviceType,
        state.selectedVehicleTier,
        state.pickupLocation,
        destination,
        state.rentalDurationHours,
        state.tripType
      );
      return { destination, estimatedPrice: est.fare, estimatedDistance: est.distance, estimatedDuration: est.duration };
    });
  },

  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setReturnDate: (returnDate) => set({ returnDate }),
  setRentalPackage: (rentalPackage) => set({ rentalPackage }),
  
  setRentalDurationHours: (rentalDurationHours) => {
    set((state) => {
      const est = calculateIndianPrice(
        state.serviceType,
        state.selectedVehicleTier,
        state.pickupLocation,
        state.destination,
        rentalDurationHours,
        state.tripType
      );
      return { rentalDurationHours, estimatedPrice: est.fare, estimatedDistance: est.distance, estimatedDuration: est.duration };
    });
  },

  setFlightNumber: (flightNumber) => set({ flightNumber }),
  setTerminal: (terminal) => set({ terminal }),
  
  setTripType: (tripType) => {
    set((state) => {
      const est = calculateIndianPrice(
        state.serviceType,
        state.selectedVehicleTier,
        state.pickupLocation,
        state.destination,
        state.rentalDurationHours,
        tripType
      );
      return { tripType, estimatedPrice: est.fare, estimatedDistance: est.distance, estimatedDuration: est.duration };
    });
  },

  setPassengers: (passengers) => set({ passengers }),
  setLuggageCount: (luggageCount) => set({ luggageCount }),

  setSelectedVehicleTier: (selectedVehicleTier) => {
    set((state) => {
      const est = calculateIndianPrice(
        state.serviceType,
        selectedVehicleTier,
        state.pickupLocation,
        state.destination,
        state.rentalDurationHours,
        state.tripType
      );
      return {
        selectedVehicleTier,
        estimatedPrice: est.fare,
        estimatedDistance: est.distance,
        estimatedDuration: est.duration,
      };
    });
  },

  setBookingData: (data) => set((state) => ({ ...state, ...data })),

  resetBooking: () => set(initialBookingState),

  getCalculatedEstimate: () => {
    const state = get();
    return calculateIndianPrice(
      state.serviceType,
      state.selectedVehicleTier,
      state.pickupLocation,
      state.destination,
      state.rentalDurationHours,
      state.tripType
    );
  },
}));

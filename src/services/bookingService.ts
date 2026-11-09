import { BookingState, VehicleTier, ServiceType } from '../types';

export const bookingService = {
  /**
   * Simulates Indian dispatch price estimation with simulated network latency
   */
  async calculateTripEstimate(data: Partial<BookingState>) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const basePrices: Record<ServiceType, number> = {
      instant: 120,
      rental: 999,
      outstation: 2850,
      airport: 650,
      'self-drive': 1499,
    };

    const multipliers: Record<VehicleTier, number> = {
      mini: 0.85,
      hatchback: 1.0,
      sedan: 1.35,
      suv: 1.75,
      premium: 2.4,
    };

    const service = data.serviceType || 'instant';
    const tier = data.selectedVehicleTier || 'sedan';
    const fare = Math.round(basePrices[service] * (multipliers[tier] || 1.35));

    return {
      fare,
      distance: '18.5 km',
      duration: '38 mins',
      currency: 'INR',
      co2OffsetKg: 3.8,
    };
  },

  /**
   * Mock Indian trip submission
   */
  async submitBooking(booking: BookingState) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      bookingId: `WV-IN-${Math.floor(10000 + Math.random() * 90000)}`,
      booking,
      createdAt: new Date().toISOString(),
    };
  },
};

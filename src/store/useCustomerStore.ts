import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CustomerProfile,
  CustomerBooking,
  WalletTransaction,
  SavedAddress,
  EmergencyContact,
  ServiceType,
  PaymentMethodType,
} from '../types';
import {
  INITIAL_CUSTOMER_PROFILE,
  INITIAL_WALLET_TRANSACTIONS,
  MOCK_DRIVERS,
  DEMO_PROMOS,
} from '../data/mockData';

interface CustomerStore {
  profile: CustomerProfile;
  bookings: CustomerBooking[];
  walletTransactions: WalletTransaction[];
  activeBookingId: string | null;
  selectedCity: string;
  appliedPromo: { code: string; discount: number } | null;

  // Actions
  setSelectedCity: (city: string) => void;
  updateProfile: (data: Partial<CustomerProfile>) => void;
  addSavedAddress: (address: Omit<SavedAddress, 'id'>) => void;
  deleteSavedAddress: (id: string) => void;
  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  deleteEmergencyContact: (id: string) => void;
  addWalletMoney: (amount: number, paymentMethod: string) => void;
  createBooking: (
    bookingData: Omit<CustomerBooking, 'id' | 'createdAt' | 'trackingProgress' | 'trackingStatusText'>
  ) => CustomerBooking;
  updateBooking: (bookingId: string, updates: Partial<CustomerBooking>) => void;
  acceptBooking: (bookingId: string) => { success: boolean; message: string };
  cancelBooking: (bookingId: string, reason?: string) => { success: boolean; message: string; refundedAmount?: number };
  getBookingById: (id: string) => CustomerBooking | undefined;
  applyPromoCode: (code: string, service: ServiceType, subtotal: number) => { success: boolean; discount: number; message: string };
  removePromoCode: () => void;
  resetToDemoDefaults: () => void;
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      profile: INITIAL_CUSTOMER_PROFILE,
      bookings: [],
      walletTransactions: INITIAL_WALLET_TRANSACTIONS,
      activeBookingId: null,
      selectedCity: 'Chennai',
      appliedPromo: null,

      setSelectedCity: (selectedCity) => set({ selectedCity }),

      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),

      addSavedAddress: (addressData) =>
        set((state) => {
          const newAddress: SavedAddress = {
            ...addressData,
            id: `addr-${Date.now()}`,
          };
          return {
            profile: {
              ...state.profile,
              savedAddresses: [newAddress, ...state.profile.savedAddresses],
            },
          };
        }),

      deleteSavedAddress: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            savedAddresses: state.profile.savedAddresses.filter((a) => a.id !== id),
          },
        })),

      addEmergencyContact: (contactData) =>
        set((state) => {
          const newContact: EmergencyContact = {
            ...contactData,
            id: `ec-${Date.now()}`,
          };
          return {
            profile: {
              ...state.profile,
              emergencyContacts: [...state.profile.emergencyContacts, newContact],
            },
          };
        }),

      deleteEmergencyContact: (id) =>
        set((state) => ({
          profile: {
            ...state.profile,
            emergencyContacts: state.profile.emergencyContacts.filter((c) => c.id !== id),
          },
        })),

      addWalletMoney: (amount, paymentMethod) =>
        set((state) => {
          const newTx: WalletTransaction = {
            id: `tx-${Date.now()}`,
            type: 'credit',
            title: `Wallet Top-Up via ${paymentMethod}`,
            description: `Instant digital credit to WAYVIA Wallet`,
            amount,
            date: new Date().toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            status: 'success',
            paymentMethod,
          };

          return {
            profile: {
              ...state.profile,
              walletBalance: state.profile.walletBalance + amount,
              coins: state.profile.coins + Math.round(amount * 0.05), // 5% bonus coins
            },
            walletTransactions: [newTx, ...state.walletTransactions],
          };
        }),

      createBooking: (bookingData) => {
        const state = get();
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const bookingId = `WV-IN-${randomNum}`;

        const newBooking: CustomerBooking = {
          ...bookingData,
          id: bookingId,
          createdAt: new Date().toISOString(),
          driver: undefined,
          status: 'upcoming',
          trackingProgress: 0,
          trackingStatusText: bookingData.serviceType === 'self-drive'
            ? 'Self-drive rental confirmed. Vehicle preparation is pending.'
            : 'Booking confirmed. Waiting for a driver to accept your request.',
        };

        // If payment method is wallet, deduct from wallet
        let updatedProfile = state.profile;
        let updatedTransactions = state.walletTransactions;

        if (bookingData.paymentMethod === 'wallet') {
          const fare = bookingData.fareBreakdown.totalFare;
          updatedProfile = {
            ...state.profile,
            walletBalance: Math.max(0, state.profile.walletBalance - fare),
          };
          const debitTx: WalletTransaction = {
            id: `tx-${Date.now()}`,
            type: 'debit',
            title: `Ride Payment #${bookingId}`,
            description: `${bookingData.serviceType.toUpperCase()}: ${bookingData.pickupLocation.split(',')[0]} to ${bookingData.destination.split(',')[0]}`,
            amount: fare,
            date: new Date().toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            status: 'success',
            bookingId,
          };
          updatedTransactions = [debitTx, ...state.walletTransactions];
        }

        set({
          bookings: [newBooking, ...state.bookings],
          activeBookingId: bookingId,
          profile: updatedProfile,
          walletTransactions: updatedTransactions,
          appliedPromo: null,
        });

        return newBooking;
      },

      updateBooking: (bookingId, updates) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, ...updates } : booking
          ),
          activeBookingId:
            updates.status === 'completed' || updates.status === 'cancelled'
              ? state.activeBookingId === bookingId ? null : state.activeBookingId
              : state.activeBookingId,
        })),

      acceptBooking: (bookingId) => {
        const booking = get().bookings.find((item) => item.id === bookingId);
        if (!booking) return { success: false, message: 'Booking not found.' };
        if (booking.status !== 'upcoming') return { success: false, message: 'This request is no longer available.' };
        if (booking.serviceType === 'self-drive') {
          return { success: false, message: 'Self-drive bookings do not require a chauffeur.' };
        }
        const assignedDriver = MOCK_DRIVERS[0];
        get().updateBooking(bookingId, {
          driver: assignedDriver,
          status: 'active',
          trackingProgress: 25,
          trackingStatusText: `${assignedDriver.name} accepted your trip and is heading to the pickup point.`,
        });
        return { success: true, message: `Trip ${bookingId} accepted. Head to the pickup point.` };
      },

      cancelBooking: (bookingId, reason = 'Customer requested cancellation') => {
        const state = get();
        const booking = state.bookings.find((b) => b.id === bookingId);

        if (!booking) {
          return { success: false, message: 'Booking not found.' };
        }

        if (booking.status === 'completed' || booking.status === 'cancelled') {
          return { success: false, message: `Cannot cancel a ${booking.status} ride.` };
        }

        let refundedAmount = 0;
        let updatedProfile = state.profile;
        let updatedTransactions = state.walletTransactions;

        // Refund full amount to wallet if paid via wallet, UPI, or card
        if (booking.paymentStatus === 'paid') {
          refundedAmount = booking.fareBreakdown.totalFare;
          updatedProfile = {
            ...state.profile,
            walletBalance: state.profile.walletBalance + refundedAmount,
          };

          const refundTx: WalletTransaction = {
            id: `tx-${Date.now()}`,
            type: 'credit',
            title: `Refund for Cancelled Ride #${bookingId}`,
            description: `Full refund credited: ${reason}`,
            amount: refundedAmount,
            date: new Date().toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            status: 'success',
            bookingId,
          };

          updatedTransactions = [refundTx, ...state.walletTransactions];
        }

        const updatedBookings = state.bookings.map((b) =>
          b.id === bookingId
            ? {
                ...b,
                status: 'cancelled' as const,
                paymentStatus: refundedAmount > 0 ? ('refunded' as const) : b.paymentStatus,
                trackingStatusText: `Ride cancelled: ${reason}`,
              }
            : b
        );

        set({
          bookings: updatedBookings,
          profile: updatedProfile,
          walletTransactions: updatedTransactions,
          activeBookingId: state.activeBookingId === bookingId ? null : state.activeBookingId,
        });

        return {
          success: true,
          message: refundedAmount > 0
            ? `Ride cancelled. ₹${refundedAmount.toFixed(2)} refunded to your WAYVIA Wallet.`
            : 'Ride cancelled successfully with zero cancellation fee.',
          refundedAmount,
        };
      },

      getBookingById: (id) => {
        const state = get();
        return state.bookings.find((b) => b.id === id);
      },

      applyPromoCode: (code, service, subtotal) => {
        const promo = DEMO_PROMOS.find(
          (p) => p.code.toUpperCase() === code.trim().toUpperCase()
        );

        if (!promo) {
          return { success: false, discount: 0, message: 'Invalid promo coupon code.' };
        }

        if (promo.serviceApplicable && promo.serviceApplicable !== service) {
          return {
            success: false,
            discount: 0,
            message: `Coupon is valid only for ${promo.serviceApplicable.toUpperCase()} bookings.`,
          };
        }

        if (subtotal < promo.minBookingAmount) {
          return {
            success: false,
            discount: 0,
            message: `Minimum booking value of ₹${promo.minBookingAmount} required.`,
          };
        }

        let discount = 0;
        if (promo.discountType === 'flat') {
          discount = promo.discountValue;
        } else {
          discount = Math.min(350, Math.round((subtotal * promo.discountValue) / 100));
        }

        set({ appliedPromo: { code: promo.code, discount } });

        return {
          success: true,
          discount,
          message: `Coupon ${promo.code} applied! ₹${discount} savings.`,
        };
      },

      removePromoCode: () => set({ appliedPromo: null }),

      resetToDemoDefaults: () =>
        set({
          profile: INITIAL_CUSTOMER_PROFILE,
          bookings: [],
          walletTransactions: INITIAL_WALLET_TRANSACTIONS,
          activeBookingId: null,
          selectedCity: 'Chennai',
          appliedPromo: null,
        }),
    }),
    {
      name: 'wayvia-customer-storage',
      version: 2,
      migrate: (persistedState) => ({
        ...(persistedState as Partial<CustomerStore>),
        bookings: [],
        activeBookingId: null,
      } as CustomerStore),
      partialize: (state) => ({
        profile: state.profile,
        bookings: state.bookings,
        walletTransactions: state.walletTransactions,
        activeBookingId: state.activeBookingId,
        selectedCity: state.selectedCity,
      }),
    }
  )
);


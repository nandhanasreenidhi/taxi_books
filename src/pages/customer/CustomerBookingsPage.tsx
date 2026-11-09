import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Car,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Filter,
  ArrowRight,
  ShieldAlert,
  X,
  CreditCard,
  User,
} from 'lucide-react';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useCustomerStore } from '../../store/useCustomerStore';
import { CustomerBooking, BookingStatus } from '../../types';
import { Button } from '../../components/common/Button';
import { fadeInUp } from '../../styles/animations';

export const CustomerBookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookings, cancelBooking } = useCustomerStore();

  const [activeTab, setActiveTab] = useState<'all' | BookingStatus>('all');
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<CustomerBooking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of schedule');
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState<CustomerBooking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const handleConfirmCancel = () => {
    if (!selectedBookingForCancel) return;
    const res = cancelBooking(selectedBookingForCancel.id, cancelReason);
    setCancelFeedback(res.message);
    setTimeout(() => {
      setCancelFeedback(null);
      setSelectedBookingForCancel(null);
    }, 2000);
  };

  const statusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-mint-100 text-mint-900 border border-mint-300">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
            Active Trip
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-navy-100 text-navy-900 border border-navy-300">
            Upcoming
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-700 border border-charcoal-200">
            Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Cancelled
          </span>
        );
    }
  };

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
              My Bookings & Invoices
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              View upcoming journeys, inspect itemized GST tax invoices, or track active chauffeurs.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={PlusCircle}
            onClick={() => navigate('/customer/book')}
            className="self-start sm:self-auto font-bold"
          >
            Book New Ride
          </Button>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {[
            { id: 'all', label: `All Rides (${bookings.length})` },
            { id: 'active', label: `Active (${bookings.filter((b) => b.status === 'active').length})` },
            { id: 'upcoming', label: `Upcoming (${bookings.filter((b) => b.status === 'upcoming').length})` },
            { id: 'completed', label: `Completed (${bookings.filter((b) => b.status === 'completed').length})` },
            { id: 'cancelled', label: `Cancelled (${bookings.filter((b) => b.status === 'cancelled').length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-navy-900 text-ivory-100 shadow-sm'
                  : 'bg-white text-charcoal-600 hover:bg-ivory-100 border border-ivory-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-ivory-300 shadow-sm">
            <Car className="w-12 h-12 text-charcoal-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-navy-900">No {activeTab} bookings found</h3>
            <p className="text-xs text-charcoal-500 mt-1 max-w-sm mx-auto">
              You do not have any rides matching this status. Ready for your next journey?
            </p>
            <Button
              variant="mint"
              size="sm"
              icon={PlusCircle}
              onClick={() => navigate('/customer/book')}
              className="mt-5 font-bold"
            >
              Book a Ride Now
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <motion.div
                key={b.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-3xl p-5 sm:p-6 border border-ivory-300 shadow-sm hover:border-navy-900/20 transition-all flex flex-col justify-between"
              >
                {/* Top Row: ID, Service, Status & Fare */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ivory-200 pb-4 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-black text-navy-900 bg-ivory-100 px-2.5 py-1 rounded-lg">
                      {b.id}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 bg-ivory-100 px-2.5 py-1 rounded-lg">
                      {b.serviceType}
                    </span>
                    {statusBadge(b.status)}
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-lg font-black text-navy-900">
                      ₹{b.fareBreakdown.totalFare.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-charcoal-400 block">
                      Paid via {b.paymentMethod.toUpperCase()} ({b.paymentStatus})
                    </span>
                  </div>
                </div>

                {/* Middle Row: Route & Vehicle Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left 8 cols: Itinerary & Date */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-mint-500 ring-4 ring-mint-100 shrink-0 mt-1" />
                      <div className="text-xs">
                        <span className="text-[10px] uppercase font-bold text-charcoal-400 block">Pickup</span>
                        <span className="font-bold text-navy-900">{b.pickupLocation}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-gold-500 ring-4 ring-gold-100 shrink-0 mt-1" />
                      <div className="text-xs">
                        <span className="text-[10px] uppercase font-bold text-charcoal-400 block">Destination</span>
                        <span className="font-bold text-navy-900">{b.destination}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-charcoal-500 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-navy-900">
                        <Calendar className="w-3.5 h-3.5 text-mint-600" /> {b.date} at {b.time}
                      </span>
                      <span>•</span>
                      <span>{b.fareBreakdown.estimatedDistance}</span>
                      <span>•</span>
                      <span>~{b.fareBreakdown.estimatedDuration}</span>
                    </div>
                  </div>

                  {/* Right 4 cols: Vehicle & Chauffeur Snippet */}
                  <div className="md:col-span-4 p-3 rounded-2xl bg-ivory-50/80 border border-ivory-200 text-xs">
                    <div className="font-bold text-navy-900">{b.vehicleName}</div>
                    <div className="text-charcoal-500 text-[11px]">{b.vehicleModel}</div>
                    {b.driver ? (
                      <div className="mt-2 pt-2 border-t border-ivory-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-navy-900">{b.driver.name}</div>
                          <div className="font-mono text-[10px] text-charcoal-500">{b.driver.vehiclePlate}</div>
                        </div>
                        <span className="text-[10px] font-bold text-gold-700 bg-gold-100 px-2 py-0.5 rounded">
                          ★ {b.driver.rating}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2 text-[11px] text-charcoal-400">Chauffeur details assigned upon dispatch</div>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Actions */}
                <div className="mt-5 pt-4 border-t border-ivory-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-charcoal-500 italic">
                    {b.trackingStatusText}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Live Tracking CTA */}
                    {(b.status === 'active' || b.status === 'upcoming') && (
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Navigation}
                        onClick={() => navigate(`/customer/tracking/${b.id}`)}
                        className="text-xs font-bold whitespace-nowrap"
                      >
                        Track Live
                      </Button>
                    )}

                    {/* Tax Invoice button */}
                    <button
                      onClick={() => setSelectedInvoiceBooking(b)}
                      className="px-3 py-1.5 rounded-xl border border-ivory-300 hover:bg-ivory-100 text-xs font-bold text-navy-900 flex items-center gap-1.5 whitespace-nowrap transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-charcoal-500" />
                      <span>Tax Invoice</span>
                    </button>

                    {/* Cancel action if not completed/cancelled */}
                    {(b.status === 'active' || b.status === 'upcoming') && (
                      <button
                        onClick={() => setSelectedBookingForCancel(b)}
                        className="px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-xs font-bold text-rose-700 whitespace-nowrap transition-colors"
                      >
                        Cancel Ride
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {selectedBookingForCancel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBookingForCancel(null)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-floating border border-ivory-300 z-10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Cancel Ride Booking</span>
                </div>
                <button
                  onClick={() => setSelectedBookingForCancel(null)}
                  className="p-1 rounded-full text-charcoal-400 hover:text-navy-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-display font-extrabold text-navy-900">
                Cancel Booking #{selectedBookingForCancel.id}?
              </h3>

              <p className="text-xs text-charcoal-600 mt-2">
                Under the WAYVIA Zero Cancellation Fee policy, 100% of your prepaid fare (₹{selectedBookingForCancel.fareBreakdown.totalFare.toFixed(2)}) will be immediately credited back to your WAYVIA Wallet.
              </p>

              {cancelFeedback ? (
                <div className="my-5 p-3 rounded-xl bg-mint-100 text-mint-800 text-xs font-bold text-center">
                  <CheckCircle2 className="w-5 h-5 mx-auto mb-1 text-mint-700" />
                  {cancelFeedback}
                </div>
              ) : (
                <>
                  <div className="my-4">
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Reason for Cancellation
                    </label>
                    <select
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-ivory-300 text-xs font-semibold text-navy-900"
                    >
                      <option value="Change of travel plans">Change of travel plans</option>
                      <option value="Booked by mistake">Booked by mistake</option>
                      <option value="Chauffeur too far">Chauffeur taking longer than expected</option>
                      <option value="Found alternative ride">Found alternative transport</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setSelectedBookingForCancel(null)}
                      className="flex-1 py-2.5 rounded-xl border border-ivory-300 text-xs font-bold text-charcoal-700 hover:bg-ivory-100"
                    >
                      Keep Booking
                    </button>
                    <button
                      onClick={handleConfirmCancel}
                      className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tax Invoice Modal */}
      <AnimatePresence>
        {selectedInvoiceBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoiceBooking(null)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-floating border border-ivory-300 z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-ivory-200 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-mint-600 uppercase tracking-widest">
                    GST TAX INVOICE
                  </span>
                  <h3 className="text-lg font-bold text-navy-900">
                    WAYVIA Technologies India Pvt. Ltd.
                  </h3>
                  <div className="text-[10px] text-charcoal-400">
                    GSTIN: 33AAACW9821M1ZX • CIN: U63090TN2026PTC10928
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInvoiceBooking(null)}
                  className="p-1 rounded-full text-charcoal-400 hover:text-navy-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Invoice No:</span>
                  <span className="font-mono font-bold text-navy-900">INV-2026-{selectedInvoiceBooking.id.replace('WV-IN-', '')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Billed To:</span>
                  <span className="font-bold text-navy-900">{selectedInvoiceBooking.customer.name} ({selectedInvoiceBooking.customer.phone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Journey Itinerary:</span>
                  <span className="font-semibold text-navy-900 text-right max-w-xs truncate">
                    {selectedInvoiceBooking.pickupLocation.split(',')[0]} → {selectedInvoiceBooking.destination.split(',')[0]}
                  </span>
                </div>

                <div className="border-t border-ivory-200 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Base Fare & Distance Charges</span>
                    <span>₹{(selectedInvoiceBooking.fareBreakdown.baseFare + selectedInvoiceBooking.fareBreakdown.distanceFare).toFixed(2)}</span>
                  </div>
                  {selectedInvoiceBooking.fareBreakdown.tollsAndParking > 0 && (
                    <div className="flex justify-between">
                      <span className="text-charcoal-600">Fastag Electronic Tolls</span>
                      <span>₹{selectedInvoiceBooking.fareBreakdown.tollsAndParking.toFixed(2)}</span>
                    </div>
                  )}
                  {selectedInvoiceBooking.fareBreakdown.driverAllowance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-charcoal-600">Driver Allowance (Outstation)</span>
                      <span>₹{selectedInvoiceBooking.fareBreakdown.driverAllowance.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">CGST (2.5%) + SGST (2.5%)</span>
                    <span>₹{selectedInvoiceBooking.fareBreakdown.taxesAndGst.toFixed(2)}</span>
                  </div>
                  {selectedInvoiceBooking.fareBreakdown.discount > 0 && (
                    <div className="flex justify-between text-mint-700 font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{selectedInvoiceBooking.fareBreakdown.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-navy-900/10 flex justify-between font-black text-sm text-navy-900">
                    <span>Total Paid (INR)</span>
                    <span className="text-mint-700">₹{selectedInvoiceBooking.fareBreakdown.totalFare.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-ivory-200 flex gap-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    alert('Demo receipt downloaded to your device.');
                    setSelectedInvoiceBooking(null);
                  }}
                >
                  Download PDF Invoice
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CustomerLayout>
  );
};

export default CustomerBookingsPage;


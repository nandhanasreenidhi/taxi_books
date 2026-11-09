import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Navigation,
  Car,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  PhoneCall,
} from 'lucide-react';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useCustomerStore } from '../../store/useCustomerStore';
import { useBookingStore } from '../../store/useBookingStore';
import { SERVICES_DATA, DEMO_PROMOS } from '../../data/mockData';
import { ServiceType } from '../../types';
import { Button } from '../../components/common/Button';
import { fadeInUp, staggerContainer } from '../../styles/animations';

export const CustomerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile, bookings, selectedCity, applyPromoCode } = useCustomerStore();
  const { setServiceType, setPickupLocation, setDestination } = useBookingStore();

  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const activeOrUpcomingBooking = bookings.find(
    (b) => b.status === 'active' || b.status === 'upcoming'
  );

  const recentCompletedBookings = bookings
    .filter((b) => b.status === 'completed' || b.status === 'cancelled')
    .slice(0, 3);

  const handleQuickServiceSelect = (serviceId: ServiceType) => {
    setServiceType(serviceId);
    navigate('/customer/book');
  };

  const handleBookSavedLocation = (address: string) => {
    setDestination(address);
    navigate('/customer/book');
  };

  const handleCopyPromo = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyPromoCode(code, 'instant', 600);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <CustomerLayout>
      {/* Personalized Welcome Banner */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="bg-navy-950 text-ivory-100 rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-floating mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-mint-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-60 h-60 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-mint-300">
                Namaste, {profile.name.split(' ')[0]}
              </span>
              <span className="text-[10px] bg-gold-400/20 text-gold-300 border border-gold-400/40 px-2 py-0.5 rounded-full font-bold">
                {profile.memberTier} Member
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-ivory-100 tracking-tight">
              Where would you like to travel today?
            </h1>
            <p className="text-xs sm:text-sm text-ivory-300/80 mt-2 max-w-xl">
              Operating seamlessly across {selectedCity} with vetted chauffeurs, guaranteed upfront indicative pricing, and clinical sanitization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="mint"
              size="md"
              icon={ArrowRight}
              onClick={() => navigate('/customer/book')}
              className="font-bold text-navy-950 shadow-glow-mint"
            >
              Book a New Ride
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/customer/bookings')}
              className="text-ivory-100 border-navy-700 hover:bg-navy-900"
            >
              My Bookings ({bookings.length})
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Active Ride Alert Card (If any live trip exists) */}
      {activeOrUpcomingBooking && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-mint-50 to-white border-2 border-mint-300 shadow-premium flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-mint-200 text-mint-900 flex items-center justify-center shrink-0 shadow-xs">
              <Navigation className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-navy-900 font-mono">
                  {activeOrUpcomingBooking.id}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint-200 text-mint-900 uppercase">
                  {activeOrUpcomingBooking.status === 'active' ? 'Trip in Progress' : 'Upcoming Confirmed'}
                </span>
              </div>
              <h2 className="text-sm font-bold text-navy-900 mt-0.5">
                {activeOrUpcomingBooking.pickupLocation.split(',')[0]} → {activeOrUpcomingBooking.destination.split(',')[0]}
              </h2>
              <p className="text-xs text-charcoal-500 mt-0.5">
                {activeOrUpcomingBooking.trackingStatusText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-navy-900">
                ₹{activeOrUpcomingBooking.fareBreakdown.totalFare.toFixed(2)}
              </div>
              <div className="text-[10px] text-mint-700 font-medium">Indicative Fare</div>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Navigation}
              onClick={() => navigate(`/customer/tracking/${activeOrUpcomingBooking.id}`)}
              className="text-xs font-bold whitespace-nowrap"
            >
              Track Live Chauffeur
            </Button>
          </div>
        </motion.div>
      )}

      {/* Available Services Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-extrabold text-navy-900">
              Mobility Services in {selectedCity}
            </h2>
            <p className="text-xs text-charcoal-500">Choose your preferred way to journey</p>
          </div>
          <Link
            to="/customer/book"
            className="text-xs font-bold text-mint-700 hover:text-mint-800 flex items-center gap-1"
          >
            <span>Custom Wizard</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => handleQuickServiceSelect(service.id)}
              className="group p-4 rounded-2xl bg-white border border-ivory-300 hover:border-navy-900/30 hover:shadow-premium transition-all text-left flex flex-col justify-between"
            >
              <div className="relative h-24 rounded-xl overflow-hidden mb-3">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-navy-950/85 text-mint-300">
                  {service.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-navy-900 group-hover:text-mint-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-[10px] text-charcoal-500 line-clamp-1 mt-0.5">
                  {service.tagline}
                </p>
                <div className="mt-2 text-xs font-extrabold text-navy-900">
                  Starts <span className="text-mint-600 font-black">{service.startingPrice}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Locations & Quick Destination Shortcuts */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-extrabold text-navy-900">
              Saved Locations
            </h2>
            <p className="text-xs text-charcoal-500">Tap to instantly initiate a trip to your frequent destination</p>
          </div>
          <Link
            to="/customer/profile"
            className="text-xs font-bold text-navy-900 hover:underline"
          >
            Manage Addresses
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {profile.savedAddresses.map((addr) => (
            <div
              key={addr.id}
              className="p-4 rounded-2xl bg-white border border-ivory-300 hover:border-mint-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-mint-600" />
                    {addr.label}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-charcoal-400 bg-ivory-100 px-2 py-0.5 rounded">
                    {addr.tag}
                  </span>
                </div>
                <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                  {addr.address}
                </p>
                {addr.landmark && (
                  <p className="text-[11px] text-charcoal-400 mt-1 italic">
                    {addr.landmark}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleBookSavedLocation(addr.address)}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-ivory-100 hover:bg-mint-100 hover:text-navy-900 text-charcoal-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Book Ride Here</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Offers & Coupons */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-display font-extrabold text-navy-900">
              Offers & Promo Coupons
            </h2>
            <p className="text-xs text-charcoal-500">Exclusive savings on airport, rentals & outstation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {DEMO_PROMOS.map((promo) => (
            <div
              key={promo.code}
              className="p-4 rounded-2xl bg-white border border-ivory-300 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-extrabold text-navy-900 bg-mint-100 px-2.5 py-1 rounded-lg border border-mint-300">
                    {promo.code}
                  </span>
                  <Tag className="w-4 h-4 text-mint-600" />
                </div>
                <p className="text-xs font-bold text-navy-900 mt-2">
                  {promo.description}
                </p>
                <p className="text-[10px] text-charcoal-400 mt-1">
                  Valid on bookings &gt; ₹{promo.minBookingAmount} • Till {promo.validTill}
                </p>
              </div>

              <button
                onClick={() => handleCopyPromo(promo.code)}
                className={`mt-4 w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  copiedCode === promo.code
                    ? 'bg-mint-400 text-navy-950'
                    : 'bg-navy-900 hover:bg-navy-800 text-ivory-100'
                }`}
              >
                {copiedCode === promo.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Coupon Copied & Applied!</span>
                  </>
                ) : (
                  <span>Apply Coupon</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Trips Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-display font-extrabold text-navy-900">
              Recent Rides
            </h2>
            <p className="text-xs text-charcoal-500">Your latest journeys with itemized tax invoices</p>
          </div>
          <Link
            to="/customer/bookings"
            className="text-xs font-bold text-navy-900 hover:underline flex items-center gap-1"
          >
            <span>View All ({bookings.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentCompletedBookings.map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-ivory-50/80 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-navy-900">{b.id}</span>
                  <span className="text-xs text-charcoal-400">•</span>
                  <span className="text-xs text-charcoal-500">{b.date}</span>
                  <span className="text-xs text-charcoal-400">•</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-ivory-200 text-charcoal-700 uppercase">
                    {b.serviceType}
                  </span>
                </div>
                <div className="text-sm font-semibold text-navy-900 mt-1">
                  {b.pickupLocation.split(',')[0]} → {b.destination.split(',')[0]}
                </div>
                <div className="text-xs text-charcoal-500 mt-0.5">
                  {b.vehicleName} ({b.vehicleModel})
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-right">
                  <div className="font-bold text-sm text-navy-900">
                    ₹{b.fareBreakdown.totalFare.toFixed(2)}
                  </div>
                  <div className={`text-[11px] font-semibold ${
                    b.status === 'completed' ? 'text-mint-600' : 'text-rose-500'
                  }`}>
                    {b.status.toUpperCase()}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/customer/bookings')}
                  className="text-xs"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 24/7 Concierge Support Banner */}
      <div className="p-6 rounded-3xl bg-navy-900 text-ivory-100 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-mint-400/10 text-mint-300 flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-ivory-100">
              Need Assistance or Lost an Item?
            </h3>
            <p className="text-xs text-ivory-300/80 mt-0.5">
              Our 24/7 Indian customer concierge is available in English, Tamil, Hindi, and Kannada.
            </p>
          </div>
        </div>

        <Button
          variant="gold"
          size="sm"
          icon={HelpCircle}
          onClick={() => navigate('/customer/support')}
          className="font-bold whitespace-nowrap"
        >
          Open Support Center
        </Button>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboardPage;


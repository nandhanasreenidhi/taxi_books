import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Calendar,
  Wallet,
  User,
  HelpCircle,
  PlusCircle,
  MapPin,
  ShieldAlert,
  ChevronDown,
  LogOut,
  Bell,
  Navigation,
  PhoneCall,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { useCustomerStore } from '../store/useCustomerStore';
import { APP_CONFIG } from '../app/config';

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, selectedCity, setSelectedCity, bookings, activeBookingId } = useCustomerStore();

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [sosSent, setSosSent] = useState(false);

  // Prefer an in-progress trip over a newer upcoming request for the header shortcut.
  const activeBooking = bookings.find((b) => b.status === 'active')
    ?? bookings.find((b) => b.id === activeBookingId && b.status === 'upcoming')
    ?? bookings.find((b) => b.status === 'upcoming');

  const navItems = [
    { label: 'Dashboard', path: '/customer', icon: Compass },
    { label: 'Book a Ride', path: '/customer/book', icon: PlusCircle },
    { label: 'My Bookings', path: '/customer/bookings', icon: Calendar },
    { label: 'Wallet', path: '/customer/wallet', icon: Wallet },
    { label: 'Profile', path: '/customer/profile', icon: User },
    { label: 'Support', path: '/customer/support', icon: HelpCircle },
  ];

  const handleSosTrigger = () => {
    setSosSent(true);
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-700 flex flex-col antialiased selection:bg-mint-300 selection:text-navy-900 pb-24 min-[1100px]:pb-0">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-ivory-300 py-3.5 px-3 min-[360px]:px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & City Selector */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <Logo variant="dark" className="max-[359px]:gap-2 max-[359px]:[&_.font-display]:text-xl" />

            {/* Indian City Selector */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ivory-100 hover:bg-ivory-200 text-xs font-bold text-navy-900 border border-ivory-300 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-mint-600" />
                <span className="max-xl:min-[1100px]:hidden xl:inline">{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-charcoal-400" />
              </button>

              <AnimatePresence>
                {isCityDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-floating border border-ivory-300 p-2 z-50"
                  >
                    <div className="text-[10px] font-bold text-charcoal-400 uppercase px-2.5 py-1">
                      Operating Metro
                    </div>
                    {APP_CONFIG.brand.operatingCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between transition-colors ${
                          selectedCity === city
                            ? 'bg-mint-100 text-mint-800'
                            : 'text-charcoal-700 hover:bg-ivory-100'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <CheckCircle2 className="w-3.5 h-3.5 text-mint-600" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden min-[1100px]:flex items-center gap-1 bg-ivory-100/80 px-2 py-1 rounded-full border border-ivory-300">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/customer'
                  ? location.pathname === '/customer'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-navy-900 text-ivory-100 shadow-sm'
                      : 'text-charcoal-600 hover:text-navy-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Active Trip, Wallet Pill, SOS & Profile */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {/* Active Live Trip Pill */}
            {activeBooking && activeBooking.status === 'active' && (
              <Link
                to={`/customer/tracking/${activeBooking.id}`}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-100 border border-mint-300 text-mint-800 text-xs font-bold animate-pulse hover:bg-mint-200 transition-colors"
                aria-label="Ride active: track live"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span className="max-xl:min-[1100px]:hidden xl:inline">Ride Active: Track Live</span>
              </Link>
            )}

            {/* Emergency SOS Button */}
            <button
              onClick={() => setIsSosModalOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="24/7 Safety & Emergency SOS"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
              <span className="hidden sm:inline max-xl:min-[1100px]:hidden xl:inline">SOS</span>
            </button>

            {/* Wallet Balance Pill */}
            <Link
              to="/customer/wallet"
              className="flex items-center gap-1.5 px-2.5 max-[359px]:px-2 sm:px-3 py-1.5 rounded-full bg-navy-900 text-ivory-100 text-xs max-[359px]:text-[11px] font-bold hover:bg-navy-800 transition-colors shadow-xs"
            >
              <Wallet className="w-3.5 h-3.5 text-mint-300 max-[359px]:hidden" />
              <span>₹{profile.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </Link>

            {/* Profile Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-0.5 sm:p-1 rounded-full hover:ring-2 hover:ring-navy-900/10 transition-all"
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-mint-400"
                />
              </button>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-floating border border-ivory-300 p-2 z-50"
                  >
                    <div className="p-3 border-b border-ivory-200">
                      <div className="font-bold text-sm text-navy-900">{profile.name}</div>
                      <div className="text-xs text-charcoal-400">{profile.phone}</div>
                      <span className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 border border-gold-300">
                        {profile.memberTier} Member • {profile.coins} Coins
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/customer/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-ivory-100 rounded-xl flex items-center gap-2.5 transition-colors"
                      >
                        <User className="w-4 h-4 text-charcoal-400" />
                        <span>Profile & Saved Addresses</span>
                      </Link>
                      <Link
                        to="/customer/bookings"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-ivory-100 rounded-xl flex items-center gap-2.5 transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-charcoal-400" />
                        <span>My Trips & Invoices</span>
                      </Link>
                      <Link
                        to="/customer/wallet"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-ivory-100 rounded-xl flex items-center gap-2.5 transition-colors"
                      >
                        <Wallet className="w-4 h-4 text-charcoal-400" />
                        <span>WAYVIA Wallet & Coins</span>
                      </Link>
                      <Link
                        to="/customer/support"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-charcoal-700 hover:bg-ivory-100 rounded-xl flex items-center gap-2.5 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 text-charcoal-400" />
                        <span>24/7 Concierge Support</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-ivory-200">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          navigate('/');
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Exit Customer Portal</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Mobile-First Bottom Navigation Bar */}
      <div className="min-[1100px]:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-ivory-300 py-2 px-3 pb-[calc(.5rem+env(safe-area-inset-bottom))] shadow-floating">
        <div className="grid grid-cols-5 gap-1 items-center">
          {[
            { label: 'Home', path: '/customer', icon: Compass },
            { label: 'Book', path: '/customer/book', icon: PlusCircle },
            { label: 'Rides', path: '/customer/bookings', icon: Calendar },
            { label: 'Wallet', path: '/customer/wallet', icon: Wallet },
            { label: 'Profile', path: '/customer/profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive =
              tab.path === '/customer'
                ? location.pathname === '/customer'
                : location.pathname.startsWith(tab.path);

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
                  isTabActive
                    ? 'text-navy-900 bg-mint-100 font-extrabold'
                    : 'text-charcoal-500 hover:text-navy-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isTabActive ? 'text-mint-700 stroke-[2.5]' : ''}`} />
                <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 24/7 Safety & SOS Modal */}
      <AnimatePresence>
        {isSosModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSosModalOpen(false)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-floating border border-rose-200 z-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <ShieldAlert className="w-9 h-9 animate-pulse" />
              </div>

              <h3 className="text-xl font-display font-extrabold text-navy-900">
                24/7 Safety & Emergency Response
              </h3>
              <p className="text-xs text-charcoal-600 mt-2 leading-relaxed">
                This demo button does not contact emergency services, share live location, or notify emergency contacts. If you are in immediate danger in India, call 112 directly.
              </p>

              {sosSent ? (
                <div className="my-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-xs font-bold text-rose-800">
                  <CheckCircle2 className="w-6 h-6 text-rose-600 mx-auto mb-1" />
                  DEMO ONLY: No alert was sent. No location was shared and no emergency service was contacted.
                </div>
              ) : (
                <div className="my-6 space-y-2">
                  <button
                    onClick={handleSosTrigger}
                    className="w-full py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>SIMULATE SOS (DEMO ONLY)</span>
                  </button>

                  <a
                    href={`tel:${APP_CONFIG.brand.phoneSupport}`}
                    className="w-full py-3 px-4 rounded-2xl bg-ivory-100 hover:bg-ivory-200 text-navy-900 font-bold text-xs flex items-center justify-center gap-2 border border-ivory-300 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-mint-600" />
                    <span>Call WAYVIA support: {APP_CONFIG.brand.phoneSupport}</span>
                  </a>
                </div>
              )}

              <button
                onClick={() => setIsSosModalOpen(false)}
                className="text-xs font-semibold text-charcoal-400 hover:text-navy-900"
              >
                Close Safety Console
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerLayout;


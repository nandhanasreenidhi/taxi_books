import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Navigation,
  MapPin,
  PhoneCall,
  MessageSquare,
  ShieldAlert,
  Star,
  CheckCircle2,
  Clock,
  Car,
  AlertCircle,
  Share2,
  X,
  Send,
  Sparkles,
} from 'lucide-react';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useCustomerStore } from '../../store/useCustomerStore';
import { Button } from '../../components/common/Button';

export const CustomerTrackingPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { bookings, getBookingById } = useCustomerStore();

  const currentBooking =
    (bookingId ? getBookingById(bookingId) : undefined) ||
    bookings.find((b) => b.status === 'active' || b.status === 'upcoming') ||
    bookings[0];

  // Simulated GPS animation state (0 to 100 progress along route)
  const [carProgress, setCarProgress] = useState(35);
  const [isCalling, setIsCalling] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([
    'Chauffeur Murugan: Namaste madam, I have taken the OMR toll road and will arrive at your gate in 4 minutes.',
  ]);
  const [newChatText, setNewChatText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Animate the car along the route gradually
  useEffect(() => {
    const timer = setInterval(() => {
      setCarProgress((prev) => {
        if (prev >= 95) return 15; // loop simulated animation
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const driver = currentBooking?.driver;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    setChatMessages((prev) => [...prev, `You: ${newChatText}`]);
    const reply = "Chauffeur: Understood madam, waiting at the porch with hazard lights on.";
    setTimeout(() => {
      setChatMessages((prev) => [...prev, reply]);
    }, 1500);
    setNewChatText('');
  };

  const handleShareTrip = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!currentBooking) {
    return (
      <CustomerLayout>
        <div className="bg-white rounded-3xl p-10 text-center border border-ivory-300">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-navy-900">Booking Not Found</h2>
          <Button variant="primary" size="sm" onClick={() => navigate('/customer/bookings')} className="mt-4">
            Back to Bookings
          </Button>
        </div>
      </CustomerLayout>
    );
  }

  // Calculate simulated ETA in minutes
  const etaMinutes = Math.max(1, Math.round((100 - carProgress) / 18));

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Breadcrumb & Disclaimer Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            to="/customer/bookings"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Bookings</span>
          </Link>

          {/* Mandatory Disclaimer */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-100/90 border border-gold-300 text-gold-900 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <span>Simulated Demo Live Telemetry — Not Real World GPS</span>
          </div>
        </div>

        {/* Main Grid: Interactive Map (Left/Top) & Cockpit Control (Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 cols: Simulated Interactive Vector Map */}
          <div className="lg:col-span-7 bg-navy-950 rounded-3xl p-6 border border-navy-800 shadow-floating relative overflow-hidden flex flex-col justify-between min-h-[440px]">
            {/* Map Header Overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="bg-navy-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-navy-700 text-xs font-bold text-ivory-100 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-mint-400" />
                <span>{driver ? `En Route to Pickup (~${etaMinutes} mins)` : 'Awaiting driver assignment'}</span>
              </div>

              <button
                onClick={handleShareTrip}
                className="bg-navy-900/90 hover:bg-navy-800 text-ivory-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-navy-700 flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Live Trip'}</span>
              </button>
            </div>

            {/* Vector Map Canvas (SVG Street Topology & Moving Car Marker) */}
            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
              <svg
                viewBox="0 0 600 400"
                className="w-full h-full max-h-[360px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simulated Street Grid Lines */}
                <path d="M50 100 L550 100" stroke="#1F334E" strokeWidth="6" strokeLinecap="round" />
                <path d="M50 200 L550 200" stroke="#1F334E" strokeWidth="8" strokeLinecap="round" />
                <path d="M50 300 L550 300" stroke="#1F334E" strokeWidth="6" strokeLinecap="round" />
                <path d="M150 50 L150 350" stroke="#1F334E" strokeWidth="6" strokeLinecap="round" />
                <path d="M300 50 L300 350" stroke="#1F334E" strokeWidth="8" strokeLinecap="round" />
                <path d="M450 50 L450 350" stroke="#1F334E" strokeWidth="6" strokeLinecap="round" />

                {/* Primary Route Path (S-Curve) */}
                <path
                  d="M120 280 C 180 280, 240 180, 300 180 C 360 180, 420 120, 480 120"
                  stroke="#26476E"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M120 280 C 180 280, 240 180, 300 180 C 360 180, 420 120, 480 120"
                  stroke="#91D9C5"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="8 8"
                  className="animate-pulse"
                />

                {/* Pickup Location Marker (Left Bottom) */}
                <g transform="translate(120, 280)">
                  <circle r="16" fill="#91D9C5" opacity="0.25" className="animate-ping" />
                  <circle r="10" fill="#14243B" stroke="#91D9C5" strokeWidth="3" />
                  <circle r="4" fill="#91D9C5" />
                  <text y="28" textAnchor="middle" fill="#F7F5EF" fontSize="11" fontWeight="bold">
                    Pickup (You)
                  </text>
                </g>

                {/* Destination Marker (Right Top) */}
                <g transform="translate(480, 120)">
                  <circle r="12" fill="#E9B96D" opacity="0.3" />
                  <circle r="9" fill="#14243B" stroke="#E9B96D" strokeWidth="3" />
                  <circle r="3" fill="#E9B96D" />
                  <text y="26" textAnchor="middle" fill="#E9B96D" fontSize="11" fontWeight="bold">
                    Drop-off
                  </text>
                </g>

                {/* Moving Vehicle Marker (Interpolated along path) */}
                {driver && (() => {
                  // Parametric interpolation along S-curve
                  const t = carProgress / 100;
                  // Bezier approx coordinates:
                  const x = 120 + t * 360;
                  const y = 280 - Math.sin(t * Math.PI) * 120 - t * 40;
                  return (
                    <g transform={`translate(${x}, ${y})`}>
                      <circle r="20" fill="#91D9C5" opacity="0.3" className="animate-ping" />
                      <circle r="14" fill="#14243B" stroke="#91D9C5" strokeWidth="2.5" />
                      {/* Car Icon */}
                      <path
                        d="M-6 -4 L6 -4 L8 2 L6 6 L-6 6 L-8 2 Z"
                        fill="#91D9C5"
                      />
                      <circle cx="-4" cy="4" r="1.5" fill="#14243B" />
                      <circle cx="4" cy="4" r="1.5" fill="#14243B" />
                      <text y="-18" textAnchor="middle" fill="#91D9C5" fontSize="10" fontWeight="bold">
                        {driver?.vehiclePlate || 'Awaiting driver'}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Bottom Progress Bar Overlay */}
            <div className="relative z-10 bg-navy-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-navy-800 text-xs text-ivory-200">
              <div className="flex items-center justify-between font-bold mb-1.5">
                <span>{driver ? 'Chauffeur En Route' : 'Finding your driver'}</span>
                <span className="text-mint-300">{driver ? `~${etaMinutes} min (${((100 - carProgress) * 0.15).toFixed(1)} km away)` : 'Your request is waiting for driver acceptance'}</span>
              </div>
              <div className="w-full h-1.5 bg-navy-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-mint-400 to-gold-400 transition-all duration-500"
                  style={{ width: `${driver ? carProgress : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right 5 cols: Chauffeur Details, OTP & Controls */}
          <div className="lg:col-span-5 space-y-4">
            {/* Start Ride OTP Card */}
            {driver ? <div className="bg-white rounded-3xl p-5 border border-ivory-300 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest block">
                  TRIP START OTP
                </span>
                <span className="text-xs text-charcoal-500">
                  Share with chauffeur only after inspecting car
                </span>
              </div>
              <div className="font-mono text-2xl font-black text-navy-900 bg-mint-100 px-4 py-1.5 rounded-2xl border border-mint-300 tracking-wider">
                {driver.otp}
              </div>
            </div> : <div className="bg-white rounded-3xl p-5 border border-ivory-300 shadow-sm"><span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">DRIVER ASSIGNMENT</span><p className="mt-2 text-sm font-semibold text-navy-900">Your booking is confirmed. We’ll show the driver details and trip OTP here as soon as a driver accepts.</p></div>}

            {/* Chauffeur Cockpit Card */}
            {driver && (
              <div className="bg-white rounded-3xl p-6 border border-ivory-300 shadow-sm space-y-5">
                <div className="flex items-center gap-4">
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-mint-400 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-navy-900">{driver.name}</h3>
                      <span className="text-xs font-bold text-gold-700 bg-gold-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
                        {driver.rating}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-500 mt-0.5">
                      {driver.tripsCount}+ Trips • Speaks {driver.languages.join(', ')}
                    </p>
                    <div className="mt-1 font-mono text-xs font-extrabold text-navy-900 bg-ivory-100 px-2.5 py-0.5 rounded inline-block">
                      {driver.vehiclePlate}
                    </div>
                  </div>
                </div>

                {/* Car Spec */}
                <div className="p-3 rounded-2xl bg-ivory-50 border border-ivory-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-navy-900">{driver.vehicleModel}</span>
                    <span className="text-charcoal-400 block text-[11px]">{driver.vehicleColor} • Chilled AC</span>
                  </div>
                  <span className="text-[10px] font-bold text-mint-800 bg-mint-100 px-2 py-1 rounded-full">
                    Sanitized Today
                  </span>
                </div>

                {/* Communication Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsCalling(true)}
                    className="py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory-100 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-mint-300" />
                    <span>Call Driver</span>
                  </button>

                  <button
                    onClick={() => setIsChatting(true)}
                    className="py-2.5 px-4 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-navy-900 text-xs font-bold flex items-center justify-center gap-2 border border-ivory-300 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-navy-700" />
                    <span>Chat Message</span>
                  </button>
                </div>
              </div>
            )}

            {/* Journey Summary */}
            <div className="bg-white rounded-3xl p-6 border border-ivory-300 shadow-sm text-xs space-y-3">
              <div className="font-bold text-navy-900 pb-2 border-b border-ivory-200 flex justify-between">
                <span>Trip Itinerary</span>
                <span className="text-mint-700">₹{currentBooking.fareBreakdown.totalFare.toFixed(2)}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-charcoal-400 block">Pickup</span>
                <span className="font-semibold text-navy-900">{currentBooking.pickupLocation}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-charcoal-400 block">Destination</span>
                <span className="font-semibold text-navy-900">{currentBooking.destination}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Call Modal */}
      <AnimatePresence>
        {isCalling && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalling(false)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-navy-950 text-ivory-100 rounded-3xl p-8 shadow-floating text-center z-10 border border-navy-800"
            >
              <img
                src={driver?.avatar}
                alt={driver?.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-mint-400"
              />
              <span className="text-xs text-mint-300 uppercase tracking-widest font-bold">
                Simulated Number Masking Call
              </span>
              <h3 className="text-xl font-bold mt-1 text-ivory-100">{driver?.name}</h3>
              <p className="text-xs text-ivory-400 mt-1">Connecting via secure private IVR bridge...</p>

              <div className="my-6 p-3 rounded-xl bg-navy-900 text-xs font-mono text-ivory-300 border border-navy-800">
                Encrypted Caller ID: +91 80 4910 ****
              </div>

              <button
                onClick={() => setIsCalling(false)}
                className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                End Call
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Simulated Driver Chat Modal */}
      <AnimatePresence>
        {isChatting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatting(false)}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-floating border border-ivory-300 z-10 flex flex-col h-[480px]"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={driver?.avatar}
                    alt={driver?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-navy-900">{driver?.name}</h4>
                    <span className="text-[10px] text-mint-700 font-semibold">Active en route</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatting(false)}
                  className="p-1 rounded-full text-charcoal-400 hover:text-navy-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {chatMessages.map((msg, idx) => {
                  const isUser = msg.startsWith('You:');
                  return (
                    <div
                      key={idx}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? 'bg-navy-900 text-ivory-100 rounded-br-none'
                            : 'bg-ivory-100 text-navy-900 rounded-bl-none border border-ivory-200'
                        }`}
                      >
                        {msg.replace('You: ', '').replace('Chauffeur Murugan: ', '').replace('Chauffeur: ', '')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Prompt Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {['I am at the main gate', 'Waiting in lobby', 'How much longer?', 'I have luggage'].map((quick, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setChatMessages((prev) => [...prev, `You: ${quick}`]);
                      setTimeout(() => {
                        setChatMessages((prev) => [...prev, 'Chauffeur: Noted madam, on my way.']);
                      }, 1200);
                    }}
                    className="px-2.5 py-1 rounded-full bg-ivory-100 text-[10px] font-semibold text-charcoal-700 hover:bg-mint-100 whitespace-nowrap"
                  >
                    {quick}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-ivory-200">
                <input
                  type="text"
                  placeholder="Type message to chauffeur..."
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-ivory-300 text-xs text-navy-900 focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-navy-900 text-ivory-100 hover:bg-navy-800"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CustomerLayout>
  );
};

export default CustomerTrackingPage;


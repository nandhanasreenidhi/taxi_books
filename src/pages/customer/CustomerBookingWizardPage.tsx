import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Car,
  Clock4,
  Navigation,
  Plane,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Users,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  ShieldCheck,
  Info,
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { CustomerLayout } from '../../layouts/CustomerLayout';
import { useCustomerStore } from '../../store/useCustomerStore';
import { useBookingStore, calculateIndianPrice } from '../../store/useBookingStore';
import {
  SERVICES_DATA,
  VEHICLES_DATA,
  POPULAR_INDIAN_LOCATIONS,
  OUTSTATION_DESTINATIONS,
  HOURLY_RENTAL_PACKAGES,
} from '../../data/mockData';
import { ServiceType, VehicleTier, PaymentMethodType } from '../../types';
import { Button } from '../../components/common/Button';
import { fadeInUp } from '../../styles/animations';

export const CustomerBookingWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { profile, createBooking, appliedPromo, applyPromoCode, removePromoCode } = useCustomerStore();

  const {
    serviceType,
    setServiceType,
    pickupLocation,
    setPickupLocation,
    destination,
    setDestination,
    date,
    setDate,
    time,
    setTime,
    returnDate,
    setReturnDate,
    rentalPackage,
    setRentalPackage,
    rentalDurationHours,
    setRentalDurationHours,
    flightNumber,
    setFlightNumber,
    terminal,
    setTerminal,
    tripType,
    setTripType,
    passengers,
    setPassengers,
    luggageCount,
    setLuggageCount,
    selectedVehicleTier,
    setSelectedVehicleTier,
  } = useBookingStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPickupList, setShowPickupList] = useState(false);
  const [showDestList, setShowDestList] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('upi');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  // Calculate pricing breakdown
  const fareEst = calculateIndianPrice(
    serviceType,
    selectedVehicleTier,
    pickupLocation,
    destination,
    rentalDurationHours,
    tripType
  );

  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(50, fareEst.fare - discountAmount);

  // Selected vehicle object
  const selectedVehicleObj = VEHICLES_DATA.find((v) => v.tier === selectedVehicleTier) || VEHICLES_DATA[2];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput, serviceType, fareEst.fare);
    if (res.success) {
      setPromoMessage({ text: res.message });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, error: true });
    }
  };

  const handleConfirmAndPay = () => {
    const newBooking = createBooking({
      serviceType,
      pickupLocation,
      destination: serviceType === 'rental' ? `Package: ${rentalPackage}` : destination,
      date,
      time,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      rentalPackage: serviceType === 'rental' ? rentalPackage : undefined,
      flightNumber: serviceType === 'airport' ? flightNumber : undefined,
      terminal: serviceType === 'airport' ? terminal : undefined,
      tripType: serviceType === 'outstation' ? tripType : undefined,
      passengers,
      luggageCount,
      vehicleTier: selectedVehicleTier,
      vehicleName: selectedVehicleObj.name,
      vehicleModel: selectedVehicleObj.model,
      vehicleImage: selectedVehicleObj.image,
      status: 'upcoming',
      fareBreakdown: {
        baseFare: fareEst.baseFare,
        distanceFare: fareEst.distanceFare,
        estimatedDistance: fareEst.distance,
        estimatedDuration: fareEst.duration,
        driverAllowance: fareEst.driverAllowance,
        tollsAndParking: fareEst.tollsAndParking,
        taxesAndGst: fareEst.taxesAndGst,
        discount: discountAmount,
        totalFare: finalTotal,
      },
      paymentMethod: selectedPaymentMethod,
      paymentStatus: selectedPaymentMethod === 'cash' ? 'pending' : 'paid',
      customer: {
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
      },
    });

    setConfirmedBookingId(newBooking.id);
    setCurrentStep(5);
  };

  const steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Journey' },
    { num: 3, label: 'Vehicle' },
    { num: 4, label: 'Review & Pay' },
    { num: 5, label: 'Confirmed' },
  ];

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto">
        {/* Progress Stepper Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-ivory-300 -translate-y-1/2 -z-0" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-mint-400 -translate-y-1/2 -z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            />

            {steps.map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold transition-all duration-300 ${
                    currentStep === s.num
                      ? 'bg-navy-900 text-ivory-100 ring-4 ring-mint-300 shadow-sm'
                      : currentStep > s.num
                      ? 'bg-mint-400 text-navy-950'
                      : 'bg-white text-charcoal-400 border border-ivory-300'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                </div>
                <span
                  className={`text-[11px] font-bold mt-1.5 hidden sm:block ${
                    currentStep === s.num ? 'text-navy-900' : 'text-charcoal-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP 1: SELECT SERVICE */}
        {currentStep === 1 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm"
          >
            <div className="border-b border-ivory-200 pb-4 mb-6">
              <span className="text-xs font-bold text-mint-600 uppercase tracking-widest">
                Step 1 of 4
              </span>
              <h1 className="text-2xl font-display font-extrabold text-navy-900 mt-1">
                Select Your Mobility Service
              </h1>
              <p className="text-xs text-charcoal-500 mt-1">
                Choose the journey format tailored for your travel purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES_DATA.map((srv) => {
                const isSelected = serviceType === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setServiceType(srv.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-navy-900 bg-mint-50/40 shadow-premium ring-2 ring-navy-900/10'
                        : 'border-ivory-300 bg-white hover:border-navy-900/30'
                    }`}
                  >
                    <div>
                      <div className="relative h-32 rounded-xl overflow-hidden mb-3.5">
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy-950/80 text-mint-300">
                          {srv.badge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-navy-900">{srv.title}</h3>
                        <span className="text-xs font-extrabold text-mint-700">{srv.startingPrice}</span>
                      </div>
                      <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                        {srv.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-ivory-200 flex items-center justify-between">
                      <span className="text-[11px] text-charcoal-400">
                        {srv.perks[0]}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-navy-900 bg-navy-900 text-ivory-100' : 'border-ivory-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-ivory-200 flex justify-end">
              <Button
                variant="primary"
                size="md"
                icon={ArrowRight}
                onClick={() => setCurrentStep(2)}
              >
                Proceed to Journey Details
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: JOURNEY DETAILS */}
        {currentStep === 2 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm"
          >
            <div className="border-b border-ivory-200 pb-4 mb-6">
              <span className="text-xs font-bold text-mint-600 uppercase tracking-widest">
                Step 2 of 4
              </span>
              <h1 className="text-2xl font-display font-extrabold text-navy-900 mt-1">
                Enter Journey & Schedule Details
              </h1>
              <p className="text-xs text-charcoal-500 mt-1">
                Provide pickup coordinates, schedule, and passenger requirements.
              </p>
            </div>

            <div className="space-y-5">
              {/* Pickup Location */}
              <div className="relative">
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Pickup Location & Landmark
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mint-600" />
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    onFocus={() => setShowPickupList(true)}
                    placeholder="Enter locality, metro station, tech park or airport"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50/60 text-sm font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                  />
                </div>

                {/* Autocomplete suggestions */}
                <AnimatePresence>
                  {showPickupList && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute z-20 left-0 right-0 mt-1 bg-white border border-ivory-300 rounded-xl shadow-premium p-2 max-h-52 overflow-y-auto"
                    >
                      <div className="text-[10px] font-bold text-charcoal-400 uppercase px-2.5 py-1 flex items-center justify-between">
                        <span>Frequent Indian Hubs</span>
                        <button
                          type="button"
                          onClick={() => setShowPickupList(false)}
                          className="text-navy-900 font-semibold hover:underline"
                        >
                          Close
                        </button>
                      </div>
                      {POPULAR_INDIAN_LOCATIONS.map((loc, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setPickupLocation(loc);
                            setShowPickupList(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs text-charcoal-700 hover:bg-mint-50/80 hover:text-navy-900 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5 text-mint-600 shrink-0" />
                          <span className="truncate">{loc}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Destination (For Instant, Airport, Outstation, Self-Drive) */}
              {serviceType !== 'rental' && (
                <div className="relative">
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Drop-off Destination
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
                    <input
                      type="text"
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onFocus={() => setShowDestList(true)}
                      placeholder="Enter destination hotel, tech park, address or city"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-ivory-300 bg-ivory-50/60 text-sm font-semibold text-navy-900 focus:outline-none focus:border-navy-900"
                    />
                  </div>

                  <AnimatePresence>
                    {showDestList && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute z-20 left-0 right-0 mt-1 bg-white border border-ivory-300 rounded-xl shadow-premium p-2 max-h-52 overflow-y-auto"
                      >
                        <div className="text-[10px] font-bold text-charcoal-400 uppercase px-2.5 py-1 flex items-center justify-between">
                          <span>Popular Indian Destinations</span>
                          <button
                            type="button"
                            onClick={() => setShowDestList(false)}
                            className="text-navy-900 font-semibold hover:underline"
                          >
                            Close
                          </button>
                        </div>
                        {POPULAR_INDIAN_LOCATIONS.slice(3).map((loc, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setDestination(loc);
                              setShowDestList(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-charcoal-700 hover:bg-gold-50/80 hover:text-navy-900 rounded-lg flex items-center gap-2 transition-colors"
                          >
                            <Navigation className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                            <span className="truncate">{loc}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Service Context: Airport Details */}
              {serviceType === 'airport' && (
                <div className="p-4 rounded-2xl bg-mint-50/70 border border-mint-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">
                      Flight Number (e.g. 6E-452 or AI-880)
                    </label>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mint-700" />
                      <input
                        type="text"
                        value={flightNumber || ''}
                        onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                        placeholder="e.g. 6E-204"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-mint-300 rounded-xl text-xs font-bold text-navy-900 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy-900 mb-1">Airport Terminal</label>
                    <select
                      value={terminal || 'T1 Domestic'}
                      onChange={(e) => setTerminal(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-mint-300 rounded-xl text-xs font-bold text-navy-900 focus:outline-none"
                    >
                      <option value="T1 Domestic">Terminal 1 (Domestic Departures/Arrivals)</option>
                      <option value="T2 International">Terminal 2 (International)</option>
                      <option value="T4 New Integrated Terminal">Terminal 4 (New Integrated Terminal)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Service Context: Hourly Rental Package */}
              {serviceType === 'rental' && (
                <div className="p-4 rounded-2xl bg-gold-50/70 border border-gold-200">
                  <label className="block text-xs font-bold text-navy-900 mb-2">
                    Choose Chauffeur Rental Package
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {HOURLY_RENTAL_PACKAGES.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setRentalPackage(pkg.label);
                          setRentalDurationHours(pkg.durationHours);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          rentalDurationHours === pkg.durationHours
                            ? 'bg-navy-900 text-ivory-100 border-navy-900 shadow-sm'
                            : 'bg-white border-gold-300 text-charcoal-700 hover:bg-gold-100/50'
                        }`}
                      >
                        <div className="text-xs font-bold">{pkg.durationHours} Hours</div>
                        <div className={`text-[10px] mt-0.5 ${rentalDurationHours === pkg.durationHours ? 'text-mint-300' : 'text-charcoal-400'}`}>
                          Up to {pkg.distanceKm} km included
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Service Context: Outstation One-Way or Round-Trip */}
              {serviceType === 'outstation' && (
                <div className="p-4 rounded-2xl bg-navy-50/70 border border-navy-200 space-y-3">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-navy-900">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === 'one-way'}
                        onChange={() => setTripType('one-way')}
                        className="text-navy-900"
                      />
                      <span>One-Way Highway Drop</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-navy-900">
                      <input
                        type="radio"
                        name="tripType"
                        checked={tripType === 'round-trip'}
                        onChange={() => setTripType('round-trip')}
                        className="text-navy-900"
                      />
                      <span>Round-Trip (Driver stays with vehicle)</span>
                    </label>
                  </div>

                  {tripType === 'round-trip' && (
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-1">
                        Return Date & Time
                      </label>
                      <input
                        type="date"
                        value={returnDate || ''}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-navy-300 rounded-xl text-xs font-semibold text-navy-900"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Pickup Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/60 text-xs font-semibold text-navy-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">Pickup Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-ivory-300 bg-ivory-50/60 text-xs font-semibold text-navy-900"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers & Luggage Counters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-ivory-50/80 rounded-xl border border-ivory-300 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900">
                    <Users className="w-4 h-4 text-charcoal-500" />
                    <span>Passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-ivory-300 font-bold hover:bg-ivory-100"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-navy-900 w-4 text-center">{passengers}</span>
                    <button
                      type="button"
                      onClick={() => setPassengers(Math.min(7, passengers + 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-ivory-300 font-bold hover:bg-ivory-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-ivory-50/80 rounded-xl border border-ivory-300 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-navy-900">
                    <Briefcase className="w-4 h-4 text-charcoal-500" />
                    <span>Luggage Bags</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLuggageCount(Math.max(0, luggageCount - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-ivory-300 font-bold hover:bg-ivory-100"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold text-navy-900 w-4 text-center">{luggageCount}</span>
                    <button
                      type="button"
                      onClick={() => setLuggageCount(Math.min(6, luggageCount + 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-ivory-300 font-bold hover:bg-ivory-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-ivory-200 flex items-center justify-between">
              <Button variant="ghost" size="sm" icon={ArrowLeft} iconPosition="left" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button variant="primary" size="md" icon={ArrowRight} onClick={() => setCurrentStep(3)}>
                Select Vehicle
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: VEHICLE SELECTION */}
        {currentStep === 3 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm"
          >
            <div className="border-b border-ivory-200 pb-4 mb-6">
              <span className="text-xs font-bold text-mint-600 uppercase tracking-widest">
                Step 3 of 4
              </span>
              <h1 className="text-2xl font-display font-extrabold text-navy-900 mt-1">
                Choose Your Vehicle Class
              </h1>
              <p className="text-xs text-charcoal-500 mt-1">
                Transparent indicative pricing for your route ({fareEst.distance} • ~{fareEst.duration})
              </p>
            </div>

            <div className="space-y-4">
              {VEHICLES_DATA.map((v) => {
                const isSelected = selectedVehicleTier === v.tier;
                // Compute indicative total for this specific vehicle tier
                const thisFareEst = calculateIndianPrice(
                  serviceType,
                  v.tier,
                  pickupLocation,
                  destination,
                  rentalDurationHours,
                  tripType
                );

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicleTier(v.tier)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-navy-900 bg-mint-50/30 ring-2 ring-navy-900/10 shadow-sm'
                        : 'border-ivory-300 bg-white hover:border-navy-900/30'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-ivory-200">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-navy-900">{v.name}</h3>
                          {v.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy-900 text-mint-300">
                              {v.badge}
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-semibold text-charcoal-500 mt-0.5">
                          {v.model} ({v.brand})
                        </div>

                        <div className="flex items-center gap-4 text-xs text-charcoal-600 mt-2">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-mint-600" /> {v.seats} Seats
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5 text-mint-600" /> {v.luggage} Bags
                          </span>
                          <span className="flex items-center gap-1">
                            <Car className="w-3.5 h-3.5 text-mint-600" /> High-Cool AC
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-ivory-200">
                      <div className="text-left md:text-right">
                        <span className="text-xl sm:text-2xl font-black text-navy-900">
                          ₹{thisFareEst.fare.toFixed(2)}
                        </span>
                        <div className="text-[10px] text-charcoal-400">Indicative all-in</div>
                      </div>

                      <button
                        type="button"
                        className={`mt-2 py-1.5 px-4 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-navy-900 text-ivory-100'
                            : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-ivory-200 flex items-center justify-between">
              <Button variant="ghost" size="sm" icon={ArrowLeft} iconPosition="left" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button variant="primary" size="md" icon={ArrowRight} onClick={() => setCurrentStep(4)}>
                Review Fare Breakdown
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: FARE BREAKDOWN & PAYMENT SELECTION */}
        {currentStep === 4 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left 7 cols: Payment Option & Coupon */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-ivory-300 shadow-sm space-y-6">
              <div className="border-b border-ivory-200 pb-4">
                <span className="text-xs font-bold text-mint-600 uppercase tracking-widest">
                  Step 4 of 4
                </span>
                <h1 className="text-2xl font-display font-extrabold text-navy-900 mt-1">
                  Payment Preference
                </h1>
                <p className="text-xs text-charcoal-500 mt-1">
                  Select how you would like to settle this ride upon confirmation or completion.
                </p>
              </div>

              {/* Payment Methods Selection */}
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-3">
                  Indian Payment Options (Demo Simulation)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'upi', label: 'UPI / QR', sub: 'GPay, PhonePe, Paytm, BHIM', icon: Smartphone },
                    { id: 'wallet', label: 'WAYVIA Wallet', sub: `Bal: ₹${profile.walletBalance.toFixed(2)}`, icon: Wallet },
                    { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: CreditCard },
                    { id: 'cash', label: 'Cash to Driver', sub: 'Pay directly on arrival', icon: Banknote },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    const isSelected = selectedPaymentMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(pm.id as any)}
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-navy-900 bg-mint-50/50 shadow-sm'
                            : 'border-ivory-300 bg-white hover:bg-ivory-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-mint-700' : 'text-charcoal-400'}`} />
                          {isSelected && <Check className="w-3.5 h-3.5 text-navy-900 stroke-[3]" />}
                        </div>
                        <div className="text-xs font-bold text-navy-900">{pm.label}</div>
                        <div className="text-[10px] text-charcoal-400 mt-0.5">{pm.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200">
                <label className="block text-xs font-bold text-navy-900 mb-2">
                  Have a Promo Coupon?
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-mint-100 rounded-xl border border-mint-300">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-mint-700" />
                      <span className="text-xs font-bold text-navy-900">
                        {appliedPromo.code} applied (₹{appliedPromo.discount} savings)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WAYVIAFIRST or AIRPORT100"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-ivory-300 bg-white text-xs font-bold text-navy-900 placeholder:text-charcoal-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-ivory-100 text-xs font-bold"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <div className={`mt-2 text-xs font-medium ${promoMessage.error ? 'text-rose-500' : 'text-mint-700'}`}>
                    {promoMessage.text}
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="p-4 rounded-2xl bg-gold-50/70 border border-gold-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
                <p className="text-[11px] text-charcoal-600 leading-relaxed">
                  <strong>Indicative Demo Pricing:</strong> Fares displayed are indicative estimates for demonstration purposes, subject to actual route tolls, waiting time, and Fastag electronic charges.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Button variant="ghost" size="sm" icon={ArrowLeft} iconPosition="left" onClick={() => setCurrentStep(3)}>
                  Back
                </Button>
                <Button
                  variant="mint"
                  size="lg"
                  icon={ArrowRight}
                  onClick={handleConfirmAndPay}
                  className="font-bold text-navy-950 shadow-glow-mint"
                >
                  Confirm Booking (₹{finalTotal.toFixed(2)})
                </Button>
              </div>
            </div>

            {/* Right 5 cols: Itemized Fare Summary Card */}
            <div className="lg:col-span-5 bg-navy-950 text-ivory-100 rounded-3xl p-6 sm:p-8 border border-navy-800 shadow-floating sticky top-24">
              <span className="text-[10px] uppercase font-bold tracking-widest text-mint-300">
                Fare Breakdown Summary
              </span>
              <h2 className="text-xl font-display font-extrabold text-ivory-100 mt-1">
                {selectedVehicleObj.name}
              </h2>
              <div className="text-xs text-ivory-300/80">
                {selectedVehicleObj.model} • {serviceType.toUpperCase()}
              </div>

              {/* Itinerary */}
              <div className="my-5 space-y-3 border-y border-navy-800 py-4 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-mint-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-ivory-400 block uppercase">Pickup</span>
                    <span className="font-semibold text-ivory-100">{pickupLocation}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-ivory-400 block uppercase">Destination</span>
                    <span className="font-semibold text-ivory-100">
                      {serviceType === 'rental' ? rentalPackage : destination}
                    </span>
                  </div>
                </div>
              </div>

              {/* Itemized lines */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-ivory-300">
                  <span>Base Fare</span>
                  <span>₹{fareEst.baseFare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-ivory-300">
                  <span>Distance Fare ({fareEst.distance})</span>
                  <span>₹{fareEst.distanceFare.toFixed(2)}</span>
                </div>
                {fareEst.tollsAndParking > 0 && (
                  <div className="flex justify-between text-ivory-300">
                    <span>Toll & Parking Estimate</span>
                    <span>₹{fareEst.tollsAndParking.toFixed(2)}</span>
                  </div>
                )}
                {fareEst.driverAllowance > 0 && (
                  <div className="flex justify-between text-ivory-300">
                    <span>Driver Allowance (Outstation)</span>
                    <span>₹{fareEst.driverAllowance.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-ivory-300">
                  <span>GST (5% Transport Tax)</span>
                  <span>₹{fareEst.taxesAndGst.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-mint-300 font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-navy-800 flex justify-between items-baseline text-base font-extrabold text-ivory-100">
                  <span>Estimated Total</span>
                  <span className="text-mint-300 text-xl font-black">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: BOOKING CONFIRMATION */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-mint-300 shadow-floating text-center"
          >
            <div className="w-20 h-20 rounded-full bg-mint-100 text-mint-700 flex items-center justify-center mx-auto mb-4 border border-mint-200">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-mint-600">
              Booking Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 mt-1">
              Your Ride is Scheduled!
            </h1>

            <p className="text-xs sm:text-sm text-charcoal-600 mt-2 leading-relaxed">
              We have dispatched your request to top-rated nearby chauffeurs. A confirmation SMS with OTP and driver details has been sent to {profile.phone}.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-ivory-50 border border-ivory-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between pb-2 border-b border-ivory-200">
                <span className="text-charcoal-500 font-medium">Demo Booking Reference</span>
                <span className="font-mono font-bold text-navy-900">{confirmedBookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Vehicle Assigned</span>
                <span className="font-bold text-navy-900">{selectedVehicleObj.name} ({selectedVehicleObj.model})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Pickup Location</span>
                <span className="font-semibold text-navy-900 truncate max-w-xs">{pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Schedule</span>
                <span className="font-semibold text-navy-900">{date} at {time}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-ivory-200 text-sm font-extrabold">
                <span className="text-navy-900">Total Indicative Fare</span>
                <span className="text-mint-700">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {confirmedBookingId && (
                <Button
                  variant="primary"
                  fullWidth
                  icon={Navigation}
                  onClick={() => navigate(`/customer/tracking/${confirmedBookingId}`)}
                  className="font-bold shadow-md"
                >
                  Track Ride Live
                </Button>
              )}
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/customer/bookings')}
              >
                View in My Bookings
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerBookingWizardPage;


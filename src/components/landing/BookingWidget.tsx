import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Calendar, Clock, Car, Plane, Clock4, Users, Briefcase, Sparkles, Info } from 'lucide-react';
import { useBookingStore } from '../../store/useBookingStore';
import { ServiceType, VehicleTier } from '../../types';
import { POPULAR_LOCATIONS } from '../../data/mockData';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { WvButton } from './ui/WvButton';

/**
 * Booking console for the public hero.
 * Visual redesign only: every store hook, validation rule and handler is unchanged from the original widget.
 */
export const BookingWidget: React.FC = () => {
  const navigate = useNavigate();
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
    rentalDurationHours,
    setRentalDurationHours,
    flightNumber,
    setFlightNumber,
    passengers,
    setPassengers,
    luggageCount,
    setLuggageCount,
    selectedVehicleTier,
    setSelectedVehicleTier,
    estimatedPrice,
    estimatedDuration,
    estimatedDistance,
  } = useBookingStore();

  const [errors, setErrors] = useState<{ pickup?: string; destination?: string }>({});
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  const services: { id: ServiceType; label: string; icon: React.ElementType }[] = [
    { id: 'instant', label: 'Instant', icon: Car },
    { id: 'rental', label: 'Hourly', icon: Clock4 },
    { id: 'airport', label: 'Airport', icon: Plane },
    { id: 'outstation', label: 'Outstation', icon: Navigation },
    { id: 'self-drive', label: 'Self-drive', icon: Sparkles },
  ];

  const vehicleTiers: { id: VehicleTier; label: string; sub: string }[] = [
    { id: 'mini', label: 'Mini', sub: 'WagonR / Celerio' },
    { id: 'hatchback', label: 'Hatch', sub: 'Swift / Grand i10' },
    { id: 'sedan', label: 'Sedan', sub: 'Dzire / Amaze' },
    { id: 'suv', label: 'SUV', sub: 'Ertiga / Carens' },
    { id: 'premium', label: 'Exec', sub: 'Innova Crysta' },
  ];

  const validate = () => {
    const newErrors: { pickup?: string; destination?: string } = {};
    if (!pickupLocation.trim()) {
      newErrors.pickup = 'Please provide a pickup location.';
    }
    if (serviceType !== 'rental' && serviceType !== 'self-drive' && !destination.trim()) {
      newErrors.destination = 'Please provide a drop-off destination.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      navigate('/customer/book');
    }
  };

  const labelCls = 'wv-label mb-1.5 flex items-center justify-between text-silver';
  const stepBtn =
    'flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center border border-bone/20 text-sm font-bold text-bone transition-colors hover:border-crimson-400 hover:bg-crimson focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-300';

  const suggestionPanel =
    'absolute z-30 left-0 right-0 mt-1 max-h-48 overflow-y-auto border border-bone/15 bg-coal-950 p-1.5 shadow-lift scrollbar-dark';

  return (
    <div
      id="booking-widget"
      className="wv-cut-both relative w-full max-w-xl bg-coal-950/85 p-5 shadow-card-dark backdrop-blur-xl sm:p-6 lg:grid lg:max-w-none lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-x-8 lg:p-7"
    >
      {/* Edge light and crimson ignition bar */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 border border-bone/10 wv-cut-both" />
      <span aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-24 bg-crimson" />

      <div className="min-w-0">
      <div className="mb-4 flex items-baseline justify-between lg:hidden">
        <h2 className="wv-title text-2xl text-bone">Book a ride</h2>
        <span className="wv-label text-[9px] text-silver">Instant estimate</span>
      </div>

      {/* Service tabs */}
      <div role="tablist" aria-label="Mobility service" className="mb-5 flex gap-1 overflow-x-auto border-b border-bone/10 scrollbar-none lg:mb-4">
        {services.map((item) => {
          const Icon = item.icon;
          const isSelected = serviceType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setServiceType(item.id)}
              className={`relative flex shrink-0 items-center gap-1.5 px-2.5 min-[360px]:px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] min-[360px]:tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-300 ${
                isSelected ? 'text-bone' : 'text-silver hover:text-bone'
              }`}
            >
              <Icon className={`h-3.5 w-3.5 max-[359px]:hidden ${isSelected ? 'text-crimson-300' : ''}`} />
              {item.label}
              {isSelected && (
                <motion.span
                  layoutId="wv-service-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-crimson"
                  transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <form id="wv-booking-form" onSubmit={handleBookingSubmit} className="grid gap-3.5 lg:grid-cols-12" noValidate>
        {/* Pickup */}
        <div className={`relative ${serviceType === 'rental' ? 'lg:col-span-8' : 'lg:col-span-4'}`}>
          <label className={labelCls} htmlFor="wv-pickup">
            <span>Pickup</span>
            {errors.pickup && <span className="normal-case tracking-normal text-crimson-300">{errors.pickup}</span>}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-crimson-300" />
            <input
              id="wv-pickup"
              type="text"
              value={pickupLocation}
              onChange={(e) => {
                setPickupLocation(e.target.value);
                if (errors.pickup) setErrors({ ...errors, pickup: undefined });
              }}
              onFocus={() => setShowPickupSuggestions(true)}
              placeholder="Address, hotel or airport"
              className={`wv-field ${errors.pickup ? '!border-crimson-400' : ''}`}
            />
          </div>
          <AnimatePresence>
            {showPickupSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className={suggestionPanel}
              >
                <div className="wv-label flex items-center justify-between px-2.5 py-1.5 text-[9px] text-silver">
                  <span>Popular hubs</span>
                  <button type="button" onClick={() => setShowPickupSuggestions(false)} className="text-bone hover:text-crimson-300">
                    Done
                  </button>
                </div>
                {POPULAR_LOCATIONS.map((loc, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      setPickupLocation(loc);
                      setShowPickupSuggestions(false);
                    }}
                    className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-xs text-bone/80 transition-colors hover:bg-forest-800 hover:text-bone"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-crimson-300" />
                    <span className="truncate">{loc}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

                {/* Destination */}
        {serviceType !== 'rental' && (
          <div className="relative lg:col-span-4">
            <label className={labelCls} htmlFor="wv-destination">
              <span>Drop-off</span>
              {errors.destination && <span className="normal-case tracking-normal text-crimson-300">{errors.destination}</span>}
            </label>
            <div className="relative">
              <Navigation className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
              <input
                id="wv-destination"
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (errors.destination) setErrors({ ...errors, destination: undefined });
                }}
                onFocus={() => setShowDestSuggestions(true)}
                placeholder="Destination, landmark or area"
                className={`wv-field ${errors.destination ? '!border-crimson-400' : ''}`}
              />
            </div>
            <AnimatePresence>
              {showDestSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className={suggestionPanel}
                >
                  <div className="wv-label flex items-center justify-between px-2.5 py-1.5 text-[9px] text-silver">
                    <span>Popular destinations</span>
                    <button type="button" onClick={() => setShowDestSuggestions(false)} className="text-bone hover:text-crimson-300">
                      Done
                    </button>
                  </div>
                  {POPULAR_LOCATIONS.slice(2).map((loc, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => {
                        setDestination(loc);
                        setShowDestSuggestions(false);
                      }}
                      className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-xs text-bone/80 transition-colors hover:bg-forest-800 hover:text-bone"
                    >
                      <Navigation className="h-3.5 w-3.5 shrink-0 text-silver" />
                      <span className="truncate">{loc}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

                {/* Date & time */}
        <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 lg:col-span-4">
          <div>
            <label className={labelCls} htmlFor="wv-date">
              <span>Date</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
              <input id="wv-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="wv-field" />
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="wv-time">
              <span>Time</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
              <input id="wv-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="wv-field" />
            </div>
          </div>
        </div>

                {/* Airport: flight number */}
        {serviceType === 'airport' && (
          <motion.div className="lg:col-span-12" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <label className={labelCls} htmlFor="wv-flight">
              <span>Flight number</span>
              <span className="normal-case tracking-normal text-silver/70">Optional</span>
            </label>
            <div className="relative">
              <Plane className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
              <input
                id="wv-flight"
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                placeholder="e.g. BA-178"
                className="wv-field"
              />
            </div>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-silver">
              <Info className="h-3 w-3" />
              Saved with your booking so your chauffeur knows which flight to meet.
            </p>
          </motion.div>
        )}

                {/* Rental: duration */}
        {serviceType === 'rental' && (
          <motion.div className="lg:col-span-12" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <span className={labelCls}>Duration</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[2, 4, 8, 12].map((hrs) => (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => setRentalDurationHours(hrs)}
                  className={`py-2 text-xs font-bold transition-colors ${
                    rentalDurationHours === hrs
                      ? 'bg-crimson text-bone'
                      : 'border border-bone/15 text-bone/80 hover:border-bone/40'
                  }`}
                >
                  {hrs} hours
                </button>
              ))}
            </div>
          </motion.div>
        )}

                {/* Return date */}
        {(serviceType === 'outstation' || serviceType === 'self-drive') && (
          <motion.div className="lg:col-span-12" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <label className={labelCls} htmlFor="wv-return">
              <span>Return date</span>
              <span className="normal-case tracking-normal text-silver/70">Optional, for round trips</span>
            </label>
            <input
              id="wv-return"
              type="date"
              value={returnDate || ''}
              onChange={(e) => setReturnDate(e.target.value)}
              className="wv-field !pl-3.5"
            />
          </motion.div>
        )}

                {/* Passengers & luggage */}
        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:col-span-6">
          <div className="flex items-center justify-between gap-1 border border-bone/10 px-2.5 py-2 sm:px-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-bone/90">
              <Users className="hidden h-3.5 w-3.5 text-silver sm:block" /> Riders
            </span>
            <span className="flex items-center gap-2">
              <button type="button" aria-label="Fewer passengers" onClick={() => setPassengers(Math.max(1, passengers - 1))} className={stepBtn}>
                -
              </button>
              <span className="wv-num w-3 text-center text-xs font-bold text-bone">{passengers}</span>
              <button type="button" aria-label="More passengers" onClick={() => setPassengers(Math.min(7, passengers + 1))} className={stepBtn}>
                +
              </button>
            </span>
          </div>
          <div className="flex items-center justify-between gap-1 border border-bone/10 px-2.5 py-2 sm:px-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-bone/90">
              <Briefcase className="hidden h-3.5 w-3.5 text-silver sm:block" /> Bags
            </span>
            <span className="flex items-center gap-2">
              <button type="button" aria-label="Fewer bags" onClick={() => setLuggageCount(Math.max(0, luggageCount - 1))} className={stepBtn}>
                -
              </button>
              <span className="wv-num w-3 text-center text-xs font-bold text-bone">{luggageCount}</span>
              <button type="button" aria-label="More bags" onClick={() => setLuggageCount(Math.min(6, luggageCount + 1))} className={stepBtn}>
                +
              </button>
            </span>
          </div>
        </div>

                {/* Vehicle class */}
        <div className="lg:col-span-6">
          <span className={labelCls}>Vehicle class</span>
          <div className="grid grid-cols-5 gap-1.5">
            {vehicleTiers.map((tier) => {
              const isSelected = selectedVehicleTier === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  title={tier.sub}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedVehicleTier(tier.id)}
                  className={`relative px-1 py-2 text-center text-[11px] font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-300 ${
                    isSelected ? 'bg-crimson text-bone' : 'border border-bone/15 text-bone/75 hover:border-bone/40 hover:text-bone'
                  }`}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>
        </div>

              </form>
      </div>

      {/* Fare + submit (right column on desktop) */}
        <div className="mt-1 flex flex-col items-stretch justify-between gap-4 min-[380px]:flex-row min-[380px]:items-end border-t border-bone/10 pt-4 lg:mt-0 lg:flex-col lg:items-stretch lg:justify-between lg:gap-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="min-w-0">
            <div className="wv-label text-[9px] text-silver">Indicative estimate</div>
            <div className="wv-num mt-1 flex items-baseline gap-1 text-3xl font-extrabold text-bone sm:text-4xl lg:text-5xl">
              <AnimatedNumber value={estimatedPrice} decimals={2} prefix="₹" whenInView={false} duration={0.7} />
            </div>
            <div className="mt-1 truncate text-[11px] text-silver">
              {estimatedDistance} · ~{estimatedDuration}
            </div>
          </div>
          <WvButton type="submit" form="wv-booking-form" variant="crimson" size="lg" className="shrink-0 max-[379px]:w-full lg:w-full">
            Book now
          </WvButton>
        </div>
    </div>
  );
};

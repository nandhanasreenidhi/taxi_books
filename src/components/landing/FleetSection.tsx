import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useBookingStore } from '../../store/useBookingStore';
import { VehicleTier } from '../../types';
import { VEHICLES_DATA } from '../../data/mockData';
import { VEHICLE_IMAGES } from '../../data/imagery';
import { FLEET_COPY } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { SafeImage } from '../ui/SafeImage';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { LineReveal } from './ui/LineReveal';
import { WvButton } from './ui/WvButton';
import { SectionTag } from './ui/SectionTag';
import { useParallax } from './ui/useParallax';

const formatRupee = (n: number) => `₹${Number.isInteger(n) ? n : n.toFixed(1)}`;

export const FleetSection: React.FC = () => {
  const { setSelectedVehicleTier } = useBookingStore();
  const [activeTab, setActiveTab] = useState<VehicleTier>('sedan');
  const ref = useRef<HTMLElement>(null);
  const ghostY = useParallax(ref, 120);
  const reduce = useReducedMotion();

  const index = Math.max(0, VEHICLES_DATA.findIndex((v) => v.tier === activeTab));
  const vehicle = VEHICLES_DATA[index] ?? VEHICLES_DATA[2];
  const copy = FLEET_COPY[vehicle.tier];

  const handleBookVehicle = (tier: VehicleTier) => {
    setSelectedVehicleTier(tier);
    setActiveTab(tier);
    const widget = document.getElementById('booking-widget');
    if (widget) {
      widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const specs = [
    { label: 'Seats', value: <AnimatedNumber key={`s-${vehicle.tier}`} value={vehicle.seats} whenInView={false} duration={0.7} /> },
    { label: 'Bags', value: <AnimatedNumber key={`l-${vehicle.tier}`} value={vehicle.luggage} whenInView={false} duration={0.7} /> },
    { label: 'Gearbox', value: vehicle.transmission },
    { label: 'Fuel', value: vehicle.fuelType },
    { label: 'Cabin', value: vehicle.hasAC ? 'Air-conditioned' : 'Non-AC' },
  ];

  return (
    <section
      id="fleet"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-coal via-forest-950 to-forest px-5 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32 lg:px-12"
    >
      {/* Ghost class name, drifting on scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: ghostY }}
        className="pointer-events-none absolute inset-x-0 top-[22%] flex justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={vehicle.tier}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 0.09, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="wv-display wv-outline select-none text-[42vw] leading-none lg:text-[30rem]"
          >
            {copy.word}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="max-w-3xl">
          <SectionTag>The fleet</SectionTag>
          <h2 className="wv-title-ext mt-5 text-4xl text-bone sm:text-6xl lg:text-7xl">
            <LineReveal lines={['Five classes.', 'Every kind of journey.']} />
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Class index */}
          <div className="min-w-0 lg:col-span-3">
            <div role="tablist" aria-label="Vehicle classes" className="-mx-5 flex gap-1 overflow-x-auto px-5 scrollbar-none lg:mx-0 lg:flex-col lg:gap-0 lg:px-0">
              {VEHICLES_DATA.map((v, i) => {
                const c = FLEET_COPY[v.tier];
                const isActive = v.tier === activeTab;
                return (
                  <button
                    key={v.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(v.tier)}
                    className={`group relative flex shrink-0 items-baseline gap-4 border-b border-bone/10 px-4 py-4 text-left transition-colors lg:px-0 lg:py-5 ${
                      isActive ? 'text-bone' : 'text-bone/40 hover:text-bone/80'
                    }`}
                  >
                    <span className="wv-num w-6 text-xs font-bold text-crimson-300">0{i + 1}</span>
                    <span>
                      <span className="wv-title block text-3xl sm:text-4xl">{c.name}</span>
                      <span className="mt-1 hidden text-xs text-silver lg:block">{c.kind}</span>
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="wv-fleet-marker"
                        className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-crimson lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[3px]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vehicle stage */}
          <div className="min-w-0 lg:col-span-6">
            <div className="relative">
              <span aria-hidden="true" className="absolute -bottom-3 -right-3 hidden h-full w-full border border-crimson/60 sm:block wv-cut-both" />
              <div className="wv-cut-both relative aspect-[4/3] overflow-hidden bg-coal-950 sm:aspect-[16/11]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={vehicle.tier}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: luxuryEase }}
                  >
                    <SafeImage
                      asset={VEHICLE_IMAGES[vehicle.tier]}
                      className="absolute inset-0 h-full w-full"
                      imgClassName="wv-grade"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-coal/80 via-transparent to-forest/30" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-7">
                  <div>
                    <p className="wv-label text-[9px] text-silver">Example models</p>
                    <p className="mt-1 max-w-[16rem] text-sm font-semibold text-bone">{vehicle.model}</p>
                  </div>
                  <p className="wv-num text-7xl font-extrabold leading-none text-bone/90 sm:text-8xl">
                    0{index + 1}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Spec readout and tariff */}
          <div className="min-w-0 lg:col-span-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={vehicle.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: luxuryEase }}
              >
                <h3 className="wv-title text-4xl text-bone sm:text-5xl">{vehicle.name.replace('WAYVIA ', '').split(' (')[0]}</h3>
                <p className="mt-1 text-sm text-silver">{copy.kind}</p>

                <dl className="mt-6 divide-y divide-bone/10 border-y border-bone/10">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-baseline justify-between py-3">
                      <dt className="wv-label text-[10px] text-silver">{spec.label}</dt>
                      <dd className="wv-num text-sm font-bold text-bone">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6">
                  <p className="wv-label text-[10px] text-silver">Tariff used in the fare estimate</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-bone">
                    <div>
                      <p className="wv-num text-2xl font-extrabold">{formatRupee(vehicle.baseFare)}</p>
                      <p className="text-[11px] text-silver">base</p>
                    </div>
                    <div>
                      <p className="wv-num text-2xl font-extrabold">{formatRupee(vehicle.ratePerKm)}</p>
                      <p className="text-[11px] text-silver">per km</p>
                    </div>
                    <div>
                      <p className="wv-num text-2xl font-extrabold">{formatRupee(vehicle.perMinuteRate)}</p>
                      <p className="text-[11px] text-silver">per min</p>
                    </div>
                  </div>
                </div>

                <WvButton variant="crimson" size="lg" className="mt-8 w-full" onClick={() => handleBookVehicle(vehicle.tier)}>
                  Book this class
                </WvButton>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

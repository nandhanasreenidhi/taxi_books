import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { SafeImage } from '../ui/SafeImage';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { HERO_IMAGE } from '../../data/imagery';
import { SERVICES_DATA, VEHICLES_DATA } from '../../data/mockData';
import { PAYMENT_OPTIONS } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { BookingWidget } from './BookingWidget';
import { LineReveal } from './ui/LineReveal';
import { WvButton } from './ui/WvButton';
import { useParallax } from './ui/useParallax';

const FACTS = [
  { value: SERVICES_DATA.length, label: 'Ways to ride' },
  { value: VEHICLES_DATA.length, label: 'Vehicle classes' },
  { value: PAYMENT_OPTIONS.length, label: 'Payment options' },
] as const;

export const HeroSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const photoY = useParallax(ref, 110);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const [curtain, setCurtain] = useState(true);

  // Safety net: never leave the intro curtain on screen, even if animations are skipped.
  useEffect(() => {
    const t = window.setTimeout(() => setCurtain(false), 2600);
    return () => window.clearTimeout(t);
  }, []);

  const scrollToBooking = () => {
    const widget = document.getElementById('booking-widget');
    widget?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => document.getElementById('wv-pickup')?.focus({ preventScroll: true }), 500);
  };
  const scrollToFleet = () => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="wv-grain relative flex min-h-[100svh] flex-col overflow-hidden bg-coal">
      {/* Intro curtain */}
      {curtain && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-coal-950"
          initial={{ y: 0 }}
          animate={{ y: '-101%' }}
          transition={{ duration: 1, delay: 0.75, ease: luxuryEase }}
          onAnimationComplete={() => setCurtain(false)}
        >
          <motion.span
            className="block h-24 w-10 -skew-x-[14deg] bg-crimson"
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: luxuryEase }}
          />
        </motion.div>
      )}

      {/* Photograph, parallax and slow settle */}
      <motion.div style={{ y: photoY }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, delay: 0.5, ease: luxuryEase }}
        >
          <SafeImage
            asset={HERO_IMAGE}
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full bg-coal"
            imgClassName="wv-grade"
          />
        </motion.div>
      </motion.div>

      {/* Atmosphere: charcoal from the left, forest from below, crimson light from the right */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-coal via-coal/80 to-coal/10 lg:via-coal/70" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/70" />
      <div aria-hidden="true" className="absolute inset-0 bg-forest/35 mix-blend-multiply" />
      <div
        aria-hidden="true"
        className="absolute -right-[12%] bottom-[2%] h-[55vw] w-[55vw] max-h-[780px] max-w-[780px] animate-glow-pulse rounded-full bg-crimson/30 blur-[130px]"
      />

      {/* Animated route line: a journey drawn from the headline to the booking console */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-30 lg:opacity-100"
      >
        <defs>
          <linearGradient id="wv-route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E9E5DC" stopOpacity="0" />
            <stop offset="0.36" stopColor="#E8606A" stopOpacity="0" />
            <stop offset="0.55" stopColor="#E8606A" />
            <stop offset="1" stopColor="#B5121B" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -20 560 C 240 500 430 600 700 450 S 1040 250 1220 300 S 1390 380 1470 240"
          fill="none"
          stroke="url(#wv-route)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, delay: 1.2, ease: luxuryEase }}
        />
        <path
          d="M -20 560 C 240 500 430 600 700 450 S 1040 250 1220 300 S 1390 380 1470 240"
          fill="none"
          stroke="url(#wv-route)"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="6 12"
          className="animate-route-flow"
        />
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.6, ease: luxuryEase }} style={{ originX: '700px', originY: '450px' }}>
          <circle cx="700" cy="450" r="5" fill="#E9E5DC" />
          <circle cx="700" cy="450" r="14" fill="none" stroke="#E9E5DC" strokeOpacity="0.4" />
        </motion.g>
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.2, duration: 0.6, ease: luxuryEase }} style={{ originX: '1220px', originY: '300px' }}>
          <circle cx="1220" cy="300" r="6" fill="#B5121B" />
          <circle cx="1220" cy="300" r="18" fill="none" stroke="#E8606A" strokeOpacity="0.6" className="animate-glow-pulse" />
        </motion.g>
      </svg>

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-between px-5 pb-6 pt-28 sm:px-8 lg:px-12 lg:pt-32">
        <motion.div style={{ opacity: fade }} className="grid flex-1 content-center gap-10 pb-10 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-12">
          <motion.div style={{ y: copyY }} className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: luxuryEase }}
              className="wv-label mb-5 flex items-center gap-3 text-bone/80"
            >
              <span aria-hidden="true" className="block h-4 w-2 -skew-x-[14deg] bg-crimson" />
              Chauffeur-driven and self-drive mobility
            </motion.p>

            <h1 className="wv-display text-[clamp(4.5rem,21vw,6.25rem)] text-bone sm:text-[clamp(5rem,14vw,9.5rem)] lg:text-[clamp(5.5rem,10.4vw,9.75rem)]">
              <LineReveal
                trigger="mount"
                delay={1}
                stagger={0.13}
                lines={[
                  <span key="m">
                    Move <span className="wv-outline">Beyond</span>
                  </span>,
                  <span key="o">
                    Ordinary<span className="text-crimson">.</span>
                  </span>,
                ]}
              />
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.5, ease: luxuryEase }}
                className="max-w-md text-base leading-relaxed text-bone/75 sm:text-lg"
              >
                Rides, airport transfers, outstation trips and self-drive. Choose your car, see the fare first, and book in a minute.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.65, ease: luxuryEase }}
                className="flex flex-wrap items-center gap-3"
              >
                <WvButton variant="crimson" size="lg" onClick={scrollToBooking}>
                  Book a ride
                </WvButton>
                <WvButton variant="ghost" size="lg" onClick={scrollToFleet}>
                  See the fleet
                </WvButton>
              </motion.div>
            </div>
          </motion.div>

          {/* Fact strip: every number here is counted from the app's own data */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2, ease: luxuryEase }}
            className="grid grid-cols-3 gap-4 border-t border-bone/15 pt-5 sm:max-w-md lg:col-span-4 lg:justify-self-end"
          >
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="wv-label text-[9px] text-silver">{fact.label}</dt>
                <dd className="wv-num mt-1 text-4xl font-extrabold text-bone sm:text-5xl">
                  <AnimatedNumber value={fact.value} duration={1.4} whenInView={false} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Booking console docks across the bottom of the hero */}
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: luxuryEase }}
        >
          <BookingWidget />
        </motion.div>
      </div>
    </section>
  );
};

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { SafeImage } from '../ui/SafeImage';
import { INTERLUDE_IMAGE } from '../../data/imagery';
import { luxuryEase } from '../../styles/animations';
import { LineReveal } from './ui/LineReveal';
import { WvButton } from './ui/WvButton';
import { useParallax } from './ui/useParallax';

/** Full-bleed photographic pause. The statement is literally true: the booking console shows the estimate before you commit. */
export const InterludeSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const y = useParallax(ref, 100);

  const goToEstimate = () => {
    document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section ref={ref} className="wv-grain relative flex min-h-[85svh] items-end overflow-hidden bg-coal">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[12%] h-[124%]">
        <SafeImage asset={INTERLUDE_IMAGE} className="absolute inset-0 h-full w-full" imgClassName="wv-grade" sizes="100vw" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-coal via-coal/40 to-coal/80" />
      <div aria-hidden="true" className="absolute inset-0 bg-forest/40 mix-blend-multiply" />
      <div aria-hidden="true" className="absolute -left-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-crimson/25 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 pt-40 sm:px-8 sm:pb-24 lg:px-12">
        <h2 className="wv-display text-[clamp(4rem,14vw,11rem)] text-bone">
          <LineReveal lines={['See the fare', 'first.']} />
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: luxuryEase }}
            className="max-w-sm text-base leading-relaxed text-bone/75"
          >
            Change the service, the vehicle or the route and the estimate follows. You confirm only when you are ready.
          </motion.p>
          <WvButton variant="bone" size="lg" onClick={goToEstimate}>
            Try the estimate
          </WvButton>
        </div>
      </div>
    </section>
  );
};

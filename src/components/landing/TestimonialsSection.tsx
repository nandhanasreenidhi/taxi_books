import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SAMPLE_FEEDBACK } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { SectionTag } from './ui/SectionTag';

const ROTATE_MS = 7000;

/**
 * Kept from the original page, but honest: WAYVIA is a prototype with no real customers, so these are
 * clearly labelled sample lines written for the demo. No names, companies, ratings or verification badges.
 */
export const TestimonialsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % SAMPLE_FEEDBACK.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce]);

  const item = SAMPLE_FEEDBACK[index];

  return (
    <section
      className="relative overflow-hidden bg-coal px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-night-forest opacity-80" />
      {/* Giant quote mark */}
      <svg aria-hidden="true" viewBox="0 0 120 100" className="pointer-events-none absolute -left-4 top-10 h-72 w-72 fill-crimson/20 sm:h-[26rem] sm:w-[26rem] lg:left-[6%]">
        <path d="M0 100V52C0 22 18 4 48 0v20C34 24 28 32 28 46h24v54H0zm68 0V52c0-30 18-48 48-52v20c-14 4-20 12-20 26h24v54H68z" />
      </svg>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionTag>Sample feedback</SectionTag>
          <p className="wv-label border border-bone/25 px-3 py-1.5 text-[9px] text-bone/70">
            Written for this demo. No real reviews yet.
          </p>
        </div>

        <div className="relative mt-14 min-h-[19rem] sm:min-h-[16rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: luxuryEase }}
            >
              <blockquote className="font-impact text-[clamp(1.6rem,4.2vw,3.5rem)] font-medium leading-[1.12] tracking-tight text-bone" style={{ fontStretch: '104%' }}>
                {item.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 text-bone/70">
                <span aria-hidden="true" className="block h-4 w-2 -skew-x-[14deg] bg-crimson" />
                <span className="wv-label text-bone">{item.who}</span>
                <span className="wv-label text-silver">{item.context}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {SAMPLE_FEEDBACK.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show sample ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className="group relative h-8 w-16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-crimson-300"
            >
              <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-bone/20" />
              {i === index && (
                <motion.span
                  key={`${index}-${paused}`}
                  className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-crimson"
                  initial={{ width: reduce ? '100%' : '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: paused || reduce ? 0 : ROTATE_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

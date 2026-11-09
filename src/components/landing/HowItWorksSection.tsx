import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { HOW_STEPS } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { LineReveal } from './ui/LineReveal';
import { SectionTag } from './ui/SectionTag';

export const HowItWorksSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 65%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section id="how-it-works" className="wv-slant-top relative -mt-[5vw] bg-bone px-5 pb-28 pt-[calc(5vw+6rem)] text-coal sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionTag tone="dark">How it works</SectionTag>
            <h2 className="wv-title mt-5 text-[clamp(3rem,8.2vw,7.5rem)]">
              <LineReveal lines={['Four steps.', <span key="x" className="text-crimson">One smooth ride.</span>]} />
            </h2>
          </div>
        </div>

        <div ref={trackRef} className="relative mt-20">
          {/* Road: grey base, crimson fill driven by scroll */}
          <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-[2px] bg-coal/15 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-4 top-0 w-[2px] origin-top bg-crimson lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-16 lg:space-y-28">
            {HOW_STEPS.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <li key={step.title} className="relative grid pl-14 lg:grid-cols-2 lg:pl-0">
                  {/* Node on the road */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0.4, backgroundColor: '#E9E5DC' }}
                    whileInView={{ scale: 1, backgroundColor: '#B5121B' }}
                    viewport={{ once: true, margin: '-35% 0px -35% 0px' }}
                    transition={{ duration: 0.5, ease: luxuryEase }}
                    className="absolute left-4 top-3 z-10 h-5 w-5 -translate-x-1/2 border-2 border-coal lg:left-1/2 lg:top-5"
                    style={{ rotate: '45deg' }}
                  />
                  <motion.div
                    initial={{ opacity: 0, x: right ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
                    transition={{ duration: 0.9, ease: luxuryEase }}
                    className={right ? 'lg:col-start-2 lg:pl-20' : 'lg:pr-20 lg:text-right'}
                  >
                    <span className="wv-display wv-outline block text-[7rem] leading-[0.8] [--wv-stroke:#171416] sm:text-[10rem]">
                      0{i + 1}
                    </span>
                    <h3 className="wv-title-ext mt-3 text-3xl sm:text-4xl">{step.title}</h3>
                    <p className={`mt-3 max-w-md text-base leading-relaxed text-coal/70 ${right ? '' : 'lg:ml-auto'}`}>{step.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

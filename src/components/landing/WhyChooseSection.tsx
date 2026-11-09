import React from 'react';
import { motion } from 'motion/react';
import { WHY_ITEMS } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { LineReveal } from './ui/LineReveal';
import { SectionTag } from './ui/SectionTag';

export const WhyChooseSection: React.FC = () => (
  <section id="why-wayvia" className="relative overflow-hidden bg-gradient-to-b from-forest via-forest-950 to-coal px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
    <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-forest-600/25 blur-[140px]" />
    <div className="relative mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-12 lg:gap-10">
      {/* Sticky statement */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionTag>The WAYVIA standard</SectionTag>
          <h2 className="wv-display-wide mt-6 text-3xl text-bone sm:text-5xl lg:text-[3.4rem]">
            <LineReveal lines={['Built into', 'every booking.']} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: luxuryEase }}
            className="mt-6 max-w-sm text-base leading-relaxed text-bone/65"
          >
            Not promises, features. Each item below is something you can try in this prototype, and the tag says how real it is.
          </motion.p>
        </div>
      </div>

      {/* Rows */}
      <ul className="lg:col-span-7">
        {WHY_ITEMS.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.05, ease: luxuryEase }}
            className="group relative border-t border-bone/15 last:border-b"
          >
            <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-forest-800/60 transition-transform duration-700 ease-luxury group-hover:scale-x-100" />
            <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-crimson transition-transform duration-500 ease-luxury group-hover:scale-y-100" />
            <div className="relative grid gap-3 px-1 py-7 transition-[padding] duration-500 ease-luxury group-hover:pl-6 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-6 sm:py-9">
              <span className="wv-num hidden text-sm font-bold text-crimson-300 sm:block">0{i + 1}</span>
              <div>
                <h3 className="wv-title-ext text-2xl text-bone sm:text-3xl">{item.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-bone/65 sm:text-base">{item.body}</p>
              </div>
              <span
                className={`wv-label inline-block self-start px-2.5 py-1.5 text-[9px] ${
                  item.tag === 'Works in the demo' ? 'bg-forest-700 text-bone' : 'border border-silver/50 text-silver'
                }`}
              >
                {item.tag}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

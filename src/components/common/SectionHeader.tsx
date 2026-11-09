import React from 'react';
import { motion } from 'motion/react';
import { fadeInUp } from '../../styles/animations';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignClasses} ${className}`}
    >
      {badge && (
        // Eyebrow: a short gold rule plus sentence-case label (no boxed, tracked-out capitals).
        <span
          className={`mb-4 inline-flex items-center gap-3 text-sm font-semibold ${
            isDark ? 'text-mint-300' : 'text-navy-700'
          }`}
        >
          <span aria-hidden="true" className="h-px w-8 bg-gold-sheen" />
          {badge}
          {align === 'center' && <span aria-hidden="true" className="h-px w-8 bg-gold-sheen" />}
        </span>
      )}

      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.1] text-balance ${
          isDark ? 'text-ivory-100' : 'text-navy-900'
        }`}
      >
        {title}
        {highlight && (
          // Second line in a softer tone: reads as one thought in two beats rather than a single coloured word.
          <span className={`block mt-1 ${isDark ? 'text-ivory-100/50' : 'text-navy-900/40'}`}>{highlight}</span>
        )}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base sm:text-lg leading-relaxed text-pretty max-w-2xl ${
            isDark ? 'text-ivory-300/80' : 'text-charcoal-500'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

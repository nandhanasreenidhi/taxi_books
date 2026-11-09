import React from 'react';
import { Link } from 'react-router-dom';

interface WordmarkProps {
  className?: string;
  /** Show the tagline under the wordmark. */
  tagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl' } as const;

/** WAYVIA wordmark: extended heavy type with a crimson road-cut slash. */
export const Wordmark: React.FC<WordmarkProps> = ({ className = '', tagline = false, size = 'md' }) => (
  <Link to="/" aria-label="WAYVIA home" className={`group inline-flex items-center gap-3 ${className}`}>
    <span
      aria-hidden="true"
      className="relative block h-7 w-5 shrink-0 -skew-x-[14deg] bg-crimson shadow-glow-crimson transition-transform duration-500 ease-luxury group-hover:skew-x-[-24px]"
    />
    <span className="flex flex-col leading-none">
      <span className={`font-impact ${SIZES[size]} font-black tracking-tight text-bone`} style={{ fontStretch: '118%' }}>
        WAYVIA
      </span>
      {tagline && <span className="wv-label mt-1.5 text-[9px] text-silver">Move beyond ordinary</span>}
    </span>
  </Link>
);

export default Wordmark;

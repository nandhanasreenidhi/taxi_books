import React from 'react';

/** Small uppercase label with a crimson road-cut. Use once per section, and only where it adds context. */
export const SectionTag: React.FC<{ children: React.ReactNode; className?: string; tone?: 'light' | 'dark' }> = ({
  children,
  className = '',
  tone = 'light',
}) => (
  <span className={`wv-label inline-flex items-center gap-3 ${tone === 'light' ? 'text-silver' : 'text-coal/60'} ${className}`}>
    <span aria-hidden="true" className="block h-3 w-1.5 -skew-x-[14deg] bg-crimson" />
    {children}
  </span>
);

export default SectionTag;

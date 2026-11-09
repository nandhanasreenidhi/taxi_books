import React from 'react';

interface MarqueeProps {
  items: readonly string[];
  className?: string;
}

/** Endless strip of words separated by crimson cuts. Duplicated once so the loop is seamless. */
export const Marquee: React.FC<MarqueeProps> = ({ items, className = '' }) => {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <React.Fragment key={`${key}-${i}`}>
          <span className="wv-title whitespace-nowrap px-8 text-4xl sm:text-6xl">{item}</span>
          <span aria-hidden="true" className="block h-8 w-3 -skew-x-[14deg] bg-crimson sm:h-12" />
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="wv-marquee">{[row('a'), row('b')]}</div>
    </div>
  );
};

export default Marquee;

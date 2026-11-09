import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { luxuryEase } from '../../styles/animations';

interface AnimatedNumberProps {
  value: number;
  /** Fractional digits to show. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Indian digit grouping (1,23,456) by default. */
  locale?: string;
  className?: string;
  /** Count up when scrolled into view (default), or immediately on mount. */
  whenInView?: boolean;
}

/**
 * Number that counts to its value. Re-animates from the current figure when `value` changes
 * (for example, a fare that updates after choosing a vehicle). Screen readers get the final value.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.2,
  locale = 'en-IN',
  className,
  whenInView = true,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const format = useCallback(
    (n: number) =>
      `${prefix}${n.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`,
    [prefix, suffix, locale, decimals]
  );

  // Text the first paint shows. React never rewrites it afterwards, so the count-up owns the DOM text.
  const [initialText] = useState(() => format(whenInView && !reduce ? 0 : value));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce || (whenInView && !inView)) {
      if (reduce) {
        shown.current = value;
        node.textContent = format(value);
      }
      return;
    }
    const controls = animate(shown.current, value, {
      duration,
      ease: luxuryEase,
      onUpdate: (latest) => {
        shown.current = latest;
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [value, inView, reduce, whenInView, duration, format]);

  return (
    <span ref={ref} className={className} aria-label={format(value)}>
      {initialText}
    </span>
  );
};

export default AnimatedNumber;

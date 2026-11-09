import { useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import type { RefObject } from 'react';

/**
 * Maps an element's passage through the viewport to a vertical offset.
 * Returns a flat 0 when the visitor prefers reduced motion.
 */
export function useParallax(
  target: RefObject<HTMLElement | null>,
  distance = 80
): MotionValue<number> {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  return useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance, distance]);
}

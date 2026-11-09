import React from 'react';
import { motion, type Variants } from 'motion/react';
import { luxuryEase } from '../../../styles/animations';

interface LineRevealProps {
  /** One entry per visual line. Each line is revealed upward from behind a mask. */
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** `mount` plays on load (hero). `view` plays when scrolled into view. */
  trigger?: 'mount' | 'view';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const line: Variants = {
  hidden: { y: '108%', rotate: 2.5 },
  visible: { y: '0%', rotate: 0, transition: { duration: 1.05, ease: luxuryEase } },
};

/** Masked line-by-line headline reveal. */
export const LineReveal: React.FC<LineRevealProps> = ({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.1,
  trigger = 'view',
  as = 'div',
}) => {
  const Tag = motion[as] as typeof motion.div;
  const play =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' } };
  return (
    <Tag className={className} variants={container(stagger, delay)} {...play}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span variants={line} className={`block origin-left ${lineClassName}`}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default LineReveal;

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { luxuryEase, staggerContainer, staggerItem, viewportOnce } from '../../styles/animations';

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'ul' | 'span' | 'p' | 'header';

const TAGS: Record<RevealTag, React.ElementType> = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  ul: motion.ul,
  span: motion.span,
  p: motion.p,
  header: motion.header,
};

interface RevealProps {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  delay?: number;
  duration?: number;
  /** Start offset in px (positive y rises into place). */
  y?: number;
  x?: number;
  /** Add a blur-to-sharp transition (use sparingly, it is the most expensive effect). */
  blur?: boolean;
  /** Play every time it enters the viewport instead of once. */
  repeat?: boolean;
  id?: string;
}

/** Single element that eases into place when scrolled into view. */
export const Reveal: React.FC<RevealProps> = ({
  children,
  as = 'div',
  className,
  delay = 0,
  duration = 0.8,
  y = 24,
  x = 0,
  blur = false,
  repeat = false,
  id,
}) => {
  const Tag = TAGS[as];
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y, x, ...(blur ? { filter: 'blur(10px)' } : {}) }}
      whileInView={{ opacity: 1, y: 0, x: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }}
      viewport={repeat ? { margin: '-60px' } : viewportOnce}
      transition={{ duration, delay, ease: luxuryEase }}
    >
      {children}
    </Tag>
  );
};

interface RevealGroupProps {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  stagger?: number;
  delay?: number;
}

/** Container that staggers its <RevealItem> children as it enters the viewport. */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  as = 'div',
  className,
  stagger = 0.09,
  delay = 0,
}) => {
  const Tag = TAGS[as];
  return (
    <Tag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Tag>
  );
};

interface RevealItemProps {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  variants?: Variants;
}

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  as = 'div',
  className,
  variants = staggerItem,
}) => {
  const Tag = TAGS[as];
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
};

export default Reveal;

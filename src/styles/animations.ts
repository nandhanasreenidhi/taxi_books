import { Variants, Transition } from 'motion/react';

export const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Custom cubic-bezier for refined luxury feel
export const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: luxuryEase,
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: luxuryEase,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const cardHover = {
  rest: {
    y: 0,
    transition: { duration: 0.3, ease: smoothEase }
  },
  hover: {
    y: -6,
    transition: { duration: 0.3, ease: luxuryEase }
  }
};


/* ==========================================================================
   Phase 0 additions. Existing exports above are unchanged.
   ========================================================================== */

// Springs: use for things that respond to a person's action (open, drop, confirm).
export const springSoft: Transition = { type: 'spring', stiffness: 170, damping: 22, mass: 0.9 };
export const springSnappy: Transition = { type: 'spring', stiffness: 380, damping: 30, mass: 0.7 };
export const springBouncy: Transition = { type: 'spring', stiffness: 420, damping: 16, mass: 0.8 };

// Standard viewport for scroll reveals: fire once, a little before the element is fully on screen.
export const viewportOnce = { once: true, margin: '-60px' } as const;

// A child to be used inside a staggerContainer().
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: luxuryEase },
  },
};

// Blur-to-sharp entrance, good for hero copy and large imagery.
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(14px)', y: 14 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.9, ease: luxuryEase },
  },
};

// Curtain reveal: the element is uncovered from the bottom edge upward.
export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.4 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 1.05, ease: luxuryEase },
  },
};

// Image zoom-settle: starts slightly enlarged and eases to rest.
export const imageSettle: Variants = {
  hidden: { scale: 1.12, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: luxuryEase },
  },
};

// SVG stroke drawing. Apply to <motion.path> (needs pathLength).
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.8, ease: luxuryEase }, opacity: { duration: 0.2 } },
  },
};

// Pop for confirmations and badges.
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: springBouncy },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.18 } },
};

// List rows that can leave: pair with <AnimatePresence initial={false}> and layout.
export const listItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: luxuryEase } },
  exit: { opacity: 0, x: 24, height: 0, marginBottom: 0, transition: { duration: 0.28, ease: smoothEase } },
};

// Route changes. Exit is short so navigation never feels slow.
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, ease: luxuryEase } },
  exit: { opacity: 0, transition: { duration: 0.14, ease: smoothEase } },
};

// Directional step transition for multi-step flows such as the booking wizard.
export const stepSlide = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: luxuryEase } },
  exit: (direction: number) => ({ opacity: 0, x: direction >= 0 ? -32 : 32, transition: { duration: 0.2, ease: smoothEase } }),
};

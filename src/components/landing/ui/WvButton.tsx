import React from 'react';
import { motion } from 'motion/react';

type Variant = 'crimson' | 'ghost' | 'bone' | 'dark';

interface WvButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: Variant;
  size?: 'md' | 'lg';
  children: React.ReactNode;
}

const BASE =
  'group/btn relative isolate inline-flex select-none items-center justify-center overflow-hidden font-impact font-bold uppercase tracking-[0.14em] ' +
  'transition-[color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson-300 ' +
  'disabled:cursor-not-allowed disabled:opacity-50 wv-cut-both';

const VARIANTS: Record<Variant, { shell: string; fill: string }> = {
  crimson: { shell: 'bg-crimson text-bone hover:shadow-glow-crimson', fill: 'bg-coal' },
  ghost: { shell: 'border border-bone/30 text-bone hover:text-coal', fill: 'bg-bone' },
  bone: { shell: 'bg-bone text-coal', fill: 'bg-crimson' },
  dark: { shell: 'bg-coal text-bone', fill: 'bg-crimson' },
};

const SIZES = { md: 'px-6 py-3.5 text-[11px]', lg: 'px-8 py-4 text-xs sm:text-[13px]' } as const;

/**
 * Primary action for the public site: speed-cut corners, a colour wipe on hover and a spring press.
 * Wiping, not scaling, keeps the shape crisp.
 */
export const WvButton: React.FC<WvButtonProps> = ({
  variant = 'crimson',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}) => {
  const v = VARIANTS[variant];
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`${BASE} ${v.shell} ${SIZES[size]} ${className}`}
      style={{ fontStretch: '112%' }}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-500 ease-luxury group-hover/btn:scale-x-100 group-focus-visible/btn:scale-x-100 ${
          variant === 'crimson' ? 'bg-coal' : v.fill
        }`}
      />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.button>
  );
};

export default WvButton;

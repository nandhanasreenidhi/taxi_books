import React from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { luxuryEase } from '../../styles/animations';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Call to action: a Button or Link. An empty screen should always offer a next step. */
  action?: React.ReactNode;
  /** `dark` for navy surfaces (driver portal, modals). */
  tone?: 'light' | 'dark';
  compact?: boolean;
  className?: string;
}

/**
 * Empty state with a slowly orbiting route ring. Reads as "nothing here yet, here is what to do",
 * not as an error. Pair with a clear action.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  tone = 'light',
  compact = false,
  className,
}) => {
  const dark = tone === 'dark';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: luxuryEase }}
      className={cn(
        'relative flex flex-col items-center text-center',
        compact ? 'px-5 py-8' : 'px-6 py-14',
        className
      )}
    >
      <div className={cn('relative mb-5 flex items-center justify-center', compact ? 'h-20 w-20' : 'h-28 w-28')}>
        {/* Static rings */}
        <span
          className={cn(
            'absolute inset-0 rounded-full border border-dashed',
            dark ? 'border-white/15' : 'border-navy-900/15'
          )}
        />
        <span
          className={cn(
            'absolute inset-3 rounded-full border',
            dark ? 'border-white/10' : 'border-navy-900/10'
          )}
        />
        {/* Orbiting dot */}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
        >
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300 shadow-glow-gold" />
        </motion.span>
        {/* Icon medallion */}
        <span
          className={cn(
            'relative flex items-center justify-center rounded-full',
            compact ? 'h-11 w-11' : 'h-14 w-14',
            dark ? 'bg-white/10 text-mint-300 shadow-inset-glow' : 'bg-navy-900 text-mint-300 shadow-premium'
          )}
        >
          <Icon className={compact ? 'h-5 w-5' : 'h-6 w-6'} strokeWidth={1.8} />
        </span>
      </div>

      <h3
        className={cn(
          'font-display font-bold tracking-tight',
          compact ? 'text-base' : 'text-xl',
          dark ? 'text-ivory-100' : 'text-navy-900'
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            'mt-1.5 max-w-sm text-sm leading-relaxed',
            dark ? 'text-ivory-300/70' : 'text-charcoal-500'
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
};

export default EmptyState;

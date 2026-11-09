import React from 'react';

export type BadgeVariant = 'navy' | 'mint' | 'gold' | 'charcoal' | 'outline' | 'glass' | 'night';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
  /** Small status dot before the label. */
  dot?: boolean;
  /** Pulse the dot (live or in-progress states). */
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'mint',
  className = '',
  size = 'md',
  dot = false,
  pulse = false,
}) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';

  const variantClasses: Record<BadgeVariant, string> = {
    navy: 'bg-navy-900 text-ivory-100 border border-navy-700',
    mint: 'bg-mint-100 text-navy-900 border border-mint-300 font-semibold',
    gold: 'bg-gold-100 text-navy-900 border border-gold-300 font-semibold',
    charcoal: 'bg-charcoal-100 text-charcoal-700 border border-charcoal-200',
    outline: 'border border-navy-900/20 text-navy-900 bg-transparent',
    glass: 'bg-white/40 backdrop-blur-md border border-white/60 text-navy-900 shadow-xs',
    night: 'bg-white/10 backdrop-blur-md border border-white/15 text-mint-200 shadow-inset-glow',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />}
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
};


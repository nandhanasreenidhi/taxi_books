import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { LucideIcon } from 'lucide-react';

export type ButtonVariant = 'primary' | 'mint' | 'gold' | 'outline' | 'ghost' | 'glass' | 'ivory' | 'glass-dark';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3.5 py-2 rounded-lg gap-1.5 font-medium',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2 font-semibold',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold',
    xl: 'text-lg px-8 py-4 rounded-2xl gap-3 font-bold',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-b from-navy-800 to-navy-900 text-ivory-100 hover:from-navy-700 hover:to-navy-800 active:from-navy-900 active:to-navy-950 shadow-md hover:shadow-premium border border-navy-700/60 shadow-inset-glow',
    mint:
      'bg-mint-sheen text-navy-900 hover:brightness-105 active:brightness-95 shadow-sm hover:shadow-glow-mint font-bold',
    gold:
      'bg-gold-sheen text-navy-900 hover:brightness-105 active:brightness-95 shadow-sm hover:shadow-glow-gold font-bold',
    ivory:
      'bg-ivory-100 text-navy-900 hover:bg-white active:bg-ivory-200 shadow-sm hover:shadow-lift font-bold',
    'glass-dark':
      'bg-white/10 hover:bg-white/15 text-ivory-100 backdrop-blur-md border border-white/20 shadow-inset-glow',
    outline:
      'bg-transparent text-navy-900 border border-navy-800/20 hover:border-navy-900 hover:bg-navy-900/5',
    ghost:
      'bg-transparent text-charcoal-700 hover:text-navy-900 hover:bg-navy-900/5',
    glass:
      'bg-white/20 hover:bg-white/30 text-navy-900 backdrop-blur-md border border-white/40 shadow-sm',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className={`group relative isolate inline-flex items-center justify-center overflow-hidden transition-[background-color,box-shadow,filter,border-color,color] duration-300 select-none cursor-pointer focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Light sweep on hover: one pass, then rests */}
      {!disabled && !isLoading && (variant === 'primary' || variant === 'mint' || variant === 'gold') && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:animate-shine"
        />
      )}
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform" />}
        </>
      )}
    </motion.button>
  );
};


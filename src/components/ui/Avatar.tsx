import React from 'react';
import { cn } from '../../utils/cn';
import { SafeImage } from './SafeImage';

const SIZES = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
} as const;

interface AvatarProps {
  src?: string;
  name: string;
  size?: keyof typeof SIZES;
  ring?: 'mint' | 'gold' | 'none';
  className?: string;
}

/** Round photo with initials fallback, so a dead avatar URL never shows a broken icon. */
export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', ring = 'none', className }) => (
  <SafeImage
    src={src}
    alt={name}
    name={name}
    fallback={{ kind: 'avatar' }}
    timeoutMs={8000}
    className={cn(
      'shrink-0 rounded-full',
      SIZES[size],
      ring === 'mint' && 'ring-2 ring-mint-300 ring-offset-2 ring-offset-transparent',
      ring === 'gold' && 'ring-2 ring-gold-300 ring-offset-2 ring-offset-transparent',
      className
    )}
  />
);

export default Avatar;

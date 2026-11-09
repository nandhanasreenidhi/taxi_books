import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
  /** Use on navy or other dark surfaces. */
  dark?: boolean;
}

/** Shimmering placeholder block. Size it with width/height utilities. */
export const Skeleton: React.FC<SkeletonProps> = ({ className, dark = false }) => (
  <div aria-hidden="true" className={cn(dark ? 'skeleton-dark' : 'skeleton', 'rounded-xl', className)} />
);

interface SkeletonTextProps extends SkeletonProps {
  lines?: number;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, className, dark }) => (
  <div className={cn('space-y-2.5', className)} role="status" aria-label="Loading">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} dark={dark} className={cn('h-3.5', i === lines - 1 ? 'w-2/3' : 'w-full')} />
    ))}
  </div>
);

/** Card-shaped placeholder: image area, title, two lines. */
export const SkeletonCard: React.FC<SkeletonProps> = ({ className, dark }) => (
  <div
    role="status"
    aria-label="Loading"
    className={cn(
      'overflow-hidden rounded-3xl border p-3',
      dark ? 'border-white/10 bg-white/[0.03]' : 'border-ivory-300 bg-white',
      className
    )}
  >
    <Skeleton dark={dark} className="aspect-[16/10] w-full rounded-2xl" />
    <div className="space-y-2.5 p-3 pt-4">
      <Skeleton dark={dark} className="h-5 w-3/5" />
      <Skeleton dark={dark} className="h-3.5 w-full" />
      <Skeleton dark={dark} className="h-3.5 w-4/5" />
    </div>
  </div>
);

export default Skeleton;

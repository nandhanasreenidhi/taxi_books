import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import type { FallbackSpec, ImageAsset } from '../../data/imagery';
import { FallbackArt } from './art/FallbackArt';

type Status = 'loading' | 'loaded' | 'failed';

interface SafeImageProps {
  /** Pass a manifest asset, or a bare src plus alt. */
  asset?: ImageAsset;
  src?: string;
  alt?: string;
  fallback?: FallbackSpec;
  /** Initials source for avatar fallbacks. */
  name?: string;
  /** Above-the-fold images: load eagerly with high priority. */
  priority?: boolean;
  sizes?: string;
  /** CSS aspect-ratio for the frame, e.g. '16 / 10'. */
  aspect?: string;
  /** Wrapper classes (set the height or aspect here). */
  className?: string;
  /** Classes for the <img> itself. */
  imgClassName?: string;
  /** Slowly scale the photo up when a parent with `group` is hovered. */
  zoomOnGroupHover?: boolean;
  /** Give up and show the fallback if nothing arrives in this time. A late arrival still replaces it. */
  timeoutMs?: number;
  children?: React.ReactNode;
}

const SafeImageFrame: React.FC<SafeImageProps> = ({
  asset,
  src: srcProp,
  alt: altProp,
  fallback: fallbackProp,
  name,
  priority = false,
  sizes,
  aspect,
  className,
  imgClassName,
  zoomOnGroupHover = false,
  timeoutMs = 12000,
  children,
}) => {
  const src = asset?.src ?? srcProp;
  const alt = asset?.alt ?? altProp ?? '';
  const fallback = fallbackProp ?? asset?.fallback;
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<Status>(src ? 'loading' : 'failed');

  // Handle images that finished (or failed) before React attached its handlers.
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !src) return;
    if (img.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'failed');
  }, [src]);

  useEffect(() => {
    if (status !== 'loading') return;
    const timer = window.setTimeout(() => setStatus('failed'), timeoutMs);
    return () => window.clearTimeout(timer);
  }, [status, timeoutMs]);

  const showFallback = status === 'failed';

  return (
    <div
      className={cn('relative isolate overflow-hidden bg-navy-900', className)}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {/* Placeholder: shimmering navy while the photo travels */}
      <div
        aria-hidden="true"
        className={cn(
          'skeleton-dark absolute inset-0 transition-opacity duration-500',
          status === 'loading' ? 'opacity-100' : 'opacity-0'
        )}
      />

      {showFallback && <FallbackArt spec={fallback} name={name} />}

      {src && (
        <img
          ref={imgRef}
          src={src}
          srcSet={asset?.srcSet}
          sizes={sizes ?? (asset?.srcSet ? '(min-width: 1024px) 50vw, 100vw' : undefined)}
          alt={showFallback ? '' : alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          // fetchpriority is lowercase in React 19 typings
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('failed')}
          style={asset?.position ? { objectPosition: asset.position } : undefined}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-luxury',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            zoomOnGroupHover && 'group-hover:scale-105',
            imgClassName
          )}
        />
      )}

      {showFallback && alt && <span className="sr-only">{alt}</span>}
      {children}
    </div>
  );
};

/**
 * Image that never looks broken: shimmer while loading, soft fade-in on arrival,
 * and a branded SVG fallback if the photo fails or takes too long.
 * Keyed by src so a changed image restarts its loading state cleanly.
 */
export const SafeImage: React.FC<SafeImageProps> = (props) => (
  <SafeImageFrame key={props.asset?.src ?? props.src ?? 'none'} {...props} />
);

export default SafeImage;

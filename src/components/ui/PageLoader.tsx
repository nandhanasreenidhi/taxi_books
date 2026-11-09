import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

/**
 * Suspense fallback shown while a route chunk downloads. Appears only after a short delay,
 * so fast navigations never flash a loader.
 */
export const PageLoader: React.FC<{ delayMs?: number }> = ({ delayMs = 180 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  if (!show) return <div className="min-h-screen bg-ivory-100" aria-hidden="true" />;

  return (
    <div
      role="status"
      aria-live="polite"
      className="texture-grain dark-stage flex min-h-screen items-center justify-center bg-aurora"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-navy-900/80 shadow-card-dark edge-light">
          <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none" aria-hidden="true">
            <motion.path
              d="M8 12L15 28L20 16L25 28L32 12"
              stroke="#91D9C5"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0.5 }}
            />
            <circle cx="20" cy="11" r="2.2" fill="#E9B96D" />
          </svg>
        </div>
        <svg viewBox="0 0 160 6" className="h-1.5 w-40" aria-hidden="true">
          <line x1="0" y1="3" x2="160" y2="3" stroke="#91D9C5" strokeOpacity="0.25" strokeWidth="2" />
          <line
            x1="0"
            y1="3"
            x2="160"
            y2="3"
            stroke="#91D9C5"
            strokeWidth="2"
            strokeDasharray="10 14"
            className="animate-route-flow"
          />
        </svg>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default PageLoader;

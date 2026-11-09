import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { luxuryEase } from '../../styles/animations';

type ToastTone = 'success' | 'info' | 'warning' | 'error';

interface ToastProps {
  /** Message to show. Pass null or an empty string to hide. */
  message: string | null | undefined;
  tone?: ToastTone;
  onDismiss: () => void;
  /** Auto-dismiss after this many ms. Set 0 to keep it until dismissed. */
  autoHideMs?: number;
  /** `inline` sits in the page flow (replaces the old notice banners). `floating` pins to the screen bottom. */
  variant?: 'inline' | 'floating';
  className?: string;
}

const TONES: Record<ToastTone, { icon: React.ElementType; shell: string; bar: string }> = {
  success: { icon: CheckCircle2, shell: 'border-mint-300/70 bg-mint-50 text-mint-700', bar: 'bg-mint-400' },
  info: { icon: Info, shell: 'border-navy-200 bg-navy-50 text-navy-700', bar: 'bg-navy-400' },
  warning: { icon: AlertTriangle, shell: 'border-gold-300 bg-gold-50 text-gold-600', bar: 'bg-gold-400' },
  error: { icon: XCircle, shell: 'border-rose-200 bg-rose-50 text-rose-700', bar: 'bg-rose-400' },
};

/** Status message that slides in, counts down visibly, and can be dismissed. */
export const Toast: React.FC<ToastProps> = ({
  message,
  tone = 'success',
  onDismiss,
  autoHideMs = 5000,
  variant = 'inline',
  className,
}) => {
  const visible = Boolean(message);
  // Keep the latest callback without restarting the countdown when the parent re-renders.
  const dismissRef = useRef(onDismiss);
  useEffect(() => {
    dismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!visible || !autoHideMs) return;
    const timer = window.setTimeout(() => dismissRef.current(), autoHideMs);
    return () => window.clearTimeout(timer);
  }, [message, visible, autoHideMs]);

  const { icon: Icon, shell, bar } = TONES[tone];

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key={message}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: variant === 'floating' ? 24 : -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: variant === 'floating' ? 16 : -6, transition: { duration: 0.18 } }}
          transition={{ duration: 0.4, ease: luxuryEase }}
          className={cn(
            'relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border px-4 py-3 text-sm font-medium shadow-subtle',
            variant === 'floating' &&
              'fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] left-1/2 z-[60] w-[min(92vw,28rem)] -translate-x-1/2 shadow-lift',
            shell,
            className
          )}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <Icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 break-words">{message}</span>
          </span>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss message"
            className="focus-ring -mr-1 shrink-0 rounded-lg p-1 opacity-70 transition hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
          {autoHideMs > 0 && (
            <motion.span
              aria-hidden="true"
              className={cn('absolute bottom-0 left-0 h-0.5 w-full origin-left', bar)}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: autoHideMs / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

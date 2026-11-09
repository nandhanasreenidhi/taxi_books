import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { usePortalStore } from '../../store/usePortalStore';
import { NAV_LINKS } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { Wordmark } from './ui/Wordmark';
import { WvButton } from './ui/WvButton';

const PORTALS = [
  { name: 'Customer', note: 'Book, track and pay', route: '/customer' },
  { name: 'Driver', note: 'Requests, trips and earnings', route: '/driver' },
  { name: 'Admin', note: 'Bookings, drivers and fleet', route: '/admin' },
] as const;

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const portalRef = useRef<HTMLDivElement>(null);
  const { openLoginModal } = usePortalStore();
  const navigate = useNavigate();

  // Page progress hairline
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the portal menu on outside click or Escape
  useEffect(() => {
    if (!portalsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (portalRef.current && !portalRef.current.contains(e.target as Node)) setPortalsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPortalsOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [portalsOpen]);

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleScrollToBooking = () => {
    setMenuOpen(false);
    const widget = document.getElementById('booking-widget');
    if (widget) {
      widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      navigate('/customer/book');
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: luxuryEase }}
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,padding,border-color] duration-500 ${
          isScrolled ? 'border-b border-bone/10 bg-coal/85 py-3 backdrop-blur-xl' : 'border-b border-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Wordmark tagline={!isScrolled} />

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`wv-label relative px-4 py-2.5 transition-colors ${isActive ? 'text-bone' : 'text-bone/60 hover:text-bone'}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="wv-nav-underline"
                      className="absolute inset-x-4 -bottom-0.5 h-[2px] bg-crimson"
                      transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                    />
                  )}
                </a>
              );
            })}

            <div ref={portalRef} className="relative">
              <button
                type="button"
                aria-expanded={portalsOpen}
                aria-haspopup="menu"
                onClick={() => setPortalsOpen((o) => !o)}
                className="wv-label flex items-center gap-1.5 px-4 py-2.5 text-bone/60 transition-colors hover:text-bone"
              >
                Portals
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${portalsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {portalsOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: 10, clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                    exit={{ opacity: 0, y: 6, clipPath: 'inset(0 0 100% 0)' }}
                    transition={{ duration: 0.35, ease: luxuryEase }}
                    className="wv-cut-both absolute right-0 mt-3 w-72 border border-bone/10 bg-coal-950 p-2 shadow-lift"
                  >
                    <p className="wv-label px-3 pb-2 pt-1 text-[9px] text-silver">Demo portals</p>
                    {PORTALS.map((portal) => (
                      <button
                        key={portal.name}
                        role="menuitem"
                        type="button"
                        onClick={() => {
                          setPortalsOpen(false);
                          navigate(portal.route);
                        }}
                        className="group flex w-full items-center justify-between px-3 py-3 text-left transition-colors hover:bg-forest-800"
                      >
                        <span>
                          <span className="block text-sm font-bold text-bone">{portal.name} portal</span>
                          <span className="block text-[11px] text-silver">{portal.note}</span>
                        </span>
                        <span aria-hidden="true" className="block h-4 w-1.5 -skew-x-[14deg] bg-crimson opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-5 sm:flex">
            <button
              type="button"
              onClick={() => openLoginModal()}
              className="wv-label text-bone/70 transition-colors hover:text-bone"
            >
              Sign in
            </button>
            <WvButton variant="crimson" onClick={handleScrollToBooking}>
              Book a ride
            </WvButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative ml-4 flex h-10 w-10 flex-col items-end justify-center gap-[7px] lg:hidden"
          >
            <span className={`block h-[2px] bg-bone transition-all duration-300 ${menuOpen ? 'w-6 translate-y-[9px] rotate-45' : 'w-6'}`} />
            <span className={`block h-[2px] bg-crimson transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`block h-[2px] bg-bone transition-all duration-300 ${menuOpen ? 'w-6 -translate-y-[9px] -rotate-45' : 'w-5'}`} />
          </button>
        </div>

        {/* Reading progress */}
        <motion.span aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-crimson" />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)', transition: { duration: 0.45, ease: luxuryEase } }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-night-forest px-6 pb-10 pt-28"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: luxuryEase }}
                  className="wv-title border-b border-bone/10 py-3 text-5xl text-bone active:text-crimson-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <p className="wv-label mb-3 text-silver">Demo portals</p>
              <div className="grid grid-cols-3 gap-2">
                {PORTALS.map((portal) => (
                  <button
                    key={portal.name}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(portal.route);
                    }}
                    className="border border-bone/20 px-2 py-3 text-xs font-bold uppercase tracking-wider text-bone active:bg-forest-800"
                  >
                    {portal.name}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <WvButton variant="crimson" size="lg" onClick={handleScrollToBooking}>
                  Book a ride
                </WvButton>
                <WvButton
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    setMenuOpen(false);
                    openLoginModal();
                  }}
                >
                  Sign in
                </WvButton>
              </div>
            </motion.div>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-bone/25 text-bone transition-colors active:bg-crimson"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute left-6 top-6">
              <Wordmark size="sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

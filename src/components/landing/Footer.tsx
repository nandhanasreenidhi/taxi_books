import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { usePortalStore } from '../../store/usePortalStore';
import { SERVICE_COPY, NAV_LINKS } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { Wordmark } from './ui/Wordmark';
import { WvButton } from './ui/WvButton';
import { LineReveal } from './ui/LineReveal';

const linkCls = 'group relative inline-block py-1 text-sm text-bone/65 transition-colors hover:text-bone';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { openLoginModal } = usePortalStore();

  const goToBooking = () => {
    const widget = document.getElementById('booking-widget');
    if (widget) widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    else navigate('/customer/book');
  };

  return (
    <footer className="wv-grain relative overflow-hidden bg-coal-950 text-bone">
      {/* Sign-off */}
      <div className="relative border-b border-bone/10 bg-night-forest px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-end justify-between gap-10">
          <h2 className="wv-display text-[clamp(4rem,13vw,10.5rem)] text-bone">
            <LineReveal lines={['Move beyond', <span key="o" className="text-crimson">ordinary.</span>]} />
          </h2>
          <div className="max-w-xs">
            <p className="mb-6 text-sm leading-relaxed text-bone/70">Pick a service, see the fare, and book. It takes about a minute.</p>
            <WvButton variant="crimson" size="lg" onClick={goToBooking}>
              Book a ride
            </WvButton>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Wordmark size="lg" tagline />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone/55">
              WAYVIA is a demonstration of a modern mobility booking experience across three connected portals.
            </p>
          </div>

          <nav aria-label="Services" className="md:col-span-3 md:col-start-6">
            <p className="wv-label mb-4 text-silver">Services</p>
            <ul>
              {Object.values(SERVICE_COPY).map((s) => (
                <li key={s.name}>
                  <a href="#services" className={linkCls}>{s.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore" className="md:col-span-2">
            <p className="wv-label mb-4 text-silver">Explore</p>
            <ul>
              {NAV_LINKS.filter((l) => l.href !== '#services').map((l) => (
                <li key={l.name}>
                  <a href={l.href} className={linkCls}>{l.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Portals" className="md:col-span-2">
            <p className="wv-label mb-4 text-silver">Demo portals</p>
            <ul>
              <li><button type="button" onClick={() => navigate('/customer')} className={linkCls}>Customer</button></li>
              <li><button type="button" onClick={() => navigate('/driver')} className={linkCls}>Driver</button></li>
              <li><button type="button" onClick={() => navigate('/admin')} className={linkCls}>Admin</button></li>
              <li><button type="button" onClick={() => openLoginModal()} className={linkCls}>Portal gateway</button></li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-6 text-xs text-bone/45">
          <p>© {new Date().getFullYear()} WAYVIA. A prototype built for demonstration.</p>
          <p>Demo content only: no real bookings, payments or customer data.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="wv-label text-bone/70 transition-colors hover:text-crimson-300"
          >
            Back to top
          </button>
        </div>
      </div>

      {/* Cropped wordmark */}
      <motion.div
        aria-hidden="true"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: luxuryEase }}
        className="pointer-events-none -mb-[0.14em] select-none overflow-hidden text-center font-impact text-[17vw] font-black leading-[0.82] text-bone/[0.045]"
        style={{ fontStretch: '118%' }}
      >
        WAYVIA
      </motion.div>
    </footer>
  );
};

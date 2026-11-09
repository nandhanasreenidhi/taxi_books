import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { CORPORATE_PILLARS } from '../../data/landingContent';
import { luxuryEase } from '../../styles/animations';
import { LineReveal } from './ui/LineReveal';
import { WvButton } from './ui/WvButton';
import { SectionTag } from './ui/SectionTag';

const STATUS_FLOW = ['Scheduled', 'En route', 'Completed'] as const;
const PREVIEW_ROWS = [
  { rider: 'Rider A', route: 'City hub to airport', cls: 'Executive', offset: 0 },
  { rider: 'Rider B', route: 'Office to client site', cls: 'Prime', offset: 1 },
  { rider: 'Team of 6', route: 'Hotel to terminal', cls: 'XL', offset: 2 },
] as const;

const inputCls =
  'w-full border border-bone/20 bg-bone/5 px-3.5 py-3 text-sm font-medium text-bone placeholder:text-bone/35 focus:border-crimson-400 focus:outline-none focus:ring-2 focus:ring-crimson/30';

export const CorporateSection: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ company: '', name: '', email: '', fleetNeeds: '5-20 rides/week' });
  const [tick, setTick] = useState(0);

  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsDemoModalOpen(false);
      setFormData({ company: '', name: '', email: '', fleetNeeds: '5-20 rides/week' });
    }, 2500);
  };

  // Illustrative status cycle in the preview (purely decorative, not live data)
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="corporate" className="relative grid overflow-hidden lg:grid-cols-2">
      {/* Copy side */}
      <div className="wv-grain relative bg-coal px-5 py-24 sm:px-8 lg:px-12 lg:py-32 xl:pl-[max(3rem,calc((100vw-1500px)/2+3rem))]">
        <SectionTag>Corporate</SectionTag>
        <h2 className="wv-title mt-5 text-[clamp(3rem,8vw,7rem)] text-bone">
          <LineReveal lines={['Ground travel', 'for teams.']} />
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-bone/70">
          One account for many riders is the idea behind WAYVIA for business. This page shows the concept: the preview is
          illustrative and the inquiry form is a demo that sends nothing.
        </p>

        <ul className="mt-10 max-w-lg">
          {CORPORATE_PILLARS.map((pillar, i) => (
            <motion.li
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: luxuryEase }}
              className="group flex items-baseline gap-5 border-t border-bone/10 py-5 last:border-b"
            >
              <span className="wv-num text-xs font-bold text-crimson-300">0{i + 1}</span>
              <span>
                <span className="block font-bold text-bone transition-transform duration-500 ease-luxury group-hover:translate-x-1.5">{pillar.title}</span>
                <span className="mt-1 block text-sm text-bone/60">{pillar.body}</span>
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-10">
          <WvButton variant="crimson" size="lg" onClick={() => setIsDemoModalOpen(true)}>
            Request a corporate account
          </WvButton>
        </div>
      </div>

      {/* Preview side */}
      <div className="relative flex items-center overflow-hidden bg-forest px-5 py-20 sm:px-8 lg:px-14">
        <div aria-hidden="true" className="absolute inset-0 bg-route-grid [background-size:56px_56px]" />
        <div aria-hidden="true" className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-crimson/25 blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: luxuryEase }}
          className="relative w-full max-w-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="wv-label text-bone/80">Account overview</p>
            <p className="wv-label border border-bone/30 px-2 py-1 text-[9px] text-bone/70">Illustrative preview</p>
          </div>
          <div className="border-y border-bone/20">
            {PREVIEW_ROWS.map((row) => {
              const status = STATUS_FLOW[(tick + row.offset) % STATUS_FLOW.length];
              return (
                <div key={row.rider} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-bone/10 py-5 last:border-b-0">
                  <div>
                    <p className="wv-title-ext text-xl text-bone">{row.rider}</p>
                    <p className="mt-1 text-sm text-bone/60">
                      {row.route} <span className="text-bone/30">/</span> {row.cls}
                    </p>
                  </div>
                  <div className="relative h-7 w-28 overflow-hidden text-right">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={status}
                        initial={{ y: 22, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -22, opacity: 0 }}
                        transition={{ duration: 0.45, ease: luxuryEase }}
                        className={`wv-label absolute right-0 top-1 inline-flex items-center gap-2 text-[10px] ${
                          status === 'En route' ? 'text-crimson-300' : status === 'Completed' ? 'text-bone' : 'text-bone/60'
                        }`}
                      >
                        <span aria-hidden="true" className={`block h-1.5 w-1.5 ${status === 'En route' ? 'animate-pulse bg-crimson-300' : status === 'Completed' ? 'bg-bone' : 'bg-bone/40'}`} />
                        {status}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-bone/50">Sample rows to show the idea. No real riders, routes or bookings.</p>
        </motion.div>
      </div>

      {/* Inquiry modal (demo) */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute inset-0 bg-coal-950/85 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Corporate account inquiry"
              initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="wv-cut-both relative w-full max-w-md border border-bone/10 bg-coal p-7 shadow-lift"
            >
              <button type="button" aria-label="Close" onClick={() => setIsDemoModalOpen(false)} className="absolute right-4 top-4 text-bone/60 hover:text-bone">
                <X className="h-5 w-5" />
              </button>
              {submitted ? (
                <div className="py-10 text-center">
                  <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-crimson text-bone">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="wv-title text-3xl text-bone">Demo submitted</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm text-bone/65">This is a demo form. Nothing was sent and nothing was stored.</p>
                </div>
              ) : (
                <form onSubmit={handleCorporateSubmit} className="space-y-4">
                  <h3 className="wv-title text-3xl text-bone">Corporate inquiry</h3>
                  <p className="text-xs text-bone/55">Demo form: nothing is sent or stored.</p>
                  <div>
                    <label className="wv-label mb-1.5 block text-silver" htmlFor="corp-company">Company</label>
                    <input id="corp-company" required type="text" placeholder="Company name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="wv-label mb-1.5 block text-silver" htmlFor="corp-name">Contact</label>
                      <input id="corp-name" required type="text" placeholder="Full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                    </div>
                    <div>
                      <label className="wv-label mb-1.5 block text-silver" htmlFor="corp-email">Email</label>
                      <input id="corp-email" required type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="wv-label mb-1.5 block text-silver" htmlFor="corp-volume">Expected volume</label>
                    <select id="corp-volume" value={formData.fleetNeeds} onChange={(e) => setFormData({ ...formData, fleetNeeds: e.target.value })} className={`${inputCls} [color-scheme:dark]`}>
                      <option value="5-20 rides/week">5-20 trips / month</option>
                      <option value="20-100 rides/week">20-100 trips / month</option>
                      <option value="100+ rides/week">100+ trips / month</option>
                    </select>
                  </div>
                  <WvButton type="submit" variant="crimson" size="lg" className="w-full">
                    Submit demo inquiry
                  </WvButton>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

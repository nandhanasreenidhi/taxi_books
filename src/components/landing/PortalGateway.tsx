import React from 'react';
import { motion } from 'motion/react';
import { PortalType } from '../../types';
import { NoirArt } from '../ui/art/NoirArt';
import { luxuryEase } from '../../styles/animations';
import { WvButton } from './ui/WvButton';

interface PortalDef {
  id: PortalType;
  role: string;
  title: string;
  line: string;
  features: string[];
  route: string;
  demoAccount: string;
  scene: 'city' | 'road' | 'corporate';
  tone: string;
}

const PORTALS: PortalDef[] = [
  {
    id: 'customer',
    role: 'Riders',
    title: 'Customer',
    line: 'Book it. Track it. Pay for it.',
    features: ['Five services, one booking flow', 'Itemised fares and promo codes', 'Wallet, tracking and invoices'],
    route: '/customer',
    demoAccount: 'priya.sundaram@wayvia.in',
    scene: 'city',
    tone: 'bg-forest text-bone',
  },
  {
    id: 'driver',
    role: 'Chauffeurs',
    title: 'Driver',
    line: 'Requests in. Trips done.',
    features: ['Accept or decline incoming requests', 'Move a trip from pickup to complete', 'Earnings from completed trips'],
    route: '/driver',
    demoAccount: 'chauffeur.murugan@wayvia.in',
    scene: 'road',
    tone: 'bg-coal-800 text-bone',
  },
  {
    id: 'admin',
    role: 'Operations',
    title: 'Admin',
    line: 'Every booking in view.',
    features: ['Bookings across all riders', 'Drivers and fleet register', 'Demo pricing view and reports'],
    route: '/admin',
    demoAccount: 'director@wayvia.com',
    scene: 'corporate',
    tone: 'bg-coal-950 text-bone',
  },
];

interface PortalGatewayProps {
  selected: PortalType;
  onSelect: (id: PortalType) => void;
  onEnter: (id: PortalType, route: string) => void;
  /** Panel height class so the gateway can serve both the modal and the full page. */
  heightClass?: string;
}

/**
 * Three portals as tall panels. The selected one opens up and shows its details.
 * Presentation only: selection and navigation are handled by the caller exactly as before.
 */
export const PortalGateway: React.FC<PortalGatewayProps> = ({ selected, onSelect, onEnter, heightClass = 'lg:h-[520px]' }) => (
  <div className={`flex flex-col gap-2 lg:flex-row ${heightClass}`} role="radiogroup" aria-label="Choose a portal">
    {PORTALS.map((portal, i) => {
      const isSelected = selected === portal.id;
      return (
        <motion.div
          key={portal.id}
          role="radio"
          aria-checked={isSelected}
          tabIndex={0}
          onClick={() => onSelect(portal.id)}
          onFocus={() => onSelect(portal.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(portal.id);
            }
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: luxuryEase }}
          className={`relative cursor-pointer overflow-hidden outline-none transition-[height,flex-grow] duration-[700ms] ease-luxury focus-visible:ring-2 focus-visible:ring-crimson-300 ${portal.tone} ${
            isSelected ? 'h-[27rem] lg:h-auto lg:flex-[2.2]' : 'h-[5rem] lg:h-auto lg:flex-1'
          }`}
        >
          <div className={`absolute inset-0 transition-opacity duration-700 ${isSelected ? 'opacity-60' : 'opacity-25'}`}>
            <NoirArt scene={portal.scene} />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-coal-950/90 via-coal-950/30 to-transparent" />
          <span aria-hidden="true" className={`absolute left-0 top-0 h-full w-[3px] origin-top bg-crimson transition-transform duration-500 ${isSelected ? 'scale-y-100' : 'scale-y-0'}`} />

          {/* Collapsed */}
          <div className={`absolute inset-0 flex items-center justify-between px-5 transition-opacity duration-500 lg:flex-col lg:justify-between lg:px-0 lg:py-6 ${isSelected ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
            <span className="wv-label text-[10px] text-crimson-300">{portal.role}</span>
            <span className="wv-title text-3xl lg:rotate-180 lg:[writing-mode:vertical-rl] lg:text-4xl">{portal.title}</span>
          </div>

          {/* Expanded */}
          <div className={`absolute inset-x-0 bottom-0 p-6 transition-[opacity,transform] duration-700 ease-luxury sm:p-8 ${isSelected ? 'translate-y-0 opacity-100 delay-150' : 'pointer-events-none translate-y-6 opacity-0'}`}>
            <p className="wv-label text-[10px] text-crimson-300">{portal.role}</p>
            <h3 className="wv-title mt-1 text-5xl sm:text-6xl">{portal.title}</h3>
            <p className="wv-display-wide mt-2 text-xs text-bone/80 sm:text-sm">{portal.line}</p>
            <ul className="mt-5 space-y-2 text-sm text-bone/80">
              {portal.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-1.5 block h-2.5 w-1 shrink-0 -skew-x-[14deg] bg-crimson" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[11px] text-silver">
              Demo access, no password needed. Demo account: <span className="text-bone/80">{portal.demoAccount}</span>
            </p>
            <WvButton
              variant="crimson"
              size="md"
              className="mt-5"
              onClick={(e) => {
                e.stopPropagation();
                onEnter(portal.id, portal.route);
              }}
            >
              Enter {portal.title} portal
            </WvButton>
          </div>
        </motion.div>
      );
    })}
  </div>
);

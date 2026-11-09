import React from 'react';
import { Marquee } from './ui/Marquee';
import { SERVICE_COPY, FLEET_COPY } from '../../data/landingContent';

const WORDS = [
  ...Object.values(SERVICE_COPY).map((s) => s.name),
  ...Object.values(FLEET_COPY).map((f) => f.name),
];

/** Forest-green ticker that links the hero to the content: every word is a real service or vehicle class. */
export const RouteBand: React.FC = () => (
  <div aria-label="WAYVIA services and vehicle classes" role="group" className="relative z-10 -mt-px bg-forest py-5 text-bone sm:py-6">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson to-transparent" />
    <Marquee items={WORDS} className="mask-fade-x" />
  </div>
);

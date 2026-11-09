import React, { Suspense, lazy } from 'react';
import { Navbar } from '../../components/landing/Navbar';
import { HeroSection } from '../../components/landing/HeroSection';
import { RouteBand } from '../../components/landing/RouteBand';
import '../../styles/landing.css';

// Below-the-fold sections download right after the hero paints.
const LandingSections = lazy(() => import('../../components/landing/LandingRest').then((m) => ({ default: m.LandingSections })));
const LandingClosing = lazy(() => import('../../components/landing/LandingRest').then((m) => ({ default: m.LandingClosing })));

export const LandingPage: React.FC = () => {
  return (
    <div className="wv-root relative flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <RouteBand />
        <Suspense fallback={<div aria-hidden="true" className="min-h-[60vh] bg-coal" />}>
          <LandingSections />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <LandingClosing />
      </Suspense>
    </div>
  );
};

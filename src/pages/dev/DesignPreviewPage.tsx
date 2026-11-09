import React, { useState } from 'react';
import { CalendarX2, Route as RouteIcon } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Logo } from '../../components/common/Logo';
import { SectionHeader } from '../../components/common/SectionHeader';
import {
  AnimatedNumber,
  Avatar,
  EmptyState,
  RevealGroup,
  RevealItem,
  SafeImage,
  SceneArt,
  Skeleton,
  SkeletonCard,
  Toast,
  VehicleIllustration,
} from '../../components/ui';
import type { SceneMotif } from '../../data/imagery';
import type { VehicleTier } from '../../types';

/**
 * Development-only gallery of the Phase 0 design foundation (route: /__design).
 * It is registered only when import.meta.env.DEV is true, so it is not part of production builds.
 */
const TIERS: VehicleTier[] = ['mini', 'hatchback', 'sedan', 'suv', 'premium'];
const SCENES: SceneMotif[] = ['city', 'road', 'airport', 'key', 'plain'];

const swatches = [
  ['navy-900', '#14243B', 'text-ivory-100'],
  ['ink-900', '#080F1A', 'text-ivory-100'],
  ['mint-300', '#91D9C5', 'text-navy-900'],
  ['gold-300', '#E9B96D', 'text-navy-900'],
  ['ivory-100', '#F7F5EF', 'text-navy-900'],
  ['charcoal-700', '#202833', 'text-ivory-100'],
];

export const DesignPreviewPage: React.FC = () => {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-ivory-100">
      {/* Dark stage */}
      <section className="texture-grain dark-stage bg-aurora px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <Logo variant="light" />
            <Badge variant="night" dot pulse>Phase 0 foundation preview</Badge>
          </div>
          <h1 className="mt-14 max-w-3xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-ivory-100 sm:text-7xl">
            Move beyond ordinary.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ivory-300/80">
            Bricolage Grotesque for headlines, Plus Jakarta Sans for everything you read. Navy, mint and gold on
            layered night surfaces with a fine film grain.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="mint" size="lg">Book a ride</Button>
            <Button variant="gold" size="lg">Become a partner</Button>
            <Button variant="glass-dark" size="lg">View fleet</Button>
            <Button variant="ivory" size="lg">Sign in</Button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {TIERS.map((tier) => (
              <div key={tier} className="edge-light relative overflow-hidden rounded-3xl bg-ink-800/80 shadow-card-dark">
                <div className="relative aspect-[4/3]">
                  <SceneArt motif="plain" />
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <VehicleIllustration tier={tier} className="h-full w-full" />
                  </div>
                </div>
                <p className="px-4 pb-4 pt-1 text-sm font-semibold capitalize text-ivory-100">{tier}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {SCENES.map((motif) => (
              <div key={motif} className="relative aspect-[4/3] overflow-hidden rounded-3xl edge-light">
                <SceneArt motif={motif} />
                <span className="absolute bottom-3 left-4 text-sm font-semibold capitalize text-ivory-100">{motif}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ivory stage */}
      <section className="bg-aurora-ivory px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            align="left"
            badge="Typography and tokens"
            title="One headline face, one reading face."
            highlight="Everything else is restraint."
            description="Section headers now use a sentence-case eyebrow with a gold rule and a two-beat headline."
          />

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {swatches.map(([name, hex, text]) => (
              <div key={name} className={`rounded-2xl p-4 shadow-subtle ${text}`} style={{ backgroundColor: hex }}>
                <p className="text-xs font-bold">{name}</p>
                <p className="text-xs opacity-70">{hex}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            <div className="rounded-3xl bg-navy-900 p-8 text-ivory-100 shadow-lift">
              <p className="text-sm text-ivory-300/70">Trips completed in this session</p>
              <p className="mt-2 font-display text-6xl font-bold">
                <AnimatedNumber value={1284} />
              </p>
              <p className="mt-6 text-sm text-ivory-300/70">Sample fare</p>
              <p className="font-display text-3xl font-semibold text-mint-300">
                <AnimatedNumber value={446} prefix="₹" />
              </p>
            </div>

            <div className="space-y-4">
              <p className="font-display text-xl font-bold text-navy-900">Loading placeholders</p>
              <SkeletonCard />
            </div>

            <div className="space-y-4">
              <p className="font-display text-xl font-bold text-navy-900">Image safety</p>
              <SafeImage
                src="https://invalid.example/missing.jpg"
                alt="Missing city photo"
                fallback={{ kind: 'scene', motif: 'city' }}
                timeoutMs={1500}
                className="aspect-[16/10] rounded-3xl"
              />
              <div className="flex items-center gap-3">
                <Avatar src="https://invalid.example/a.jpg" name="Priya Sundaram" size="lg" ring="mint" />
                <Avatar src="https://invalid.example/b.jpg" name="Murugan S" size="lg" ring="gold" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-ivory-300 bg-white/70 shadow-subtle">
              <EmptyState
                icon={CalendarX2}
                title="No rides booked yet"
                description="Your upcoming and past rides will appear here once you book your first trip."
                action={<Button variant="primary">Book a ride</Button>}
              />
            </div>
            <div className="dark-stage rounded-3xl bg-ink-800 shadow-card-dark">
              <EmptyState
                tone="dark"
                icon={RouteIcon}
                title="No ride requests right now"
                description="Stay online. New requests will appear here with pickup, drop and fare."
                action={<Button variant="glass-dark">Go offline</Button>}
              />
            </div>
          </div>

          <div className="mt-16">
            <RevealGroup className="grid gap-4 sm:grid-cols-3">
              {['Staggered', 'entrance', 'on scroll'].map((t) => (
                <RevealItem key={t} className="rounded-3xl border border-ivory-300 bg-white p-6 font-display text-2xl font-bold text-navy-900">
                  {t}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setToast('Booking confirmed. Your driver will be assigned shortly.')}>
                Show toast
              </Button>
              <Badge variant="mint" dot pulse>Live</Badge>
              <Badge variant="gold" dot>Upcoming</Badge>
              <Badge variant="navy">Completed</Badge>
            </div>
            <Toast message={toast} onDismiss={() => setToast(null)} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignPreviewPage;

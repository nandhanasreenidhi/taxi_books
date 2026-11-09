# Phase 0: Foundation and safety net

Visual work only. No store, service, type or booking-calculation file was touched
(`npm run safety` proves it against the original Phase 6 upload).

## What changed

**Design tokens** (`tailwind.config.js`, `src/index.css`)
- Headlines: Bricolage Grotesque (variable: weight and optical size). Body: Plus Jakarta Sans.
  Both are self-hosted in `src/assets/fonts` (SIL OFL licenses included), so there is no third-party
  font request, and the rupee sign renders in the brand fonts.
- New colour ramp `ink` (deep stage colour), gradients `bg-aurora`, `bg-aurora-ivory`, `bg-mint-sheen`,
  `bg-gold-sheen`, `bg-route-grid`, shadows `shadow-lift`, `shadow-card-dark`, `shadow-inset-glow`,
  `shadow-ring-mint`, easing `ease-luxury`, and animations (`shimmer`, `shine`, `route-flow`, `float-slow`,
  `glow-pulse`, `marquee`, `drift`, `draw`).
- Utilities: `texture-grain` (film grain), `edge-light` (light-catching rim), `mask-fade-*`, `skeleton`,
  `skeleton-dark`, `pt-safe`, `pb-safe`, `scrollbar-dark`, `focus-ring`, `dark-stage`.

**Motion** (`src/main.tsx`, `src/styles/animations.ts`)
- `<MotionConfig reducedMotion="user">` makes every Motion animation honour the OS reduced-motion setting.
- New variants: springs, `staggerItem`, `blurIn`, `maskReveal`, `imageSettle`, `drawPath`, `popIn`,
  `listItem`, `pageTransition`, `stepSlide`. Existing exports are unchanged.

**Routing** (`src/routes/index.tsx`)
- Same 17 routes. All pages except the landing page are lazy-loaded; navigation fades between pages and
  scrolls to top after the old page leaves. First-load JS dropped from 694 KB to 460 KB (gzip 192 to 140 KB).

**UI kit** (`src/components/ui`)
`SafeImage`, `Avatar`, `Reveal` / `RevealGroup` / `RevealItem`, `AnimatedNumber`, `Skeleton` / `SkeletonText` /
`SkeletonCard`, `EmptyState`, `Toast`, `PageTransition`, `PageLoader`, and SVG art:
`VehicleIllustration` (five tiers), `SceneArt` (city, road, airport, key, plain), `FallbackArt`.

**Imagery** (`src/data/imagery.ts`)
One manifest for every photo, with a branded SVG fallback per asset. Swap any `src` for your own
licensed photo (or a file under `public/images`) without touching components.
Resolve vehicle images by tier (`getVehicleImage`) rather than the `vehicleImage` URL stored in
persisted bookings.

**Refined shared components**
`Button` (gradient surfaces, one-pass light sweep, spring press, `ivory` and `glass-dark` variants),
`Badge` (`night` variant, status dot, pulse), `SectionHeader` (sentence-case eyebrow with gold rule,
two-beat headline), `Logo` (gradient mark, glow). All existing props still work.

## Safety net
- `npm run safety`: all original routes present, protected files byte-identical, store contract intact.
- `npm run check`: safety, lint, build.
- `python3 scripts/smoke-test.py` (optional, needs Python Playwright): renders every route and runs
  customer -> driver (accept, arrive, start, complete) -> customer Completed.
- Dev only: run `npm run dev` and open `/__design` for a gallery of the foundation. It is excluded from
  production builds.

## Manual regression checklist (run after each phase)
1. Landing: booking widget changes service tabs, fare updates, "Book" leads to the wizard.
2. Portal modal and `/login` reach Customer, Driver and Admin.
3. Customer: demo login, wizard steps 1 to 5, promo code, wallet payment, booking appears in My Bookings.
4. Driver: accept, mark arrived, start trip, complete trip, earnings update.
5. Admin: booking appears with the same status; status change reflects in customer and driver views.
6. Cancel a ride: wallet refund behaves as before. Reload: persisted state survives.
7. Resize to 360, 390, 768 and 1280 px. Turn on OS reduced motion: no movement-based animation.

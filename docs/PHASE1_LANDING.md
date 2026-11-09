# Phase 1: Public landing site

New creative direction: a dark, powerful automotive look. Charcoal black `#171416` and forest green
`#09251C` dominate, crimson `#B5121B` is reserved for action and emphasis (CTAs, active states, route lines),
warm ivory `#E9E5DC` and muted silver `#8C9690` carry text. Added to Tailwind as `coal`, `forest`, `crimson`,
`bone` and `silver`. The older navy, mint and gold tokens are untouched because the portals still use them.

## Scope
Redesigned: landing page, public navigation, footer, hero, booking console, services, fleet, why, how it works,
corporate, testimonials, and the portal gateway (modal and `/login`).

Frozen: Customer, Driver and Admin pages, `CustomerLayout`, `components/customer`, shared `Button`, `Badge`,
`Logo`, `mockData.ts`, `animations.ts`, all stores, services and types. `npm run safety` checks 22 portal files
against the Phase 0 checkpoint by hash.

## Typography
- Archivo (variable weight and width, self-hosted) for display. Four voices: condensed heavy hero (`wv-display`),
  condensed section titles (`wv-title`), extended heavy titles (`wv-title-ext`), extended light statements
  (`wv-display-wide`), plus spaced uppercase micro-labels (`wv-label`).
- Plus Jakarta Sans for reading text. The rupee sign falls back to Bricolage Grotesque (it is not in Archivo's Latin file).

## Sections and their personalities
1. **Hero:** full-bleed photograph with parallax and slow settle, charcoal and forest grading, crimson light,
   an intro curtain, masked line-by-line headline, a route line that draws itself, and the booking console docked
   across the bottom. Facts are counted from app data (services, vehicle classes, payment options).
2. **Route band:** forest-green ticker of real service and vehicle names.
3. **Services:** expanding photographic panels (accordion on mobile). Choosing one selects it in the booking console.
4. **Fleet:** class index, crossfading vehicle stage, drifting ghost class name, spec readout and the tariff the fare
   estimate really uses. "Book this class" selects it in the console.
5. **Why:** sticky statement beside six real features, each tagged "Works in the demo" or "Simulated".
6. **Interlude:** full-bleed parallax photograph, "See the fare first".
7. **How it works:** bone-coloured section with a slanted edge and a road that fills with crimson as you scroll.
8. **Corporate:** split screen with a clearly labelled illustrative account preview and the (demo) inquiry form.
9. **Sample feedback:** large typographic quotes, labelled as written for the demo.
10. **Footer:** sign-off, link columns, cropped wordmark.

## Honesty changes (copy)
Removed because nothing in the prototype supports them: real company names in testimonials, ratings, "Top 3%",
"99.8% on-time", "48,000 trips", police-verification, carbon-offset claims, "Wi-Fi on board", "4 min arrival",
"zero cancellation fee", integrations (Concur, Expensify, QuickBooks), "response within 2 hours", investor,
academy and whitepaper links, app-store badges, and the newsletter form (it pretended to subscribe people).
Why-WAYVIA, How-it-works, Corporate and Footer copy now describes only what the prototype does, and
simulated features say so. `mockData.ts` is unchanged because the booking wizard reads it; the landing page
uses `src/data/landingContent.ts` instead.

## Images
All photographs come from `src/data/imagery.ts` through `SafeImage`. Each has a branded noir SVG fallback
(`NoirArt`, `VehicleIllustration palette="noir"`). Photos are the Unsplash IDs already used by the original
project; swap any `src` for your own licensed photo.

## Verification
`npm run safety`, `npm run lint`, `npm run build`, and `python3 scripts/smoke-test.py` (see the file header).

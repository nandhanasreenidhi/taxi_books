# Responsive pass

Layout-only changes. No colours, fonts, copy, animations, routes, stores, services or types were changed.
Desktop (1280px and up) is visually unchanged. The safety baseline for portal files was regenerated on purpose.

## Modified files
- src/components/landing/FleetSection.tsx: single explicit column on mobile (scrolling class tabs were stretching the grid and clipping the stage).
- src/components/landing/BookingWidget.tsx: date/time stack under 400px; Riders/Bags stack under 360px; fare and Book now stack under 380px; tabs tighter under 360px.
- src/styles/landing.css: date/time field padding on narrow phones.
- src/layouts/CustomerLayout.tsx: header fits 320-375px; top nav now starts at 1100px (1024-1099px uses the bottom tab bar); compact SOS/city/trip pill between 1100 and 1279px.
- src/pages/customer/CustomerBookingsPage.tsx: action buttons wrap.
- src/pages/driver/DriverPortalPage.tsx: full-width 44px Accept/Decline on phones; pickup dot no longer squashed; ledger rows can shrink.
- src/pages/admin/AdminPortalPage.tsx: booking register is stacked cards below 1280px (table from 1280px); pricing rows stack on phones; stat cards and export row fit; table no longer remounts on each keystroke (search kept losing focus).
- docs/baseline/portal-files.json: regenerated.

## Verified
npm run safety, lint (0 errors), build, scripts/smoke-test.py all pass.
No horizontal overflow on 12 routes at 320, 360, 375, 390, 430, 768, 1024 and 1280px.

## Not covered
Booking wizard, tracking, wallet, profile and support pages were screenshotted but only checked for overflow, not reviewed in detail.
Customer city selector is still hidden under 640px (unchanged).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


## WAYVIA Admin Portal (Phase 4 update)

The admin portal now includes an Indian-market operations workspace with overview KPIs, shared booking management, driver records derived from booking assignments, a sample Indian fleet register, editable demo fare settings, and CSV booking reports. Admin booking status updates are reflected in the shared customer/driver booking store.

### Demo booking cleanup

The preloaded sample customer bookings have been removed. The customer, driver, and admin portals now start with an empty booking list. Existing browser storage is migrated once (store version 2) to clear the old demo bookings and active demo booking pointer while preserving the customer profile and wallet data. New bookings created through the customer portal will appear in the admin booking register and driver request list.

### Demo limitations

This is still a frontend prototype. Driver onboarding/KYC, fleet CRUD, persistent pricing configuration, live GPS/dispatch, payments, and backend authentication are not connected to a production API. Pricing edits currently remain in the admin page's local component state.


## WAYVIA Shared Booking Workflow (Phase 5)
- Customer bookings are created in the shared Zustand customer store and appear in the driver and admin portals.
- New chauffeur bookings begin as `upcoming` with no driver assigned. Self-drive bookings remain customer-managed and are not offered to chauffeur partners.
- A driver acceptance action assigns the demo partner profile and moves the booking to `active`; the customer tracking screen then reveals the assigned driver and trip OTP.
- Driver trip actions update the same shared booking: arrived at pickup, trip started, and completed. Customer booking/tracking views and admin metrics read those same records.
- Admin status changes use the shared store action, so status changes are reflected by the other portals in the same browser session.
- This is still a browser-local prototype using Zustand persistence. It does not provide cross-device real-time sync, authenticated driver ownership, GPS telemetry, dispatch matching, or payment gateway processing. Those require a backend/realtime service and production security controls.

## Phase 6 — polish and backend readiness

- Improved narrow-screen behaviour for driver tabs and admin navigation.
- Added visible keyboard focus styles and reduced-motion support.
- Added mobile safe-area spacing for the customer bottom navigation.
- Corrected the customer SOS demo copy: it does not send an alert or share location; use India's 112 emergency number directly for immediate danger.
- Added `docs/BACKEND_READINESS.md` with a proposed API contract, booking state machine, money/data rules and production blockers.

### Phase 6 validation notes

This is still a frontend prototype. The backend document describes a recommended integration contract; none of those endpoints are implemented. A full production build should be run in the developer's local environment after `npm install`, because the supplied `node_modules` folder may contain platform-specific binaries.


## Visual transformation (in progress)

The app is being redesigned phase by phase without changing business logic.
Phase 0 (design foundation and safety net) is documented in `docs/PHASE0_FOUNDATION.md`; Phase 1 (public landing site) in `docs/PHASE1_LANDING.md`.
Run `npm run safety` after any change; run `npm run check` before sharing a build.

# WAYVIA backend integration readiness

## Current prototype boundary

The current application is a browser-local prototype. Zustand persist stores customer profile, wallet and booking data in the browser. Customer, driver and admin views share that data only when they run in the same browser storage context. There is no server-side identity, cross-device synchronisation, payment processing, GPS feed, push notification service or production dispatch engine.

Do not use the current demo authentication, wallet, SOS, driver earnings, pricing or fleet data as production services.

## Recommended production architecture

- **Frontend:** retain the React + TypeScript + Vite portals. Keep UI components independent from transport details.
- **API:** introduce a typed API client under `src/services/api/` with a configurable `VITE_API_BASE_URL`.
- **Identity:** server-issued sessions or short-lived access tokens; distinct customer, driver and administrator roles; enforce permissions on every API request.
- **Database:** PostgreSQL as the source of truth for users, driver profiles, vehicles, bookings, fare quotes, payments, wallet ledger entries and audit events.
- **Realtime:** WebSocket or managed realtime subscriptions for booking assignment, trip status and driver location. Do not poll or trust browser-local state as the authoritative status.
- **Maps/location:** use a maps provider for geocoding and routing; accept driver location only from an authenticated driver session and with explicit location permission.
- **Payments:** use a compliant payment gateway. Verify payment webhooks server-side; never treat a client-side success screen as proof of payment.
- **Operations:** centralised logs, monitoring, backups, rate limits, secret management and audit trails.

## Suggested API contract

| Area | Endpoint | Purpose |
|---|---|---|
| Auth | `POST /auth/customer/login` | Customer sign-in |
| Auth | `POST /auth/driver/login` | Driver sign-in |
| Auth | `POST /auth/admin/login` | Admin sign-in with stronger controls |
| Customer | `GET /me` | Current authenticated profile |
| Customer | `PATCH /me` | Update permitted profile fields |
| Booking | `POST /fare-quotes` | Server-calculated fare quote |
| Booking | `POST /bookings` | Create booking after quote validation |
| Booking | `GET /bookings` | List bookings visible to the current user |
| Booking | `GET /bookings/:id` | Read one authorised booking |
| Dispatch | `POST /driver/bookings/:id/accept` | Atomic driver acceptance |
| Dispatch | `POST /driver/bookings/:id/decline` | Decline a dispatched request |
| Trip | `POST /driver/bookings/:id/arrived` | Record arrival at pickup |
| Trip | `POST /driver/bookings/:id/start` | Start trip |
| Trip | `POST /driver/bookings/:id/complete` | Complete trip |
| Location | `POST /driver/location` | Send authenticated driver coordinates |
| Admin | `PATCH /admin/bookings/:id/status` | Admin-authorised status correction |
| Wallet | `GET /wallet/transactions` | Read ledger |
| Payments | `POST /payments/checkout` | Create gateway checkout session |
| Safety | `POST /safety/sos` | Server-side emergency workflow after operational/legal review |

These are proposed contracts, not live endpoints.

## Booking state machine

Expected chauffeur journey:

`requested → searching → assigned → driver_arrived → in_progress → completed`

Terminal alternatives: `cancelled`, `expired`, `no_driver_found`.

Self-drive should use a separate fulfilment lifecycle, for example:

`requested → confirmed → vehicle_ready → handover → active_rental → returned → completed`.

The backend must validate every transition. A driver must not complete a booking they do not own; a customer must not update dispatch state; an admin correction must be audited. Driver acceptance must be atomic so two drivers cannot accept the same request.

## Important data and money rules

- Store money as integer paise, not floating-point rupees. Return formatted INR strings from the UI layer.
- Store timestamps in UTC and render in the user's local timezone.
- Generate booking IDs on the server and enforce uniqueness in the database.
- Store fare quote inputs, pricing version, tax components and final amount for auditability.
- Keep wallet balances derived from immutable ledger entries or transactionally updated with a ledger record.
- Process refunds and payment webhooks idempotently.
- Never trust a fare, driver assignment, payment status, role or booking status supplied by the browser.
- Store vehicle registration, driver identity and customer personal data securely; restrict access by role and purpose.

## Frontend migration plan

1. Define TypeScript request/response types for the contracts above.
2. Add an API client and environment configuration; keep secrets out of `VITE_*` variables.
3. Replace store mutations with async service calls while retaining Zustand as a UI cache.
4. Add loading, empty, offline, validation and server-error states to each portal.
5. Add authenticated route guards, while keeping server-side authorisation authoritative.
6. Subscribe to server events and reconcile the local cache after reconnects.
7. Add integration tests for permissions, duplicate acceptance, cancellation/refund and every booking transition.

## Production release blockers

- Real authentication and role-based authorisation
- Server-side fare calculation and dispatch
- Real driver/vehicle onboarding and verification
- Payment gateway and reconciled wallet ledger
- Live location with permission, retention and safety controls
- Emergency workflow that has been tested with the actual operating partners
- Privacy policy, terms, cancellation/refund policy and applicable regulatory review
- Automated tests, monitoring, backups and security review

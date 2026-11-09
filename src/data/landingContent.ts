import type { ServiceType, VehicleTier } from '../types';

/**
 * Copy for the public landing site.
 *
 * Everything here describes what the prototype actually does. Prices and vehicle numbers are not
 * duplicated: the fleet section reads them from VEHICLES_DATA, the same source the booking
 * calculation uses. Statements about the real world (response times, ratings, certifications,
 * customers) are deliberately absent because there is no backing data.
 */

export const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Fleet', href: '#fleet' },
  { name: 'Why WAYVIA', href: '#why-wayvia' },
  { name: 'How it works', href: '#how-it-works' },
  { name: 'Corporate', href: '#corporate' },
] as const;

export const SERVICE_COPY: Record<ServiceType, { name: string; line: string; detail: string }> = {
  instant: {
    name: 'Instant Taxi',
    line: 'Point to point, right now.',
    detail: 'Set a pickup and a drop, pick a vehicle class and see the fare before you confirm.',
  },
  rental: {
    name: 'Hourly Rental',
    line: 'A chauffeur on the clock.',
    detail: 'Book 2, 4, 8 or 12 hours with one vehicle for errands, meetings and multi-stop days.',
  },
  outstation: {
    name: 'Outstation',
    line: 'City to city, your schedule.',
    detail: 'Plan a one-way drop or add a return date for a round trip.',
  },
  airport: {
    name: 'Airport Transfer',
    line: 'Terminal to door.',
    detail: 'Add your flight number to the booking so your chauffeur knows which arrival to meet.',
  },
  'self-drive': {
    name: 'Self-Drive',
    line: 'You take the wheel.',
    detail: 'Choose a vehicle class and your dates. Pickup and return details are set in the booking.',
  },
};

export const FLEET_COPY: Record<VehicleTier, { name: string; kind: string; word: string }> = {
  mini: { name: 'Mini', kind: 'Compact city runabout', word: 'MINI' },
  hatchback: { name: 'Go', kind: 'Everyday hatchback', word: 'GO' },
  sedan: { name: 'Prime', kind: 'Sedan with a deep boot', word: 'PRIME' },
  suv: { name: 'XL', kind: 'Three-row family SUV', word: 'XL' },
  premium: { name: 'Executive', kind: 'Executive people carrier', word: 'EXEC' },
};

export const WHY_ITEMS = [
  {
    title: 'The fare comes first',
    body: 'The estimate updates as you change service, vehicle and route, and an itemised breakdown is shown before you pay.',
    tag: 'Works in the demo',
  },
  {
    title: 'A ride code for every trip',
    body: 'Each booking carries a 4-digit ride code, shown on the tracking screen.',
    tag: 'Works in the demo',
  },
  {
    title: 'Follow the journey',
    body: 'Watch your chauffeur approach on a live-style map. In this prototype the movement is simulated.',
    tag: 'Simulated',
  },
  {
    title: 'Four ways to pay',
    body: 'UPI, WAYVIA Wallet, card or cash at the end of the ride. No real payment is taken here.',
    tag: 'Simulated',
  },
  {
    title: 'Invoices on tap',
    body: 'Open a tax invoice for any booking straight from My Bookings.',
    tag: 'Works in the demo',
  },
  {
    title: 'Three portals, one booking',
    body: 'A ride booked by a customer appears for the driver and the admin, and every status change travels back.',
    tag: 'Works in the demo',
  },
] as const;

export const HOW_STEPS = [
  {
    title: 'Choose a service and a vehicle',
    body: 'Instant, hourly, airport, outstation or self-drive, in five vehicle classes.',
  },
  {
    title: 'See your fare',
    body: 'Enter pickup and drop, and the estimate updates on the spot with an itemised breakdown to follow.',
  },
  {
    title: 'Track and share your ride code',
    body: 'Follow your chauffeur on the tracking screen. The 4-digit ride code is shown there.',
  },
  {
    title: 'Pay and keep the invoice',
    body: 'Pick UPI, wallet, card or cash. Open the tax invoice from My Bookings whenever you need it.',
  },
] as const;

export const CORPORATE_PILLARS = [
  { title: 'One account, many riders', body: 'Consolidated monthly billing across a team.' },
  { title: 'Team travel rules', body: 'Set allowances by department and pre-approve trips.' },
  { title: 'A named account desk', body: 'One contact for scheduling and changes.' },
  { title: 'Multi-city coordination', body: 'Plan ground travel around flights across cities.' },
] as const;

/** Written for this prototype. There are no real customer reviews yet. */
export const SAMPLE_FEEDBACK = [
  {
    quote:
      'I saw the full fare before I confirmed anything, then followed the car on the tracking screen. It felt calm from start to finish.',
    who: 'Sample rider',
    context: 'Airport transfer',
  },
  {
    quote:
      'Switching from a sedan to the XL changed the estimate immediately. No surprises when it was time to pay.',
    who: 'Sample rider',
    context: 'Family outstation trip',
  },
  {
    quote:
      'Booking a four-hour rental took a minute. The invoice was waiting in My Bookings afterwards.',
    who: 'Sample rider',
    context: 'Hourly rental',
  },
] as const;

export const PAYMENT_OPTIONS = ['UPI', 'Wallet', 'Card', 'Cash'] as const;

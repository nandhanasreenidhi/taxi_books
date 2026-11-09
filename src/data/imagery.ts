import type { ServiceType, VehicleTier } from '../types';

/**
 * Central image manifest for WAYVIA.
 *
 * - Every photo in the app is looked up here (never hard-coded in components).
 * - Photos are remote Unsplash images. If one fails to load (or is slow), <SafeImage>
 *   shows the branded SVG fallback described by `fallback`, so no broken image is ever visible.
 * - To use your own licensed photo, change a single `src` below (or drop a file in /public/images
 *   and point `src` at '/images/your-file.jpg'). No component changes are needed.
 * - Persisted bookings store a `vehicleImage` URL from the time of booking. UI code should
 *   resolve imagery by tier with getVehicleImage(tier) instead of trusting that stored URL.
 */

export type SceneMotif = 'city' | 'road' | 'airport' | 'key' | 'plain';

export type NoirScene = 'hero' | 'city' | 'road' | 'airport' | 'key' | 'corporate' | 'fleet' | 'interlude';

export type FallbackSpec =
  | { kind: 'noir'; scene: NoirScene; tier?: VehicleTier }
  | { kind: 'vehicle'; tier: VehicleTier }
  | { kind: 'scene'; motif: SceneMotif }
  | { kind: 'avatar' };

export interface ImageAsset {
  /** Full-size source (about 1200px wide). */
  src: string;
  /** Responsive candidates, width descriptor to URL. */
  srcSet?: string;
  alt: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
  fallback: FallbackSpec;
}

export const unsplash = (photoId: string, width = 1200, quality = 80) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=${quality}`;

const unsplashSet = (photoId: string, widths: number[] = [480, 800, 1200, 1600]) =>
  widths.map((w) => `${unsplash(photoId, w)} ${w}w`).join(', ');

const photo = (
  photoId: string,
  alt: string,
  fallback: FallbackSpec,
  position?: string
): ImageAsset => ({
  src: unsplash(photoId),
  srcSet: unsplashSet(photoId),
  alt,
  position,
  fallback,
});

/** Photo IDs already used by the original project. */
const IDS = {
  hero: 'photo-1503376780353-7e6692767b70',
  instant: 'photo-1549399542-7e3f8b79c341',
  rental: 'photo-1503376780353-7e6692767b70',
  outstation: 'photo-1469854523086-cc02fe5d8800',
  airport: 'photo-1569154941061-e231b4725ef1',
  selfDrive: 'photo-1617788138017-80ad40651399',
  mini: 'photo-1541899481282-d53bffe3c35d',
  hatchback: 'photo-1552519507-da3b142c6e3d',
  sedan: 'photo-1590362891991-f776e747a588',
  suv: 'photo-1519641471654-76ce0107ad1b',
  premium: 'photo-1563720223185-11003d516935',
} as const;

export const HERO_IMAGE: ImageAsset = photo(
  IDS.hero,
  'A dark executive sedan on an open road',
  { kind: 'noir', scene: 'hero', tier: 'sedan' },
  'center 60%'
);

/** Full-width cinematic interlude between sections. */
export const INTERLUDE_IMAGE: ImageAsset = photo(
  IDS.outstation,
  'An open road ahead',
  { kind: 'noir', scene: 'road' },
  'center 55%'
);

export const CORPORATE_IMAGE: ImageAsset = photo(
  IDS.airport,
  'Airport terminal and runway',
  { kind: 'noir', scene: 'corporate' },
  'center'
);

export const SERVICE_IMAGES: Record<ServiceType, ImageAsset> = {
  instant: photo(IDS.instant, 'Instant taxi', { kind: 'noir', scene: 'city' }),
  rental: photo(IDS.rental, 'Hourly rental', { kind: 'noir', scene: 'hero', tier: 'sedan' }),
  outstation: photo(IDS.outstation, 'Outstation travel', { kind: 'noir', scene: 'road' }),
  airport: photo(IDS.airport, 'Airport transfer', { kind: 'noir', scene: 'airport' }),
  'self-drive': photo(IDS.selfDrive, 'Self-drive car rental', { kind: 'noir', scene: 'key' }),
};

export const VEHICLE_IMAGES: Record<VehicleTier, ImageAsset> = {
  mini: photo(IDS.mini, 'WAYVIA Mini', { kind: 'noir', scene: 'fleet', tier: 'mini' }),
  hatchback: photo(IDS.hatchback, 'WAYVIA Go hatchback', { kind: 'noir', scene: 'fleet', tier: 'hatchback' }),
  sedan: photo(IDS.sedan, 'WAYVIA Prime sedan', { kind: 'noir', scene: 'fleet', tier: 'sedan' }),
  suv: photo(IDS.suv, 'WAYVIA XL family SUV', { kind: 'noir', scene: 'fleet', tier: 'suv' }),
  premium: photo(IDS.premium, 'WAYVIA Executive', { kind: 'noir', scene: 'fleet', tier: 'premium' }),
};

export const getServiceImage = (service: ServiceType): ImageAsset =>
  SERVICE_IMAGES[service] ?? SERVICE_IMAGES.instant;

export const getVehicleImage = (tier: VehicleTier): ImageAsset =>
  VEHICLE_IMAGES[tier] ?? VEHICLE_IMAGES.sedan;

import React, { useId } from 'react';
import type { VehicleTier } from '../../../types';

interface VehicleSpec {
  x0: number; // nose
  x1: number; // tail
  belt: number; // shoulder line height
  roof: number; // roof height
  fa: number; // windshield base
  fr: number; // windshield top
  rr: number; // rear window top
  ra: number; // rear window base
  r: number; // wheel radius
}

// Side-profile proportions per tier. y grows downward; ground sits at y = 138.
const SPECS: Record<VehicleTier, VehicleSpec> = {
  mini: { x0: 96, x1: 304, belt: 88, roof: 40, fa: 150, fr: 166, rr: 232, ra: 262, r: 20 },
  hatchback: { x0: 84, x1: 316, belt: 88, roof: 44, fa: 150, fr: 172, rr: 252, ra: 294, r: 21 },
  sedan: { x0: 64, x1: 346, belt: 88, roof: 48, fa: 142, fr: 178, rr: 232, ra: 268, r: 22 },
  suv: { x0: 70, x1: 332, belt: 80, roof: 30, fa: 150, fr: 166, rr: 300, ra: 322, r: 25 },
  premium: { x0: 54, x1: 350, belt: 82, roof: 34, fa: 124, fr: 160, rr: 304, ra: 336, r: 24 },
};

interface VehicleIllustrationProps {
  tier: VehicleTier;
  className?: string;
  /** Soft mint light pooled under the car. */
  glow?: boolean;
  title?: string;
  /** `noir` is the Phase 1 public-site look: charcoal body, silver glass, crimson light. */
  palette?: 'navy' | 'noir';
}

/**
 * Brand-colour vehicle silhouette used when a photo is missing or still loading.
 * Pure SVG, no network. One distinct profile per WAYVIA tier.
 */
export const VehicleIllustration: React.FC<VehicleIllustrationProps> = ({
  tier,
  className = '',
  glow = true,
  title,
  palette = 'navy',
}) => {
  const noir = palette === 'noir';
  const C = noir
    ? { b0: '#4A4346', b1: '#242023', b2: '#0E0C0D', g0: '#B7BEB9', g1: '#171416', glow: '#B5121B', rocker: '#B5121B', head: '#F4F1EA', tail: '#E8606A', pillar: '#171416', glass: '#0E0C0D', arch: '#050405' }
    : { b0: '#2C4A73', b1: '#1A3353', b2: '#0F1D31', g0: '#91D9C5', g1: '#14243B', glow: '#91D9C5', rocker: '#91D9C5', head: '#F5CE8B', tail: '#F27C7C', pillar: '#14243B', glass: '#0B1523', arch: '#0B1523' };
  const uid = useId().replace(/:/g, '');
  const s = SPECS[tier] ?? SPECS.sedan;
  const bottom = 114;
  const cy = 116;
  const xf = s.x0 + 54;
  const xr = s.x1 - 56;
  const gold = tier === 'premium';

  const body = [
    `M ${s.x0 + 6} ${bottom}`,
    `L ${s.x0} ${bottom - 8}`,
    `L ${s.x0} ${s.belt + 8}`,
    `Q ${s.x0} ${s.belt} ${s.x0 + 14} ${s.belt - 2}`,
    `L ${s.fa} ${s.belt - 8}`,
    `L ${s.fr} ${s.roof}`,
    `L ${s.rr} ${s.roof}`,
    `L ${s.ra} ${s.belt - 8}`,
    `L ${s.x1 - 16} ${s.belt - 4}`,
    `Q ${s.x1} ${s.belt - 2} ${s.x1} ${s.belt + 10}`,
    `L ${s.x1} ${bottom - 8}`,
    `L ${s.x1 - 6} ${bottom}`,
    'Z',
  ].join(' ');

  const glass = [
    `${s.fa + 9},${s.belt - 12}`,
    `${s.fr + 4},${s.roof + 7}`,
    `${s.rr - 3},${s.roof + 7}`,
    `${s.ra - 9},${s.belt - 12}`,
  ].join(' ');

  const pillar = (s.fr + s.rr) / 2;

  const wheel = (x: number) => (
    <g key={x}>
      <circle cx={x} cy={cy} r={s.r + 5} fill={C.arch} />
      <circle cx={x} cy={cy} r={s.r} fill="#0F1318" />
      <circle cx={x} cy={cy} r={s.r * 0.62} fill={`url(#rim-${uid})`} />
      <circle cx={x} cy={cy} r={s.r * 0.2} fill={noir ? '#B5121B' : '#91D9C5'} />
    </g>
  );

  return (
    <svg
      viewBox="30 24 340 134"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.b0} />
          <stop offset="0.55" stopColor={C.b1} />
          <stop offset="1" stopColor={C.b2} />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.g0} stopOpacity={noir ? 0.5 : 0.55} />
          <stop offset="1" stopColor={C.g1} stopOpacity="0.92" />
        </linearGradient>
        <radialGradient id={`rim-${uid}`} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#E7EEF6" />
          <stop offset="1" stopColor="#5D7390" />
        </radialGradient>
        <radialGradient id={`glow-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={C.glow} stopOpacity="0.55" />
          <stop offset="1" stopColor={C.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      {glow && <ellipse cx="200" cy="140" rx="170" ry="16" fill={`url(#glow-${uid})`} />}
      <ellipse cx="200" cy="139" rx={(s.x1 - s.x0) / 2 + 6} ry="5" fill="#000" opacity="0.38" />

      {/* Body: stroke in the same gradient softens every corner */}
      <path
        d={body}
        fill={`url(#body-${uid})`}
        stroke={`url(#body-${uid})`}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Light catching the shoulder */}
      <path
        d={`M ${s.fa + 4} ${s.belt - 7} L ${s.ra - 4} ${s.belt - 7}`}
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <polygon points={glass} fill={`url(#glass-${uid})`} stroke={C.glass} strokeWidth="1.5" strokeLinejoin="round" />
      <path d={`M ${pillar} ${s.roof + 7} L ${pillar} ${s.belt - 12}`} stroke={C.pillar} strokeWidth="3" />
      {/* Rocker accent */}
      <path
        d={`M ${s.x0 + 34} ${bottom - 5} L ${s.x1 - 34} ${bottom - 5}`}
        stroke={gold ? '#E9B96D' : C.rocker}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Lamps */}
      <rect x={s.x0 + 1} y={s.belt + 3} width="12" height="5" rx="2.5" fill={C.head} />
      <rect x={s.x1 - 11} y={s.belt + 2} width="10" height="5" rx="2.5" fill={C.tail} />

      {wheel(xf)}
      {wheel(xr)}
    </svg>
  );
};

export default VehicleIllustration;

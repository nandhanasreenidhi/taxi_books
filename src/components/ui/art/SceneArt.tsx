import React, { useId } from 'react';
import type { SceneMotif } from '../../../data/imagery';

interface SceneArtProps {
  motif?: SceneMotif;
  className?: string;
}

/**
 * Atmospheric brand scenes (night skyline, open road, runway, key). Fills its parent.
 * Used as the image fallback and as a ready-made backdrop for empty and loading states.
 */
export const SceneArt: React.FC<SceneArtProps> = ({ motif = 'plain', className = '' }) => {
  const uid = useId().replace(/:/g, '');

  const skyline = [
    [20, 150, 46], [76, 110, 54], [140, 175, 40], [190, 130, 58], [256, 190, 44],
    [310, 120, 52], [372, 165, 38], [420, 100, 60], [490, 145, 46], [546, 185, 42],
    [598, 125, 56], [662, 160, 44], [716, 115, 50],
  ];

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0C1726" />
          <stop offset="0.6" stopColor="#14243B" />
          <stop offset="1" stopColor="#1F4C77" />
        </linearGradient>
        <radialGradient id={`mint-${uid}`} cx="0.2" cy="0.1" r="0.7">
          <stop offset="0" stopColor="#91D9C5" stopOpacity="0.38" />
          <stop offset="1" stopColor="#91D9C5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`gold-${uid}`} cx="0.85" cy="0.25" r="0.55">
          <stop offset="0" stopColor="#E9B96D" stopOpacity="0.34" />
          <stop offset="1" stopColor="#E9B96D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`route-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#91D9C5" stopOpacity="0" />
          <stop offset="0.5" stopColor="#91D9C5" />
          <stop offset="1" stopColor="#E9B96D" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill={`url(#sky-${uid})`} />
      <rect width="800" height="500" fill={`url(#mint-${uid})`} />
      <rect width="800" height="500" fill={`url(#gold-${uid})`} />

      {motif === 'city' && (
        <g>
          {skyline.map(([x, h, w], i) => (
            <g key={i}>
              <rect x={x} y={420 - h} width={w} height={h + 80} fill="#0B1523" opacity={0.92} />
              {Array.from({ length: Math.floor(h / 26) }).map((_, r) =>
                [0, 1].map((c) => (
                  <rect
                    key={`${r}-${c}`}
                    x={x + 10 + c * ((w - 28) / 1)}
                    y={420 - h + 12 + r * 24}
                    width="8"
                    height="10"
                    rx="1.5"
                    fill={(i + r + c) % 4 === 0 ? '#E9B96D' : '#91D9C5'}
                    opacity={(i + r + c) % 3 === 0 ? 0.75 : 0.18}
                  />
                ))
              )}
            </g>
          ))}
          <rect y="420" width="800" height="80" fill="#080F1A" />
          <path d="M -20 462 C 200 440 420 480 820 448" stroke={`url(#route-${uid})`} strokeWidth="3" fill="none" strokeDasharray="12 12" className="animate-route-flow" />
        </g>
      )}

      {motif === 'road' && (
        <g>
          <circle cx="610" cy="170" r="54" fill="#F5CE8B" opacity="0.9" />
          <circle cx="610" cy="170" r="92" fill="#E9B96D" opacity="0.12" />
          <path d="M0 330 C 120 250 220 300 330 260 C 450 215 560 290 800 240 L800 500 L0 500 Z" fill="#1A3353" />
          <path d="M0 390 C 140 330 260 380 400 340 C 540 300 650 370 800 330 L800 500 L0 500 Z" fill="#0F1D31" />
          <path d="M-10 500 C 180 430 360 440 480 400 C 600 362 700 380 820 340" stroke="#080F1A" strokeWidth="70" fill="none" strokeLinecap="round" />
          <path d="M-10 500 C 180 430 360 440 480 400 C 600 362 700 380 820 340" stroke={`url(#route-${uid})`} strokeWidth="3.5" fill="none" strokeDasharray="14 14" className="animate-route-flow" />
        </g>
      )}

      {motif === 'airport' && (
        <g>
          <path d="M 400 250 L 80 500 M 400 250 L 720 500 M 400 250 L 400 500" stroke="#91D9C5" strokeOpacity="0.4" strokeWidth="2" />
          <path d="M 400 250 L 400 500" stroke={`url(#route-${uid})`} strokeWidth="4" strokeDasharray="16 16" className="animate-route-flow" />
          <rect y="244" width="800" height="3" fill="#91D9C5" opacity="0.35" />
          <g transform="translate(560 120) rotate(-18)" fill="#F7F5EF">
            <path d="M0 18 L88 8 Q104 6 112 14 Q104 22 88 22 L0 24 Z" />
            <path d="M40 14 L22 -14 L36 -14 L62 12 Z" opacity="0.92" />
            <path d="M40 22 L22 50 L36 50 L62 24 Z" opacity="0.92" />
            <path d="M6 16 L-8 2 L2 2 L16 14 Z" />
          </g>
        </g>
      )}

      {motif === 'key' && (
        <g fill="none" stroke="#91D9C5" strokeOpacity="0.35">
          <circle cx="400" cy="250" r="90" strokeWidth="2" />
          <circle cx="400" cy="250" r="150" strokeWidth="1.5" />
          <circle cx="400" cy="250" r="215" strokeWidth="1" />
          <g stroke="#E9B96D" strokeOpacity="0.95" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="360" cy="250" r="30" />
            <path d="M390 250 H 470 M 440 250 V 280 M 462 250 V 270" />
          </g>
        </g>
      )}

      {motif === 'plain' && (
        <g fill="none">
          <path d="M -20 380 C 180 300 300 420 460 330 C 600 252 700 300 840 220" stroke={`url(#route-${uid})`} strokeWidth="3" strokeDasharray="12 12" className="animate-route-flow" />
          <circle cx="460" cy="330" r="7" fill="#91D9C5" />
          <circle cx="460" cy="330" r="18" stroke="#91D9C5" strokeOpacity="0.35" strokeWidth="2" />
        </g>
      )}
    </svg>
  );
};

export default SceneArt;

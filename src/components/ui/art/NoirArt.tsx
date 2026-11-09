import React, { useId } from 'react';
import type { NoirScene } from '../../../data/imagery';

interface NoirArtProps {
  scene: NoirScene;
  className?: string;
}

/**
 * Charcoal, forest and crimson backdrops for the public site. These are the guaranteed fallbacks for
 * every photograph, so the page still looks art-directed when a remote image is slow or missing.
 */
export const NoirArt: React.FC<NoirArtProps> = ({ scene, className = '' }) => {
  const uid = useId().replace(/:/g, '');
  const buildings = [
    [0, 170, 70], [78, 250, 56], [142, 130, 80], [230, 300, 60], [298, 200, 74], [380, 340, 52],
    [440, 180, 86], [534, 270, 64], [606, 150, 78], [692, 220, 66], [766, 120, 34],
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
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#171416" />
          <stop offset="0.55" stopColor="#0F1D18" />
          <stop offset="1" stopColor="#09251C" />
        </linearGradient>
        <radialGradient id={`red-${uid}`} cx="0.82" cy="0.62" r="0.55">
          <stop offset="0" stopColor="#B5121B" stopOpacity="0.55" />
          <stop offset="1" stopColor="#B5121B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`green-${uid}`} cx="0.1" cy="0.9" r="0.7">
          <stop offset="0" stopColor="#1E5E4D" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1E5E4D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`streak-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B5121B" stopOpacity="0" />
          <stop offset="0.7" stopColor="#E8606A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#F4F1EA" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`floor-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#09251C" stopOpacity="0" />
          <stop offset="1" stopColor="#050405" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill={`url(#bg-${uid})`} />
      <rect width="800" height="500" fill={`url(#green-${uid})`} />
      <rect width="800" height="500" fill={`url(#red-${uid})`} />

      {/* Fine grid, like a drawing board */}
      <g stroke="#B7BEB9" strokeOpacity="0.06">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="500" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="800" y2={i * 100} />
        ))}
      </g>

      {(scene === 'hero' || scene === 'fleet' || scene === 'interlude') && (
        <g>
          {/* Road plane and horizon */}
          <rect y="372" width="800" height="128" fill={`url(#floor-${uid})`} />
          <line x1="0" y1="372" x2="800" y2="372" stroke="#B7BEB9" strokeOpacity="0.18" />
          {/* Converging lane markings */}
          <path d="M400 372 L60 500 M400 372 L740 500" stroke="#E9E5DC" strokeOpacity="0.14" strokeWidth="2" />
          <path d="M400 372 L400 500" stroke="#E9E5DC" strokeOpacity="0.55" strokeWidth="3" strokeDasharray="14 14" className="animate-route-flow" />
          {/* Light trails */}
          <g strokeLinecap="round">
            <path d="M-20 392 L520 392" stroke={`url(#streak-${uid})`} strokeWidth="3" />
            <path d="M-20 406 L460 406" stroke={`url(#streak-${uid})`} strokeWidth="1.5" opacity="0.7" />
            <path d="M-20 380 L600 380" stroke={`url(#streak-${uid})`} strokeWidth="1" opacity="0.5" />
          </g>
        </g>
      )}

      {scene === 'city' && (
        <g>
          {buildings.map(([x, h, w], i) => (
            <g key={i}>
              <rect x={x} y={430 - h} width={w} height={h + 70} fill="#0B0A0B" opacity="0.92" />
              {Array.from({ length: Math.floor(h / 30) }).map((_, r) => (
                <rect
                  key={r}
                  x={x + 10}
                  y={430 - h + 14 + r * 28}
                  width={Math.max(10, w - 20)}
                  height="3"
                  fill={(i + r) % 5 === 0 ? '#E8606A' : '#B7BEB9'}
                  opacity={(i + r) % 3 === 0 ? 0.55 : 0.12}
                />
              ))}
            </g>
          ))}
          <rect y="430" width="800" height="70" fill="#050405" />
          <path d="M-20 462 L820 462" stroke="#E9E5DC" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="16 14" className="animate-route-flow" />
        </g>
      )}

      {scene === 'road' && (
        <g>
          <path d="M0 300 C140 230 250 290 380 240 C520 190 640 270 800 215 L800 500 L0 500 Z" fill="#0D3226" opacity="0.9" />
          <path d="M0 365 C160 300 290 360 430 318 C580 275 690 350 800 305 L800 500 L0 500 Z" fill="#09251C" />
          <path d="M-10 500 C190 440 360 440 490 396 C610 356 710 372 820 330" stroke="#050405" strokeWidth="74" fill="none" strokeLinecap="round" />
          <path d="M-10 500 C190 440 360 440 490 396 C610 356 710 372 820 330" stroke="#E9E5DC" strokeOpacity="0.7" strokeWidth="3" fill="none" strokeDasharray="16 16" className="animate-route-flow" />
          <circle cx="640" cy="150" r="46" fill="#B5121B" opacity="0.85" />
          <circle cx="640" cy="150" r="96" fill="#B5121B" opacity="0.12" />
        </g>
      )}

      {scene === 'airport' && (
        <g>
          <path d="M400 230 L70 500 M400 230 L730 500" stroke="#E9E5DC" strokeOpacity="0.22" strokeWidth="2" />
          <path d="M400 230 L400 500" stroke="#E8606A" strokeOpacity="0.9" strokeWidth="4" strokeDasharray="18 16" className="animate-route-flow" />
          <line x1="0" y1="230" x2="800" y2="230" stroke="#B7BEB9" strokeOpacity="0.25" />
          <g transform="translate(540 96) rotate(-16)" fill="#E9E5DC">
            <path d="M0 18 L96 8 Q112 6 120 14 Q112 22 96 22 L0 24 Z" />
            <path d="M44 14 L24 -16 L40 -16 L68 12 Z" opacity="0.9" />
            <path d="M44 22 L24 52 L40 52 L68 24 Z" opacity="0.9" />
          </g>
        </g>
      )}

      {scene === 'key' && (
        <g fill="none">
          <circle cx="400" cy="250" r="96" stroke="#B7BEB9" strokeOpacity="0.22" strokeWidth="2" />
          <circle cx="400" cy="250" r="160" stroke="#B7BEB9" strokeOpacity="0.14" strokeWidth="1.5" />
          <circle cx="400" cy="250" r="230" stroke="#B7BEB9" strokeOpacity="0.1" />
          <g stroke="#B5121B" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="358" cy="250" r="32" />
            <path d="M390 250 H 480 M 448 250 V 284 M 470 250 V 272" />
          </g>
        </g>
      )}

      {scene === 'corporate' && (
        <g stroke="#B7BEB9" strokeOpacity="0.2" fill="none">
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={70 + i * 100} y={330 - ((i * 53) % 190)} width="64" height={170 + ((i * 53) % 190)} />
          ))}
          <path d="M40 440 L760 440" stroke="#B5121B" strokeOpacity="0.8" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
};

export default NoirArt;

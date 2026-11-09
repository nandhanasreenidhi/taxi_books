import React from 'react';
import type { FallbackSpec } from '../../../data/imagery';
import { SceneArt } from './SceneArt';
import { VehicleIllustration } from './VehicleIllustration';
import { NoirArt } from './NoirArt';

const initialsOf = (name?: string) =>
  (name ?? 'W')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'W';

interface FallbackArtProps {
  spec?: FallbackSpec;
  /** Used for the avatar fallback initials. */
  name?: string;
}

/** Branded stand-in rendered by <SafeImage> whenever a photo is missing or slow. */
export const FallbackArt: React.FC<FallbackArtProps> = ({ spec, name }) => {
  if (spec?.kind === 'avatar') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-700 to-navy-900 font-display text-[0.9em] font-bold text-mint-300">
        {initialsOf(name)}
      </div>
    );
  }

  if (spec?.kind === 'noir') {
    const big = spec.scene === 'hero';
    return (
      <div className="absolute inset-0">
        <NoirArt scene={spec.scene} />
        {(spec.tier || big) && (
          <div
            className={
              big
                ? 'absolute inset-0 flex items-center justify-end pb-[34%] pr-[3%] pt-[14%] sm:pb-[30%] sm:pr-[5%]'
                : 'absolute inset-0 flex items-end justify-center px-[6%] pb-[12%]'
            }
          >
            <VehicleIllustration
              tier={spec.tier ?? 'sedan'}
              palette="noir"
              className={big ? 'w-[92%] max-w-[1000px] sm:w-[58%]' : 'w-full max-w-[640px]'}
            />
          </div>
        )}
      </div>
    );
  }

  if (spec?.kind === 'vehicle') {
    return (
      <div className="absolute inset-0">
        <SceneArt motif="plain" />
        <div className="absolute inset-0 flex items-center justify-center p-[8%]">
          <VehicleIllustration tier={spec.tier} className="h-full w-full max-w-[520px]" />
        </div>
      </div>
    );
  }

  return <SceneArt motif={spec?.kind === 'scene' ? spec.motif : 'plain'} />;
};

export default FallbackArt;

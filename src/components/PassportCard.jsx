import React from 'react';
import { MotifSparkle } from './Motifs.jsx';

/**
 * PassportCard — Provenance Passport product template.
 * Signature product artifact: lived-in photo, piece name + era, sparkle/wordmark, origin badge, story, Nacho guide slot.
 */
export function PassportCard({
  pieceName,
  era,
  photoSrc,
  photoAlt,
  originName,
  originHeritage,
  weaveSwatchSrc,
  story,
  nachoPhotoSrc,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div
      className={`af-passport ${className}`.trim()}
      style={style}
      {...props}
    >
      {photoSrc && (
        <img
          src={photoSrc}
          alt={photoAlt || pieceName}
          className="af-passport__photo"
          loading="lazy"
        />
      )}

      <h3 className="af-passport__title">
        {pieceName} {era && <span style={{ whiteSpace: 'nowrap' }}>({era})</span>}
        <MotifSparkle className="af-sparkle" />
      </h3>

      <div className="af-passport__provenance">
        <div className="af-passport__mark">
          <MotifSparkle className="af-sparkle" width={36} height={58} />
        </div>

        {(originName || originHeritage || weaveSwatchSrc) && (
          <div className="af-origin">
            {weaveSwatchSrc && (
              <div className="af-origin__swatch">
                <img src={weaveSwatchSrc} alt={originName || 'Weave Swatch'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            {originName && <p className="af-origin__name">{originName}</p>}
            {originHeritage && <p className="af-origin__heritage">{originHeritage}</p>}
          </div>
        )}
      </div>

      {story && <p className="af-passport__story">{story}</p>}

      <div className="af-passport__foot">
        {nachoPhotoSrc && (
          <div className="af-passport__guide">
            <img src={nachoPhotoSrc} alt="Nacho Guide" />
          </div>
        )}
      </div>
    </div>
  );
}

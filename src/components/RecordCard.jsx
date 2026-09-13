import React from 'react';

/**
 * RecordCard — The Time Traveler's Record.
 * Collectible ticket-stub / certificate artifact for adopted vintage pieces.
 */
export function RecordCard({
  pieceName,
  foundLocation = 'Austin, Texas',
  fields = [],
  closing = 'This tiny time machine has found a new home.',
  className = '',
  style = {},
  ...props
}) {
  return (
    <div
      className={`af-record ${className}`.trim()}
      style={style}
      {...props}
    >
      <div className="af-record__head">
        <div>
          <h4 className="af-record__brand">Atomic Finds ATX</h4>
          <p className="af-record__tagline">Tiny Time Machines for Your Home</p>
        </div>
      </div>

      <div className="af-record__piece">{pieceName}</div>
      <p className="af-record__found">Found: {foundLocation}</p>

      {fields.length > 0 && (
        <dl className="af-record__fields">
          {fields.map((field, idx) => (
            <div key={idx} className="af-record__field">
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {closing && <p className="af-record__closing">"{closing}"</p>}
    </div>
  );
}

import React from 'react';

/**
 * InspectionStamp component matching Atomic Finds ATX design system.
 * The Atomic Inspection Team's mock-bureaucratic sign-off stamp.
 * Single-colour ink look with slight -8deg rotation.
 */
export function InspectionStamp({
  team = 'Atomic Inspection',
  verdict = 'VERIFIED',
  curator = 'Nacho Approved',
  color = 'var(--af-olive-teal)',
  className = '',
  style = {},
  ...props
}) {
  return (
    <div
      className={`af-stamp ${className}`.trim()}
      style={{ '--af-stamp-color': color, ...style }}
      {...props}
    >
      <span className="af-stamp__team">{team}</span>
      <span className="af-stamp__verdict">{verdict}</span>
      <span className="af-stamp__curator">{curator}</span>
    </div>
  );
}

import React from 'react';

/**
 * Tag component matching Atomic Finds ATX design system.
 * Full-pill shape (radius 999px) for era, material, availability, and sold states.
 */
export function Tag({
  children,
  variant = 'era', // 'era' | 'material' | 'accent' | 'available' | 'sold'
  icon,
  className = '',
  style = {},
  ...props
}) {
  const variantClass = `af-tag--${variant}`;

  return (
    <span
      className={`af-tag ${variantClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {icon && <span className="af-tag__icon">{icon}</span>}
      <span className="af-tag__text">{children}</span>
    </span>
  );
}

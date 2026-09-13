import React from 'react';

/**
 * Button component matching Atomic Finds ATX design system.
 * Beige plate with a coloured rule, matching label and matching icon.
 * Corner radius is a soft 12px (never full-pill).
 */
export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'md',        // 'sm' | 'md'
  icon,
  className = '',
  style = {},
  disabled = false,
  as: Component = 'button',
  ...props
}) {
  const variantClass = variant === 'secondary'
    ? 'af-btn--secondary'
    : variant === 'ghost'
    ? 'af-btn--ghost'
    : 'af-btn--primary';

  const sizeClass = size === 'sm' ? 'af-btn--sm' : '';

  return (
    <Component
      className={`af-btn ${variantClass} ${sizeClass} ${className}`.trim()}
      disabled={disabled}
      style={style}
      {...props}
    >
      {icon && <span className="af-btn__icon">{icon}</span>}
      <span className="af-btn__label">{children}</span>
    </Component>
  );
}

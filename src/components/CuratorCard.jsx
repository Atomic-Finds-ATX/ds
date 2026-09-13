import React from 'react';

/**
 * CuratorCard — Atomic Inspection Team curator profile card.
 */
export function CuratorCard({
  name,
  role,
  bio,
  avatarSrc,
  avatarAlt,
  stampVerdict,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div
      className={`af-curator ${className}`.trim()}
      style={{
        background: 'var(--af-surface-raised)',
        border: 'var(--af-border-width) solid var(--af-ink)',
        borderRadius: 'var(--af-radius-card)',
        padding: 'var(--af-space-4)',
        boxShadow: 'var(--af-shadow-stamp)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 'var(--af-space-2)',
        ...style
      }}
      {...props}
    >
      {avatarSrc && (
        <div style={{
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
          overflow: 'hidden',
          border: 'var(--af-border-width) solid var(--af-ink)',
          marginBottom: 'var(--af-space-2)'
        }}>
          <img src={avatarSrc} alt={avatarAlt || name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}

      <h4 style={{
        fontFamily: 'var(--af-font-display)',
        fontSize: 'var(--af-text-lg)',
        color: 'var(--af-avocado-deep)',
        margin: 0
      }}>
        {name}
      </h4>

      {role && (
        <p style={{
          fontFamily: 'var(--af-font-body)',
          fontSize: 'var(--af-text-xs)',
          fontWeight: 600,
          letterSpacing: 'var(--af-tracking-label)',
          textTransform: 'uppercase',
          color: 'var(--af-ink-soft)',
          margin: 0
        }}>
          {role}
        </p>
      )}

      {bio && (
        <p style={{
          fontSize: 'var(--af-text-sm)',
          color: 'var(--af-ink)',
          margin: 'var(--af-space-2) 0 0'
        }}>
          {bio}
        </p>
      )}
    </div>
  );
}

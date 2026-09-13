import React from 'react';

export function MotifStarburst({ size = 64, color = "currentColor", className = "", style = {}, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Atomic starburst"
      className={`af-starburst ${className}`}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      {...props}
    >
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
        <path d="M32 32 V6 M32 32 V58 M32 32 H6 M32 32 H58 M32 32 L50.4 13.6 M32 32 L13.6 50.4 M32 32 L50.4 50.4 M32 32 L13.6 13.6" />
      </g>
      <g fill={color}>
        <circle cx="32" cy="6" r="3.4" />
        <circle cx="32" cy="58" r="3.4" />
        <circle cx="6" cy="32" r="3.4" />
        <circle cx="58" cy="32" r="3.4" />
        <circle cx="50.4" cy="13.6" r="2.6" />
        <circle cx="13.6" cy="50.4" r="2.6" />
        <circle cx="50.4" cy="50.4" r="2.6" />
        <circle cx="13.6" cy="13.6" r="2.6" />
        <circle cx="32" cy="32" r="5" />
      </g>
    </svg>
  );
}

export function MotifSparkle({ width = 24, height = 38, color = "currentColor", className = "", style = {}, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 64"
      width={width}
      height={height}
      role="img"
      aria-label="Atomic Finds sparkle"
      className={`af-sparkle ${className}`}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
      {...props}
    >
      <path
        fill={color}
        d="M20 0 Q22.5 27 40 32 Q22.5 37 20 64 Q17.5 37 0 32 Q17.5 27 20 0 Z"
      />
    </svg>
  );
}

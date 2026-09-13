import React, { useState } from "react";

export function Button({ children, variant = "primary", size = "md", icon, onClick, disabled }) {
  const palette = {
    primary: { bg: "var(--brand-primary)", hoverBg: "var(--brand-primary-hover)", fg: "var(--text-inverse)" },
    secondary: { bg: "var(--brand-secondary)", hoverBg: "var(--brand-secondary-hover)", fg: "var(--text-inverse)" },
    ghost: { bg: "transparent", hoverBg: "var(--cream-200)", fg: "var(--ink-900)" },
  }[variant];
  const pad = size === "sm" ? "8px 16px" : size === "lg" ? "16px 32px" : "12px 22px";
  const fontSize = size === "sm" ? "var(--text-body-sm)" : size === "lg" ? "var(--text-body-lg)" : "var(--text-body-md)";
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize,
        padding: pad,
        borderRadius: "var(--radius-pill)",
        border: "2px solid var(--ink-900)",
        background: hover && !disabled ? palette.hoverBg : palette.bg,
        color: palette.fg,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        letterSpacing: "0.01em",
        transition: "background 0.15s ease, transform 0.1s ease",
        transform: hover && !disabled ? "translateY(-1px)" : "none",
      }}
    >
      {icon ? <span style={{ fontSize: "1.1em", lineHeight: 0 }}>{icon}</span> : null}
      {children}
    </button>
  );
}

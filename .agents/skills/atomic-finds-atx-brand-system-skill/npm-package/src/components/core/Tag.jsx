import React from "react";

export function Tag({ children, tone = "cream" }) {
  const tones = {
    cream: { bg: "var(--cream-200)", fg: "var(--ink-900)" },
    mustard: { bg: "var(--mustard-500)", fg: "var(--ink-900)" },
    avocado: { bg: "var(--avocado-600)", fg: "var(--text-inverse)" },
    orange: { bg: "var(--burnt-orange-600)", fg: "var(--text-inverse)" },
  }[tone];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: "var(--text-label)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        padding: "6px 14px",
        borderRadius: "var(--radius-pill)",
        border: "2px solid var(--ink-900)",
        background: tones.bg,
        color: tones.fg,
      }}
    >
      {children}
    </span>
  );
}

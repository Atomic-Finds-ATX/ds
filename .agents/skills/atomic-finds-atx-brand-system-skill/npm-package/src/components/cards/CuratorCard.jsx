import React from "react";

export function CuratorCard({ name, role, bio, quote, stampSrc }) {
  return (
    <div
      style={{
        width: 300,
        background: "var(--surface-card)",
        border: "3px solid var(--ink-900)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        padding: 20,
        fontFamily: "var(--font-body)",
        color: "var(--ink-900)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        {stampSrc ? (
          <img src={stampSrc} alt={name} style={{ width: 56, height: 56, objectFit: "contain" }} />
        ) : null}
        <div>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", color: "var(--burnt-orange-600)", fontSize: 22 }}>
            {name}
          </h3>
          <p style={{ margin: 0, fontSize: 12, color: "var(--olive-teal-700)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {role}
          </p>
        </div>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.55, margin: "0 0 10px" }}>{bio}</p>
      {quote ? (
        <p style={{ fontFamily: "var(--font-script)", color: "var(--avocado-600)", fontSize: 20, margin: 0 }}>
          “{quote}”
        </p>
      ) : null}
    </div>
  );
}

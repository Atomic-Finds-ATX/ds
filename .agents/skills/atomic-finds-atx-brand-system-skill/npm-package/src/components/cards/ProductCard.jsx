import React from "react";
import { Tag } from "../core/Tag.jsx";

export function ProductCard({ image, name, era, materials, price, status = "available", curator }) {
  return (
    <div
      style={{
        width: 280,
        background: "var(--surface-card)",
        border: "3px solid var(--ink-900)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
        fontFamily: "var(--font-body)",
        color: "var(--ink-900)",
      }}
    >
      <div
        style={{
          height: 190,
          background: "var(--cream-200)",
          overflow: "hidden",
          borderBottom: "3px solid var(--ink-900)",
        }}
      >
        {image ? (
          <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : null}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", color: "var(--avocado-600)", fontSize: 22 }}>
            {name}
          </h3>
          <Tag tone={status === "sold" ? "orange" : "mustard"}>{status === "sold" ? "Sold" : "Available"}</Tag>
        </div>
        <p style={{ margin: "4px 0 10px", fontSize: 13, color: "var(--olive-teal-700)" }}>
          Circa {era} · {materials}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 18 }}>{price}</span>
          {curator ? (
            <span style={{ fontSize: 12, fontStyle: "italic", color: "var(--burnt-orange-700)" }}>
              Curated by {curator}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

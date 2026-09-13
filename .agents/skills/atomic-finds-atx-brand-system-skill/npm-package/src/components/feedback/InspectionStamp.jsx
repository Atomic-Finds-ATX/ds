import React from "react";
import stampMilo from "../../assets/inspection-team/stamp-milo.png";
import stampDaisy from "../../assets/inspection-team/stamp-daisy.png";
import stampMalibu from "../../assets/inspection-team/stamp-malibu.png";
import stampTatiana from "../../assets/inspection-team/stamp-tatiana.png";

const artMap = { Milo: stampMilo, Daisy: stampDaisy, Malibu: stampMalibu, Tatiana: stampTatiana };

export function InspectionStamp({ inspector = "Milo", label = "Atomic Inspection Team", passed = true, size = 96 }) {
  return (
    <div
      style={{
        width: size,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-body)",
        color: "var(--burnt-orange-700)",
        textAlign: "center",
      }}
    >
      <img
        src={artMap[inspector] || artMap.Milo}
        alt={`${inspector} inspection stamp`}
        style={{ width: size, height: size, objectFit: "contain", filter: passed ? "none" : "grayscale(1) opacity(0.5)" }}
      />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {passed ? "Passed" : "Pending"} · {label}
      </span>
    </div>
  );
}

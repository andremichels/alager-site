// Molecule: SourceStatRow — single stat row for energy source tabs
// Used in EnergyTabs organism

import { Divider } from "@/components/atoms/Divider";

interface SourceStatRowProps {
  value: string;
  label: string;
  last?: boolean;
}

export function SourceStatRow({ value, label, last = false }: SourceStatRowProps) {
  return (
    <>
      <div
        style={{
          padding: "24px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="serif"
          style={{
            fontSize: 32,
            color: "var(--color-green-deep)",
            letterSpacing: "-0.01em",
          }}
        >
          {value}
        </div>
        <div
          className="mono"
          style={{
            color: "var(--color-muted)",
            fontSize: 10,
            textAlign: "right",
            maxWidth: 160,
          }}
        >
          {label}
        </div>
      </div>
      {!last && <Divider />}
    </>
  );
}

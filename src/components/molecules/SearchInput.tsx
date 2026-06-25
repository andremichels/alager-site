// Molecule: SearchInput — search field with icon for blog filters
// Used in BlogFilters organism
"use client";

import { Icon } from "@/components/atoms/Icon";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--color-muted)",
          pointerEvents: "none",
        }}
      >
        <Icon.Search size={15} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 14px 12px 40px",
          border: "1px solid var(--color-line-strong)",
          background: "var(--color-cream)",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          color: "var(--color-ink)",
          outline: "none",
        }}
      />
    </div>
  );
}

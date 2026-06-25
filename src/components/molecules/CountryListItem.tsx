// Molecule: CountryListItem — clickable country row for map sidebar
// Used in MapSection organism

import { MonoLabel } from "@/components/atoms/MonoLabel";

interface CountryListItemProps {
  code: string;
  name: string;
  members: number;
  capacity: number;
  isMember: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function CountryListItem({
  code,
  name,
  members,
  capacity,
  isMember,
  isSelected,
  onClick,
}: CountryListItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "32px 1fr auto auto",
        gap: 12,
        alignItems: "center",
        width: "100%",
        padding: "12px 8px",
        background: isSelected ? "var(--color-sage-soft)" : "transparent",
        border: "none",
        borderBottom: "1px solid var(--color-line)",
        textAlign: "left" as const,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
      }}
    >
      <MonoLabel color={isMember ? "var(--color-green)" : "var(--color-muted)"}>
        {code}
      </MonoLabel>
      <span style={{ fontSize: 14, color: "var(--color-ink)" }}>{name}</span>
      <MonoLabel>{String(members)}</MonoLabel>
      <MonoLabel>{capacity} GW</MonoLabel>
    </button>
  );
}

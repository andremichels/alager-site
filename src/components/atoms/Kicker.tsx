// Atom: Kicker — mono label with golden line prefix (24px)
// Used at the top of every section: "Manifesto · 2026", "Quatro pilares", etc.

interface KickerProps {
  children: React.ReactNode;
  className?: string;
  /** Use gold variant for dark backgrounds (green-deep sections) */
  gold?: boolean;
}

export function Kicker({ children, className = "", gold = false }: KickerProps) {
  return (
    <div
      className={`kicker ${gold ? "" : ""} ${className}`}
      style={gold ? { color: "var(--color-gold)" } : undefined}
    >
      {children}
    </div>
  );
}

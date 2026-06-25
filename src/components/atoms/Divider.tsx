// Atom: Divider — horizontal separator line
// Used between sections, inside cards, and on dark backgrounds (light variant)

interface DividerProps {
  className?: string;
  light?: boolean; // for dark backgrounds (uses white with opacity)
}

export function Divider({ className = "", light = false }: DividerProps) {
  return (
    <div
      className={`divider ${className}`}
      style={light ? { background: "#ffffff20" } : undefined}
    />
  );
}

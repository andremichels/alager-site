// Atom: LogoMark — geometric SVG logo (placeholder until official logo)
// Abstract sunburst/leaf hybrid

interface LogoMarkProps {
  size?: number;
  color?: string;
  accent?: string;
}

export function LogoMark({
  size = 34,
  color = "var(--color-green)",
  accent = "var(--color-gold)",
}: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="19" stroke={color} strokeWidth="1" fill="none" />
      <path d="M20 6 L20 20 L30 14 Z" fill={color} />
      <path d="M20 20 L8 26 L20 34 Z" fill={color} opacity="0.75" />
      <path d="M20 20 L32 26 L20 34 Z" fill={accent} />
      <circle cx="20" cy="20" r="1.5" fill="var(--color-cream)" />
    </svg>
  );
}

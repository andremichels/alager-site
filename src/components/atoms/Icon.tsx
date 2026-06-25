// Atom: Icon — minimal stroked icon set (10 icons)
// All use currentColor, strokeWidth 1.4, no fill

interface IconProps {
  size?: number;
  className?: string;
}

export const Icon = {
  Sun: ({ size = 20 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" />
    </svg>
  ),
  Wind: ({ size = 20 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 8h12a3 3 0 1 0-3-3" /><path d="M3 13h16a3 3 0 1 1-3 3" /><path d="M3 18h9" />
    </svg>
  ),
  Leaf: ({ size = 20 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M20 4c0 9-5 15-15 16C5 12 11 5 20 4z" /><path d="M5 20l9-9" />
    </svg>
  ),
  Drop: ({ size = 20 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3c4 5 6 8 6 11a6 6 0 1 1-12 0c0-3 2-6 6-11z" />
    </svg>
  ),
  Atom: ({ size = 20 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)" />
    </svg>
  ),
  Arrow: ({ size = 14 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  ),
  Plus: ({ size = 14 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 2v10M2 7h10" />
    </svg>
  ),
  Lock: ({ size = 14 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="3" y="6" width="8" height="6" /><path d="M5 6V4a2 2 0 0 1 4 0v2" />
    </svg>
  ),
  Search: ({ size = 16 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="7" cy="7" r="5" /><path d="M11 11l3 3" />
    </svg>
  ),
  Check: ({ size = 12 }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 6.5l2.5 2.5L10 3" />
    </svg>
  ),
};

// Map source names to icon (works across PT/ES/EN)
export function sourceIcon(name: string): React.ReactNode {
  if (["Solar"].includes(name)) return <Icon.Sun />;
  if (["Eólica", "Wind"].includes(name)) return <Icon.Wind />;
  if (["Biomassa", "Biomasa", "Biomass"].includes(name)) return <Icon.Leaf />;
  if (["Hídrica", "Hidráulica", "Hydro"].includes(name)) return <Icon.Drop />;
  if (["Hidrogênio", "Hidrógeno", "Hydrogen"].includes(name)) return <Icon.Atom />;
  return <Icon.Sun />;
}

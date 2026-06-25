// Molecule: NavLink — navigation link with gold underline on active state
// Used in Header organism

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavLink({ href, label, active = false, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        display: "inline-block",
        padding: "4px 0",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: active ? "var(--color-green)" : "var(--color-ink-2)",
        textDecoration: "none",
        borderBottom: active ? "2px solid var(--color-gold)" : "2px solid transparent",
        transition: "color 0.15s, border-color 0.15s",
        lineHeight: "32px",
      }}
    >
      {label}
    </a>
  );
}

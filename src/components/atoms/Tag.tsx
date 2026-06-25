// Atom: Tag — filter chip for blog categories and labels

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ children, active = false, onClick, className = "" }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        display: "inline-block",
        padding: "6px 14px",
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        border: `1px solid ${active ? "var(--color-green)" : "var(--color-line-strong)"}`,
        background: active ? "var(--color-green)" : "transparent",
        color: active ? "var(--color-cream)" : "var(--color-ink-2)",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

// Atom: MonoLabel — mono-spaced label for kickers, captions, dates, country codes
// Renders as <span> by default. Uppercase, letter-spacing from .mono class.

interface MonoLabelProps {
  children: React.ReactNode;
  size?: "small" | "default";
  color?: string;
  className?: string;
  as?: "span" | "div";
}

export function MonoLabel({
  children,
  size = "default",
  color,
  className = "",
  as: Tag = "span",
}: MonoLabelProps) {
  return (
    <Tag
      className={`mono ${className}`}
      style={{
        fontSize: size === "small" ? 10 : undefined,
        color: color || undefined,
      }}
    >
      {children}
    </Tag>
  );
}

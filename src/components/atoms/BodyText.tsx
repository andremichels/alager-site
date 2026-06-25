// Atom: BodyText — body/lead/small text with variant prop

type BodyVariant = "lead" | "body" | "small";

interface BodyTextProps {
  variant?: BodyVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "p" | "span" | "div";
}

export function BodyText({
  variant = "body",
  children,
  className = "",
  style,
  as: Tag = "p",
}: BodyTextProps) {
  return (
    <Tag className={`${variant} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

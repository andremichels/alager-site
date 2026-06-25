// Atom: Display — serif headlines with 5 size variants
// display-1 (hero), display-2 (section strong), h1, h2, h3

type DisplayVariant = "display-1" | "display-2" | "h1" | "h2" | "h3";

interface DisplayProps {
  variant?: DisplayVariant;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const tagMap: Record<DisplayVariant, "h1" | "h2" | "h3"> = {
  "display-1": "h1",
  "display-2": "h2",
  h1: "h1",
  h2: "h2",
  h3: "h3",
};

export function Display({
  variant = "h2",
  children,
  className = "",
  style,
}: DisplayProps) {
  const Tag = tagMap[variant];
  return (
    <Tag className={`${variant} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

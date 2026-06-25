// Atom: Button — 3 variants: primary (green), outline, gold
// Renders <button> or <a> depending on href

type ButtonVariant = "primary" | "outline" | "gold";

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  children,
  href,
  onClick,
  className = "",
  style,
  disabled = false,
}: ButtonProps) {
  const variantClass = `btn btn-${variant}`;
  const combinedClass = `${variantClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClass} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      style={style}
    >
      {children}
    </button>
  );
}

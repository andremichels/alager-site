// Atom: Input — form field with label and error state
// Used in JoinForm, NewsletterForm, SearchInput

interface InputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "select" | "textarea";
  placeholder?: string;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
}

export function Input({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required = false,
  options,
  value,
  onChange,
  className = "",
}: InputProps) {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: `1px solid ${error ? "#c0392b" : "var(--color-line-strong)"}`,
    background: "var(--color-cream)",
    fontFamily: "var(--font-sans)",
    fontSize: 15,
    color: "var(--color-ink)",
    outline: "none",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: 10.5,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: error ? "#c0392b" : "var(--color-muted)",
    marginBottom: 8,
  };

  const errorStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    color: "#c0392b",
    marginTop: 6,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  };

  const renderField = () => {
    if (type === "select" && options) {
      return (
        <select
          name={name}
          value={value}
          onChange={onChange as any}
          style={baseStyle}
          required={required}
        >
          <option value="">—</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }
    if (type === "textarea") {
      return (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange as any}
          style={{ ...baseStyle, minHeight: 120, resize: "vertical" }}
          required={required}
          rows={4}
        />
      );
    }
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange as any}
        style={baseStyle}
        required={required}
      />
    );
  };

  return (
    <div className={className}>
      <label htmlFor={name} style={labelStyle}>
        {label} {required && "· OBRIGATÓRIO"}
      </label>
      {renderField()}
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}

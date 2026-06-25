// Molecule: TierCard — membership tier card for Associe-se page
// Used in TiersSection organism

import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

interface TierCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  onSelect?: () => void;
  ctaLabel?: string;
}

export function TierCard({
  name,
  price,
  description,
  features,
  featured = false,
  onSelect,
  ctaLabel = "Manifestar interesse",
}: TierCardProps) {
  return (
    <div
      style={{
        padding: 40,
        background: featured ? "var(--color-sage-soft)" : "var(--color-cream)",
        border: `1px solid ${featured ? "var(--color-gold)" : "var(--color-line)"}`,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {featured && (
        <div
          className="mono"
          style={{
            position: "absolute",
            top: -12,
            left: 32,
            background: "var(--color-gold)",
            color: "var(--color-green-deep)",
            padding: "4px 14px",
            fontSize: 10,
          }}
        >
          Recomendado
        </div>
      )}
      <Display variant="h3">{name}</Display>
      <div
        className="mono"
        style={{ marginTop: 8, color: "var(--color-gold-deep)" }}
      >
        {price}
      </div>
      <BodyText variant="small" style={{ marginTop: 16 }}>
        {description}
      </BodyText>
      <div style={{ margin: "24px 0" }}>
        <div style={{ width: "100%", height: 1, background: "var(--color-line)" }} />
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
        {features.map((feat, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              marginBottom: 12,
              fontSize: 14,
              color: "var(--color-ink-2)",
              lineHeight: 1.45,
            }}
          >
            <span style={{ marginTop: 3, color: "var(--color-green)", flexShrink: 0 }}>
              <Icon.Check size={11} />
            </span>
            {feat}
          </li>
        ))}
      </ul>
      <Button variant={featured ? "primary" : "outline"} onClick={onSelect} style={{ marginTop: 24, justifyContent: "center" }}>
        {ctaLabel}
      </Button>
    </div>
  );
}

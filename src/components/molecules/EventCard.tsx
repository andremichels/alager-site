// Molecule: EventCard — boxed card for /agenda events (grid)
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";

interface EventCardProps {
  name: string;
  description?: string;
  meta?: string;
  url?: string;
  registerLabel: string;
}

const cardStyle: React.CSSProperties = {
  padding: 28,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  textDecoration: "none",
  color: "inherit",
};

export function EventCard({ name, description, meta, url, registerLabel }: EventCardProps) {
  const inner = (
    <>
      {meta ? <MonoLabel>{meta}</MonoLabel> : null}

      <Display variant="h3" style={{ marginTop: 16 }}>
        {name}
      </Display>

      {description ? (
        <BodyText variant="small" style={{ marginTop: 12, flex: 1 }}>
          {description}
        </BodyText>
      ) : (
        <div style={{ flex: 1 }} />
      )}

      {url ? (
        <span className="mono" style={{ marginTop: 20, color: "var(--color-green)" }}>
          {registerLabel} →
        </span>
      ) : null}
    </>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="card" style={cardStyle}>
        {inner}
      </a>
    );
  }

  return (
    <article className="card" style={cardStyle}>
      {inner}
    </article>
  );
}

// Molecule: NewsItemCard — boxed card for /noticias radar items (grid)
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { track } from "@/lib/analytics";

interface NewsItemCardProps {
  title: string;
  summary?: string;
  topicLabel?: string;
  meta?: string;
  url?: string;
  readSourceLabel: string;
  featured?: boolean;
  featuredLabel?: string;
}

const cardStyle: React.CSSProperties = {
  padding: 28,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  textDecoration: "none",
  color: "inherit",
};

export function NewsItemCard({
  title,
  summary,
  topicLabel,
  meta,
  url,
  readSourceLabel,
  featured,
  featuredLabel,
}: NewsItemCardProps) {
  const inner = (
    <>
      {featured && (
        <span
          className="mono"
          style={{
            alignSelf: "flex-start",
            background: "var(--color-gold)",
            color: "var(--color-green-deep)",
            padding: "4px 12px",
            fontSize: 10,
            marginBottom: 14,
          }}
        >
          ★ {featuredLabel}
        </span>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "baseline",
          flexWrap: "wrap",
        }}
      >
        {topicLabel ? <MonoLabel color="var(--color-gold-deep)">{topicLabel}</MonoLabel> : <span />}
        {meta ? <MonoLabel>{meta}</MonoLabel> : null}
      </div>

      <Display variant="h3" style={{ marginTop: 16 }}>
        {title}
      </Display>

      {summary ? (
        <BodyText variant="small" style={{ marginTop: 12, flex: 1 }}>
          {summary}
        </BodyText>
      ) : (
        <div style={{ flex: 1 }} />
      )}

      {url ? (
        <span className="mono" style={{ marginTop: 20, color: "var(--color-green)" }}>
          {readSourceLabel} →
        </span>
      ) : null}
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="card"
        style={cardStyle}
        onClick={() => track("outbound_click", { type: "news", url })}
      >
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

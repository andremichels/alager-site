// Molecule: BlogPostCard — card for blog listing with category, title, excerpt
// Used in BlogGrid, NewsSection (home)

import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Icon } from "@/components/atoms/Icon";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  readMoreLabel: string;
  minReadLabel: string;
  membersOnly?: boolean;
  membersLabel?: string;
  featured?: boolean;
  onClick?: () => void;
}

export function BlogPostCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  readMoreLabel,
  minReadLabel,
  membersOnly = false,
  membersLabel,
  featured = false,
  onClick,
}: BlogPostCardProps) {
  // Featured posts get a larger layout (handled by parent grid)
  return (
    <article
      onClick={onClick}
      style={{
        paddingTop: 24,
        borderTop: "1px solid var(--color-line)",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {/* Meta row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <MonoLabel color="var(--color-gold-deep)">{category}</MonoLabel>
        <MonoLabel>{date}</MonoLabel>
      </div>

      {/* Title */}
      <Display
        variant="h3"
        style={{
          fontSize: featured ? "clamp(28px, 3vw, 44px)" : undefined,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          fontWeight: 400,
        }}
      >
        {title}
      </Display>

      {/* Excerpt */}
      <BodyText variant="small" style={{ marginTop: featured ? 16 : 12 }}>
        {excerpt}
      </BodyText>

      {/* Bottom row */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          className="mono"
          style={{
            color: "var(--color-gold-deep)",
            cursor: "pointer",
          }}
        >
          {readMoreLabel} →
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {membersOnly && membersLabel && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--color-gold-deep)",
              }}
            >
              <Icon.Lock size={11} />
              {membersLabel}
            </span>
          )}
          <MonoLabel>
            {readTime} {minReadLabel}
          </MonoLabel>
        </div>
      </div>
    </article>
  );
}

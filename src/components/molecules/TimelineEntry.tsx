// Molecule: TimelineEntry — year + title + description for timeline section
// Used in TimelineSection organism

import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";

interface TimelineEntryProps {
  year: number;
  title: string;
  body: string;
}

export function TimelineEntry({ year, title, body }: TimelineEntryProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 32px 1fr",
        gap: 32,
        alignItems: "start",
      }}
    >
      <div
        className="serif"
        style={{
          fontSize: 32,
          color: "var(--color-green-deep)",
          letterSpacing: "-0.01em",
        }}
      >
        {year}
      </div>
      <div style={{ position: "relative", height: 32 }}>
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            left: -3,
            top: 12,
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: "var(--color-cream-deep)",
            border: "2px solid var(--color-green)",
          }}
        />
        {/* Inner dot */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 17,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--color-gold)",
          }}
        />
      </div>
      <div style={{ paddingTop: 6, maxWidth: 720 }}>
        <Display variant="h3" style={{ fontSize: 22, marginBottom: 8 }}>
          {title}
        </Display>
        <BodyText variant="body" style={{ fontSize: 15 }}>
          {body}
        </BodyText>
      </div>
    </div>
  );
}

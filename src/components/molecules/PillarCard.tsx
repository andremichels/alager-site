// Molecule: PillarCard — numbered pillar card (4 on Home, 4 on Quem Somos values)
// Used in PillarsSection, ValuesSection

import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";

interface PillarCardProps {
  number: string;
  title: string;
  body: string;
}

export function PillarCard({ number, title, body }: PillarCardProps) {
  return (
    <div
      style={{
        paddingTop: 24,
        borderTop: "1px solid var(--color-line-strong)",
      }}
    >
      <MonoLabel color="var(--color-gold-deep)">{number}</MonoLabel>
      <Display variant="h2" style={{ marginTop: 18, marginBottom: 16 }}>
        {title}
      </Display>
      <BodyText style={{ fontSize: 14.5 }}>{body}</BodyText>
    </div>
  );
}

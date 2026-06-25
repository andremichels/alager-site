// Molecule: BoardMemberCard — photo + name + role for board section
// Used in BoardSection organism

import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";

interface BoardMemberCardProps {
  name: string;
  role: string;
  country: string;
  order: number;
  imageUrl?: string;
}

export function BoardMemberCard({
  name,
  role,
  country,
  order,
  imageUrl,
}: BoardMemberCardProps) {
  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            aspectRatio: "4/5",
            objectFit: "cover",
            marginBottom: 16,
            background: "var(--color-cream-deep)",
          }}
        />
      ) : (
        <PhotoPlaceholder
          label={`FOTO · ${name.toUpperCase()} · ${country}`}
          aspectRatio="4/5"
        />
      )}
      <MonoLabel color="var(--color-gold-deep)">
        {country} · {String(order).padStart(2, "0")}
      </MonoLabel>
      <Display variant="h3" style={{ fontSize: 22, marginTop: 8 }}>
        {name}
      </Display>
      <BodyText variant="small" style={{ color: "var(--color-muted)", marginTop: 4 }}>
        {role}
      </BodyText>
    </div>
  );
}

// Organism: HomeMapSection — wrapper for LatamMap + CountryPanel on Home page
// Client component because it manages interaction state
"use client";

import { useState } from "react";
import { LatamMap } from "@/components/organisms/LatamMap";
import { CountryPanel } from "@/components/organisms/CountryPanel";
import { Kicker } from "@/components/atoms/Kicker";
import { COUNTRIES } from "@/data/countries";
import { MonoLabel } from "@/components/atoms/MonoLabel";

interface HomeMapSectionProps {
  locale: string;
  mapTitle: string;
  mapKicker: string;
  mapBody: string;
  mapLegendMember: string;
  mapLegendObs: string;
}

export function HomeMapSection({
  locale,
  mapTitle,
  mapKicker,
  mapBody,
  mapLegendMember,
  mapLegendObs,
}: HomeMapSectionProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section style={{ padding: "16px 0 64px" }}>
      <div className="wrap">
        {/* Eyebrow row */}
        <div className="eyebrow-row" style={{ marginBottom: 40 }}>
          <div>
            <Kicker>{mapKicker}</Kicker>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(36px, 3.4vw, 56px)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
                fontWeight: 400,
                marginTop: 16,
                maxWidth: 600,
              }}
            >
              {mapTitle}
            </h2>
          </div>
          <p
            className="body"
            style={{ maxWidth: 380, color: "var(--color-ink-2)" }}
          >
            {mapBody}
          </p>
        </div>

        {/* Map + country list grid */}
        <div
          className="grid-2-1"
          style={{
            gap: 0,
            border: "1px solid var(--color-line)",
            background: "#fbfaf3",
          }}
        >
          {/* Map */}
          <div style={{ padding: 24, borderRight: "1px solid var(--color-line)" }}>
            <LatamMap
              locale={locale}
              selected={selected}
              onCountrySelect={setSelected}
            />
          </div>

          {/* Country list sidebar */}
          <div style={{ padding: 24, display: "flex", flexDirection: "column" }}>
            <MonoLabel color="var(--color-muted)">
              {locale === "pt" ? "Lista" : locale === "es" ? "Listado" : "Index"}
            </MonoLabel>

            <div style={{ flex: 1, overflowY: "auto", maxHeight: 560 }}>
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelected(selected === c.code ? null : c.code)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px 1fr auto auto",
                    gap: 12,
                    alignItems: "center",
                    width: "100%",
                    padding: "12px 8px",
                    background:
                      selected === c.code
                        ? "var(--color-sage-soft)"
                        : "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--color-line)",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.15s",
                  }}
                >
                  <MonoLabel
                    color={
                      c.member ? "var(--color-green)" : "var(--color-muted)"
                    }
                  >
                    {c.code}
                  </MonoLabel>
                  <span style={{ fontSize: 14, color: "var(--color-ink)" }}>
                    {c.name[locale as keyof typeof c.name]}
                  </span>
                  <MonoLabel color="var(--color-muted)">
                    {String(c.members)}
                  </MonoLabel>
                  <MonoLabel color="var(--color-muted)">
                    {c.capacity} GW
                  </MonoLabel>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div
              style={{
                marginTop: 16,
                display: "flex",
                gap: 16,
                paddingTop: 12,
                borderTop: "1px solid var(--color-line)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "var(--color-green)",
                    display: "inline-block",
                  }}
                />
                <MonoLabel color="var(--color-muted)">
                  {mapLegendMember}
                </MonoLabel>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "1.5px dashed var(--color-green)",
                    display: "inline-block",
                    background: "transparent",
                  }}
                />
                <MonoLabel color="var(--color-muted)">
                  {mapLegendObs}
                </MonoLabel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

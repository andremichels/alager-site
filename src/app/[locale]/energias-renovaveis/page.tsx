// Alager Site — Energias Renováveis page (tabs + simulator)
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { sourceIcon } from "@/components/atoms/Icon";
import { SourceStatRow } from "@/components/molecules/SourceStatRow";
import { ENERGY_SOURCES, SOURCE_PHYS } from "@/data/energy-sources";
import { COUNTRIES } from "@/data/countries";

export default function EnergiasPage() {
  const t = useTranslations("energy");

  const tabs = ["Solar", "Eólica", "Biomassa", "Hídrica", "Hidrogênio"] as const;
  const [tab, setTab] = useState<string>(tabs[0]);
  const source = ENERGY_SOURCES.find((s) => s.key === tab)!;

  // Calculator state
  const [cap, setCap] = useState(50);
  const [src, setSrc] = useState<string>(tabs[0]);
  const [country, setCountry] = useState("BR");

  const phys = SOURCE_PHYS[src] || SOURCE_PHYS.Solar;
  const annualKWh = cap * 1000 * phys.cf * 8760;
  const annualGWh = annualKWh / 1_000_000;
  const co2Tons = (annualKWh * phys.gco2) / 1_000_000;
  const households = Math.round(annualKWh / 3500);
  const trees = Math.round(co2Tons * 16.5);

  return (
    <main>
      {/* HERO */}
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="wrap">
          <Kicker>{t("kicker")}</Kicker>
          <Display variant="display-1" style={{ marginTop: 24, marginBottom: 32, maxWidth: 1100 }}>
            {t("headline")}
          </Display>
          <BodyText variant="lead" style={{ maxWidth: 760 }}>
            {t("lead")}
          </BodyText>
        </div>
      </section>

      {/* TABS */}
      <section style={{ padding: "32px 0 96px" }}>
        <div className="wrap">
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: "1px solid var(--color-line-strong)",
              marginBottom: 56,
              flexWrap: "wrap",
            }}
          >
            {tabs.map((tabName, i) => {
              const active = tab === tabName;
              return (
                <button
                  key={tabName}
                  onClick={() => setTab(tabName)}
                  style={{
                    background: active ? "var(--color-sage-soft)" : "transparent",
                    border: "none",
                    padding: "20px 28px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    borderRight: i < tabs.length - 1 ? "1px solid var(--color-line)" : "none",
                    flex: 1,
                    color: active ? "var(--color-green-deep)" : "var(--color-ink-2)",
                    position: "relative",
                    transition: "background 0.15s",
                  }}
                >
                  <div
                    className="mono"
                    style={{ color: active ? "var(--color-gold-deep)" : "var(--color-muted)", marginBottom: 8 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {sourceIcon(tabName)}
                    <span className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>
                      {tabName}
                    </span>
                  </div>
                  {active && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: -1,
                        width: "100%",
                        height: 3,
                        background: "var(--color-gold)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="grid-1-2" style={{ gap: 64, alignItems: "start" }}>
            <div>
              <Display variant="h1" style={{ marginBottom: 32, maxWidth: 600 }}>
                {source.body.pt}
              </Display>
              <BodyText style={{ fontSize: 16.5, marginBottom: 32, maxWidth: 600 }}>
                {/* Full body from source */}
                {source.body.pt}
              </BodyText>

              {/* ALAGER focus callout */}
              <div
                style={{
                  padding: "24px 28px",
                  background: "var(--color-sage-soft)",
                  borderLeft: "3px solid var(--color-gold)",
                }}
              >
                <div className="mono" style={{ color: "var(--color-green-deep)", marginBottom: 10 }}>
                  ALAGER · Frente técnica
                </div>
                <p style={{ fontSize: 15, color: "var(--color-green-ink)", lineHeight: 1.55, margin: 0 }}>
                  {source.focus.pt}
                </p>
              </div>
            </div>

            {/* Stats column */}
            <div style={{ border: "1px solid var(--color-line)", background: "#fbfaf3" }}>
              {source.stats.map((stat, i) => (
                <SourceStatRow
                  key={i}
                  value={stat.value}
                  label={stat.label.pt}
                  last={i === source.stats.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SIMULATOR */}
      <section className="section" style={{ background: "var(--color-green-deep)", color: "var(--color-cream)" }}>
        <div className="wrap">
          <div className="eyebrow-row" style={{ alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <Kicker gold>{t("calcKicker")}</Kicker>
              <Display variant="display-2" style={{ color: "var(--color-cream)", marginTop: 16, maxWidth: 800 }}>
                {t("calcTitle")}
              </Display>
            </div>
            <BodyText variant="small" style={{ color: "#9ab1a3" }}>
              {t("calcLead")}
            </BodyText>
          </div>

          {/* Inputs */}
          <div className="grid-3" style={{ gap: 32, marginBottom: 48 }}>
            {/* Capacity slider */}
            <div>
              <div className="mono" style={{ color: "var(--color-gold)", marginBottom: 12 }}>
                {t("capacityLabel")}
              </div>
              <input
                type="range"
                min={1}
                max={500}
                value={cap}
                onChange={(e) => setCap(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--color-gold)" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span className="mono" style={{ color: "#9ab1a3" }}>1 MW</span>
                <span className="serif" style={{ fontSize: 24, color: "var(--color-gold)" }}>
                  {cap} <span style={{ fontSize: 14 }}>MW</span>
                </span>
                <span className="mono" style={{ color: "#9ab1a3" }}>500 MW</span>
              </div>
            </div>

            {/* Source grid */}
            <div>
              <div className="mono" style={{ color: "var(--color-gold)", marginBottom: 12 }}>
                {t("sourceLabel")}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {tabs.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSrc(s)}
                    style={{
                      padding: "10px 8px",
                      background: src === s ? "var(--color-gold)" : "transparent",
                      color: src === s ? "var(--color-green-deep)" : "var(--color-cream)",
                      border: `1px solid ${src === s ? "var(--color-gold)" : "#ffffff30"}`,
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase" as const,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    {sourceIcon(s)}
                    {s.slice(0, 4)}
                  </button>
                ))}
              </div>
            </div>

            {/* Country select */}
            <div>
              <div className="mono" style={{ color: "var(--color-gold)", marginBottom: 12 }}>
                {t("countryLabel")}
              </div>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "transparent",
                  border: "1px solid #ffffff30",
                  color: "var(--color-cream)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                }}
              >
                {COUNTRIES.filter((c) => c.member).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name.pt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Output grid */}
          <div className="grid-4" style={{ gap: 0, border: "1px solid #ffffff20" }}>
            <OutputCell value={`${annualGWh.toFixed(0)}`} unit="GWh/ano" label={t("annualEnergy")} />
            <OutputCell value={`${co2Tons.toFixed(0)}`} unit="t CO₂" label={t("avoidedCo2")} />
            <OutputCell value={households.toLocaleString()} unit="" label={t("households")} />
            <OutputCell value={trees.toLocaleString()} unit="" label={t("trees")} />
          </div>

          {/* Disclaimer */}
          <p className="mono" style={{ color: "#9ab1a3", marginTop: 24, textAlign: "center" }}>
            Cálculo indicativo. Fator de capacidade médio por fonte; emissões evitadas estimadas contra a média da matriz elétrica regional.
          </p>
        </div>
      </section>
    </main>
  );
}

function OutputCell({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div style={{ padding: "28px 24px", borderRight: "1px solid #ffffff20", textAlign: "center" }}>
      <div className="serif" style={{ fontSize: 36, color: "var(--color-gold)", letterSpacing: "-0.01em" }}>
        {value}
        {unit && (
          <span style={{ fontSize: 16, color: "#9ab1a3", marginLeft: 4 }}>{unit}</span>
        )}
      </div>
      <div className="mono" style={{ color: "#9ab1a3", marginTop: 8 }}>
        {label}
      </div>
    </div>
  );
}

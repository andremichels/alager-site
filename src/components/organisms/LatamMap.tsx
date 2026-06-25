// Organism: LatamMap — interactive LATAM map with geographic + cartogram modes
// Built with SVG polygons from handoff data, framer-motion for transitions
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  COUNTRIES,
  POLY,
  LABEL_OFFSET,
  CART_CENTERS,
} from "@/data/countries";
import type { Country } from "@/data/countries";

/* ── Projection helpers ── */
const PROJ = (lon: number, lat: number): [number, number] => [
  ((lon + 120) * 600) / 90,
  ((35 - lat) * 900) / 90,
];

const projectPath = (pts: [number, number][]) =>
  pts.map(([lon, lat]) => PROJ(lon, lat).map((n) => n.toFixed(1)).join(",")).join(" ");

const centroid = (pts: [number, number][]) => {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return [
    xs.reduce((a, b) => a + b, 0) / xs.length,
    ys.reduce((a, b) => a + b, 0) / ys.length,
  ];
};

/* ── Hexagon geometry ── */
function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
  }
  return pts.join(" ");
}

/* ── Types ── */
type MapMode = "geographic" | "cartogram";
type ScaleBy = "members" | "capacity";

interface LatamMapProps {
  locale: string;
  onCountrySelect?: (code: string | null) => void;
  selected: string | null;
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export function LatamMap({ locale, onCountrySelect, selected }: LatamMapProps) {
  const [mode, setMode] = useState<MapMode>("geographic");
  const [scaleBy, setScaleBy] = useState<ScaleBy>("members");
  const [hovered, setHovered] = useState<string | null>(null);

  // Cartogram radius calculation
  const { maxV, radiusFn } = useMemo(() => {
    const values = COUNTRIES.map((c) =>
      scaleBy === "members" ? c.members : c.capacity
    );
    const max = Math.max(...values);
    const minR = 16;
    const maxR = 58;
    return {
      maxV: max,
      radiusFn: (c: Country) => {
        const v = scaleBy === "members" ? c.members : c.capacity;
        return minR + (v / max) * (maxR - minR);
      },
    };
  }, [scaleBy]);

  // Labels
  const modeLabel =
    locale === "en"
      ? { geographic: "Geographic", cartogram: "Cartogram" }
      : { geographic: "Geográfico", cartogram: "Cartograma" };

  const scaleLabel =
    locale === "en"
      ? { members: "Members", capacity: "Capacity" }
      : { members: "Associados", capacity: "Capacidade" };

  const sizedBy =
    locale === "en" ? "Sized by" : locale === "es" ? "Tamaño por" : "Tamanho por";

  const figCaption =
    mode === "geographic"
      ? "AMÉRICA LATINA · ASSOCIADOS ALAGER"
      : `CARTOGRAMA · ${scaleBy === "members" ? "ASSOCIADOS" : "CAPACIDADE GW"} POR PAÍS`;

  return (
    <div style={{ position: "relative" }}>
      {/* ═══ TOGGLE CONTROLS ═══ */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Mode toggle */}
        <div
          style={{
            display: "inline-flex",
            border: "1px solid var(--color-line-strong)",
          }}
        >
          {(["geographic", "cartogram"] as MapMode[]).map((m, i) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "8px 16px",
                background: mode === m ? "var(--color-green)" : "transparent",
                color: mode === m ? "var(--color-cream)" : "var(--color-green)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                borderRight:
                  i === 0 ? "1px solid var(--color-line-strong)" : "none",
              }}
            >
              {modeLabel[m]}
            </button>
          ))}
        </div>

        {/* Scale-by toggle (cartogram only) */}
        <AnimatePresence>
          {mode === "cartogram" && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            >
              <span className="mono" style={{ color: "var(--color-muted)" }}>
                {sizedBy}:
              </span>
              <div
                style={{
                  display: "inline-flex",
                  border: "1px solid var(--color-line-strong)",
                }}
              >
                {(["members", "capacity"] as ScaleBy[]).map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setScaleBy(s)}
                    style={{
                      padding: "6px 12px",
                      background:
                        scaleBy === s ? "var(--color-gold)" : "transparent",
                      color:
                        scaleBy === s
                          ? "var(--color-green-deep)"
                          : "var(--color-ink-2)",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      borderRight:
                        i === 0
                          ? "1px solid var(--color-line-strong)"
                          : "none",
                    }}
                  >
                    {scaleLabel[s]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ SVG MAP ═══ */}
      <svg
        viewBox="0 0 600 900"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* Graticale grid */}
        <defs>
          <pattern
            id="grat"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="600" height="900" fill="url(#grat)" opacity="0.35" />

        {/* Reference lines: Equator + Tropic of Capricorn */}
        <g
          stroke="var(--color-green)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
          opacity="0.3"
        >
          <line x1="0" y1="350" x2="600" y2="350" />
          <line x1="0" y1="585" x2="600" y2="585" />
        </g>
        <g fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--color-muted)" letterSpacing="1">
          <text x="6" y="346">EQUADOR · 0°</text>
          <text x="6" y="581">TRÓPICO DE CAPRICÓRNIO · 23.5°S</text>
        </g>

        {/* ═══ RENDER MODE ═══ */}
        <AnimatePresence mode="wait">
          {mode === "geographic" ? (
            <GeographicMode
              key="geo"
              hovered={hovered}
              setHovered={setHovered}
              selected={selected}
              onCountrySelect={onCountrySelect}
            />
          ) : (
            <CartogramMode
              key="carto"
              hovered={hovered}
              setHovered={setHovered}
              selected={selected}
              onCountrySelect={onCountrySelect}
              radiusFn={radiusFn}
              scaleBy={scaleBy}
              maxV={maxV}
            />
          )}
        </AnimatePresence>

        {/* Footer caption */}
        <g
          transform="translate(12 880)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fill="var(--color-muted)"
          letterSpacing="1"
        >
          <text>FIG. 01 · {figCaption} · 2026</text>
        </g>

        {/* Compass (geographic only) */}
        {mode === "geographic" && (
          <g
            transform="translate(565 35)"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="var(--color-muted)"
            textAnchor="middle"
          >
            <text y="0">N</text>
            <line
              x1="0" y1="4" x2="0" y2="22"
              stroke="var(--color-muted)"
              strokeWidth="0.8"
            />
            <path
              d="M -3 9 L 0 4 L 3 9"
              stroke="var(--color-muted)"
              strokeWidth="0.8"
              fill="none"
            />
          </g>
        )}

        {/* Scale bar (geographic only) */}
        {mode === "geographic" && (
          <g
            transform="translate(20 855)"
            fontFamily="var(--font-mono)"
            fontSize="7.5"
            fill="var(--color-muted)"
          >
            <line x1="0" y1="0" x2="80" y2="0" stroke="var(--color-muted)" strokeWidth="1" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="var(--color-muted)" strokeWidth="1" />
            <line x1="80" y1="-3" x2="80" y2="3" stroke="var(--color-muted)" strokeWidth="1" />
            <line x1="40" y1="-2" x2="40" y2="2" stroke="var(--color-muted)" strokeWidth="0.6" />
            <text x="40" y="14" textAnchor="middle">~1.500 KM</text>
          </g>
        )}

        {/* Legend (cartogram only) */}
        {mode === "cartogram" && (
          <CartogramLegend
            scaleBy={scaleBy}
            locale={locale}
            maxV={maxV}
            radiusFn={radiusFn}
          />
        )}
      </svg>

      {/* ═══ HOVER TOOLTIP ═══ */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              background: "var(--color-green-deep)",
              color: "var(--color-cream)",
              padding: "10px 16px",
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.08em",
              pointerEvents: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>
              {hovered}
            </span>
            {" · "}
            {(COUNTRIES.find((c) => c.code === hovered)?.name[locale as keyof Country["name"]] || "").toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   GEOGRAPHIC MODE SUB-COMPONENT
   ═══════════════════════════════════════════════ */
function GeographicMode({
  hovered,
  setHovered,
  selected,
  onCountrySelect,
}: {
  hovered: string | null;
  setHovered: (c: string | null) => void;
  selected: string | null;
  onCountrySelect?: (c: string | null) => void;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Country polygons */}
      {Object.entries(POLY).map(([code, pts]) => {
        const country = COUNTRIES.find((c) => c.code === code);
        if (!country) return null;
        const isMember = country.member;
        const isSel = selected === code;
        const isHov = hovered === code;

        return (
          <motion.path
            key={code}
            d={`M ${projectPath(pts)} Z`}
            fill={
              isSel
                ? "var(--color-gold)"
                : isHov && isMember
                ? "var(--color-green-deep)"
                : isHov
                ? "var(--color-sage)"
                : isMember
                ? "var(--color-green)"
                : "var(--color-sage-soft)"
            }
            stroke={isMember ? "var(--color-cream)" : "var(--color-green)"}
            strokeWidth={isSel ? 1.6 : 1}
            strokeDasharray={isMember ? "none" : "3 2"}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.002 }}
            transition={{ duration: 0.2 }}
            onClick={() => onCountrySelect?.(isSel ? null : code)}
            onMouseEnter={() => setHovered(code)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}

      {/* Country labels */}
      {Object.entries(POLY).map(([code, pts]) => {
        const country = COUNTRIES.find((c) => c.code === code);
        if (!country) return null;
        const projected = pts.map(([lon, lat]) => PROJ(lon, lat));
        const [cx, cy] = centroid(projected);
        const [dx, dy] = LABEL_OFFSET[code] || [0, 0];
        const isMember = country.member;

        return (
          <g key={code + "-lbl"} pointerEvents="none">
            <text
              x={cx + dx}
              y={cy + dy + 3}
              fontFamily="var(--font-mono)"
              fontSize={code === "BR" ? 13 : 10.5}
              fill={isMember ? "var(--color-cream)" : "var(--color-green)"}
              fontWeight={selected === code ? 700 : 500}
              textAnchor="middle"
              letterSpacing="0.08em"
            >
              {code}
            </text>
          </g>
        );
      })}
    </motion.g>
  );
}

/* ═══════════════════════════════════════════════
   CARTOGRAM MODE SUB-COMPONENT
   ═══════════════════════════════════════════════ */
function CartogramMode({
  hovered,
  setHovered,
  selected,
  onCountrySelect,
  radiusFn,
  scaleBy,
  maxV,
}: {
  hovered: string | null;
  setHovered: (c: string | null) => void;
  selected: string | null;
  onCountrySelect?: (c: string | null) => void;
  radiusFn: (c: Country) => number;
  scaleBy: ScaleBy;
  maxV: number;
}) {
  const sorted = COUNTRIES.filter((c) => POLY[c.code])
    .map((c) => ({ ...c, r: radiusFn(c) }))
    .sort((a, b) => b.r - a.r);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Faint continental silhouette for orientation */}
      <g opacity="0.06" pointerEvents="none">
        {Object.keys(POLY).map((code) => (
          <path
            key={code + "-bg"}
            d={`M ${projectPath(POLY[code])} Z`}
            fill="var(--color-green)"
          />
        ))}
      </g>

      {/* Hexagons (sorted large→small for proper overlap) */}
      {sorted.map((c) => {
        const [cx, cy] = CART_CENTERS[c.code] || [0, 0];
        const isMember = c.member;
        const isSel = selected === c.code;
        const isHov = hovered === c.code;
        const v = scaleBy === "members" ? c.members : c.capacity;

        return (
          <motion.g
            key={c.code}
            style={{ cursor: "pointer" }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: sorted.indexOf(c) * 0.03,
              ease: "easeOut",
            }}
            onClick={() => onCountrySelect?.(isSel ? null : c.code)}
            onMouseEnter={() => setHovered(c.code)}
            onMouseLeave={() => setHovered(null)}
          >
            <polygon
              points={hexPoints(cx, cy, c.r)}
              fill={
                isSel
                  ? "var(--color-gold)"
                  : isHov && isMember
                  ? "var(--color-green-deep)"
                  : isHov
                  ? "var(--color-sage)"
                  : isMember
                  ? "var(--color-green)"
                  : "var(--color-sage-soft)"
              }
              stroke={isMember ? "var(--color-cream)" : "var(--color-green)"}
              strokeWidth={isSel ? 2 : 1.2}
              strokeDasharray={isMember ? "none" : "3 2"}
              style={{ transition: "fill 0.2s" }}
            />

            {/* Country code */}
            <text
              x={cx}
              y={cy - 2}
              fontFamily="var(--font-mono)"
              fontSize={c.r > 30 ? 12 : 10}
              fill={isMember ? "var(--color-cream)" : "var(--color-green)"}
              fontWeight={500}
              textAnchor="middle"
              letterSpacing="0.06em"
              style={{ pointerEvents: "none" }}
            >
              {c.code}
            </text>

            {/* Value inside hex (if large enough) */}
            {c.r > 24 && (
              <text
                x={cx}
                y={cy + 14}
                fontFamily="var(--font-serif)"
                fontSize={c.r > 40 ? 22 : 16}
                fill={isMember ? "var(--color-gold)" : "var(--color-green)"}
                textAnchor="middle"
                fontWeight={400}
                letterSpacing="-0.01em"
                style={{ pointerEvents: "none" }}
              >
                {scaleBy === "members"
                  ? v
                  : v.toFixed(v < 1 ? 1 : 0)}
                {scaleBy === "capacity" && c.r > 32 && (
                  <tspan
                    fontSize={c.r > 40 ? 11 : 9}
                    fill={isMember ? "#9ab1a3" : "var(--color-muted)"}
                    dx="2"
                  >
                    {" "}GW
                  </tspan>
                )}
              </text>
            )}
          </motion.g>
        );
      })}
    </motion.g>
  );
}

/* ═══════════════════════════════════════════════
   CARTOGRAM LEGEND
   ═══════════════════════════════════════════════ */
function CartogramLegend({
  scaleBy,
  locale,
  maxV,
  radiusFn,
}: {
  scaleBy: ScaleBy;
  locale: string;
  maxV: number;
  radiusFn: (c: Country) => number;
}) {
  const refSizes = [
    {
      v: maxV,
      label:
        scaleBy === "members"
          ? String(Math.round(maxV))
          : `${Math.round(maxV)} GW`,
    },
    {
      v: maxV * 0.4,
      label:
        scaleBy === "members"
          ? String(Math.round(maxV * 0.4))
          : `${(maxV * 0.4).toFixed(1)} GW`,
    },
    {
      v: maxV * 0.1,
      label:
        scaleBy === "members"
          ? String(Math.round(maxV * 0.1))
          : `${(maxV * 0.1).toFixed(1)} GW`,
    },
  ];

  const minR = 10;
  const maxR = 30;
  const r = (v: number) => minR + (v / maxV) * (maxR - minR);

  const legendTitle =
    locale === "en"
      ? "SCALE"
      : "ESCALA";
  const legendUnit =
    scaleBy === "members"
      ? locale === "en"
        ? "MEMBERS"
        : "ASSOCIADOS"
      : "GW";

  return (
    <g transform="translate(20 600)">
      <text
        x="0"
        y="-12"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="var(--color-muted)"
        letterSpacing="1"
      >
        {legendTitle} · {legendUnit}
      </text>
      {refSizes.map((ref, i) => {
        const rr = r(ref.v);
        const cy = i * 42 + rr;
        return (
          <g key={i} transform={`translate(35 ${cy})`}>
            <polygon
              points={hexPoints(0, 0, rr)}
              fill="none"
              stroke="var(--color-green)"
              strokeWidth="0.8"
            />
            <text
              x={maxR + 16}
              y="3"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill="var(--color-muted)"
            >
              {ref.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

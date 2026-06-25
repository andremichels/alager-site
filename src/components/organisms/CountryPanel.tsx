// Organism: CountryPanel — sidebar panel showing selected country data
// Used alongside LatamMap on the Home page
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COUNTRIES } from "@/data/countries";
import { MonoLabel } from "@/components/atoms/MonoLabel";

interface CountryPanelProps {
  code: string | null;
  locale: string;
}

export function CountryPanel({ code, locale }: CountryPanelProps) {
  const c = code ? COUNTRIES.find((x) => x.code === code) : null;

  return (
    <AnimatePresence mode="wait">
      {!c ? (
        /* ── Empty state ── */
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            padding: "32px 28px",
            background: "var(--color-green)",
            color: "var(--color-cream)",
            height: "100%",
          }}
        >
          <MonoLabel color="var(--color-gold)">
            {locale === "pt"
              ? "Selecione um país"
              : locale === "es"
              ? "Selecciona un país"
              : "Select a country"}
          </MonoLabel>
          <p
            className="serif"
            style={{
              fontSize: 20,
              lineHeight: 1.4,
              marginTop: 16,
              color: "var(--color-cream)",
              fontWeight: 400,
            }}
          >
            {locale === "pt"
              ? "Clique em qualquer país do mapa para ver associados, capacidade instalada e o representante institucional."
              : locale === "es"
              ? "Haz clic en cualquier país del mapa para ver asociados, capacidad instalada y representante institucional."
              : "Click any country on the map to see members, installed capacity and the institutional representative."}
          </p>

          <div
            style={{
              width: "100%",
              height: 1,
              background: "#ffffff20",
              margin: "28px 0",
            }}
          />

          {/* Summary stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <StatBlock
              value="13"
              label={
                locale === "pt"
                  ? "Países"
                  : locale === "es"
                  ? "Países"
                  : "Countries"
              }
            />
            <StatBlock
              value="241"
              label={
                locale === "pt"
                  ? "Associados"
                  : locale === "es"
                  ? "Asociados"
                  : "Members"
              }
            />
            <StatBlock
              value="38"
              unit="GW"
              label={
                locale === "pt"
                  ? "Capacidade"
                  : locale === "es"
                  ? "Capacidad"
                  : "Capacity"
              }
            />
          </div>
        </motion.div>
      ) : (
        /* ── Selected country ── */
        <motion.div
          key={c.code}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{
            padding: "32px 28px",
            background: "var(--color-green)",
            color: "var(--color-cream)",
            height: "100%",
          }}
        >
          {/* Status badge */}
          <MonoLabel color="var(--color-gold)">
            {c.code} ·{" "}
            {c.member
              ? locale === "pt"
                ? "País membro"
                : locale === "es"
                ? "País miembro"
                : "Member country"
              : locale === "pt"
              ? "Observador"
              : "Observer"}
          </MonoLabel>

          {/* Country name */}
          <div
            className="serif"
            style={{
              fontSize: 44,
              lineHeight: 1.05,
              fontWeight: 400,
              marginTop: 12,
              color: "var(--color-cream)",
            }}
          >
            {c.name[locale as keyof typeof c.name]}
          </div>

          <div
            style={{
              width: "100%",
              height: 1,
              background: "#ffffff20",
              margin: "24px 0 20px",
            }}
          />

          {/* Country stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <StatBlock
              value={String(c.members)}
              label={
                locale === "pt"
                  ? "Associados"
                  : locale === "es"
                  ? "Asociados"
                  : "Members"
              }
            />
            <StatBlock
              value={String(c.capacity)}
              unit="GW"
              label={
                locale === "pt"
                  ? "Capacidade renovável"
                  : locale === "es"
                  ? "Capacidad renovable"
                  : "Renewable capacity"
              }
            />
          </div>

          <div
            style={{
              width: "100%",
              height: 1,
              background: "#ffffff20",
              margin: "20px 0",
            }}
          />

          {/* Representation info */}
          <MonoLabel color="#9ab1a3">
            {locale === "pt"
              ? "Representação local"
              : locale === "es"
              ? "Representación local"
              : "Local representation"}
          </MonoLabel>
          <p
            style={{
              color: "var(--color-cream)",
              fontSize: 14,
              lineHeight: 1.55,
              marginTop: 8,
            }}
          >
            {c.member
              ? locale === "pt"
                ? `Capítulo nacional ativo desde 2018, com reuniões trimestrais.`
                : locale === "es"
                ? `Capítulo nacional activo desde 2018, con reuniones trimestrales.`
                : `National chapter active since 2018, with quarterly meetings.`
              : locale === "pt"
              ? "Status de observador. Sem capítulo nacional formalizado."
              : locale === "es"
              ? "Estado de observador. Sin capítulo nacional formalizado."
              : "Observer status. No formal national chapter."}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatBlock({
  value,
  unit,
  label,
}: {
  value: string;
  unit?: string;
  label: string;
}) {
  return (
    <div>
      <div
        className="serif"
        style={{
          fontSize: 40,
          color: "var(--color-cream)",
          lineHeight: 1,
        }}
      >
        {value}
        {unit && (
          <span
            style={{
              fontSize: 22,
              color: "#9ab1a3",
              marginLeft: 4,
            }}
          >
            {unit}
          </span>
        )}
      </div>
      <MonoLabel color="#9ab1a3" size="small">
        {label}
      </MonoLabel>
    </div>
  );
}

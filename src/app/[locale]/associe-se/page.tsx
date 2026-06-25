// Alager Site — Associe-se page (tiers + interest form)
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { Button } from "@/components/atoms/Button";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Input } from "@/components/atoms/Input";
import { TierCard } from "@/components/molecules/TierCard";
import { COUNTRIES } from "@/data/countries";

export default function AssocieSePage() {
  const t = useTranslations("join");

  const tiers = [
    {
      name: "Institucional",
      price: "Sob consulta",
      desc: "Para associações nacionais, federações e câmaras setoriais. Voto pleno na Assembleia, dois assentos no Conselho Deliberativo.",
      features: ["Voto pleno em Assembleia", "Dois assentos no Conselho", "Participação em todos os grupos técnicos", "Boletim regulatório completo"],
      featured: true,
    },
    {
      name: "Corporativo",
      price: "Sob consulta",
      desc: "Geradoras, distribuidoras, integradoras e fornecedores de tecnologia. Acesso integral à inteligência setorial.",
      features: ["Um assento no Conselho Consultivo", "Acesso a estudos técnicos", "Convites prioritários a eventos", "Networking estruturado"],
    },
    {
      name: "Acadêmica",
      price: "Quota reduzida",
      desc: "Universidades, centros de pesquisa e think tanks. Voz nos comitês técnicos e parcerias de pesquisa.",
      features: ["Comitês técnicos", "Co-publicação de estudos", "Bolsas e fellowships", "Acesso a base de dados"],
    },
  ];

  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    country: "",
    tier: "",
    source: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "OBRIGATÓRIO";
    if (!form.org.trim()) errs.org = "OBRIGATÓRIO";
    if (!form.email.includes("@")) errs.email = "INVÁLIDO";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    // TODO: POST to n8n webhook
  };

  const handleTierSelect = (tierName: string) => {
    setForm((f) => ({ ...f, tier: tierName }));
    document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main>
        <section style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="wrap" style={{ maxWidth: 640, textAlign: "center" }}>
            <div
              style={{
                background: "var(--color-green)",
                color: "var(--color-cream)",
                padding: "64px 48px",
              }}
            >
              <div className="mono" style={{ color: "var(--color-gold)", marginBottom: 24 }}>
                Protocolo · ALAGER · INS · {Math.floor(1000 + Math.random() * 9000)}-2026
              </div>
              <Display variant="h2" style={{ color: "var(--color-cream)", marginBottom: 16 }}>
                {t("fOk")}
              </Display>
              <BodyText variant="body" style={{ color: "#c6d4c9" }}>
                A secretaria executiva responderá em até 5 dias úteis.
              </BodyText>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* HERO */}
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="wrap">
          <Kicker>{t("kicker")}</Kicker>
          <Display variant="display-1" style={{ marginTop: 24, marginBottom: 32, maxWidth: 1100 }}>
            {t("headline")}
          </Display>
          <BodyText variant="lead" style={{ maxWidth: 720 }}>
            {t("lead")}
          </BodyText>
        </div>
      </section>

      {/* TIERS */}
      <section className="section" style={{ background: "var(--color-cream-deep)" }}>
        <div className="wrap">
          <Display variant="h1" style={{ marginBottom: 48 }}>
            {t("tiersTitle")}
          </Display>
          <div className="grid-3" style={{ gap: 32 }}>
            {tiers.map((tier) => (
              <TierCard
                key={tier.name}
                name={tier.name}
                price={tier.price}
                description={tier.desc}
                features={tier.features}
                featured={tier.featured}
                onSelect={() => handleTierSelect(tier.name)}
                ctaLabel="Manifestar interesse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="join-form" className="section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <Kicker>{t("formKicker")}</Kicker>
          <Display variant="h1" style={{ marginTop: 16, marginBottom: 16 }}>
            {t("formTitle")}
          </Display>
          <BodyText style={{ marginBottom: 48 }}>
            {t("formLead")}
          </BodyText>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: 24 }}>
              <Input
                name="name"
                label={t("fName")}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                error={errors.name}
                required
              />
              <Input
                name="org"
                label={t("fOrg")}
                value={form.org}
                onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                error={errors.org}
                required
              />
              <Input
                name="email"
                type="email"
                label={t("fEmail")}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                error={errors.email}
                required
              />

              <div className="grid-2" style={{ gap: 16 }}>
                <Input
                  name="country"
                  type="select"
                  label={t("fCountry")}
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  options={COUNTRIES.map((c) => ({ value: c.code, label: c.name.pt }))}
                />
                <Input
                  name="tier"
                  type="select"
                  label={t("fTier")}
                  value={form.tier}
                  onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))}
                  options={[
                    { value: "Institucional", label: "Institucional" },
                    { value: "Corporativo", label: "Corporativo" },
                    { value: "Acadêmica", label: "Acadêmica" },
                  ]}
                />
              </div>

              <Input
                name="source"
                label={t("fSource")}
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
              />
              <Input
                name="message"
                type="textarea"
                label={t("fMessage")}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />

              <Button variant="primary" style={{ justifyContent: "center", padding: "16px 32px", fontSize: 16 }}>
                {t("fSubmit")}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

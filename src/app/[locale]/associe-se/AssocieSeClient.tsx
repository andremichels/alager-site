// Alager Site — Associe-se client (tiers + interest form)
"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { Button } from "@/components/atoms/Button";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Input } from "@/components/atoms/Input";
import { TierCard } from "@/components/molecules/TierCard";
import type { Country } from "@/data/countries";
import type { MembershipTier } from "@/lib/sanity";
import { track } from "@/lib/analytics";

interface Tier {
  name: string;
  price: string;
  desc: string;
  features: string[];
}

interface AssocieSeClientProps {
  countries: Country[];
  tiers?: MembershipTier[];
}

export default function AssocieSeClient({ countries, tiers }: AssocieSeClientProps) {
  const t = useTranslations("join");
  const locale = useLocale();

  const L = (v?: Record<string, string>) => v?.[locale] || "";

  const sanityTiers: Tier[] = (tiers || []).map((tier) => ({
    name: L(tier.name),
    price: L(tier.price),
    desc: L(tier.desc),
    features: (tier.features || []).map((f) => L(f)),
  }));

  const tierList: Tier[] = sanityTiers.length
    ? sanityTiers
    : (t.raw("tiers") as Tier[]);

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
    if (!form.name.trim()) errs.name = t("required");
    if (!form.org.trim()) errs.org = t("required");
    if (!form.email.includes("@")) errs.email = t("invalid");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    track("join_form_submitted", { tier: form.tier });
    // TODO: POST to n8n webhook
  };

  const handleTierSelect = (tierName: string) => {
    setForm((f) => ({ ...f, tier: tierName }));
    track("join_tier_selected", { tier: tierName });
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
                {t("protocol", { code: Math.floor(1000 + Math.random() * 9000) })}
              </div>
              <Display variant="h2" style={{ color: "var(--color-cream)", marginBottom: 16 }}>
                {t("fOk")}
              </Display>
              <BodyText variant="body" style={{ color: "#c6d4c9" }}>
                {t("successBody")}
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
            {tierList.map((tier, i) => (
              <TierCard
                key={tier.name}
                name={tier.name}
                price={tier.price}
                description={tier.desc}
                features={tier.features}
                featured={i === 0}
                onSelect={() => handleTierSelect(tier.name)}
                ctaLabel={t("tierCta")}
                recommendedLabel={t("recommended")}
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
                requiredLabel={t("required")}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                error={errors.name}
                required
              />
              <Input
                name="org"
                label={t("fOrg")}
                requiredLabel={t("required")}
                value={form.org}
                onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                error={errors.org}
                required
              />
              <Input
                name="email"
                type="email"
                label={t("fEmail")}
                requiredLabel={t("required")}
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
                  options={countries.map((c) => ({ value: c.code, label: c.name[locale as keyof typeof c.name] }))}
                />
                <Input
                  name="tier"
                  type="select"
                  label={t("fTier")}
                  value={form.tier}
                  onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value }))}
                  options={tierList.map((tier) => ({ value: tier.name, label: tier.name }))}
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

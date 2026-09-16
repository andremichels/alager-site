// Alager Site — Política de Privacidade (conteúdo estático)
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { buildPageMetadata, pageMeta } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = pageMeta.privacy[locale] ?? pageMeta.privacy.pt;
  return buildPageMetadata(locale, "politica-de-privacidade", m);
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  const sections = [
    { title: t("collect"), body: t("collectBody") },
    { title: t("use"), body: t("useBody") },
    { title: t("share"), body: t("shareBody") },
    { title: t("security"), body: t("securityBody") },
    { title: t("rights"), body: t("rightsBody") },
    { title: t("contact"), body: t("contactBody") },
  ];

  return (
    <main>
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          <Kicker>{t("kicker")}</Kicker>
          <Display variant="display-1" style={{ marginTop: 24, marginBottom: 16 }}>
            {t("title")}
          </Display>
          <BodyText variant="small" style={{ color: "var(--color-muted)" }}>
            {t("updated")}
          </BodyText>
          <BodyText variant="lead" style={{ marginTop: 24 }}>
            {t("intro")}
          </BodyText>
        </div>
      </section>

      <section style={{ paddingBottom: 96 }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          {sections.map((s) => (
            <div key={s.title} style={{ marginBottom: 40 }}>
              <Display variant="h3" style={{ marginBottom: 12 }}>
                {s.title}
              </Display>
              <BodyText>{s.body}</BodyText>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

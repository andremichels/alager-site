// Alager Site — Blog post detail client component
"use client";

import { useTranslations } from "next-intl";
import { Kicker } from "@/components/atoms/Kicker";
import { Display } from "@/components/atoms/Display";
import { BodyText } from "@/components/atoms/BodyText";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Button } from "@/components/atoms/Button";
import { PhotoPlaceholder } from "@/components/atoms/PhotoPlaceholder";
import type { Post } from "@/lib/sanity";

interface PostDetailClientProps {
  locale: string;
  post: Post;
}

function formatDate(iso: string, lang: string) {
  const d = new Date(iso);
  const m: Record<string, string[]> = {
    pt: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],
    es: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
    en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  };
  const months = m[lang] || m.pt;
  return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

export function PostDetailClient({ locale, post }: PostDetailClientProps) {
  const t = useTranslations("blog");

  const title = (post.title as any)[locale] || "";
  const excerpt = (post.excerpt as any)[locale] || "";
  const body = (post.body as any)?.[locale] || "";
  const category = (post.cat as any)[locale] || "";

  return (
    <main>
      {/* Header */}
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          {/* Back link */}
          <a
            href={`/${locale}/blog`}
            className="mono"
            style={{
              color: "var(--color-gold-deep)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 32,
            }}
          >
            ← {locale === "pt" ? "Voltar ao blog" : locale === "es" ? "Volver al blog" : "Back to blog"}
          </a>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <MonoLabel color="var(--color-gold-deep)">{category}</MonoLabel>
            <MonoLabel color="var(--color-muted)">
              {formatDate(post.date, locale)}
              {" · "}
              {post.read} {t("minRead")}
            </MonoLabel>
          </div>

          {/* Title */}
          <Display variant="display-2" style={{ marginBottom: 32 }}>
            {title}
          </Display>

          {/* Excerpt as lead */}
          <BodyText
            variant="lead"
            style={{
              fontSize: 20,
              color: "var(--color-ink-2)",
              borderLeft: "3px solid var(--color-gold)",
              paddingLeft: 24,
              fontStyle: "italic",
            }}
          >
            {excerpt}
          </BodyText>
        </div>
      </section>

      {/* Image placeholder or content */}
      <section style={{ paddingBottom: 64 }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={title}
              style={{
                width: "100%",
                maxHeight: 480,
                objectFit: "cover",
                marginBottom: 48,
              }}
            />
          ) : (
            <PhotoPlaceholder
              label={`IMAGEM · ${category.toUpperCase()} · 16:9`}
              aspectRatio="16/9"
            />
          )}

          {/* Body */}
          <div style={{ marginTop: 48 }}>
            {body ? (
              <BodyText variant="body" style={{ fontSize: 17, lineHeight: 1.8, maxWidth: 680, margin: "0 auto" }}>
                {body}
              </BodyText>
            ) : (
              <BodyText
                variant="body"
                style={{
                  fontSize: 17,
                  lineHeight: 1.8,
                  maxWidth: 680,
                  margin: "0 auto",
                  color: "var(--color-muted)",
                  fontStyle: "italic",
                }}
              >
                {body}
              </BodyText>
            )}

            {/* ALAGER context box */}
            <div
              style={{
                marginTop: 64,
                padding: "32px 28px",
                background: "var(--color-sage-soft)",
                borderLeft: "3px solid var(--color-gold)",
                maxWidth: 680,
                margin: "64px auto 0",
              }}
            >
              <MonoLabel color="var(--color-green-deep)">
                ALAGER · {locale === "pt" ? "Acompanhamento" : locale === "es" ? "Seguimiento" : "Tracking"}
              </MonoLabel>
              <p
                style={{
                  fontSize: 14.5,
                  color: "var(--color-green-ink)",
                  lineHeight: 1.6,
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                {locale === "pt"
                  ? "A ALAGER acompanha este tema por meio de seus grupos técnicos e produz análises exclusivas para associados. Para ter acesso aos relatórios completos, associe-se."
                  : locale === "es"
                  ? "ALAGER sigue este tema a través de sus grupos técnicos y produce análisis exclusivos para asociados. Para acceder a los informes completos, asóciese."
                  : "ALAGER tracks this topic through its technical working groups and produces exclusive analysis for members. To access full reports, become a member."}
              </p>
            </div>
          </div>

          {/* Back button */}
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Button variant="outline" href={`/${locale}/blog`}>
              ← {locale === "pt" ? "Voltar ao blog" : locale === "es" ? "Volver al blog" : "Back to blog"}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

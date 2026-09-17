// Alager Site — Classificador + auto-curadoria do WhatsApp → curated.json
//
// Lê whatsapp-data/_chat.txt (export do grupo), extrai os links, faz fetch,
// classifica cada um (news / event / video / social-post / document / advertorial)
// e gera whatsapp-data/curated.json (draft) + um report para revisão editorial.
//
// A parte editorial (tema, resumo, destaque) fica de fora de propósito —
// o script só preenche o mecânico (título, veículo, url, data, tipo).
//
// Uso:
//   npx tsx scripts/classify-whatsapp.ts                     # últimos 90 dias
//   npx tsx scripts/classify-whatsapp.ts --since 2026-08-01 --until 2026-09-17
//   npx tsx scripts/classify-whatsapp.ts --limit 30          # no máx. 30 fetches
//   npx tsx scripts/classify-whatsapp.ts --out /tmp/curated.json --report /tmp/report.md

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

type ContentType = "news" | "event" | "video" | "social-post" | "document" | "advertorial";
type Confidence = "high" | "medium" | "low";

interface LinkRef {
  url: string;
  date: string; // YYYY-MM-DD (data da mensagem)
  author: string;
}

interface Classified extends LinkRef {
  type: ContentType;
  confidence: Confidence;
  title: string;
  outlet: string;
  reason: string;
  error?: string;
}

interface NewsDoc {
  title: string;
  summary: string;
  outlet: string;
  url: string;
  date: string;
  featured: boolean;
}

interface EventDoc {
  name: string;
  description: string;
  dateStart: string;
  url: string;
  origin: string;
}

interface Curated {
  topics: { slug: string; pt: string; order: number }[];
  newsItems: NewsDoc[];
  events: EventDoc[];
}

interface Meta {
  title: string;
  site: string;
  ogType: string;
  description: string;
  published: string;
  ldTypes: string[];
  status: number;
  error?: string;
}

const CHAT_PATH = join(process.cwd(), "whatsapp-data", "_chat.txt");
const DEFAULT_OUT = join(process.cwd(), "whatsapp-data", "curated.json");
const DEFAULT_REPORT = join(process.cwd(), "whatsapp-data", "classification-report.md");

const DEFAULT_TOPICS = [
  { slug: "armazenamento", pt: "Armazenamento", order: 1 },
  { slug: "biogas-biometano", pt: "Biogás e Biometano", order: 2 },
  { slug: "hidrogenio-verde", pt: "Hidrogênio Verde", order: 3 },
  { slug: "transmissao-distribuicao", pt: "Transmissão e Distribuição", order: 4 },
  { slug: "regulacao-politica", pt: "Regulação e Política", order: 5 },
  { slug: "mercado-investimentos", pt: "Mercado e Investimentos", order: 6 },
  { slug: "solar", pt: "Solar", order: 7 },
  { slug: "eolica", pt: "Eólica", order: 8 },
  { slug: "internacional", pt: "Internacional", order: 9 },
];

const UA = "Mozilla/5.0 (compatible; ALAGER-classifier/1.0; +https://alager.org.br)";
const CONCURRENCY = 6;
const TIMEOUT_MS = 10000;

// ── CLI ────────────────────────────────────────────────────────────────
function parseArgs(argv: string[]): { since?: string; until?: string; limit: number; out: string; report: string } {
  const eq = (name: string): string | undefined => {
    const a = argv.find((x) => x.startsWith(`--${name}=`));
    return a ? a.slice(name.length + 3) : undefined;
  };
  const next = (name: string): string | undefined => {
    const i = argv.indexOf(`--${name}`);
    if (i === -1) return undefined;
    const v = argv[i + 1];
    return v && !v.startsWith("--") ? v : undefined;
  };
  const val = (name: string) => eq(name) ?? next(name);
  return {
    since: val("since"),
    until: val("until"),
    limit: Number(val("limit") || 500),
    out: val("out") || DEFAULT_OUT,
    report: val("report") || DEFAULT_REPORT,
  };
}

// ── Datas ──────────────────────────────────────────────────────────────
function localDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return localDate(d);
}

// ── Parse do _chat.txt ─────────────────────────────────────────────────
function parseChat(): LinkRef[] {
  const text = readFileSync(CHAT_PATH, "utf8");
  const headerRe = /^\[(\d{2}\/\d{2}\/\d{4}), \d{2}:\d{2}:\d{2}\] (.*?): (.*)$/;
  const urlRe = /https?:\/\/[^\s)\]>,>"'»«]+/g;
  const seen = new Map<string, LinkRef>();
  let date = "";
  let author = "";

  const addUrls = (txt: string) => {
    const found = txt.match(urlRe);
    if (!found) return;
    for (let u of found) {
      u = u.replace(/[.,;:!?…]+$/, "").replace(/\)+$/, "");
      if (u.length < 12) continue;
      if (!seen.has(u)) seen.set(u, { url: u, date, author });
    }
  };

  for (const line of text.split(/\r?\n/)) {
    const m = headerRe.exec(line);
    if (m) {
      date = m[1].split("/").reverse().join("-"); // dd/mm/yyyy → yyyy-mm-dd
      author = m[2];
      addUrls(m[3]);
    } else {
      addUrls(line);
    }
  }
  return Array.from(seen.values());
}

// ── Helpers de URL / domínio ───────────────────────────────────────────
function isHost(host: string, domain: string): boolean {
  return host === domain || host.endsWith("." + domain);
}

function titleFromUrl(url: string): string {
  try {
    const u = new URL(url);
    const seg = u.pathname.split("/").filter(Boolean).pop() || "";
    const slug = seg.replace(/[-_+]/g, " ").replace(/\.[a-z0-9]+$/i, "").trim();
    return slug || u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function outletFromUrl(url: string): string {
  try {
    const h = new URL(url).hostname.replace(/^www\./, "");
    const base = h.split(".")[0];
    return base ? base[0].toUpperCase() + base.slice(1) : h;
  } catch {
    return "";
  }
}

// ── Classificação por URL (sem fetch — sinal forte de domínio) ─────────
function classifyByUrl(url: string): { type: ContentType; reason: string } | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "");
  const path = u.pathname.toLowerCase();

  if (/\.(pdf|docx?|xlsx?|pptx?|zip|rar)(\?|$)/i.test(path)) return { type: "document", reason: "extensão de arquivo" };
  if (["drive.google.com", "docs.google.com", "share.google", "dropbox.com", "scribd.com", "issuu.com", "onedrive.live.com"].some((d) => isHost(host, d)))
    return { type: "document", reason: "domínio de documento" };
  if (["youtube.com", "youtu.be", "vimeo.com", "dailymotion.com"].some((d) => isHost(host, d)))
    return { type: "video", reason: "domínio de vídeo" };
  if (["instagram.com", "tiktok.com", "twitter.com", "x.com", "facebook.com", "fb.watch", "linkedin.com", "threads.net", "reddit.com"].some((d) => isHost(host, d)))
    return { type: "social-post", reason: "domínio de rede social" };
  if (["sympla.com.br", "eventbrite.com", "luma.com", "even3.com.br", "doity.com.br", "forms.gle", "teams.microsoft.com", "meet.google.com", "zoom.us", "calendly.com"].some((d) => isHost(host, d)))
    return { type: "event", reason: "plataforma de eventos/inscrição/reunião" };
  return null;
}

// ── Fetch + parse de metadados ─────────────────────────────────────────
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .trim();
}

function metaContent(html: string, key: string): string {
  const tagRe = /<meta\b[^>]*>/gi;
  let m;
  while ((m = tagRe.exec(html))) {
    const tag = m[0];
    const hasKey = new RegExp(`(?:property|name|itemprop)=["']${key}["']`, "i").test(tag);
    if (!hasKey) continue;
    const c = /content=["']([^"']*)["']/i.exec(tag);
    if (c) return decodeEntities(c[1]);
  }
  return "";
}

function grabTitle(html: string): string {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return m ? decodeEntities(m[1]) : "";
}

function parseLd(html: string): { types: string[]; published: string } {
  const types: string[] = [];
  let published = "";
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      walkLd(JSON.parse(m[1]), types, (d) => {
        if (!published && d) published = d;
      });
    } catch {
      /* JSON-LD inválido — ignora */
    }
  }
  return { types, published };
}

function walkLd(node: any, types: string[], onDate: (d: string) => void): void {
  if (node == null) return;
  if (Array.isArray(node)) {
    node.forEach((n) => walkLd(n, types, onDate));
    return;
  }
  if (typeof node !== "object") return;
  if (typeof node["@type"] === "string") types.push(node["@type"]);
  if (typeof node.datePublished === "string") onDate(node.datePublished);
  if (typeof node.startDate === "string") onDate(node.startDate);
  for (const k of Object.keys(node)) walkLd(node[k], types, onDate);
}

async function fetchMeta(url: string): Promise<Meta> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
    });
    const ct = res.headers.get("content-type") || "";
    if (!res.ok) return { title: "", site: "", ogType: "", description: "", published: "", ldTypes: [], status: res.status, error: `HTTP ${res.status}` };
    if (!/html/i.test(ct)) return { title: "", site: "", ogType: "", description: "", published: "", ldTypes: [], status: res.status };
    const html = await res.text();
    const ld = parseLd(html);
    return {
      title: metaContent(html, "og:title") || grabTitle(html),
      site: metaContent(html, "og:site_name"),
      ogType: metaContent(html, "og:type"),
      description: metaContent(html, "og:description") || metaContent(html, "description"),
      published:
        metaContent(html, "article:published_time") ||
        metaContent(html, "og:article:published_time") ||
        metaContent(html, "datePublished") ||
        ld.published,
      ldTypes: ld.types,
      status: res.status,
    };
  } catch (e) {
    return { title: "", site: "", ogType: "", description: "", published: "", ldTypes: [], status: 0, error: e instanceof Error ? e.message : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

// ── Classificação final ────────────────────────────────────────────────
function decideType(ref: LinkRef, meta: Meta, byUrl: ReturnType<typeof classifyByUrl>): { type: ContentType; confidence: Confidence; reason: string } {
  const text = `${meta.title} ${meta.description}`.toLowerCase();

  // advertorial (palavras-chave de conteúdo patrocinado)
  if (/patrocinad|publieditorial|advertorial|conteúdo patrocinado|\bsponsored\b/.test(text))
    return { type: "advertorial", confidence: "medium", reason: "indício de conteúdo patrocinado" };

  // schema.org (JSON-LD) é o sinal mais forte
  if (meta.ldTypes.some((t) => /NewsArticle|ReportageNewsArticle|BlogPosting|Article/.test(t)))
    return { type: "news", confidence: "high", reason: "schema NewsArticle/Article" };
  if (meta.ldTypes.some((t) => /Event$|EventSeries|BusinessEvent|Festival|MusicEvent/.test(t)))
    return { type: "event", confidence: "high", reason: "schema Event" };
  if (meta.ldTypes.some((t) => /VideoObject/.test(t)))
    return { type: "video", confidence: "high", reason: "schema VideoObject" };

  // plataforma de eventos/inscrição/reunião (sinal de URL forte — antes do og:type genérico)
  if (byUrl?.type === "event") return { type: "event", confidence: "medium", reason: byUrl.reason };

  // og:type
  if (meta.ogType === "article") return { type: "news", confidence: "medium", reason: "og:type article" };
  if (meta.ogType === "video") return { type: "video", confidence: "medium", reason: "og:type video" };
  if (meta.ogType === "profile") return { type: "social-post", confidence: "medium", reason: "og:type profile" };

  // palavras-chave de evento
  if (/inscri|inscreva|webinar|congresso|workshop|seminário|participe|save the date|sympla|\bluma\b|evento|fórum|forum|conferência|conferencia|encontro|feira|cúpula|cimeira/.test(text))
    return { type: "event", confidence: "low", reason: "palavras-chave de evento" };

  return { type: "news", confidence: "low", reason: "default — revisar" };
}

async function classifyLink(ref: LinkRef): Promise<Classified> {
  const byUrl = classifyByUrl(ref.url);
  const base = { url: ref.url, date: ref.date, author: ref.author };

  // documento / vídeo / social-post: sinal de domínio forte → não precisa fetch
  if (byUrl && (byUrl.type === "document" || byUrl.type === "video" || byUrl.type === "social-post")) {
    return { ...base, type: byUrl.type, confidence: "high", title: titleFromUrl(ref.url), outlet: outletFromUrl(ref.url), reason: byUrl.reason };
  }

  const meta = await fetchMeta(ref.url);
  const title = meta.title || titleFromUrl(ref.url);
  const outlet = meta.site || outletFromUrl(ref.url);
  const date = /^\d{4}-\d{2}-\d{2}/.test(meta.published) ? meta.published.slice(0, 10) : ref.date;

  if (meta.error) {
    const cls = byUrl ? { type: byUrl.type, confidence: "low" as Confidence, reason: `${byUrl.reason} (fetch falhou)` } : { type: "news" as ContentType, confidence: "low" as Confidence, reason: "fetch falhou — assumido notícia" };
    return { ...base, type: cls.type, confidence: cls.confidence, title, outlet, date, reason: cls.reason, error: meta.error };
  }

  const cls = decideType(ref, meta, byUrl);
  return { ...base, type: cls.type, confidence: cls.confidence, title, outlet, date, reason: cls.reason };
}

// ── Concorrência ───────────────────────────────────────────────────────
async function mapLimit<T, R>(items: T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let idx = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (idx < items.length) {
      const i = idx++;
      out[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return out;
}

// ── Load / merge ───────────────────────────────────────────────────────
function loadExisting(path: string): Curated {
  if (!existsSync(path)) return { topics: [], newsItems: [], events: [] };
  try {
    const j = JSON.parse(readFileSync(path, "utf8"));
    return { topics: j.topics || [], newsItems: j.newsItems || [], events: j.events || [] };
  } catch {
    return { topics: [], newsItems: [], events: [] };
  }
}

function toNewsDoc(c: Classified): NewsDoc {
  return { title: c.title, summary: "", outlet: c.outlet, url: c.url, date: c.date, featured: false };
}
function toEventDoc(c: Classified): EventDoc {
  return { name: c.title, description: "", dateStart: c.date, url: c.url, origin: "external" };
}

// ── Report ─────────────────────────────────────────────────────────────
function buildReport(since: string, until: string, items: Classified[]): string {
  const lines: string[] = [];
  lines.push("# Classificação — links do WhatsApp");
  lines.push("");
  lines.push(`- Período: ${since} .. ${until}`);
  lines.push(`- Total classificado: ${items.length}`);
  lines.push("");

  const groups: Record<ContentType, Classified[]> = {
    news: [],
    event: [],
    video: [],
    "social-post": [],
    document: [],
    advertorial: [],
  };
  for (const c of items) groups[c.type].push(c);

  const section = (title: string, arr: Classified[], note: string) => {
    lines.push(`## ${title} (${arr.length})`);
    lines.push("");
    if (note) lines.push(note);
    if (arr.length === 0) {
      lines.push("_nenhum_");
      lines.push("");
      return;
    }
    if (arr[0].type === "news" || arr[0].type === "event") {
      lines.push("| Data | Título | Veículo | Conf. | URL |");
      lines.push("|---|---|---|---|---|");
      for (const c of arr) {
        lines.push(`| ${c.date} | ${c.title} | ${c.outlet} | ${c.confidence} | ${c.url} |`);
      }
    } else {
      for (const c of arr) {
        lines.push(`- \`${c.date}\` **${c.title || c.url}** — ${c.outlet} (${c.reason}${c.error ? `, ${c.error}` : ""}) ${c.url}`);
      }
    }
    lines.push("");
  };

  section("📰 Notícias", groups.news, "_news → newsItems no curated.json_");
  section("📅 Eventos", groups.event, "_event → events no curated.json_");
  section("🎬 Vídeos (pulados)", groups.video, "");
  section("📱 Social posts / reels (pulados)", groups["social-post"], "");
  section("📄 Documentos (pulados)", groups.document, "");
  section("⚠️ Advertoriais (pulados)", groups.advertorial, "");

  return lines.join("\n");
}

// ── Main ───────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const since = args.since || daysAgo(90);
  const until = args.until || localDate(new Date());

  console.log(`🔍 Lendo ${CHAT_PATH}…`);
  const allLinks = parseChat();
  console.log(`   ${allLinks.length} URLs únicos no chat.`);

  const links = allLinks.filter((l) => l.date >= since && l.date <= until);
  console.log(`   Filtro ${since}..${until}: ${links.length} URLs.`);

  const existing = loadExisting(args.out);
  const existingUrls = new Set([...existing.newsItems.map((n) => n.url), ...existing.events.map((e) => e.url)]);
  const notCurated = links.filter((l) => !existingUrls.has(l.url));
  const fresh = notCurated.slice(0, args.limit);
  const alreadyCurated = links.length - notCurated.length;
  const truncNote = notCurated.length > fresh.length ? ` — classificando ${fresh.length} (limite ${args.limit})` : "";
  console.log(`   ${alreadyCurated} já curados (pulados), ${notCurated.length} novos no período${truncNote}.`);

  if (fresh.length === 0) {
    console.log("\nNada novo para classificar. Abortando (nenhum fetch).");
    return;
  }

  console.log(`\n🌐 Fetch de ${fresh.length} URLs (concorrência ${CONCURRENCY}, timeout ${TIMEOUT_MS / 1000}s)…`);
  const classified = await mapLimit(fresh, CONCURRENCY, classifyLink);

  const news = classified.filter((c) => c.type === "news");
  const events = classified.filter((c) => c.type === "event");
  const skipped = classified.filter((c) => c.type !== "news" && c.type !== "event");

  const curated: Curated = {
    topics: existing.topics.length ? existing.topics : DEFAULT_TOPICS,
    newsItems: [...existing.newsItems, ...news.map(toNewsDoc)],
    events: [...existing.events, ...events.map(toEventDoc)],
  };

  writeFileSync(args.out, JSON.stringify(curated, null, 2) + "\n");
  writeFileSync(args.report, buildReport(since, until, classified));

  const counts = skipped.reduce<Record<string, number>>((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {});

  console.log("\n✅ Resultado:");
  console.log(`   notícias:  ${news.length} novas (+ ${existing.newsItems.length} já curadas = ${curated.newsItems.length} total)`);
  console.log(`   eventos:   ${events.length} novos (+ ${existing.events.length} = ${curated.events.length} total)`);
  console.log(`   pulados:   ${skipped.length} ${JSON.stringify(counts)}`);
  console.log(`\n   curated.json: ${args.out}`);
  console.log(`   report:      ${args.report}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Falhou:", err);
    process.exit(1);
  });

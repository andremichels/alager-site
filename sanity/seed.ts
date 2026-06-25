// Alager Site — Seed script to populate Sanity with initial content
// Usage: SANITY_API_TOKEN=xxx tsx sanity/seed.ts
// Or: npx tsx sanity/seed.ts

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-06-25",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log("🌱 Seeding ALAGER Sanity content...\n");

  // 1. Timeline entries
  const timelineEntries = [
    { year: 2018, title: { pt: "Fundação em São Paulo", es: "Fundación en São Paulo", en: "Founded in São Paulo" }, body: { pt: "Sete associações nacionais assinam o ato constitutivo.", es: "Siete asociaciones nacionales firman el acta constitutiva.", en: "Seven national associations sign the founding act." } },
    { year: 2020, title: { pt: "Primeiro Boletim Regulatório", es: "Primer Boletín Regulatorio", en: "First Regulatory Briefing" }, body: { pt: "Inicia a publicação mensal de análises regulatórias comparadas.", es: "Inicia la publicación mensual de análisis regulatorios comparados.", en: "Monthly comparative regulatory analysis begins publication." } },
    { year: 2022, title: { pt: "Adesão a COP27", es: "Adhesión a COP27", en: "Joins COP27" }, body: { pt: "ALAGER passa a integrar a comitiva multissetorial latino-americana.", es: "ALAGER pasa a integrar la comitiva multisectorial latinoamericana.", en: "ALAGER becomes part of the multi-sector Latin American delegation." } },
    { year: 2024, title: { pt: "240 associados", es: "240 asociados", en: "240 members" }, body: { pt: "Rede ultrapassa 240 instituições em 13 países da região.", es: "La red supera las 240 instituciones en 13 países de la región.", en: "Network passes 240 institutions across 13 countries." } },
    { year: 2026, title: { pt: "Plano Decenal Regional", es: "Plan Decenal Regional", en: "Regional Decadal Plan" }, body: { pt: "Lançamento do documento de referência para a transição até 2035.", es: "Lanzamiento del documento de referencia para la transición a 2035.", en: "Launch of the reference document for the transition through 2035." } },
  ];

  for (const entry of timelineEntries) {
    await client.create({ _type: "timelineEntry", ...entry });
    console.log(`  ✓ Timeline: ${entry.year}`);
  }

  // 2. Board members
  const boardMembers = [
    { name: "Marcelo Renault", role: { pt: "Presidente", es: "Presidente", en: "President" }, country: "Brasil", order: 1 },
    { name: "Carla Mendes", role: { pt: "Vice-Presidente", es: "Vicepresidenta", en: "Vice President" }, country: "Argentina", order: 2 },
    { name: "Diego Herrera", role: { pt: "Diretor Técnico", es: "Director Técnico", en: "Technical Director" }, country: "Chile", order: 3 },
    { name: "Lucía Fernández", role: { pt: "Diretora de Relações Institucionais", es: "Directora de Relaciones Institucionales", en: "Institutional Relations Director" }, country: "Colômbia", order: 4 },
    { name: "Roberto Sánchez", role: { pt: "Diretor Financeiro", es: "Director Financiero", en: "CFO" }, country: "México", order: 5 },
    { name: "Ana Costa", role: { pt: "Secretária Executiva", es: "Secretaria Ejecutiva", en: "Executive Secretary" }, country: "Uruguai", order: 6 },
  ];

  for (const member of boardMembers) {
    await client.create({ _type: "boardMember", ...member });
    console.log(`  ✓ Board: ${member.name}`);
  }

  // 3. Institutional texts
  const texts = [
    { section: "home-manifesto", content: { pt: "Uma agenda comum para a energia que move a América Latina.", es: "Una agenda común para la energía que mueve a América Latina.", en: "A shared agenda for the energy that moves Latin America." } },
    { section: "about-mission", content: { pt: "Integrar, coordenar e defender os interesses das instituições e empresas latino-americanas comprometidas com o desenvolvimento das energias renováveis.", es: "Integrar, coordinar y defender los intereses de las instituciones y empresas latinoamericanas comprometidas con el desarrollo de las energías renovables.", en: "Integrate, coordinate and defend the interests of Latin American institutions and companies committed to the development of renewable energy." } },
    { section: "about-vision", content: { pt: "Uma América Latina onde a energia renovável é a coluna vertebral da matriz, regulada com previsibilidade e financiada com instrumentos de longo prazo.", es: "Una América Latina donde la energía renovable sea la columna vertebral de la matriz, regulada con previsibilidad y financiada con instrumentos de largo plazo.", en: "A Latin America where renewables form the backbone of the energy mix, regulated with predictability and financed with long-term instruments." } },
    { section: "about-governance", content: { pt: "A ALAGER tem Assembleia Geral anual, Conselho Deliberativo paritário entre países e Diretoria Executiva eleita por mandato de dois anos. Posições oficiais são deliberadas por consenso, com publicação de votos divergentes.", es: "ALAGER cuenta con Asamblea General anual, Consejo Deliberativo paritario entre países y Directiva Ejecutiva electa por mandato de dos años. Las posiciones oficiales se deliberan por consenso, con publicación de votos disidentes.", en: "ALAGER has an annual General Assembly, a Deliberative Council with parity across countries, and an Executive Board elected for two-year terms. Official positions are decided by consensus, with dissenting votes published." } },
  ];

  for (const text of texts) {
    await client.create({ _type: "institutionalText", ...text });
    console.log(`  ✓ Text: ${text.section}`);
  }

  // 4. Blog posts (sample)
  const posts = [
    {
      title: { pt: "Brasil avança com marco regulatório para eólicas offshore", es: "Brasil avanza con marco regulatorio para eólicas offshore", en: "Brazil advances offshore wind regulatory framework" },
      excerpt: { pt: "Projeto de lei aprovado no Senado estabelece critérios para cessão de áreas marítimas e contratação de potência.", es: "Proyecto de ley aprobado en el Senado establece criterios para cesión de áreas marítimas y contratación de potencia.", en: "Bill approved in the Senate establishes criteria for maritime area concessions and power contracting." },
      cat: { pt: "Regulação", es: "Regulación", en: "Regulation" },
      date: "2026-06-15",
      read: 6,
      featured: true,
      membersOnly: false,
    },
    {
      title: { pt: "ALAGER participa de audiência pública sobre integração energética no Mercosul", es: "ALAGER participa en audiencia pública sobre integración energética en el Mercosur", en: "ALAGER participates in public hearing on Mercosur energy integration" },
      excerpt: { pt: "Posicionamento conjunto entregue à Comissão de Infraestrutura do bloco destaca a necessidade de harmonização regulatória.", es: "Posicionamiento conjunto entregado a la Comisión de Infraestructura del bloque destaca la necesidad de armonización regulatoria.", en: "Joint position submitted to the bloc's Infrastructure Commission highlights the need for regulatory harmonisation." },
      cat: { pt: "Posições", es: "Posiciones", en: "Positions" },
      date: "2026-06-10",
      read: 4,
      featured: false,
      membersOnly: false,
    },
    {
      title: { pt: "Colômbia lança leilão de armazenamento — o que muda para a região", es: "Colombia lanza subasta de almacenamiento — qué cambia para la región", en: "Colombia launches storage auction — what it means for the region" },
      excerpt: { pt: "Primeiro leilão dedicado exclusivamente a baterias na América Latina deve atrair 1.2 GW em projetos.", es: "Primera subasta dedicada exclusivamente a baterías en América Latina debe atraer 1.2 GW en proyectos.", en: "First auction dedicated exclusively to batteries in Latin America expected to attract 1.2 GW in projects." },
      cat: { pt: "Mercado", es: "Mercado", en: "Market" },
      date: "2026-05-28",
      read: 5,
      featured: false,
      membersOnly: true,
    },
    {
      title: { pt: "Hidrogênio verde: Chile publica regras de certificação de origem renovável", es: "Hidrógeno verde: Chile publica reglas de certificación de origen renovable", en: "Green hydrogen: Chile publishes renewable origin certification rules" },
      excerpt: { pt: "Novo selo Certificación de Origen Renovable (COR) estabelece padrão que pode servir de modelo para países vizinhos.", es: "Nuevo sello Certificación de Origen Renovable (COR) establece un estándar que puede servir de modelo para países vecinos.", en: "New Certificación de Origen Renovable (COR) seal sets a standard that could serve as a model for neighbouring countries." },
      cat: { pt: "Regulação", es: "Regulación", en: "Regulation" },
      date: "2026-05-20",
      read: 7,
      featured: false,
      membersOnly: false,
    },
    {
      title: { pt: "Boletim Regulatório ALAGER — Maio 2026", es: "Boletín Regulatorio ALAGER — Mayo 2026", en: "ALAGER Regulatory Briefing — May 2026" },
      excerpt: { pt: "Compilação das principais movimentações regulatórias nos 13 países membros. Destaque para novas regras de GD no Peru.", es: "Compilación de los principales movimientos regulatorios en los 13 países miembros. Destacamos las nuevas reglas de GD en Perú.", en: "Compilation of the main regulatory movements across the 13 member countries. Highlights include new DG rules in Peru." },
      cat: { pt: "Inteligência", es: "Inteligencia", en: "Intelligence" },
      date: "2026-05-15",
      read: 12,
      featured: false,
      membersOnly: true,
    },
  ];

  for (const post of posts) {
    await client.create({ _type: "post", ...post });
    console.log(`  ✓ Post: ${post.title.pt.slice(0, 50)}...`);
  }

  console.log("\n✅ Seed complete!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});

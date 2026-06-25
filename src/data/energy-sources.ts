// Alager Site — Energy source physics constants
// Source: design handoff i18n.jsx → SOURCE_PHYS

export interface EnergySourcePhysics {
  cf: number;    // capacity factor
  gco2: number;  // g CO2 / kWh avoided
}

export const SOURCE_PHYS: Record<string, EnergySourcePhysics> = {
  Solar:     { cf: 0.22, gco2: 950 },
  Eólica:    { cf: 0.42, gco2: 880 },
  Biomassa:  { cf: 0.65, gco2: 720 },
  Hídrica:   { cf: 0.50, gco2: 920 },
  Hidrogênio:{ cf: 0.55, gco2: 850 },
  // English keys map to same physics
  Wind:      { cf: 0.42, gco2: 880 },
  Biomass:   { cf: 0.65, gco2: 720 },
  Hydro:     { cf: 0.50, gco2: 920 },
  Hydrogen:  { cf: 0.55, gco2: 850 },
};

// Energy source display info (tabs on /energias-renovaveis)
export interface EnergySourceInfo {
  key: string;
  stats: { value: string; label: Record<string, string> }[];
  body: Record<string, string>;
  focus: Record<string, string>;
}

export const ENERGY_SOURCES: EnergySourceInfo[] = [
  {
    key: "Solar",
    stats: [
      { value: "37 GW", label: { pt: "Capacidade instalada na região", es: "Capacidad instalada en la región", en: "Installed regional capacity" } },
      { value: "12", label: { pt: "Países com leilões dedicados", es: "Países con subastas dedicadas", en: "Countries with dedicated auctions" } },
      { value: "−28%", label: { pt: "LCOE médio na última década", es: "LCOE medio en la última década", en: "Average LCOE over the past decade" } },
    ],
    body: {
      pt: "A solar fotovoltaica passou de fonte marginal a coluna do crescimento renovável latino-americano. Em mercados como Chile, Brasil e México, leilões com indexação local viabilizaram parques de larga escala.",
      es: "La solar fotovoltaica pasó de ser fuente marginal a columna del crecimiento renovable latinoamericano. En mercados como Chile, Brasil y México, las subastas con indexación local viabilizaron parques de gran escala.",
      en: "Solar PV has gone from a marginal source to the backbone of Latin American renewable growth. In markets like Chile, Brazil and Mexico, auctions with local indexation have enabled utility-scale projects.",
    },
    focus: {
      pt: "Foco da ALAGER: harmonizar regras de geração distribuída, defender previsibilidade tarifária e ampliar o acesso a financiamento de longo prazo em moeda local.",
      es: "Foco de ALAGER: armonizar reglas de generación distribuida, defender la previsibilidad tarifaria y ampliar el acceso a financiamiento de largo plazo en moneda local.",
      en: "ALAGER focus: harmonising distributed-generation rules, defending tariff predictability and expanding access to long-term local-currency financing.",
    },
  },
  {
    key: "Eólica",
    stats: [
      { value: "29 GW", label: { pt: "Capacidade instalada", es: "Capacidad instalada", en: "Installed capacity" } },
      { value: "8", label: { pt: "Países com parques operacionais", es: "Países con parques operativos", en: "Countries with operating farms" } },
      { value: "55%", label: { pt: "Fator de capacidade médio (offshore)", es: "Factor de capacidad medio (offshore)", en: "Average offshore capacity factor" } },
    ],
    body: {
      pt: "A região concentra alguns dos maiores fatores de capacidade do mundo, especialmente no Nordeste brasileiro, na Patagônia argentina e no istmo mexicano.",
      es: "La región concentra algunos de los mayores factores de capacidad del mundo, especialmente en el Nordeste brasileño, la Patagonia argentina y el istmo mexicano.",
      en: "The region holds some of the highest capacity factors in the world, particularly in Brazil's Northeast, Argentine Patagonia and Mexico's isthmus.",
    },
    focus: {
      pt: "Foco da ALAGER: planejamento integrado de transmissão regional e licenciamento ambiental coordenado entre países vizinhos.",
      es: "Foco de ALAGER: planificación integrada de transmisión regional y licenciamiento ambiental coordinado entre países vecinos.",
      en: "ALAGER focus: integrated regional transmission planning and coordinated environmental licensing across neighbouring countries.",
    },
  },
  {
    key: "Biomassa",
    stats: [
      { value: "16 GW", label: { pt: "Capacidade instalada", es: "Capacidad instalada", en: "Installed capacity" } },
      { value: "—", label: { pt: "Despachável e firme", es: "Despachable y firme", en: "Dispatchable and firm" } },
      { value: "9", label: { pt: "Países com programas dedicados", es: "Países con programas dedicados", en: "Countries with dedicated programmes" } },
    ],
    body: {
      pt: "Biomassa entrega uma característica que solar e eólica não entregam: despacho firme. Bagaço de cana, resíduos florestais, biogás e dejetos pecuários compõem um portfólio diverso.",
      es: "La biomasa entrega una característica que solar y eólica no entregan: despacho firme. Bagazo de caña, residuos forestales, biogás y residuos pecuarios componen un portafolio diverso.",
      en: "Biomass delivers something solar and wind do not: firm dispatch. Sugarcane bagasse, forestry residues, landfill biogas and livestock waste form a diverse portfolio.",
    },
    focus: {
      pt: "Foco da ALAGER: reconhecimento regulatório dos atributos firmes da biomassa e tratamento tributário comparável ao de outras fontes renováveis.",
      es: "Foco de ALAGER: reconocimiento regulatorio de los atributos firmes de la biomasa y tratamiento tributario comparable al de otras fuentes renovables.",
      en: "ALAGER focus: regulatory recognition of biomass's firm attributes and tax treatment comparable to other renewables.",
    },
  },
  {
    key: "Hídrica",
    stats: [
      { value: "188 GW", label: { pt: "Capacidade instalada", es: "Capacidad instalada", en: "Installed capacity" } },
      { value: "−45%", label: { pt: "Da matriz elétrica regional", es: "De la matriz eléctrica regional", en: "Of the regional electricity mix" } },
      { value: "−18%", label: { pt: "Disponibilidade em ano hidrológico crítico", es: "Disponibilidad en año hidrológico crítico", en: "Availability in a critical hydrological year" } },
    ],
    body: {
      pt: "A hidroeletricidade continua sendo a maior fonte renovável da região, mas mudanças nos regimes de chuvas reduzem o espaço para grandes empreendimentos novos. O futuro está em modernização e armazenamento por bombeamento.",
      es: "La hidroelectricidad sigue siendo la mayor fuente renovable de la región, pero los cambios en los regímenes de lluvia reducen el espacio para nuevos grandes emprendimientos. El futuro está en la modernización y el almacenamiento por bombeo.",
      en: "Hydropower remains the region's largest renewable source, but shifting rainfall regimes reduce room for major new projects. The future lies in modernisation and pumped storage.",
    },
    focus: {
      pt: "Foco da ALAGER: defender o reconhecimento da hidroeletricidade como ativo de transição e impulsionar projetos de armazenamento por bombeamento.",
      es: "Foco de ALAGER: defender el reconocimiento de la hidroelectricidad como activo de transición e impulsar proyectos de almacenamiento por bombeo.",
      en: "ALAGER focus: defending hydropower's recognition as a transition asset and advancing pumped-storage projects.",
    },
  },
  {
    key: "Hidrogênio",
    stats: [
      { value: "78", label: { pt: "Projetos anunciados na região", es: "Proyectos anunciados en la región", en: "Announced projects in the region" } },
      { value: "4", label: { pt: "Países com estratégia nacional", es: "Países con estrategia nacional", en: "Countries with national strategies" } },
      { value: "2030", label: { pt: "Horizonte para exportação em escala", es: "Horizonte para exportación a escala", en: "Horizon for export at scale" } },
    ],
    body: {
      pt: "Chile, Brasil, Colômbia e Uruguai já publicaram estratégias nacionais de hidrogênio verde. A janela competitiva existe: a região tem o melhor recurso solar e eólico do mundo combinado a porto e água.",
      es: "Chile, Brasil, Colombia y Uruguay ya publicaron estrategias nacionales de hidrógeno verde. La ventana competitiva existe: la región tiene el mejor recurso solar y eólico del mundo, combinado con puerto y agua.",
      en: "Chile, Brazil, Colombia and Uruguay have already published national green-hydrogen strategies. The competitive window is real: the region combines the world's best solar and wind resource with port and water.",
    },
    focus: {
      pt: "Foco da ALAGER: certificação harmonizada de origem renovável, acordos de cooperação com União Europeia e Ásia, e financiamento bridge para projetos-piloto.",
      es: "Foco de ALAGER: certificación armonizada de origen renovable, acuerdos de cooperación con la Unión Europea y Asia, y financiamiento puente para proyectos piloto.",
      en: "ALAGER focus: harmonised renewable-origin certification, cooperation agreements with the EU and Asia, and bridge financing for pilot projects.",
    },
  },
];

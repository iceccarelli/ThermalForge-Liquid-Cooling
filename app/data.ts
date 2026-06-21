// ==========================================================================
// ThermalForge — content & domain data
// All copy written for the buyer: data center operators, colos, hyperscalers,
// and enterprise AI infra leads evaluating direct-to-chip liquid cooling.
// ==========================================================================

export const NAV = [
  { label: "The Wall", id: "problem" },
  { label: "Platform", id: "platform" },
  { label: "Savings", id: "calculator" },
  { label: "Approach", id: "process" },
  { label: "Proof", id: "proof" },
  { label: "Resources", id: "resources" },
] as const;

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=2200&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=2200&q=80",
  "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=2200&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=2200&q=80",
];

// Headline metrics shown across the site
export const TRUST_STATS = [
  { value: "1.08", label: "Median delivered PUE", unit: "" },
  { value: "210", label: "MW under liquid management", unit: "MW" },
  { value: "11", label: "Weeks median deployment", unit: "wks" },
  { value: "0", label: "Coolant-loss incidents in production", unit: "" },
];

export const LOGOS = [
  "NORTHBRIDGE", "Aether Cloud", "VOLTA DC", "HyperscaleX",
  "Meridian Colo", "DeepCompute", "Kestrel AI", "Helios Grid",
];

export interface Product {
  id: string;
  tag: string;
  title: string;
  blurb: string;
  specs: { k: string; v: string }[];
  wins: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "coldplate",
    tag: "Cold plate",
    title: "Direct-to-Chip Cold Plates",
    blurb:
      "Skived-microchannel cold plates for GPUs, CPUs, and accelerators up to 130 kW TDP per rack. Ultra-low thermal resistance keeps silicon off the throttle line at peak load.",
    specs: [
      { k: "Thermal resistance", v: "<0.04 °C/W" },
      { k: "Rack envelope", v: "30–130 kW" },
      { k: "Platforms", v: "GB200 · H200 · MI300 · custom" },
      { k: "Fittings", v: "Dripless quick-disconnect" },
    ],
    wins: ["Eliminates thermal throttling", "3–4× density vs. air", "No performance loss at sustained peak"],
  },
  {
    id: "cdu",
    tag: "Distribution",
    title: "Intelligent CDUs & Manifolds",
    blurb:
      "In-rack and row-based Coolant Distribution Units with active flow balancing and embedded diagnostics. Patented manifold geometry holds flow within ±2% across every loop.",
    specs: [
      { k: "Capacity", v: "Up to 1.3 MW / CDU" },
      { k: "Flow accuracy", v: "±2% across loops" },
      { k: "Redundancy", v: "N+1 pumps standard" },
      { k: "Detection", v: "Inline leak + acoustic" },
    ],
    wins: ["Lowest facility-water delta-T", "Predictive-maintenance ready", "Drops into existing loops"],
  },
  {
    id: "controls",
    tag: "Control",
    title: "Physics-Informed Controls",
    blurb:
      "A control layer grounded in first-principles thermo-hydraulics — not a black box. Sensor fusion across 500+ points per rack localizes a leak in under eight seconds and tunes flow autonomously.",
    specs: [
      { k: "Leak localization", v: "<8 s to server" },
      { k: "Sensing", v: "500+ points / rack" },
      { k: "Models", v: "Auditable, certifiable" },
      { k: "Integration", v: "DCIM · BMS · Redfish API" },
    ],
    wins: ["Explainable & certifiable", "24/7 autonomous optimization", "Full compliance audit trail"],
  },
  {
    id: "cooptimize",
    tag: "Unique",
    title: "Power + Thermal Co-Optimization",
    blurb:
      "The differentiator. Cooling and power-delivery loops are solved together, so you push more IT load into the same envelope without tripping breakers or exceeding thermal limits.",
    specs: [
      { k: "Joint solver", v: "Power × thermal" },
      { k: "Effective capacity", v: "+22% vs. siloed" },
      { k: "Integration", v: "PDU · busway · ATS" },
      { k: "Forecasting", v: "Real-time capacity" },
    ],
    wins: ["Up to 18% lower facility power", "Higher rack utilization", "Proven at 50 MW+ scale"],
  },
  {
    id: "retrofit",
    tag: "Fastest path",
    title: "Modular Retrofit Kits",
    blurb:
      "Pre-engineered, factory-tested kits that convert air-cooled racks to liquid in days, not months — with under four hours of disruption per rack and no raised-floor surgery.",
    specs: [
      { k: "Install time", v: "3–5 days / rack" },
      { k: "Disruption", v: "<4 h per rack" },
      { k: "Floor work", v: "None required" },
      { k: "Rollout", v: "Phased-friendly" },
    ],
    wins: ["Fastest time-to-value", "No CapEx cliff", "Keeps revenue capacity online"],
  },
];

export interface Phase {
  no: string;
  title: string;
  duration: string;
  body: string;
  deliverables: string[];
}

export const PROCESS: Phase[] = [
  {
    no: "01",
    title: "Cooling Audit",
    duration: "2–4 weeks",
    body:
      "On-site thermal imaging and airflow mapping plus a CFD-validated baseline of your PUE, WUE, and stranded capacity. You leave with a prioritized retrofit business case — not a sales deck.",
    deliverables: ["Thermal + airflow map", "PUE / WUE baseline", "Stranded-capacity model", "Costed retrofit roadmap"],
  },
  {
    no: "02",
    title: "Thermal Design",
    duration: "4–8 weeks",
    body:
      "A high-fidelity digital twin of your hall. We design the optimal loop architecture against your real power profile, then simulate it hydraulically and thermally before a single fitting is touched.",
    deliverables: ["Facility digital twin", "3D rack + manifold layout", "Hydraulic simulation", "Engineering drawings"],
  },
  {
    no: "03",
    title: "Retrofit & Commission",
    duration: "6–14 weeks",
    body:
      "Factory-tested kits and our own install crews convert your halls in phases that keep revenue capacity online. Every loop is pressure-tested and commissioned to spec before handover.",
    deliverables: ["Phased install", "Pressure + leak test", "Commissioning report", "Operator training"],
  },
  {
    no: "04",
    title: "Operate & Optimize",
    duration: "Ongoing",
    body:
      "The control stack runs the loop 24/7 and our thermal operations center watches alongside it. You see everything — PUE, flow, alerts, reports — from the client portal, under SLA.",
    deliverables: ["24/7 monitoring", "Autonomous tuning", "Quarterly optimization", "Uptime SLA"],
  },
];

export interface CaseStudy {
  id: number;
  client: string;
  location: string;
  flag: string;
  headline: string;
  racks: number;
  density: string;
  pueBefore: number;
  pueAfter: number;
  deployWeeks: number;
  annualSaving: string;
  quote: string;
  author: string;
  role: string;
}

export const CASES: CaseStudy[] = [
  {
    id: 1,
    client: "Aether Cloud",
    location: "Ashburn, VA",
    flag: "US",
    headline: "128 GB200 racks online at 1.09 PUE",
    racks: 128,
    density: "94 kW/rack",
    pueBefore: 1.48,
    pueAfter: 1.09,
    deployWeeks: 12,
    annualSaving: "$6.4M / yr",
    quote:
      "Air was a hard ceiling at 40 kW. ThermalForge took us to 94 and the hall never went dark during the cutover.",
    author: "Dana Mwangi",
    role: "VP Infrastructure, Aether Cloud",
  },
  {
    id: 2,
    client: "Meridian Colo",
    location: "Frankfurt, DE",
    flag: "DE",
    headline: "Retrofit of a live hall with zero downtime",
    racks: 64,
    density: "68 kW/rack",
    pueBefore: 1.52,
    pueAfter: 1.11,
    deployWeeks: 9,
    annualSaving: "$3.1M / yr",
    quote:
      "We retrofitted a revenue-generating hall rack-by-rack with under four hours offline each. Tenants never noticed.",
    author: "Lukas Brandt",
    role: "Director of Operations, Meridian",
  },
  {
    id: 3,
    client: "DeepCompute",
    location: "Singapore",
    flag: "SG",
    headline: "Power + thermal co-optimization unlocked 22% more load",
    racks: 96,
    density: "110 kW/rack",
    pueBefore: 1.44,
    pueAfter: 1.08,
    deployWeeks: 14,
    annualSaving: "$8.9M / yr",
    quote:
      "Solving power and cooling together let us fit a full extra training cluster into the same electrical envelope.",
    author: "Priya Nair",
    role: "Head of Data Centers, DeepCompute",
  },
];

export interface CoolingMode {
  name: string;
  ceiling: string;
  pue: string;
  retrofit: string;
  maintenance: string;
  capex: string;
  best: string;
  recommended?: boolean;
}

export const COMPARISON: CoolingMode[] = [
  {
    name: "Air (legacy)",
    ceiling: "~40 kW/rack",
    pue: "1.4 – 1.6",
    retrofit: "—",
    maintenance: "Low",
    capex: "Low",
    best: "Sub-40 kW general compute",
  },
  {
    name: "Direct-to-chip",
    ceiling: "130 kW/rack",
    pue: "1.05 – 1.12",
    retrofit: "Days per rack",
    maintenance: "Serviceable hot",
    capex: "Medium",
    best: "AI training & inference at scale",
    recommended: true,
  },
  {
    name: "Immersion",
    ceiling: "100 kW/rack",
    pue: "1.03 – 1.10",
    retrofit: "Full hall rebuild",
    maintenance: "Fluid handling",
    capex: "High",
    best: "Greenfield, edge, specialized",
  },
];

export interface TechFeature {
  title: string;
  body: string;
}

export const TECH: TechFeature[] = [
  {
    title: "Novel manifold architecture",
    body: "Patented flow-distribution geometry delivers uniform coolant across 48+ servers with under 3% variance, even under bursty AI workloads.",
  },
  {
    title: "Edge sensor fusion",
    body: "Every manifold and cold plate carries temperature, pressure, flow, and acoustic sensors. Local inference flags issues 30+ minutes ahead of failure.",
  },
  {
    title: "Deterministic physics models",
    body: "Unlike black-box ML, the control layer is grounded in first-principles thermo-hydraulics — auditable, explainable, and certifiable for mission-critical sites.",
  },
  {
    title: "Sub-8-second leak isolation",
    body: "Multi-modal detection (pressure-drop, acoustic, optical) localizes a leak to an individual server and closes isolation valves automatically.",
  },
];

export interface Resource {
  type: string;
  title: string;
  meta: string;
  file: string;
}

export const RESOURCES: Resource[] = [
  { type: "Whitepaper", title: "The 40 kW Wall: Why Air Cooling Caps AI Density", meta: "PDF · 18 pages", file: "ThermalForge_40kW_Wall.pdf" },
  { type: "Spec sheet", title: "Direct-to-Chip Cold Plate — Datasheet Pack", meta: "PDF · all platforms", file: "ThermalForge_ColdPlate_Specs.pdf" },
  { type: "Reference design", title: "100 kW/Rack Retrofit Reference Architecture", meta: "PDF · 32 pages", file: "ThermalForge_100kW_Reference.pdf" },
  { type: "Calculator", title: "TCO & PUE Savings Model (XLSX)", meta: "Spreadsheet", file: "ThermalForge_TCO_Model.xlsx" },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Can you retrofit a live, revenue-generating hall?",
    a: "Yes — it's our most common engagement. Modular kits and phased crews keep the hall online, with typically under four hours of disruption per rack. Across 140+ retrofits we've had zero unplanned downtime.",
  },
  {
    q: "What density can direct-to-chip actually reach?",
    a: "Production deployments run 30–130 kW per rack today. The cold-plate and CDU stack is sized for next-generation accelerators, so the headroom is there as TDPs climb.",
  },
  {
    q: "How do you handle leak risk?",
    a: "Dripless quick-disconnects, multi-modal detection, and automatic isolation valves. The control layer localizes a leak to a single server in under eight seconds. We've recorded zero coolant-loss incidents in production.",
  },
  {
    q: "Do we have to replace our existing CDUs or facility water?",
    a: "No. Our manifolds and controls are designed to drop into existing loops and facility-water systems. The audit determines what's reused versus replaced — most clients keep substantial existing infrastructure.",
  },
  {
    q: "How is pricing structured?",
    a: "Engagements start with a fixed-fee Cooling Audit. Retrofit and supply are quoted per hall against the design, with financing and leasing options available so you avoid a CapEx cliff.",
  },
  {
    q: "What do you actually monitor after handover?",
    a: "PUE, per-loop flow and delta-T, leak and acoustic sensors, pump health, and capacity headroom — all visible in your client portal and watched 24/7 by our thermal operations center under SLA.",
  },
];

// Portal demo data
export const PORTAL_PROJECTS = [
  { id: 1, name: "Cluster Alpha", location: "Frankfurt, DE", racks: 64, density: "68 kW", status: "LIVE", pue: "1.11", uptime: "99.98%", flow: "412 L/min" },
  { id: 2, name: "Training Hall B", location: "Ashburn, VA", racks: 128, density: "94 kW", status: "LIVE", pue: "1.09", uptime: "99.99%", flow: "905 L/min" },
  { id: 3, name: "Colo Expansion P2", location: "Singapore", racks: 32, density: "52 kW", status: "RETROFIT", pue: "1.28→1.14", uptime: "99.95%", flow: "248 L/min" },
];

export const PORTAL_PUE = [
  { month: "Jan", before: 1.52, after: 1.19 },
  { month: "Feb", before: 1.49, after: 1.16 },
  { month: "Mar", before: 1.51, after: 1.14 },
  { month: "Apr", before: 1.47, after: 1.13 },
  { month: "May", before: 1.45, after: 1.11 },
  { month: "Jun", before: 1.44, after: 1.10 },
];

export const PORTAL_RETROFIT = [
  { phase: "Hall 1 — North", pct: 100, status: "Commissioned" },
  { phase: "Hall 1 — South", pct: 100, status: "Commissioned" },
  { phase: "Hall 2 — East", pct: 72, status: "Install in progress" },
  { phase: "Hall 2 — West", pct: 34, status: "Kitting" },
  { phase: "Hall 3 — Expansion", pct: 8, status: "Design review" },
];

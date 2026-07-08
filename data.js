/* ═══════════════════════════════════════════════════════════
   TWS PORTFOLIO DASHBOARD — DATA
   Edit this file only; the site renders everything from it.
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {
  title: "TWS Portfolio Dashboard",
  edition: "July 2026",
  thesis: "12–18 Month Thesis",
  anchorDate: "2026-07-06",           // official closes used as performance anchor
  ytdStart: "2026-01-02",             // benchmarks only (SPY/QQQ true YTD)
  polygonKey: "balqGUXWGnzyb_GC59na19MelADH0ruZ",
  playbookUrl: "https://www.midasX.ai",
  refreshMs: 900000
};

/* Frozen baselines (YTD as of 2026-07-07 release, prior holdings).
   Displayed YTD = baseline + weighted return of NEW primary tickers since anchorDate closes. */
const BASELINES = { def: 39.08, agg: 42.56, hc: 48.45 };  /* agg recomputed 2026-07-08: weighted calc = 42.56 (def/hc matched Brian’s reads exactly, agg 39.76 appears misread) */

/* Sector system — canonical keys, labels, colors */
const SECTORS = {
  broad:  { label: "Broad Based",                  color: "#8af8fa" },
  gold:   { label: "Gold & Silver",                 color: "#d4a030" },
  crypto: { label: "Crypto",                       color: "#ff8c00" },
  income: { label: "Passive Income",               color: "#b8b4ac" },
  ai:     { label: "AI Infrastructure / Software", color: "#00bcd4" },
  ah:     { label: "AI Hardware",                  color: "#0088a0" },
  dtq:    { label: "Disruptive Tech & Quantum",    color: "#28c868" },
  phys:   { label: "Physical AI",                  color: "#70f0a0" },
  cyber:  { label: "Cybersecurity",                color: "#1860c0" },
  aero:   { label: "Aerospace / Defense",          color: "#48a8e8" },
  energy: { label: "Energy",                       color: "#78909c" },
  ind:    { label: "Industrials",                  color: "#c084fc" }
};

/* ═══ PORTFOLIOS ═══
   Each position: t (primary ticker — tracked live), opt (ticker option — display only),
   sec (primary sector key), secOpt (option sector key or null), secNote (display override), w (alloc %) */

const PORTFOLIOS = {

  /* ── HIGH CONVICTION — FINAL (Brian, 2026-07-07) ── */
  hc: {
    name: "High Conviction Portfolio",
    risk: "Aggressive",
    framework: "Futurist & Maverick",
    profile: "Maverick",
    final: true,
    layers: [
      { name: "Core ETFs", alloc: 28, positions: [
        { t: "VTI",  opt: "SCHB",      sec: "broad",  secOpt: null,     w: 7 },
        { t: "IBIT", opt: "BTC",       sec: "crypto", secOpt: null,     w: 10 },
        { t: "VXUS", opt: "IXUS",      sec: "broad",  secOpt: null,     w: 5 },
        { t: "COPX", opt: "GLD",       sec: "ind",    secOpt: "gold",   w: 4 },
        { t: "QQQM", opt: "VOO",       sec: "broad",  secOpt: null,     w: 2 }
      ]},
      { name: "Thematic ETFs", alloc: 21, positions: [
        { t: "AIPO", opt: "POWR",      sec: "energy", secOpt: "ah",     secNote: "Energy / AI HW", w: 3 },
        { t: "SMH",  opt: "AIQ",       sec: "ah",     secOpt: "ai",     w: 3 },
        { t: "AIRR", opt: "VOLT",      sec: "energy", secOpt: "energy", w: 3 },
        { t: "TCAI", opt: "ROBT",      sec: "ah",     secOpt: "phys",   secNote: "AI HW / Infra", w: 3 },
        { t: "DRAM", opt: "CIBR",      sec: "ah",     secOpt: "cyber",  w: 3 },
        { t: "REMX", opt: "SLV",       sec: "ind",    secOpt: "ind",    w: 4 },
        { t: "EUV",  opt: "VOLT",      sec: "ah",     secOpt: "energy", w: 2 }
      ]},
      { name: "Core Stocks", alloc: 35, positions: [
        { t: "IGV",  opt: "MELI",      sec: "ai",     secOpt: "ai",     w: 4 },
        { t: "MU",   opt: "SKHY",      sec: "ah",     secOpt: "ah",     w: 4 },
        { t: "PLTR", opt: "IGV",       sec: "ai",     secOpt: "ai",     w: 4 },
        { t: "MRVL", opt: "ARM",       sec: "ah",     secOpt: "ah",     w: 4 },
        { t: "LNG",  opt: "WMB",       sec: "energy", secOpt: "energy", w: 2 },
        { t: "MSFT", opt: "HOOD",      sec: "ai",     secOpt: "dtq",    w: 3 },
        { t: "ETN",  opt: "VST",       sec: "ind",    secOpt: "energy", w: 2 },
        { t: "VPG",  opt: "TSLA",      sec: "phys",   secOpt: "phys",   w: 3 },
        { t: "RBRK", opt: "MDB",       sec: "cyber",  secOpt: "ai",     w: 3 },
        { t: "NOW",  opt: "HOOD",      sec: "ai",     secOpt: "dtq",    w: 2 },
        { t: "HIMS", opt: "LLY",       sec: "dtq",    secOpt: "dtq",    w: 2 },
        { t: "IBM",  opt: "DELL",      sec: "dtq",    secOpt: "ah",     secNote: "Quantum / AI HW / AI", w: 2 }
      ]},
      { name: "Asymmetric Bets", alloc: 16, positions: [
        { t: "RKLB", opt: "ASTS",      sec: "aero",   secOpt: "aero",   secNote: "Space", w: 4 },
        { t: "NBIS", opt: "IREN/CRWV", sec: "ai",     secOpt: "ai",     w: 3 },
        { t: "BE",   opt: "FLNC",      sec: "energy", secOpt: "energy", w: 2 },
        { t: "AAOI", opt: "COHR",      sec: "ah",     secOpt: "ah",     w: 2 },
        { t: "FLNC", opt: "FCEL",      sec: "energy", secOpt: "energy", w: 1 },
        { t: "TEM",  opt: "VEEV",      sec: "dtq",    secOpt: "dtq",    w: 2 },
        { t: "ZETA", opt: "INDI",      sec: "dtq",    secOpt: "phys",   w: 2 }
      ]}
    ]
  },

  /* ── DEFENSIVE GROWTH — FINAL (Brian, 2026-07-07) ── */
  def: {
    name: "Defensive Growth Portfolio",
    risk: "Conservative",
    framework: "Starter & Strategist",
    profile: "Strategist",
    final: true,
    layers: [
      { name: "Core ETFs", alloc: 38, positions: [
        { t: "VTI",  opt: "SCHB",      sec: "broad",  secOpt: null,     w: 8 },
        { t: "IBIT", opt: "BTC",       sec: "crypto", secOpt: null,     w: 7 },
        { t: "VXUS", opt: "IXUS",      sec: "broad",  secOpt: null,     w: 9 },
        { t: "GLDM", opt: "GLD",       sec: "gold",   secOpt: null,     w: 4 },
        { t: "VOO",  opt: "QQQM",      sec: "broad",  secOpt: null,     w: 4 },
        { t: "SCHD", opt: "VYM",       sec: "income", secOpt: null,     w: 6 }
      ]},
      { name: "Thematic ETFs", alloc: 24, positions: [
        { t: "AIPO", opt: "POWR",      sec: "energy", secOpt: "ah",     secNote: "Energy / AI HW", w: 4 },
        { t: "AIRR", opt: "VOLT",      sec: "energy", secOpt: "energy", w: 3 },
        { t: "SHLD", opt: "IGV",       sec: "aero",   secOpt: "ai",     w: 4 },
        { t: "IGV",  opt: "ROBT",      sec: "ai",     secOpt: "phys",   w: 3 },
        { t: "DRAM", opt: "TCAI",      sec: "ah",     secOpt: "ah",     w: 4 },
        { t: "COPX", opt: "REMX",      sec: "ind",    secOpt: "ind",    w: 4 },
        { t: "EUV",  opt: "VOLT",      sec: "ah",     secOpt: "energy", w: 2 }
      ]},
      { name: "Core Stocks", alloc: 26, positions: [
        { t: "MU",   opt: "SKHY",      sec: "ah",     secOpt: "ah",     w: 4 },
        { t: "MSFT", opt: "NVDA",      sec: "ai",     secOpt: "ah",     w: 3 },
        { t: "MRVL", opt: "GLW",       sec: "ah",     secOpt: "ah",     w: 3 },
        { t: "LNG",  opt: "WMB",       sec: "energy", secOpt: "energy", w: 3 },
        { t: "NOW",  opt: "HOOD",      sec: "ai",     secOpt: "dtq",    w: 3 },
        { t: "PLTR", opt: "TSLA",      sec: "ai",     secOpt: "phys",   w: 3 },
        { t: "ETN",  opt: "VST",       sec: "ind",    secOpt: "energy", w: 3 },
        { t: "LLY",  opt: "HIMS",      sec: "dtq",    secOpt: "dtq",    w: 2 },
        { t: "RBRK", opt: "MDB",       sec: "cyber",  secOpt: "ai",     w: 2 }
      ]},
      { name: "Asymmetric Bets", alloc: 12, positions: [
        { t: "RKLB", opt: "ASTS",      sec: "aero",   secOpt: "aero",   secNote: "Space", w: 3 },
        { t: "NBIS", opt: "IREN/CRWV", sec: "ai",     secOpt: "ai",     w: 3 },
        { t: "VPG",  opt: "PENG",      sec: "phys",   secOpt: "ai",     w: 2 },
        { t: "BE",   opt: "FLNC/FCEL", sec: "energy", secOpt: "energy", w: 2 },
        { t: "HOOD", opt: "ZETA",      sec: "dtq",    secOpt: "dtq",    w: 2 }
      ]}
    ]
  },

  /* ── AGGRESSIVE GROWTH — FINAL (Brian, 2026-07-07) ── */
  agg: {
    name: "Aggressive Growth Portfolio",
    risk: "Moderate",
    framework: "Comeback & Explorer",
    profile: "Explorer",
    final: true,
    layers: [
      { name: "Core ETFs", alloc: 35, positions: [
        { t: "VTI",  opt: "SCHB",      sec: "broad",  secOpt: null,     w: 7 },
        { t: "IBIT", opt: "BTC",       sec: "crypto", secOpt: null,     w: 8 },
        { t: "VXUS", opt: "IXUS",      sec: "broad",  secOpt: null,     w: 6 },
        { t: "COPX", opt: "GLD",       sec: "ind",    secOpt: "gold",   w: 4 },
        { t: "QQQM", opt: "VOO",       sec: "broad",  secOpt: null,     w: 4 },
        { t: "SCHD", opt: "VYM",       sec: "income", secOpt: null,     w: 6 }
      ]},
      { name: "Thematic ETFs", alloc: 24, positions: [
        { t: "AIPO", opt: "POWR",      sec: "energy", secOpt: "ah",     secNote: "Energy / AI HW", w: 3 },
        { t: "SMH",  opt: "AIQ",       sec: "ah",     secOpt: "ai",     w: 3 },
        { t: "AIRR", opt: "VOLT",      sec: "energy", secOpt: "energy", w: 3 },
        { t: "IGV",  opt: "SHLD",      sec: "ai",     secOpt: "aero",   w: 3 },
        { t: "ROBT", opt: "COPX",      sec: "phys",   secOpt: "gold",   w: 3 },
        { t: "DRAM", opt: "TCAI",      sec: "ah",     secOpt: "ah",     w: 3 },
        { t: "COPX", opt: "REMX",      sec: "ind",    secOpt: "ind",    w: 4 },
        { t: "EUV",  opt: "VOLT",      sec: "ah",     secOpt: "energy", w: 2 }
      ]},
      { name: "Core Stocks", alloc: 30, positions: [
        { t: "MU",   opt: "SKHY",      sec: "ah",     secOpt: "ah",     w: 4 },
        { t: "PLTR", opt: "IGV",       sec: "ai",     secOpt: "ai",     w: 4 },
        { t: "MRVL", opt: "ARM",       sec: "ah",     secOpt: "ah",     w: 4 },
        { t: "LNG",  opt: "WMB",       sec: "energy", secOpt: "energy", w: 2 },
        { t: "NOW",  opt: "HOOD",      sec: "ai",     secOpt: "dtq",    w: 3 },
        { t: "VPG",  opt: "TSLA",      sec: "phys",   secOpt: "phys",   w: 3 },
        { t: "RKLB", opt: "ASTS",      sec: "aero",   secOpt: "aero",   secNote: "Space", w: 4 },
        { t: "HIMS", opt: "LLY",       sec: "dtq",    secOpt: "dtq",    w: 2 },
        { t: "RBRK", opt: "MDB",       sec: "cyber",  secOpt: "ai",     w: 2 },
        { t: "IBM",  opt: "DELL",      sec: "dtq",    secOpt: "ah",     secNote: "Quantum / AI HW / AI", w: 2 }
      ]},
      { name: "Asymmetric Bets", alloc: 11, positions: [
        { t: "VEEV", opt: "TEM",       sec: "dtq",    secOpt: "dtq",    w: 2 },
        { t: "NBIS", opt: "IREN/CRWV", sec: "ai",     secOpt: "ai",     w: 3 },
        { t: "PENG", opt: "OUST",      sec: "ai",     secOpt: "phys",   w: 2 },
        { t: "BE",   opt: "FLNC/FCEL", sec: "energy", secOpt: "energy", w: 2 },
        { t: "HOOD", opt: "ZETA",      sec: "dtq",    secOpt: "dtq",    w: 2 }
      ]}
    ]
  }
};

/* ═══ PORTFOLIO MATRIX — Chart 1 (UNCHANGED framework) ═══ */
const FRAMEWORK = {
  profiles: ["Starter", "Futurist", "Explorer", "Maverick", "Strategist", "Comeback"],
  rows: [
    { layer: "Core ETFs",         values: ["40–50% (5-6)", "30–40% (5-6)", "30–40% (5-6)", "30–40% (5-6)", "40–50% (5-6)", "35–45% (6-7)"] },
    { layer: "Thematic ETFs",     values: ["20–25% (4-6)", "15–25% (5-7)", "20–30% (5-7)", "15–25% (5-7)", "20–30% (5-7)", "20–30% (5-6)"] },
    { layer: "Core Stocks",       values: ["20–25% (6-8)", "30–35% (8-11)", "25–35% (7-10)", "30–40% (8-12)", "20–25% (7-9)", "25–35% (7-10)"] },
    { layer: "Asymmetrical Bets", values: ["5–10% (3-4)", "10–15% (4-6)", "7–13% (4-5)", "5–15% (4-6)", "5–10% (3-5)", "7–13% (4-5)"] }
  ]
};

/* ═══ PORTFOLIO MATRIX — Chart 2 (UPDATED sector guardrails, Brian 2026-07-07) ═══ */
const GUARDRAILS = {
  profiles: ["Starter", "Futurist", "Explorer", "Maverick", "Strategist", "Comeback"],
  coreSleeve: {
    label: "Core ETF Sleeve — internal allocations",
    rows: [
      { sec: "broad",  values: ["25–35%", "10–15%", "15–20%", "10–20%", "20–30%", "15–20%"] },
      { sec: "gold",   values: ["5–10%", "3–7%", "3–7%", "3–7%", "5–10%", "5–10%"] },
      { sec: "crypto", values: ["5–10%", "10–15%", "5–10%", "10–15%", "5–10%", "5–15%"] },
      { sec: "income", values: ["0–5%", "0–5%", "0–5%", "0–5%", "5–10%", "5–10%"] }
    ],
    totalMidpoint: ["47.5", "30", "37.5", "37.5", "50", "45"]
  },
  thematicSleeve: {
    label: "Thematic ETF + Stock Sleeve — sector guardrails",
    rows: [
      { sec: "ai",     values: ["5–15%", "5–15%", "5–15%", "5–15%", "5–15%", "5–15%"] },
      { sec: "ah",     values: ["10–20%", "10–20%", "10–20%", "10–20%", "10–20%", "10–20%"] },
      { sec: "dtq",    values: ["5–10%", "5–10%", "5–10%", "5–10%", "5–10%", "5–10%"] },
      { sec: "phys",   values: ["5–10%", "5–10%", "5–10%", "5–10%", "5–10%", "5–10%"] },
      { sec: "cyber",  values: ["3–7%", "3–7%", "3–7%", "3–7%", "3–7%", "3–7%"] },
      { sec: "aero",   values: ["5–10%", "5–10%", "5–10%", "5–10%", "5–10%", "5–10%"] },
      { sec: "energy", values: ["10–15%", "10–15%", "10–15%", "10–15%", "10–15%", "10–15%"] },
      { sec: "ind",    values: ["5–10%", "5–10%", "5–10%", "5–10%", "5–10%", "5–10%"] }
    ]
  }
};

/* ═══ PER-LAYER YTD BASELINES (old holdings, Jan 2 open → Jul 6 close; DRAM excluded — no Jan data) ═══ */
const LAYER_BASELINES = {
  def: [3.82, 16.36, 77.72, 141.56],
  agg: [3.46, 21.78, 73.88, 128.55],
  hc:  [-3.27, 28.94, 69.67, 122.16]
};

/* ═══ THEMATIC ETF TOP-10 HOLDINGS — full TWS universe, verified 2026-07-07/08 ═══ */
const ETF_CATEGORY_ORDER = ["AI Hardware", "AI Infrastructure / Software", "Energy", "Industrials", "Gold & Silver", "Physical AI", "Aerospace / Defense", "Disruptive Tech & Quantum", "Cybersecurity", "Broad Based"];

const THEMATIC_ETFS = {
  /* ── AI HARDWARE ── */
  SMH: { name: "VanEck Semiconductor ETF", category: "AI Hardware", asOf: "Jul 3, 2026",
    blurb: "The flagship large-cap semiconductor fund — the biggest chip designers, manufacturers, and equipment makers, concentrated in NVIDIA and TSMC. The default core holding for the AI-chip trade. ~$65B+ · 0.35% ER.",
    holdings: [
      { t: "NVDA", name: "NVIDIA", w: 19.0 }, { t: "TSM", name: "Taiwan Semiconductor", w: 9.4 }, { t: "AVGO", name: "Broadcom", w: 5.6 },
      { t: "AMD", name: "AMD", w: 5.6 }, { t: "MU", name: "Micron", w: 5.3 }, { t: "AMAT", name: "Applied Materials", w: 5.3 },
      { t: "ASML", name: "ASML", w: 5.0 }, { t: "INTC", name: "Intel", w: 4.9 }, { t: "KLAC", name: "KLA", w: 4.7 }, { t: "LRCX", name: "Lam Research", w: 4.7 }
    ]},
  SOXX: { name: "iShares Semiconductor ETF", category: "AI Hardware", asOf: "Jul 8, 2026",
    blurb: "Tracks the NYSE Semiconductor Index — 30 US-listed chip designers, manufacturers, and equipment makers with modified market-cap weighting, so it's less NVIDIA-concentrated than SMH. ~$37B · 0.34% ER.",
    holdings: [
      { t: "AMD", name: "AMD", w: 8.5 }, { t: "MU", name: "Micron", w: 8.0 }, { t: "NVDA", name: "NVIDIA", w: 7.3 },
      { t: "AVGO", name: "Broadcom", w: 6.6 }, { t: "INTC", name: "Intel", w: 6.1 }, { t: "AMAT", name: "Applied Materials", w: 5.2 },
      { t: "MRVL", name: "Marvell", w: 4.8 }, { t: "KLAC", name: "KLA", w: 4.8 }, { t: "TSM", name: "Taiwan Semiconductor", w: 4.5 }, { t: "LRCX", name: "Lam Research", w: 4.4 }
    ]},
  DRAM: { name: "Roundhill Memory ETF", category: "AI Hardware", asOf: "Jul 6, 2026",
    blurb: "The first pure-play memory ETF (launched Apr 2026) — DRAM, HBM, NAND, and storage makers riding the AI memory supercycle. Swap-based structure: weights below are effective company exposure. 0.65% ER.",
    holdings: [
      { t: "Samsung", name: "effective exposure", w: 25.0 }, { t: "SK hynix", name: "effective exposure", w: 24.0 }, { t: "MU", name: "Micron — effective", w: 23.0 },
      { t: "SNDK", name: "SanDisk", w: 5.0 }, { t: "Kioxia", name: "(TSE 285A)", w: 4.5 }, { t: "WDC", name: "Western Digital", w: 4.3 }
    ]},
  EUV: { name: "Corgi Lithography & Semiconductor Photonics ETF", category: "AI Hardware", asOf: "early Jul 2026",
    blurb: "Actively managed pure-play on light-based chipmaking (launched May 2026) — EUV lithography, lasers, optics, inspection, and silicon photonics for AI datacenters. The \"photons are the new bottleneck\" niche. ~$500M · 0.35% ER.",
    holdings: [
      { t: "TSM", name: "Taiwan Semiconductor", w: 9.6 }, { t: "ASML", name: "ASML", w: 8.7 }, { t: "AMAT", name: "Applied Materials", w: 6.9 },
      { t: "LRCX", name: "Lam Research", w: 6.2 }, { t: "GLW", name: "Corning", w: 5.9 }, { t: "KLAC", name: "KLA", w: 5.5 },
      { t: "COHR", name: "Coherent", w: 3.6 }, { t: "LITE", name: "Lumentum", w: 3.4 }, { t: "MRVL", name: "Marvell", w: 3.3 }, { t: "CIEN", name: "Ciena", w: 3.2 }
    ]},
  AIQ: { name: "Global X Artificial Intelligence & Technology ETF", category: "AI Hardware", asOf: "Jul 2, 2026",
    blurb: "Broad, index-based AI exposure — ~85 companies across chips, memory, software, and big tech, including Korean names (SK hynix, Samsung) most US funds miss. The diversified \"whole AI stack.\" ~$10.5B · 0.68% ER.",
    holdings: [
      { t: "SK hynix", name: "(KRX 000660)", w: 7.0 }, { t: "MU", name: "Micron", w: 6.3 }, { t: "AMD", name: "AMD", w: 5.2 },
      { t: "INTC", name: "Intel", w: 4.8 }, { t: "Samsung", name: "(KRX 005930)", w: 4.5 }, { t: "CSCO", name: "Cisco", w: 3.9 },
      { t: "TSM", name: "Taiwan Semiconductor", w: 3.4 }, { t: "AAPL", name: "Apple", w: 3.2 }, { t: "AVGO", name: "Broadcom", w: 2.8 }, { t: "GOOGL", name: "Alphabet", w: 2.8 }
    ]},
  TCAI: { name: "Tortoise AI Infrastructure ETF", category: "AI Hardware", asOf: "early Jul 2026",
    blurb: "Actively managed AI-infrastructure fund blending datacenter hardware (cooling, memory, storage, networking) with the power and grid contractors that feed it. ~$278M · 0.65% ER.",
    holdings: [
      { t: "VRT", name: "Vertiv", w: 5.5 }, { t: "MU", name: "Micron", w: 5.4 }, { t: "DELL", name: "Dell", w: 5.1 },
      { t: "SNDK", name: "SanDisk", w: 4.2 }, { t: "CIEN", name: "Ciena", w: 4.1 }, { t: "STX", name: "Seagate", w: 3.6 },
      { t: "WDC", name: "Western Digital", w: 3.6 }, { t: "PWR", name: "Quanta Services", w: 3.5 }, { t: "CRDO", name: "Credo", w: 3.4 }, { t: "MYRG", name: "MYR Group", w: 3.3 }
    ]},

  /* ── AI INFRASTRUCTURE / SOFTWARE ── */
  IGV: { name: "iShares Expanded Tech-Software Sector ETF", category: "AI Infrastructure / Software", asOf: "Jul 2, 2026",
    blurb: "The big software-sector fund — North American application, systems, and security software plus interactive media. The \"software side\" of tech: who monetizes AI in code rather than silicon. ~$15.9B · 0.39% ER.",
    holdings: [
      { t: "PANW", name: "Palo Alto Networks", w: 10.3 }, { t: "PLTR", name: "Palantir", w: 8.3 }, { t: "MSFT", name: "Microsoft", w: 8.2 },
      { t: "CRWD", name: "CrowdStrike", w: 7.2 }, { t: "ORCL", name: "Oracle", w: 5.8 }, { t: "CRM", name: "Salesforce", w: 4.9 },
      { t: "APP", name: "AppLovin", w: 4.7 }, { t: "NOW", name: "ServiceNow", w: 4.0 }, { t: "CDNS", name: "Cadence", w: 3.8 }, { t: "FTNT", name: "Fortinet", w: 3.6 }
    ]},
  CHAT: { name: "Roundhill Generative AI & Technology ETF", category: "AI Infrastructure / Software", asOf: "Jul 8, 2026",
    blurb: "Actively managed, 25-50 global companies across the generative-AI stack — chips, hyperscalers, models, and AI infrastructure in one actively curated basket. ~$2B · 0.75% ER.",
    holdings: [
      { t: "NVDA", name: "NVIDIA", w: 6.9 }, { t: "GOOGL", name: "Alphabet", w: 5.7 }, { t: "AVGO", name: "Broadcom", w: 4.5 },
      { t: "SK hynix", name: "(KRX 000660)", w: 4.3 }, { t: "AMD", name: "AMD", w: 4.0 }, { t: "MU", name: "Micron", w: 3.6 },
      { t: "Samsung", name: "(KRX 005930)", w: 3.5 }, { t: "ASML", name: "ASML", w: 3.0 }, { t: "NBIS", name: "Nebius", w: 3.0 }, { t: "SoftBank", name: "(TSE 9984)", w: 2.9 }
    ]},
  ARTY: { name: "iShares Future AI & Tech ETF", category: "AI Infrastructure / Software", asOf: "Jul 8, 2026",
    blurb: "Concentrated global AI index fund spanning AI infrastructure, chips, and applications — BlackRock's dedicated AI vehicle with meaningful international weight. ~$3.8B · 0.47% ER.",
    holdings: [
      { t: "AMD", name: "AMD", w: 5.0 }, { t: "TSM", name: "TSMC", w: 5.0 }, { t: "MU", name: "Micron", w: 4.7 },
      { t: "NVDA", name: "NVIDIA", w: 4.7 }, { t: "AVGO", name: "Broadcom", w: 4.5 }, { t: "CRWV", name: "CoreWeave", w: 3.9 },
      { t: "MRVL", name: "Marvell", w: 3.8 }, { t: "NAVER", name: "(KRX 035420)", w: 3.2 }, { t: "SK hynix", name: "(KRX 000660)", w: 3.2 }, { t: "ORCL", name: "Oracle", w: 3.2 }
    ]},
  IVES: { name: "Dan IVES Wedbush AI Revolution ETF", category: "AI Infrastructure / Software", asOf: "Jul 8, 2026",
    blurb: "Tracks ~30 AI leaders handpicked via Dan Ives's AI Report, float-adjusted with concentration caps — the mega-cap \"AI 30\" in one ticket. ~$1.1B · 0.75% ER.",
    holdings: [
      { t: "AAPL", name: "Apple", w: 5.2 }, { t: "TSM", name: "Taiwan Semiconductor", w: 5.0 }, { t: "AMD", name: "AMD", w: 4.8 },
      { t: "META", name: "Meta", w: 4.8 }, { t: "AMZN", name: "Amazon", w: 4.8 }, { t: "GOOGL", name: "Alphabet", w: 4.7 },
      { t: "TSLA", name: "Tesla", w: 4.7 }, { t: "MSFT", name: "Microsoft", w: 4.7 }, { t: "NVDA", name: "NVIDIA", w: 4.6 }, { t: "MU", name: "Micron", w: 4.6 }
    ]},
  UFOX: { name: "Defiance Connective Technologies ETF (formerly SIXG)", category: "AI Infrastructure / Software", asOf: "Jul 8, 2026",
    blurb: "~50 connectivity names across 5G/6G networking, expanded April 2026 to add satellite-communications and space-industry companies — the ticker changed from SIXG to UFOX with the update. ~$1B · 0.30% ER.",
    holdings: [
      { t: "SPCX", name: "SpaceX (SPV)", w: 5.0 }, { t: "MXL", name: "MaxLinear", w: 4.8 }, { t: "AAPL", name: "Apple", w: 4.5 },
      { t: "RKLB", name: "Rocket Lab", w: 4.4 }, { t: "AVGO", name: "Broadcom", w: 4.1 }, { t: "NVDA", name: "NVIDIA", w: 4.0 },
      { t: "CSCO", name: "Cisco", w: 3.5 }, { t: "MRVL", name: "Marvell", w: 3.2 }, { t: "ASTS", name: "AST SpaceMobile", w: 3.2 }, { t: "ARM", name: "Arm", w: 2.6 }
    ]},
  WGMI: { name: "CoinShares Bitcoin Mining ETF", category: "AI Infrastructure / Software", asOf: "Jul 8, 2026",
    blurb: "Actively managed miners fund — companies earning 50%+ of revenue from bitcoin mining, now substantially the neocloud pivot trade: owned power and datacenters converting to AI/HPC hosting. ~$326M · 0.75% ER.",
    holdings: [
      { t: "CIFR", name: "Cipher Mining", w: 17.6 }, { t: "HUT", name: "Hut 8", w: 10.8 }, { t: "KEEL", name: "Keel Infrastructure", w: 10.2 },
      { t: "IREN", name: "IREN", w: 10.2 }, { t: "MARA", name: "MARA", w: 5.1 }, { t: "BTDR", name: "Bitdeer", w: 4.9 },
      { t: "HIVE", name: "HIVE Digital", w: 4.7 }, { t: "CLSK", name: "CleanSpark", w: 4.7 }, { t: "RIOT", name: "Riot Platforms", w: 4.7 }, { t: "DGX", name: "Digi Power X", w: 4.1 }
    ]},

  /* ── ENERGY ── */
  AIPO: { name: "Defiance AI & Power Infrastructure ETF", category: "Energy", asOf: "Jul 7, 2026",
    blurb: "The intersection of AI and the power buildout behind it — companies earning the majority of revenue from AI hardware, data centers, and electrical/power infrastructure. One ticket for the \"AI needs electricity\" theme. ~$937M · 0.69% ER.",
    holdings: [
      { t: "GEV", name: "GE Vernova", w: 9.8 }, { t: "ETN", name: "Eaton", w: 8.1 }, { t: "VRT", name: "Vertiv", w: 8.1 },
      { t: "PWR", name: "Quanta Services", w: 7.6 }, { t: "BE", name: "Bloom Energy", w: 5.2 }, { t: "AVGO", name: "Broadcom", w: 3.7 },
      { t: "NVDA", name: "NVIDIA", w: 3.6 }, { t: "CCJ", name: "Cameco", w: 3.6 }, { t: "CEG", name: "Constellation Energy", w: 3.4 }, { t: "AMD", name: "AMD", w: 2.5 }
    ]},
  POWR: { name: "iShares U.S. Power Infrastructure ETF", category: "Energy", asOf: "Jun 26, 2026",
    blurb: "BlackRock's pure-play on US power generation, grid equipment, and electrification — the utilities-plus-equipment backbone of rising electricity demand. Lower-beta cousin of AIPO. ~$423M · 0.40% ER.",
    holdings: [
      { t: "GEV", name: "GE Vernova", w: 6.8 }, { t: "ETN", name: "Eaton", w: 6.1 }, { t: "PWR", name: "Quanta Services", w: 6.0 },
      { t: "NEE", name: "NextEra Energy", w: 5.9 }, { t: "EQT", name: "EQT", w: 4.1 }, { t: "SO", name: "Southern Company", w: 4.1 },
      { t: "DUK", name: "Duke Energy", w: 3.7 }, { t: "HUBB", name: "Hubbell", w: 3.4 }, { t: "NVT", name: "nVent Electric", w: 3.3 }, { t: "FSLR", name: "First Solar", w: 3.2 }
    ]},
  VOLT: { name: "Tema Electrification ETF", category: "Energy", asOf: "Jul 1, 2026",
    blurb: "Actively managed electrification fund spanning the whole value chain — grid and power equipment, utilities, nuclear, and alternative energy — an active-manager take on surging US electricity demand. ~$738M · 0.75% ER.",
    holdings: [
      { t: "BELFB", name: "Bel Fuse", w: 7.2 }, { t: "POWL", name: "Powell Industries", w: 6.4 }, { t: "ETN", name: "Eaton", w: 5.4 },
      { t: "PWR", name: "Quanta Services", w: 5.3 }, { t: "NEE", name: "NextEra Energy", w: 5.2 }, { t: "GEV", name: "GE Vernova", w: 4.7 },
      { t: "APH", name: "Amphenol", w: 4.6 }, { t: "AEP", name: "American Electric Power", w: 4.6 }, { t: "OGE", name: "OGE Energy", w: 4.4 }, { t: "IDA", name: "IDACORP", w: 4.0 }
    ]},
  NLR: { name: "VanEck Uranium & Nuclear ETF", category: "Energy", asOf: "Jul 8, 2026",
    blurb: "Market-cap-weighted index of the global nuclear value chain — uranium miners, reactor builders, and nuclear-heavy utilities in one wrapper. ~$4.6B · 0.52% ER.",
    holdings: [
      { t: "CCJ", name: "Cameco", w: 8.0 }, { t: "CEG", name: "Constellation Energy", w: 7.9 }, { t: "PEG", name: "PSEG", w: 7.0 },
      { t: "BWXT", name: "BWX Technologies", w: 6.8 }, { t: "FORTUM", name: "Fortum", w: 5.6 }, { t: "LEU", name: "Centrus Energy", w: 5.2 },
      { t: "OKLO", name: "Oklo", w: 5.2 }, { t: "NXE", name: "NexGen Energy", w: 5.1 }, { t: "DML", name: "Denison Mines", w: 5.0 }, { t: "UEC", name: "Uranium Energy", w: 4.9 }
    ]},
  NUKZ: { name: "Range Nuclear Renaissance Index ETF", category: "Energy", asOf: "Jul 8, 2026",
    blurb: "Tracks the Nuclear Renaissance Index — tilted toward reactor construction, SMRs, fuel, and utilities restarting or expanding nuclear. More \"buildout\" flavored than NLR. ~$837M · 0.85% ER.",
    holdings: [
      { t: "CCJ", name: "Cameco", w: 8.4 }, { t: "GEV", name: "GE Vernova", w: 4.2 }, { t: "Samsung C&T", name: "(KRX 028260)", w: 3.8 },
      { t: "RR", name: "Rolls-Royce", w: 3.6 }, { t: "TLN", name: "Talen Energy", w: 3.4 }, { t: "ELE", name: "Endesa", w: 3.3 },
      { t: "D", name: "Dominion Energy", w: 3.2 }, { t: "CEZ", name: "CEZ Group", w: 3.1 }, { t: "VST", name: "Vistra", w: 2.9 }, { t: "CW", name: "Curtiss-Wright", w: 2.8 }
    ]},

  /* ── INDUSTRIALS ── */
  AIRR: { name: "First Trust RBA American Industrial Renaissance ETF", category: "Industrials", asOf: "Jul 2, 2026",
    blurb: "US reshoring and reindustrialization — small/mid-cap American industrial builders and electrical contractors doing the physical construction of factories, datacenters, and grid. The \"picks and shovels of Made-in-America.\" ~$10.6B · 0.69% ER.",
    holdings: [
      { t: "STRL", name: "Sterling Infrastructure", w: 5.3 }, { t: "AGX", name: "Argan", w: 4.4 }, { t: "CHRW", name: "C.H. Robinson", w: 4.4 },
      { t: "FIX", name: "Comfort Systems", w: 4.1 }, { t: "MTZ", name: "MasTec", w: 4.0 }, { t: "OC", name: "Owens Corning", w: 3.9 },
      { t: "EME", name: "EMCOR", w: 3.7 }, { t: "SAIA", name: "Saia", w: 3.7 }, { t: "DY", name: "Dycom", w: 3.4 }, { t: "BWXT", name: "BWX Technologies", w: 3.1 }
    ]},
  REMX: { name: "VanEck Rare Earth & Strategic Metals ETF", category: "Industrials", asOf: "Jul 3, 2026",
    blurb: "Global miners and refiners of rare earths, lithium, tungsten, and strategic metals — the raw-material chokepoint of the tech and defense supply chain. A critical-minerals / de-globalization hedge. ~$2.8B · 0.57% ER.",
    holdings: [
      { t: "ALB", name: "Albemarle", w: 7.1 }, { t: "600111", name: "China Northern Rare Earth", w: 6.9 }, { t: "PLS", name: "Pilbara Minerals", w: 6.9 },
      { t: "600549", name: "Xiamen Tungsten", w: 6.8 }, { t: "LYC", name: "Lynas Rare Earths", w: 6.5 }, { t: "MP", name: "MP Materials", w: 5.8 },
      { t: "601958", name: "Jinduicheng Molybdenum", w: 5.6 }, { t: "SQM", name: "SQM", w: 4.7 }, { t: "AII", name: "Almonty Industries", w: 4.5 }, { t: "600392", name: "Shenghe Resources", w: 4.2 }
    ]},
  COPX: { name: "Global X Copper Miners ETF", category: "Industrials", asOf: "Jul 8, 2026",
    blurb: "Market-cap-weighted index of global copper miners — the standard equity proxy for the copper/electrification supply trade. Every AI datacenter needs 50-200+ tons of copper. ~$7.7B · 0.65% ER.",
    holdings: [
      { t: "TECK", name: "Teck Resources", w: 5.5 }, { t: "BHP", name: "BHP", w: 5.5 }, { t: "HBM", name: "Hudbay Minerals", w: 5.4 },
      { t: "ANTO", name: "Antofagasta", w: 5.4 }, { t: "KGH", name: "KGHM", w: 5.3 }, { t: "FM", name: "First Quantum", w: 5.2 },
      { t: "SCCO", name: "Southern Copper", w: 4.9 }, { t: "BOL", name: "Boliden", w: 4.9 }, { t: "GLEN", name: "Glencore", w: 4.8 }, { t: "FCX", name: "Freeport-McMoRan", w: 4.8 }
    ]},
  DBA: { name: "Invesco DB Agriculture Fund", category: "Industrials", asOf: "Jul 8, 2026",
    blurb: "Futures-based commodity pool tracking ~10 agricultural commodity futures — grains, livestock, and softs — not stocks. Collateral sits in T-bills. A pure food/ag-commodity diversifier. ~$1.3B · 0.93% ER.",
    holdings: [
      { t: "COLLAT", name: "Money-market collateral", w: 40.5 }, { t: "SOYB", name: "Soybean futures", w: 6.7 }, { t: "CORN", name: "Corn futures", w: 6.6 },
      { t: "CATTLE", name: "Live Cattle futures", w: 5.6 }, { t: "TBILL", name: "Short-Term Treasury ETF", w: 5.1 }, { t: "FDRCTL", name: "Feeder Cattle futures", w: 3.4 },
      { t: "SOYOIL", name: "Soybean Oil futures", w: 3.3 }, { t: "WHEAT", name: "Wheat futures", w: 3.3 }, { t: "HOGS", name: "Lean Hogs futures", w: 3.2 }, { t: "SOFTS", name: "Sugar/Coffee/Cocoa/Cotton", w: 12.0 }
    ]},

  /* ── GOLD & SILVER ── */
  SLV: { name: "iShares Silver Trust", category: "Gold & Silver", asOf: "Jul 6, 2026",
    blurb: "Not an equity fund — a grantor trust holding physical silver bullion in London vaults, tracking the silver spot price minus expenses. Direct silver exposure (monetary hedge + industrial/solar demand) with no company risk. ~$35B · 0.50% ER.",
    holdings: [
      { t: "SILVER", name: "Physical silver bullion (London vaults)", w: 100.0 }
    ]},

  /* ── PHYSICAL AI ── */
  ROBT: { name: "First Trust Nasdaq Artificial Intelligence & Robotics ETF", category: "Physical AI", asOf: "Jul 5, 2026",
    blurb: "AI enablers, engagers, and enhancers across robotics and automation — ~100 names, near equal-weight (top holding under 2%), so it's a diversified AI-adoption bet rather than a mega-cap chip fund. ~$715M · 0.65% ER.",
    holdings: [
      { t: "PANW", name: "Palo Alto Networks", w: 1.9 }, { t: "TEM", name: "Tempus AI", w: 1.8 }, { t: "CCC", name: "CCC Intelligent", w: 1.8 },
      { t: "ILMN", name: "Illumina", w: 1.7 }, { t: "RXRX", name: "Recursion", w: 1.6 }, { t: "S", name: "SentinelOne", w: 1.6 },
      { t: "DT", name: "Dynatrace", w: 1.6 }, { t: "NICE", name: "NICE", w: 1.6 }, { t: "APPN", name: "Appian", w: 1.6 }, { t: "UPST", name: "Upstart", w: 1.5 }
    ]},
  ARKQ: { name: "ARK Autonomous Technology & Robotics ETF", category: "Physical AI", asOf: "Jul 8, 2026",
    blurb: "Actively managed ARK fund for autonomy — robotics, autonomous vehicles, drones, energy storage, and space-adjacent automation, anchored by Tesla and pre-IPO SpaceX. ~$2.9B · 0.75% ER.",
    holdings: [
      { t: "TSLA", name: "Tesla", w: 10.7 }, { t: "AMD", name: "AMD", w: 7.1 }, { t: "TER", name: "Teradyne", w: 6.1 },
      { t: "SPCX", name: "SpaceX (private)", w: 5.8 }, { t: "KTOS", name: "Kratos Defense", w: 5.2 }, { t: "GOOG", name: "Alphabet", w: 4.7 },
      { t: "DE", name: "Deere", w: 4.4 }, { t: "RKLB", name: "Rocket Lab", w: 4.1 }, { t: "PLTR", name: "Palantir", w: 3.6 }, { t: "TSM", name: "Taiwan Semiconductor", w: 3.4 }
    ]},
  BOTT: { name: "Themes Humanoid Robotics ETF", category: "Physical AI", asOf: "late Jun 2026",
    blurb: "The humanoid pure-play — ~30-43 names from the Solactive Global Humanoid Robotics Index, dominated by the China A-share actuator and automation supply chain plus Tesla. Small but the most direct humanoid basket. ~$60M · 0.35% ER.",
    holdings: [
      { t: "688017", name: "Leader Harmonious Drive", w: 8.7 }, { t: "688320", name: "Hechuan Technology", w: 5.7 }, { t: "688165", name: "EFORT", w: 5.4 },
      { t: "002747", name: "Estun Automation", w: 5.1 }, { t: "TSLA", name: "Tesla", w: 4.9 }, { t: "MDA", name: "MDA Space", w: 4.9 },
      { t: "603666", name: "Yijiahe", w: 4.8 }, { t: "NVDA", name: "NVIDIA", w: 4.6 }, { t: "688306", name: "Ningbo PIA", w: 4.5 }, { t: "RR", name: "Richtech Robotics", w: 4.3 }
    ]},

  /* ── AEROSPACE / DEFENSE ── */
  SHLD: { name: "Global X Defense Tech ETF", category: "Aerospace / Defense", asOf: "Jul 2, 2026",
    blurb: "Global defense technology — major US and European defense primes plus military-AI and cyber names. A play on rearmament budgets and NATO spending with a tech tilt. ~$7.6B · 0.50% ER.",
    holdings: [
      { t: "RTX", name: "RTX", w: 9.1 }, { t: "GD", name: "General Dynamics", w: 8.8 }, { t: "LMT", name: "Lockheed Martin", w: 8.3 },
      { t: "NOC", name: "Northrop Grumman", w: 8.0 }, { t: "PLTR", name: "Palantir", w: 7.7 }, { t: "BA.", name: "BAE Systems", w: 4.5 },
      { t: "LHX", name: "L3Harris", w: 4.4 }, { t: "RHM", name: "Rheinmetall", w: 4.1 }, { t: "HO", name: "Thales", w: 3.7 }, { t: "LDO", name: "Leonardo", w: 3.6 }
    ]},
  ARKX: { name: "ARK Space & Defense Innovation ETF", category: "Aerospace / Defense", asOf: "Jul 8, 2026",
    blurb: "Actively managed ARK space + defense-tech fund — orbital launch, satellites, drones, and defense-adjacent tech, with pre-IPO SpaceX as the top holding. ~$1.4B · 0.75% ER.",
    holdings: [
      { t: "SPCX", name: "SpaceX (private)", w: 8.8 }, { t: "LHX", name: "L3Harris", w: 6.5 }, { t: "RKLB", name: "Rocket Lab", w: 6.5 },
      { t: "DE", name: "Deere", w: 6.1 }, { t: "AMD", name: "AMD", w: 6.0 }, { t: "KTOS", name: "Kratos Defense", w: 5.5 },
      { t: "TER", name: "Teradyne", w: 4.8 }, { t: "AVAV", name: "AeroVironment", w: 4.3 }, { t: "GOOG", name: "Alphabet", w: 3.9 }, { t: "AMZN", name: "Amazon", w: 3.9 }
    ]},
  UFO: { name: "Procure Space ETF", category: "Aerospace / Defense", asOf: "Jul 8, 2026",
    blurb: "The original pure-play space-economy index ETF — tier-weighted toward companies with majority space-derived revenue: satcom, ground equipment, and launch. ~$1.1B · 0.75% ER.",
    holdings: [
      { t: "VSAT", name: "Viasat", w: 5.8 }, { t: "SIRI", name: "SiriusXM", w: 5.2 }, { t: "TRMB", name: "Trimble", w: 5.1 },
      { t: "ASTS", name: "AST SpaceMobile", w: 5.1 }, { t: "GRMN", name: "Garmin", w: 4.9 }, { t: "PL", name: "Planet Labs", w: 4.9 },
      { t: "SPCX", name: "SpaceX (SPV)", w: 4.9 }, { t: "RKLB", name: "Rocket Lab", w: 4.8 }, { t: "ECHO", name: "EchoStar", w: 4.4 }, { t: "MDA", name: "MDA Space", w: 3.7 }
    ]},
  NASA: { name: "Tema Space Innovators ETF", category: "Aerospace / Defense", asOf: "Jul 8, 2026",
    blurb: "Actively managed space fund (launched Mar 2026) that went viral as the retail SpaceX-IPO proxy — holds pre-IPO SpaceX directly via SPV (~14%) plus launch, satcom, and lunar names. $1.5B+ and fast-moving · ~0.75% ER.",
    holdings: [
      { t: "SPCX", name: "SpaceX (SPV)", w: 13.9 }, { t: "RKLB", name: "Rocket Lab", w: 10.4 }, { t: "ECHO", name: "EchoStar", w: 9.8 },
      { t: "ASTS", name: "AST SpaceMobile", w: 5.8 }, { t: "VSAT", name: "Viasat", w: 5.2 }, { t: "MDA", name: "MDA Space", w: 4.3 },
      { t: "VNP", name: "5N Plus", w: 4.2 }, { t: "FLY", name: "Firefly Aerospace", w: 4.0 }, { t: "LUNR", name: "Intuitive Machines", w: 4.0 }, { t: "FTC", name: "Filtronic", w: 3.6 }
    ]},
  DRNZ: { name: "REX Drone ETF", category: "Aerospace / Defense", asOf: "Jul 8, 2026",
    blurb: "First pure-play drone/UAV ETF (launched Oct 2025) — 80% weighted to drone pure-plays across defense and commercial platforms, counter-drone, and components. ~$111M · 0.65% ER.",
    holdings: [
      { t: "AVAV", name: "AeroVironment", w: 15.8 }, { t: "NXSN", name: "NextVision", w: 12.6 }, { t: "ONDS", name: "Ondas", w: 10.7 },
      { t: "DRO", name: "DroneShield", w: 5.1 }, { t: "RCAT", name: "Red Cat", w: 4.9 }, { t: "ELS", name: "Elsight", w: 4.3 },
      { t: "UMAC", name: "Unusual Machines", w: 4.2 }, { t: "AVEX", name: "AEVEX Aerospace", w: 3.7 }, { t: "EH", name: "EHang", w: 3.4 }
    ]},

  /* ── DISRUPTIVE TECH & QUANTUM ── */
  QTUM: { name: "Defiance Quantum ETF", category: "Disruptive Tech & Quantum", asOf: "Jul 8, 2026",
    blurb: "~86 names across quantum-computing pure-plays and the enabling semiconductors, very flat weighting (top 10 is only ~15% of the fund) — diversified quantum exposure without single-name blowup risk. ~$6B · 0.40% ER.",
    holdings: [
      { t: "HQ", name: "Horizon Quantum", w: 2.3 }, { t: "ARQQ", name: "Arqit Quantum", w: 2.0 }, { t: "QNT", name: "Quantinuum", w: 1.5 },
      { t: "3443", name: "Global Unichip", w: 1.5 }, { t: "ALAB", name: "Astera Labs", w: 1.4 }, { t: "AMAT", name: "Applied Materials", w: 1.4 },
      { t: "3661", name: "Alchip", w: 1.4 }, { t: "RDNT", name: "RadNet", w: 1.3 }, { t: "8035", name: "Tokyo Electron", w: 1.3 }, { t: "MKSI", name: "MKS Instruments", w: 1.3 }
    ]},
  ARKK: { name: "ARK Innovation ETF", category: "Disruptive Tech & Quantum", asOf: "Jul 8, 2026",
    blurb: "Cathie Wood's flagship actively managed disruptive-innovation fund — genomics, fintech, AI, crypto platforms, and Tesla in concentrated high-conviction bets. ~$8.2B · 0.75% ER.",
    holdings: [
      { t: "TSLA", name: "Tesla", w: 10.3 }, { t: "TEM", name: "Tempus AI", w: 5.7 }, { t: "CRSP", name: "CRISPR Therapeutics", w: 5.3 },
      { t: "HOOD", name: "Robinhood", w: 5.1 }, { t: "AMD", name: "AMD", w: 4.5 }, { t: "SHOP", name: "Shopify", w: 4.3 },
      { t: "SPCX", name: "SpaceX (private)", w: 4.1 }, { t: "COIN", name: "Coinbase", w: 4.0 }, { t: "TWST", name: "Twist Bioscience", w: 3.5 }, { t: "RBLX", name: "Roblox", w: 3.4 }
    ]},

  /* ── CYBERSECURITY ── */
  CIBR: { name: "First Trust NASDAQ Cybersecurity ETF", category: "Cybersecurity", asOf: "Jul 5, 2026",
    blurb: "The largest cybersecurity ETF — companies building and deploying security software, hardware, and infrastructure. The defensive-growth arm of the tech stack: security spend persists in any macro. ~$13B · 0.59% ER.",
    holdings: [
      { t: "PANW", name: "Palo Alto Networks", w: 9.7 }, { t: "FTNT", name: "Fortinet", w: 8.9 }, { t: "CRWD", name: "CrowdStrike", w: 8.4 },
      { t: "CSCO", name: "Cisco", w: 7.4 }, { t: "AVGO", name: "Broadcom", w: 6.3 }, { t: "NET", name: "Cloudflare", w: 3.9 },
      { t: "OKTA", name: "Okta", w: 3.6 }, { t: "FFIV", name: "F5", w: 3.3 }, { t: "ZS", name: "Zscaler", w: 3.1 }, { t: "RBRK", name: "Rubrik", w: 2.8 }
    ]},

  /* ── BROAD BASED ── */
  EWZ: { name: "iShares MSCI Brazil ETF", category: "Broad Based", asOf: "Jul 8, 2026",
    blurb: "The standard large/mid-cap Brazil country exposure — dominated by commodities, banks, and energy. Non-dollar diversification with commodity-cycle sensitivity. ~$9.5B · 0.59% ER.",
    holdings: [
      { t: "VALE", name: "Vale", w: 10.5 }, { t: "NU", name: "Nu Holdings", w: 9.5 }, { t: "ITUB", name: "Itaú Unibanco", w: 8.6 },
      { t: "PETR4", name: "Petrobras (pref)", w: 6.1 }, { t: "PETR3", name: "Petrobras (common)", w: 5.8 }, { t: "BBDC", name: "Bradesco", w: 3.7 },
      { t: "AXIA", name: "AXIA Energia", w: 3.4 }, { t: "WEGE", name: "WEG", w: 3.2 }, { t: "B3SA", name: "B3", w: 3.1 }, { t: "ABEV", name: "Ambev", w: 3.1 }
    ]}
};

/* ═══════════════════════════════════════════════════════════
   TWS PORTFOLIO DASHBOARD — RENDER + LIVE PERFORMANCE ENGINE
   All content renders from data.js / changes.js.
   ═══════════════════════════════════════════════════════════ */

const PIDS = ["def", "agg", "hc"];
const PID_LABELS = { def: "Defensive Growth", agg: "Aggressive Growth", hc: "High Conviction" };
const LAYER_COLORS = ["#8af8fa", "#57c8d8", "#f0b429", "#c084fc"];

/* ── helpers ── */
const $ = (id) => document.getElementById(id);
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
function secChip(key, isOpt, noteOverride) {
  const s = SECTORS[key];
  if (!s) return "";
  const label = noteOverride || s.label;
  return `<span class="sec-chip${isOpt ? " opt" : ""}" style="color:${s.color};border-color:${s.color}44;background:${s.color}0d;"><span class="sq"></span>${label}</span>`;
}
function fmtPct(v, digits = 2) {
  if (v === null || v === undefined || isNaN(v)) return `<span class="flat-val">—</span>`;
  const cls = v > 0.0001 ? "pos-val" : v < -0.0001 ? "neg-val" : "flat-val";
  const sign = v >= 0 ? "+" : "−";
  return `<span class="${cls}">${sign}${Math.abs(v).toFixed(digits)}%</span>`;
}

/* ── portfolio pages (LIST VIEW) ── */
function renderPortfolio(pid) {
  const p = PORTFOLIOS[pid];
  const root = $("port-" + pid);
  root.innerHTML = "";

  const grid = el("div", "port-grid");
  const left = el("div");
  const right = el("div", "right-panel");

  const head = el("div", "port-head");
  head.appendChild(el("div", "port-title",
    p.name + (p.final ? "" : `<span class="draft-badge">DRAFT — PENDING FINAL TICKERS</span>`)));
  head.appendChild(el("div", "port-align",
    `Best Aligned Framework: <strong>${p.framework}</strong> · Sector guardrails: <strong>${p.profile}</strong> profile`));
  left.appendChild(head);

  const note = el("div", "entry-note", `
    <strong>How to use these positions:</strong> the tickers are examples — <strong>not a guarantee of the specific stock.</strong>
    The idea is the <strong>Sector</strong> inside each Layer: any name in the same Layer + Sector in the
    <a href="https://www.midasX.ai" target="_blank">Stock Playbook</a> expresses the same idea.
    Before entering, check <a href="https://www.midasX.ai" target="_blank">MidasX.ai</a> for the <strong>Value Zone</strong> and <strong>Dollar Cost Averaging category</strong> on every ticker.`);
  left.appendChild(note);

  const maxW = Math.max(...p.layers.flatMap((l) => l.positions.map((x) => x.w)));

  p.layers.forEach((layer, li) => {
    const sec = el("div", "layer");
    const lh = el("div", "layer-head l" + li);
    lh.appendChild(el("span", "ln", layer.name));
    lh.appendChild(el("span", "lm", `${layer.alloc}% of portfolio · ${layer.positions.length} positions`));
    sec.appendChild(lh);

    const list = el("div", "pos-list");
    list.appendChild(el("div", "pos-row pos-header", `
      <span></span>
      <span class="ph">Ticker</span>
      <span class="ph">Option</span>
      <span class="ph">Sector</span>
      <span class="ph ph-r">Allocation</span>`));

    layer.positions.forEach((pos) => {
      const row = el("div", "pos-row");
      row.innerHTML = `
        <span class="pos-bar" style="background:${SECTORS[pos.sec].color}"></span>
        <span class="pos-ticker">${pos.t}</span>
        <span class="pos-opt">${pos.opt}</span>
        <span class="pos-secs">
          ${secChip(pos.sec, false, pos.secNote)}
          ${pos.secOpt && pos.secOpt !== pos.sec ? secChip(pos.secOpt, true) : ""}
        </span>
        <span class="pos-alloc-wrap">
          <span class="wbar"><span class="wfill" style="width:${(pos.w / maxW) * 100}%;background:${SECTORS[pos.sec].color}"></span></span>
          <span class="pos-alloc">${pos.w}%</span>
        </span>`;
      list.appendChild(row);
    });
    sec.appendChild(list);
    left.appendChild(sec);
  });

  /* right panel — live performance */
  const perf = el("div", "panel-card");
  perf.innerHTML = `
    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px;">
      <span class="panel-title">Live Performance</span>
      <span class="panel-ts" id="${pid}_ts">loading…</span>
    </div>
    <div class="hero-ytd">
      <div class="hero-num" id="${pid}_hero">+${BASELINES[pid].toFixed(2)}%</div>
      <div class="hero-label">Portfolio YTD</div>
      <div class="hero-sub"><b>+${BASELINES[pid].toFixed(2)}%</b> baseline (prior holdings, Jan 2 – Jul 7) <b>+</b> current holdings tracked live since the Jul 6 close.</div>
    </div>
    <table class="perf-table">
      <thead><tr><th>Layer</th><th>Alloc</th><th>30D</th><th>Since 7/6</th><th>YTD</th></tr></thead>
      <tbody>
        ${p.layers.map((l, i) => `
          <tr>
            <td class="lname"><span class="sq" style="background:${LAYER_COLORS[i]}"></span>${l.name}</td>
            <td class="alloc-col">${l.alloc}%</td>
            <td id="${pid}_30d_${i}">—</td>
            <td id="${pid}_anch_${i}">—</td>
            <td id="${pid}_ytd_${i}">—</td>
          </tr>`).join("")}
        <tr class="total-row">
          <td class="lname">Total Portfolio</td><td></td>
          <td id="${pid}_30d_total">—</td>
          <td id="${pid}_anch_total">—</td>
          <td id="${pid}_ytd_total">—</td>
        </tr>
        <tr class="bench-label"><td colspan="5">Benchmarks</td></tr>
        <tr>
          <td class="lname"><span class="sq" style="background:#e5e7eb;border-radius:50%"></span>S&amp;P 500 <span class="bt">SPY</span></td>
          <td></td><td id="${pid}_30d_spy">—</td><td id="${pid}_anch_spy">—</td><td id="${pid}_ytd_spy">—</td>
        </tr>
        <tr>
          <td class="lname"><span class="sq" style="background:#f0ece4;border-radius:50%"></span>NASDAQ <span class="bt">QQQ</span></td>
          <td></td><td id="${pid}_30d_qqq">—</td><td id="${pid}_anch_qqq">—</td><td id="${pid}_ytd_qqq">—</td>
        </tr>
      </tbody>
    </table>
    <div class="perf-note">Performance tracks the primary ticker of each position only. Ticker Options are shown for illustration and do not affect performance. Benchmark YTD is unadjusted. Educational purposes only — not financial advice.</div>`;
  right.appendChild(perf);

  const donut = el("div", "panel-card");
  donut.innerHTML = `<span class="panel-title">Sector Exposure — Primary Sector by Position</span>
    <div class="donut-wrap"><div class="donut-svg" id="${pid}_donut"></div>
    <div class="donut-legend" id="${pid}_legend"></div></div>`;
  right.appendChild(donut);

  grid.appendChild(left);
  grid.appendChild(right);
  root.appendChild(grid);
  renderDonut(pid);
}

function renderDonut(pid) {
  const p = PORTFOLIOS[pid];
  const totals = {};
  p.layers.forEach((l) => l.positions.forEach((pos) => {
    totals[pos.sec] = (totals[pos.sec] || 0) + pos.w;
  }));
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const sum = entries.reduce((a, [, v]) => a + v, 0);
  const R = 62, STROKE = 21, C = 2 * Math.PI * R, CX = 82;
  let offset = 0;
  const segs = entries.map(([k, v]) => {
    const frac = v / sum;
    const seg = `<circle r="${R}" cx="${CX}" cy="${CX}" fill="none"
      stroke="${SECTORS[k].color}" stroke-width="${STROKE}"
      stroke-dasharray="${(frac * C).toFixed(2)} ${C.toFixed(2)}"
      stroke-dashoffset="${(-offset * C).toFixed(2)}"
      transform="rotate(-90 ${CX} ${CX})"/>`;
    offset += frac;
    return seg;
  }).join("");
  $(pid + "_donut").innerHTML =
    `<svg width="164" height="164" viewBox="0 0 164 164">${segs}
     <text x="${CX}" y="78" text-anchor="middle" fill="#f0ece4" font-family="DM Mono,monospace" font-size="22" font-weight="700">${sum}%</text>
     <text x="${CX}" y="98" text-anchor="middle" fill="#f0b429" font-family="DM Sans,sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">ALLOCATED</text></svg>`;
  $(pid + "_legend").innerHTML = entries.map(([k, v]) =>
    `<div class="dl-row"><span class="sq" style="background:${SECTORS[k].color}"></span>
     <span class="nm">${SECTORS[k].label}</span><span class="pc">${v}%</span></div>`).join("");
}

/* ── CHANGES tab ── */
let changesPid = "hc";
function renderChangesTab() {
  const root = $("port-changes");
  const rows = CHANGES[changesPid];
  const p = PORTFOLIOS[changesPid];
  const counts = { kept: 0, swap: 0, add: 0 };
  rows.forEach((r) => counts[r.status]++);

  const badge = (s) => ({
    kept: `<span class="chg-badge kept">KEPT</span>`,
    swap: `<span class="chg-badge swap">SWAPPED</span>`,
    add:  `<span class="chg-badge add">NEW</span>`
  }[s]);

  const side = (d, dim) => d
    ? `<span class="chg-tick${dim ? " dim" : ""}">${d.t}</span><span class="chg-opt">${d.opt !== "—" ? "or " + d.opt : ""}</span><span class="chg-w">${d.w}%</span>`
    : `<span class="chg-none">—</span><span class="chg-opt"></span><span class="chg-w"></span>`;

  const layerBlocks = p.layers.map((layer, li) => {
    const lr = rows.filter((r) => r.l === li);
    if (!lr.length) return "";
    return `
      <div class="layer-head l${li}" style="border-radius:6px 6px 0 0;border:1px solid var(--line);border-bottom:none;">
        <span class="ln">${layer.name}</span>
        <span class="lm">${lr.filter((r) => r.status !== "kept").length} changes</span>
      </div>
      <div class="chg-list">
        <div class="chg-row chg-header">
          <span class="ph">Previous</span><span></span><span></span>
          <span class="ph" style="text-align:center;">Change</span>
          <span class="ph">Now</span><span></span><span></span>
        </div>
        ${lr.map((r) => `
          <div class="chg-row ${r.status}">
            ${side(r.old, r.status === "swap")}
            ${badge(r.status)}
            ${side(r.nw, false)}
            ${r.old && r.nw && r.status === "kept" && r.old.w !== r.nw.w
              ? `<span class="chg-delta">${r.nw.w > r.old.w ? "▲" : "▼"} ${r.old.w}% → ${r.nw.w}%</span>` : `<span class="chg-delta"></span>`}
          </div>`).join("")}
      </div>`;
  }).join("");

  root.innerHTML = `
    <div class="chg-wrap">
      <div class="port-head" style="margin-bottom:14px;">
        <div class="port-title">What Changed — July 2026 Update</div>
        <div class="port-align">Side-by-side view of every position: the April 2026 portfolio vs today's update.</div>
      </div>
      <div class="chg-controls">
        <div class="chg-pills">
          ${PIDS.map((pid) => `<button class="chg-pill${pid === changesPid ? " active" : ""}" onclick="setChangesPid('${pid}')">${PID_LABELS[pid]}</button>`).join("")}
        </div>
        <div class="chg-summary">
          <span class="chg-badge kept">KEPT</span> ${counts.kept}
          <span class="chg-badge swap" style="margin-left:12px;">SWAPPED</span> ${counts.swap}
          <span class="chg-badge add" style="margin-left:12px;">NEW</span> ${counts.add}
        </div>
      </div>
      ${layerBlocks}
      <div class="perf-note" style="margin-top:14px;">"Previous" shows the position and its Ticker Option as published in April 2026. Allocation deltas on kept positions are shown inline. Educational purposes only — not financial advice.</div>
    </div>`;
}
function setChangesPid(pid) { changesPid = pid; renderChangesTab(); }

/* ── thematic ETFs tab ── */
function renderEtfTab() {
  const root = $("port-etf");
  const cats = {};
  Object.entries(THEMATIC_ETFS).forEach(([tick, etf]) => {
    (cats[etf.category] = cats[etf.category] || []).push([tick, etf]);
  });
  const wrap = el("div", "etf-wrap");
  wrap.appendChild(el("div", "port-head",
    `<div class="port-title">Thematic ETFs — Top 10 Holdings</div>
     <div class="port-align">Every thematic ETF used across the three portfolios (primary and option tickers), what it does, and what's inside it.</div>`));
  const catNames = (typeof ETF_CATEGORY_ORDER !== "undefined")
    ? ETF_CATEGORY_ORDER.filter((c) => cats[c]).concat(Object.keys(cats).filter((c) => !ETF_CATEGORY_ORDER.includes(c)))
    : Object.keys(cats);
  catNames.map((c) => [c, cats[c]]).forEach(([cat, items]) => {
    wrap.appendChild(el("div", "etf-cat", cat)).style.color = "#57c8d8";
    const grid = el("div", "etf-grid");
    items.forEach(([tick, etf]) => {
      const card = el("div", "etf-card");
      const holdings = etf.holdings && etf.holdings.length
        ? `<div class="etf-holdings"><table><tbody>
            ${etf.holdings.map((h) => `<tr><td class="ht">${h.t}</td><td class="hn">${h.name || ""}</td><td class="hw">${h.w}%</td></tr>`).join("")}
           </tbody></table>${etf.asOf ? `<div class="etf-asof">Holdings as of ${etf.asOf} — verify at the fund provider before trading.</div>` : ""}</div>`
        : `<div class="etf-pending">Top-10 holdings pending — being verified by TWS research.</div>`;
      card.innerHTML = `
        <div class="etf-head"><span class="tick">${tick}</span><span class="nm">${etf.name}</span>
        ${etf.blurb ? `<div class="etf-blurb">${etf.blurb}</div>` : ""}</div>${holdings}`;
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
  });
  root.innerHTML = "";
  root.appendChild(wrap);
}

/* ── matrix tab ── */
function renderMatrixTab() {
  const root = $("port-matrix");
  const w = el("div", "matrix-wrap");
  const c1 = el("div", "matrix-card");
  c1.innerHTML = `
    <div class="matrix-head">
      <div class="matrix-title">AI Supercycle Portfolio Framework</div>
      <div class="matrix-sub">By Wealth Risk Profile</div><div class="matrix-rule"></div>
      <div class="matrix-note">Guidance ranges — not required, but recommended guardrails. # of positions () are just a common range.</div>
    </div>
    <table class="matrix-table">
      <thead><tr><th>Layers</th>${FRAMEWORK.profiles.map((p) => `<th>${p}</th>`).join("")}</tr></thead>
      <tbody>
        ${FRAMEWORK.rows.map((r) => `<tr><td>${r.layer}</td>${r.values.map((v) => `<td class="mid">${v}</td>`).join("")}</tr>`).join("")}
        <tr class="total-row"><td>Total</td>${FRAMEWORK.profiles.map(() => `<td>100%</td>`).join("")}</tr>
      </tbody>
    </table>`;
  w.appendChild(c1);
  const c2 = el("div", "matrix-card");
  const gRow = (r) => `<tr>
    <td><span class="sq" style="background:${SECTORS[r.sec].color}"></span>${SECTORS[r.sec].label}</td>
    ${r.values.map((v) => `<td class="mid">${v}</td>`).join("")}</tr>`;
  c2.innerHTML = `
    <div class="matrix-head">
      <div class="matrix-title">Sector Guardrails</div>
      <div class="matrix-sub">% of Full Portfolio · By Wealth Risk Profile</div><div class="matrix-rule"></div>
      <div class="matrix-note">Not required, but recommended sector exposure guardrails as % of full 100% portfolio.</div>
    </div>
    <table class="matrix-table">
      <thead><tr><th>Sector</th>${GUARDRAILS.profiles.map((p) => `<th>${p}</th>`).join("")}</tr></thead>
      <tbody>
        <tr class="section-row"><td colspan="7">${GUARDRAILS.coreSleeve.label}</td></tr>
        ${GUARDRAILS.coreSleeve.rows.map(gRow).join("")}
        <tr><td style="font-weight:700;color:var(--cream-60)">Total Midpoint</td>
          ${GUARDRAILS.coreSleeve.totalMidpoint.map((v) => `<td class="mid" style="color:var(--cream-60)">${v}</td>`).join("")}</tr>
        <tr class="section-row"><td colspan="7">${GUARDRAILS.thematicSleeve.label}</td></tr>
        ${GUARDRAILS.thematicSleeve.rows.map(gRow).join("")}
      </tbody>
    </table>`;
  w.appendChild(c2);
  root.innerHTML = "";
  root.appendChild(w);
}

/* ── tabs ── */
const TABS = ["def", "agg", "hc", "changes", "etf", "matrix"];
function showTab(n) {
  TABS.forEach((t, i) => {
    $("port-" + t).classList.toggle("active", i === n);
    $("tab-" + t).classList.toggle("active", i === n);
  });
  /* Start Here strip only on the three portfolio tabs */
  const howto = document.querySelector(".howto");
  if (howto) howto.style.display = n < 3 ? "" : "none";
}
function toggleHowTo() {
  const b = $("howto-body"), c = $("howto-chevron");
  const open = b.classList.toggle("open");
  c.classList.toggle("open", open);
}

/* ═══ LIVE PERFORMANCE ENGINE ═══ */
const priceCache = {};
async function pget(url) { const r = await fetch(url); return r.json(); }
async function fetchCloseOn(ticker, date) {
  const key = ticker + "_" + date;
  if (priceCache[key] !== undefined) return priceCache[key];
  try {
    const end = new Date(date); end.setDate(end.getDate() + 5);
    const endStr = end.toISOString().split("T")[0];
    const d = await pget(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${date}/${endStr}?adjusted=true&sort=asc&limit=1&apiKey=${CONFIG.polygonKey}`);
    const v = d.results && d.results[0] ? d.results[0].c : null;
    priceCache[key] = v; return v;
  } catch (e) { return null; }
}
function isMarketOpen() {
  const et = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = et.getDay();
  if (day === 0 || day === 6) return false;
  const mins = et.getHours() * 60 + et.getMinutes();
  return mins >= 570 && mins < 960;
}
async function fetchLatest(ticker) {
  const key = ticker + "_latest";
  if (priceCache[key] !== undefined) return priceCache[key];
  try {
    if (isMarketOpen()) {
      const today = new Date().toISOString().split("T")[0];
      const d = await pget(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${today}/${today}?adjusted=true&apiKey=${CONFIG.polygonKey}`);
      if (d.results && d.results[0]) { priceCache[key] = d.results[0].c; return d.results[0].c; }
    }
    const d2 = await pget(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${CONFIG.polygonKey}`);
    const v = d2.results && d2.results[0] ? d2.results[0].c : null;
    priceCache[key] = v; return v;
  } catch (e) { return null; }
}
function dateNDaysAgo(n) {
  const d = new Date(); d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}
async function calcLayer(positions, d30) {
  let anchNum = 0, d30Num = 0, wAnch = 0, w30 = 0;
  for (const { t, w } of positions) {
    const [cur, anch, p30] = await Promise.all([
      fetchLatest(t), fetchCloseOn(t, CONFIG.anchorDate), fetchCloseOn(t, d30)
    ]);
    if (cur && anch) { anchNum += ((cur - anch) / anch) * 100 * w; wAnch += w; }
    if (cur && p30) { d30Num += ((cur - p30) / p30) * 100 * w; w30 += w; }
  }
  return { anch: wAnch > 0 ? anchNum / wAnch : null, d30: w30 > 0 ? d30Num / w30 : null };
}
async function refreshAll() {
  const d30 = dateNDaysAgo(30);
  for (const pid of PIDS) {
    const p = PORTFOLIOS[pid];
    let sinceAnchor = 0, port30 = 0, ok = false;
    for (let i = 0; i < p.layers.length; i++) {
      const res = await calcLayer(p.layers[i].positions, d30);
      if (res.anch !== null) {
        $(`${pid}_anch_${i}`).innerHTML = fmtPct(res.anch);
        const lb = (typeof LAYER_BASELINES !== "undefined" && LAYER_BASELINES[pid]) ? LAYER_BASELINES[pid][i] : null;
        if (lb !== null) $(`${pid}_ytd_${i}`).innerHTML = fmtPct(lb + res.anch);
        sinceAnchor += res.anch * (p.layers[i].alloc / 100); ok = true;
      }
      if (res.d30 !== null) {
        $(`${pid}_30d_${i}`).innerHTML = fmtPct(res.d30);
        port30 += res.d30 * (p.layers[i].alloc / 100);
      }
    }
    if (ok) {
      $(`${pid}_anch_total`).innerHTML = fmtPct(sinceAnchor);
      $(`${pid}_30d_total`).innerHTML = fmtPct(port30);
      const displayed = BASELINES[pid] + sinceAnchor;
      $(`${pid}_ytd_total`).innerHTML = fmtPct(displayed);
      const hero = $(`${pid}_hero`);
      hero.innerHTML = (displayed >= 0 ? "+" : "−") + Math.abs(displayed).toFixed(2) + "%";
      hero.style.color = displayed >= 0 ? "#34d97b" : "#ff5c5c";
      hero.style.textShadow = displayed >= 0 ? "0 0 34px rgba(52,217,123,0.35)" : "0 0 34px rgba(255,92,92,0.35)";
    }
    const ts = $(`${pid}_ts`);
    if (ts) ts.textContent = "Updated " + new Date().toLocaleTimeString() + (isMarketOpen() ? " · Market Open" : " · Market Closed");
    for (const [bt, bk] of [["SPY", "spy"], ["QQQ", "qqq"]]) {
      const [bcur, bytd, b30, banch] = await Promise.all([
        fetchLatest(bt), fetchCloseOn(bt, CONFIG.ytdStart), fetchCloseOn(bt, d30), fetchCloseOn(bt, CONFIG.anchorDate)
      ]);
      if (bcur && bytd) $(`${pid}_ytd_${bk}`).innerHTML = fmtPct(((bcur - bytd) / bytd) * 100);
      if (bcur && b30) $(`${pid}_30d_${bk}`).innerHTML = fmtPct(((bcur - b30) / b30) * 100);
      if (bcur && banch) $(`${pid}_anch_${bk}`).innerHTML = fmtPct(((bcur - banch) / banch) * 100);
    }
  }
}

/* ── boot ── */
document.addEventListener("DOMContentLoaded", () => {
  PIDS.forEach(renderPortfolio);
  renderChangesTab();
  renderEtfTab();
  renderMatrixTab();
  showTab(2);
  refreshAll();
  setInterval(() => {
    Object.keys(priceCache).filter((k) => k.endsWith("_latest")).forEach((k) => delete priceCache[k]);
    refreshAll();
  }, CONFIG.refreshMs);
});

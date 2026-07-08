# TWS Portfolio Dashboard — July 2026

The Wealth Society example portfolios (Defensive Growth / Aggressive Growth / High Conviction)
built on the 4-Layer AI Supercycle Framework. Static site — GitHub Pages.

- Live prices via Polygon.io, client-side, refreshed every 15 min.
- Performance = frozen YTD baseline (prior holdings through Jul 7, 2026) + primary tickers tracked from the Jul 6, 2026 close.
- Edit `data.js` (portfolios, ETFs, baselines) and `changes.js` (What Changed) — everything renders from data.
- After any portfolio edit, regenerate the team workbook: `python tools/make_changes_xlsx.py`

Educational purposes only — not financial advice.

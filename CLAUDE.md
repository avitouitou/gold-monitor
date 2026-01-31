# Gold Monitor — Project Notes

## Overview
Gold & Silver price tracker PWA built for Avi's father (elderly user). Designed for readability and simplicity.

## Tech Stack
- **Framework:** React + TypeScript
- **Build:** Vite
- **Styling:** Plain CSS (no framework)
- **Hosting:** GitHub Pages via Actions workflow

## Key Decisions
- **Language:** Hebrew only (`lang="he"`, `dir="rtl"`) — all UI strings in Hebrew
- **Theme:** Light theme (warm off-white `#f5f5f0`, white cards, dark gold `#b8860b` accents) — optimized for elderly readability
- **Locale:** `he-IL` for number/currency formatting (`Intl.NumberFormat`) and time display
- **RTL:** Full right-to-left layout. Flexbox/grid auto-reverse. Toggle button borders use `border-right` instead of `border-left`

## Deployment
- **Repo:** https://github.com/avitouitou/gold-monitor (public)
- **Live site:** https://avitouitou.github.io/gold-monitor/
- **GitHub Pages:** Deployed via `.github/workflows/deploy.yml` (Actions workflow)
- **Vite base path:** `/gold-monitor/` in production only (`command === 'build'`), `/` in dev

## Project Structure
```
gold-monitor/
├── index.html                    # Entry HTML (Hebrew, RTL)
├── vite.config.ts                # Vite config with conditional base path
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Main app (Hebrew strings: זהב, כסף, error, loading)
│   ├── calculations.ts           # Price math + formatPrice (he-IL locale)
│   ├── constants.ts              # Gold/silver purity levels
│   ├── types.ts                  # TypeScript types
│   ├── hooks/
│   │   ├── usePrices.ts          # Fetches gold/silver/exchange rate data
│   │   └── useSettings.ts        # Currency/unit persistence (localStorage)
│   ├── components/
│   │   ├── Header.tsx            # Title, update time, refresh button (Hebrew)
│   │   ├── Controls.tsx          # Currency/unit toggles (מטבע, יחידה, גרם, אונקייה)
│   │   ├── MetalSection.tsx      # Gold/silver price sections (Hebrew unit labels)
│   │   ├── PriceCard.tsx         # Individual price display card
│   │   └── OfflineBadge.tsx      # Offline notification (Hebrew)
│   └── styles/
│       └── app.css               # All styles (light theme, RTL)
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment workflow
└── public/
    ├── manifest.json
    └── sw.js                     # Service worker for PWA/offline
```

## Git History
1. `Initial commit: Gold & Silver Price Tracker PWA` — original dark theme, English
2. `Hebrew translation + light theme redesign` — all Hebrew, RTL, light theme, UI polish
3. `Add GitHub Pages deployment workflow` — Actions deploy + vite base path
4. `Fix base path to only apply in production builds` — conditional base for dev/prod

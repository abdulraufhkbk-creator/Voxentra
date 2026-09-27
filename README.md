# Voxentra — See beyond the feed.

**SIH26152 | Social Media Analytics | NTRO | Team VoxSentinel1**

> NTRO-grade social media analytics platform. Detect coordinated bot campaigns, track misinformation, analyze sentiment shifts, and map influence networks — in real time.

![Demo Mode](https://img.shields.io/badge/Mode-Demo%20%7C%20No%20API%20Keys%20Required-emerald)
![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%7C%20Prisma%20%7C%20Tailwind-black)
![SIH](https://img.shields.io/badge/SIH-26152-blue)

---

## 🚀 Quick Start (Demo Mode - No API Keys Needed)

```bash
git clone https://github.com/abdulraufhkbk-creator/Voxentra.git
cd Voxentra
npm install
npm run build   # works offline, Prisma fallback included
npm run dev     # http://localhost:3000
```

**Demo Credentials:**
- `analyst@voxentra.local` / `Voxentra@2025`
- `admin@voxentra.ntro` / `Voxentra@2025`

The app auto-creates demo users if DB is empty. No external API keys required for evaluation.

---

## 🏗️ Architecture

```
Voxentra/
├── app/
│   ├── (landing) page.tsx          # Marketing + Demo badge
│   ├── login/                      # JWT auth
│   ├── dashboard/
│   │   ├── page.tsx                # Overview: stats, sentiment, threats
│   │   ├── analytics/              # Deep dive
│   │   ├── threats/                # Threat intel
│   │   ├── network/                # Influence graph
│   │   ├── live/                   # Real-time feed simulation
│   │   ├── investigations/         # Case management
│   │   └── settings/               # Demo mode config
│   └── api/
│       ├── auth/                   # login, register, me
│       ├── analytics/              # overview, feed, threats
│       ├── investigations/         # CRUD
│       ├── keywords/               # Tracking
│       └── system/status           # Integration status
├── components/
│   ├── ui/                         # Button, Card, Badge
│   ├── layout/                     # Sidebar, Header
│   └── dashboard/                  # StatCard, Charts, FeedList
├── lib/
│   ├── db.ts                       # Prisma + mock fallback
│   ├── auth.ts                     # JWT + bcrypt
│   └── analytics/
│       ├── mockGenerator.ts        # Realistic mock posts
│       ├── sentiment.ts            # Rule-based sentiment
│       ├── threat.ts               # Threat scoring
│       ├── botDetection.ts         # Bot heuristics
│       └── trends.ts               # Hashtag/keyword clustering
├── prisma/
│   ├── schema.prisma               # User, SocialPost, Investigation, Alert, KeywordTrack
│   └── seed.ts
├── extension/                      # Manifest V3 browser extension
│   ├── manifest.json
│   ├── background.js               # API sync + local heuristic
│   ├── content.js                  # On-page badge injection
│   ├── popup.html / popup.js
│   └── styles.css
└── Dockerfile + docker-compose.yml
```

---

## 🧠 Analytics Engine (Demo Mode)

**Important:** This production build uses **Demo Mode** by default. It does NOT claim live social media access unless API keys are configured.

- **Mock Generator:** Generates posts with platforms (twitter, reddit, telegram, instagram), threat levels, bot scores, sentiment, hashtags like #NationalSecurity, #Election2025, etc.
- **Threat Scoring:** +15 sensitive keywords, +20 toxicity>0.6, +25 bot>0.7, +20 virality>2000, +20 coordination signals => low/medium/high/critical
- **Bot Detection:** Username patterns (`bot_`, digits), engagement anomaly, low entropy, time clustering
- **Sentiment:** Keyword-based positive/negative word lists + toxicity indicators
- **Trends:** Hashtag extraction + keyword frequency

**Live Mode (when configured):**
```env
DEMO_MODE=false
TWITTER_BEARER_TOKEN=xxx
REDDIT_CLIENT_ID=xxx
REDDIT_CLIENT_SECRET=xxx
DATABASE_URL=postgresql://...
```
The UI shows `mode: demo` vs `live` via `/api/system/status`. Never claims live access unless env present.

---

## 🔌 Browser Extension

Location: `/extension`

- Manifest V3, works on Twitter/X and Reddit
- Content script injects threat badges on visible posts
- Background worker tries Voxentra API (localhost:3000), falls back to local heuristic
- Popup shows page stats + quick open dashboard

**Load for testing:**
1. Go to `chrome://extensions`
2. Enable Developer Mode
3. Load unpacked -> select `extension/` folder

---

## 🔐 Auth

- JWT via `jose`, bcryptjs for password hashing
- Token stored in httpOnly=false cookie (demo simplicity) + localStorage
- `/api/auth/me` verifies token
- Middleware protects `/dashboard` routes

---

## 🗄️ Database

- **Prisma schema** with SQLite for demo (`file:./dev.db`), Postgres ready for prod
- **Offline fallback:** If Prisma engine binary unavailable (sandbox without internet), `lib/db.ts` uses in-memory mock DB with same interface, so build and auth still work
- Seed: `npx tsx prisma/seed.ts` creates admin + analyst users

---

## 📊 Features Implemented

- [x] Landing page with NTRO branding
- [x] Login / JWT auth
- [x] Dashboard overview with real-time mock metrics
- [x] Sentiment over time (AreaChart)
- [x] Threat alerts with severity badges
- [x] Trending keywords (vertical BarChart)
- [x] Platform distribution + sentiment breakdown
- [x] Analytics deep dive: pie, bar, toxicity vs bot
- [x] Threat Intel page: high/critical filter, reasoning
- [x] Network graph: SVG demo with influencers, amplifiers, bot clusters
- [x] Live feed: auto-refresh every 3s, pause/resume, filters
- [x] Investigations: mock cases + create
- [x] Settings: Demo Mode explanation, system info
- [x] APIs with demo/live mode distinction
- [x] Browser extension MV3
- [x] Dockerfile + docker-compose
- [x] Build passes offline

**Pending / Recommended Next:**
- [ ] D3 force graph + Neo4j
- [ ] Map view (Leaflet) for geolocation threats
- [ ] Real Twitter/Reddit clients behind env flag
- [ ] PDF report export
- [ ] WebSocket real-time alerts
- [ ] Unit tests + Playwright E2E

---

## 🛠️ Scripts

```bash
npm run dev        # dev on 0.0.0.0:3000
npm run build      # prisma generate (fallback) + next build
npm start          # prod server
npm run db:push    # push schema to DB
npm run db:seed    # seed demo users + keywords
```

---

## 📦 Deployment

**Docker:**
```bash
docker-compose up --build
```

**Vercel / Any Node hosting:**
- Set env vars from `.env.example`
- Build command: `npm run build`
- Start: `npm start`

---

## 📋 SIH Submission Checklist

- [x] Problem Statement SIH26152 understood: Social Media Analytics for NTRO
- [x] Team VoxSentinel1
- [x] Production build with Demo Mode (no fake API claims)
- [x] Threat detection, bot detection, sentiment, trends, network
- [x] Browser extension
- [x] Auth + case management
- [x] README + Implementation Report
- [x] Works offline for evaluation
- [ ] Demo video (to be recorded)
- [ ] PPT (to be prepared)

---

## ⚠️ Disclaimer

This is Demo Mode build for SIH evaluation. No real social media API access is claimed unless explicitly configured via environment variables. All analytics in demo use mock data and heuristic rules, not ML models. Production would integrate ML models + NTRO intel feeds.

---

**© 2025 Voxentra • VoxSentinel1 • SIH26152 • NTRO • See beyond the feed.**

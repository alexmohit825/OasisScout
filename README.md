# OasisScout 🏜️

> **Microclimate Real Estate & 3D Topographic Intelligence Engine**  
> *Engineered for Dr. A. Alex Mohit • Coachella Valley & Nationwide Real Estate*

[![Repository](https://img.shields.io/badge/GitHub-alexmohit825%2FOasisScout-blue.svg)](https://github.com/alexmohit825/OasisScout)
[![Architecture](https://img.shields.io/badge/Stack-React%2019%20%7C%20MapLibre%203D%20%7C%20Cloudflare%20Edge-emerald.svg)](https://github.com/alexmohit825/OasisScout)
[![PWA](https://img.shields.io/badge/PWA-Installable%20%7C%20Offline%20Ready-amber.svg)](https://github.com/alexmohit825/OasisScout)

---

## 🌟 Overview & Domain Insight

Standard real estate portals (Zillow, Redfin, Realtor.com) are **microclimate-blind**. In the Coachella Valley, treating North Palm Springs and South Palm Springs identically can cost a home buyer millions:

1. **The Leeward Wind Shadow (South Palm Springs / Andreas Hills / Indian Canyons):**  
   Nestled against the sheer 10,834-foot eastern granite wall of **Mt. San Jacinto**, properties enjoy tranquil pool days with average wind velocities of only **4–8 mph**.
2. **The Gale-Force Wind Funnel (North Palm Springs / Whitewater / Escena):**  
   Funneled through the San Gorgonio Pass along the I-10 corridor, winds regularly hit **45–65+ mph**, scouring pools with sand and causing severe outdoor livability issues despite featuring brand-new 2018–2024 luxury construction.
3. **The Mountain Shadow Penalty:**  
   Proximity to Mt. San Jacinto cuts off direct sunlight in winter between **3:30 PM and 4:00 PM**, while locations in Rancho Mirage and La Quinta enjoy up to **75 minutes of additional golden hour sun**.

**OasisScout** solves this by uniting **3D elevation models**, **continuous wind-shadow vector layers**, **interactive 360° Google Street View**, **cycling infrastructure analysis**, and **MLS property data** into a single, high-performance PWA.

---

## 🛠️ Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        OasisScout PWA (Frontend)                       │
│              React 19 • MapLibre GL 3D • Tailwind CSS v4               │
├────────────────────────────────────────────────────────────────────────┤
│ • 3D Terrain Elevation & Mountain Pitch Camera                         │
│ • Real-time Wind-Shadow Vector Polygons (Calm vs. Moderate vs. Gale)   │
│ • Winter vs. Summer Mountain Ridge Solar Shade Simulator               │
│ • Dual Visual Inspector: Multi-photo carousel + 360° Google Street View│
│ • 5 Iconic Cycling Corridors (CV Link, Indian Canyons, Tramway HC)     │
│ • Universal Search & Custom Listing Ingestion Engine                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP Edge Fetch
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Cloudflare Worker (Edge Gateway)                   │
│                     wrangler.toml • worker/index.ts                    │
├────────────────────────────────────────────────────────────────────────┤
│ • GET /api/properties    — Filtered by yearBuilt, wind score, foothills│
│ • GET /api/microclimate  — Topographic wind & mountain sunset calc     │
│ • GET /api/bike-routes   — GeoJSON cycling routes with elevations      │
│ • GET /api/pois          — Curated dining, nightlife & shopping        │
│ • POST /api/parse-url    — Ingests any US Zillow/Redfin link or address│
│ • Cloudflare KV Caching  — Sub-10ms edge delivery                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚲 Featured Cycling Corridors

* **Indian Canyons Leeward Corridor (8.4 mi, Easy):** Glides through Andreas Hills into ancient palm oases with zero cross-traffic and full wind protection.
* **CV Link Regional Expressway (16.2 mi, Moderate):** Dedicated grade-separated multi-use concrete trail along the Whitewater wash for road bikes and e-bikes.
* **Mid-Century Architecture Tour (11.5 mi, Easy):** Flat, tranquil cruise past iconic Alexander and Wexler modern homes in Twin Palms, Deepwell, and Vista Las Palmas.
* **Palm Springs Aerial Tramway HC Ascent (3.8 mi, Expert):** 1,980 ft vertical ascent averaging 10.4% grade up Chino Canyon.
* **Santa Rosa Foothills & Lake Cahuilla Loop (14.8 mi, Moderate):** Scenic road ride through La Quinta's wind-protected mountain cove.

---

## 🚀 Quick Start

### Prerequisites
* Node.js 18+ (tested on Node v24)
* npm 9+

### Installation & Run
```bash
# 1. Clone the repository
git clone https://github.com/alexmohit825/OasisScout.git
cd OasisScout

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production (TypeScript + Vite)
npm run build
```

---

## 🌐 Cloudflare Edge Deployment

```bash
# Preview Worker locally with static assets
npm run worker:dev

# Deploy to Cloudflare Workers / Pages
npm run worker:deploy
```

---

## 📜 License & Copyright

Copyright © 2026 A. Alex Mohit. All rights reserved.

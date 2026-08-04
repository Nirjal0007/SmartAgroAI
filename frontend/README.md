# SmartAgroAI — Frontend

React 19 + Vite + TailwindCSS frontend for AI-powered plant disease detection.

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if your backend isn't on localhost:8000
npm run dev
```

The app runs at http://localhost:5173 by default and expects the FastAPI backend
(see `../backend`) running at the URL set in `.env`.

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
├── main.jsx                  # Entry point — router + theme provider
├── App.jsx                   # Route definitions, navbar/footer shell, toast config
├── index.css                 # Tailwind directives + design-system utilities
├── context/
│   └── ThemeContext.jsx       # Dark mode (persisted to localStorage)
├── services/
│   └── api.js                 # Axios client — predict, history CRUD, health check
├── components/
│   ├── layout/                # Navbar, Footer, ScrollToTop
│   ├── ui/                    # Button, GlassCard, SectionHeading, ConfidenceBar
│   ├── home/                  # Hero, HowItWorks, Features, Statistics, FAQ, CTA
│   ├── detect/                # UploadBox, PredictingLoader, ResultCard, DiseaseInfoTabs
│   └── history/                # HistoryCard, HistoryFilters, StatsCharts
└── pages/
    ├── Home.jsx, Detect.jsx, History.jsx, About.jsx, Contact.jsx, NotFound.jsx
```

## Design system

- **Colors**: `canopy` (deep green, primary), `cream` (warm white, secondary), `harvest`
  (marigold orange, accent) — defined as full Tailwind color scales in `tailwind.config.js`.
- **Type**: `Fraunces` for display/headlines, `Manrope` for body text, `IBM Plex Mono` for
  data readouts (confidence %, stats).
- **Signature motif**: a "viewfinder" corner-bracket frame + animated scan-line
  (`.viewfinder` / `.scanline` in `index.css`), used on the hero and the upload box to tie
  the visual language back to the product's core action — scanning a leaf.
- **Dark mode**: class-based (`darkMode: 'class'`), toggled via `ThemeContext`, persisted
  to `localStorage`.

## Talking to the backend

All API calls live in `src/services/api.js`. If the backend is unreachable or the model
isn't loaded, the UI surfaces the backend's error message via toast rather than failing
silently — see `/predict`'s `503` handling in `pages/Detect.jsx`.

## Notes

- The Contact page's form is currently simulated client-side (no backend `/contact`
  endpoint exists in the spec). Swap the `setTimeout` in `pages/Contact.jsx` for a real
  API call whenever you add that endpoint.
- Charts (`components/history/StatsCharts.jsx`) are computed client-side from whatever
  history the backend returns — no separate stats endpoint needed.

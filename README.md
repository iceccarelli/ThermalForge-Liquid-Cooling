# ThermalForge

**Direct-to-chip liquid cooling for high-density AI racks (30–130 kW)**

Production-grade Next.js 16 (App Router) marketing site + client portal for ThermalForge — a B2B company that designs, retrofits, and operates direct-to-chip liquid cooling for data center operators, colos, and hyperscalers running dense AI infrastructure.

The site is built to convert technical, ROI-driven buyers: it leads with the physics of the air-cooling wall, lets operators model their own savings live, and routes every interaction toward a facility audit.

## What's inside

**Conversion-first information architecture**
- **Live thermal instrument** in the hero that auto-cycles a rack between air-cooled (hot, throttling, PUE ~1.48) and ThermalForge liquid (cool, 0% throttle, PUE ~1.09)
- **Interactive TCO / PUE savings calculator** — the centerpiece. Operators dial in rack count, kW/rack, energy price, and current PUE, then watch annual $ savings, MWh, CO₂ tonnes, payback period, and 5-year net update live. Results prefill the audit form with their numbers.
- **Density-wall chart** mapping real GPU platforms (Ampere → GB200 NVL 130 kW) against the ~40 kW air-cooling ceiling
- **Spec-sheet product explorer** (cold plates, CDUs, controls, co-optimization, retrofit kits)
- **Air vs direct-to-chip vs immersion** comparison
- **4-phase deployment process**, **case studies** with before/after PUE, **resource library**, and **FAQ**
- **Client portal demo** — login → dashboard with sites overview, PUE trend chart, and retrofit progress tracking

**Engineering**
- Next.js 16 App Router + TypeScript, statically prerendered
- Tailwind CSS v4 with a custom thermal design system (two-pole semantic palette: cool = cooled, warm/hot = problem)
- Self-hosted fonts (Space Grotesk / Inter / JetBrains Mono) via `next/font/local` — no Google Fonts runtime dependency, GDPR-friendly, faster LCP
- Framer Motion animations, Sonner toasts, shared modal state via React Context
- Fully responsive, scrollspy nav, reduced-motion aware
- **Zero environment variables required** — forms and portal are self-contained client demos, so it builds and deploys on Vercel with no configuration

## Tech stack

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react · Sonner

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Deploy to GitHub + Vercel

Push to the repository:

```bash
git init
git add -A
git commit -m "ThermalForge: full marketing site + portal rebuild"

# point at the ThermalForge repo over HTTPS
git remote remove origin 2>/dev/null
git remote add origin https://github.com/iceccarelli/ThermalForge-Liquid-Cooling.git

git branch -M main
git push -u origin main --force
```

Then import the repo at [vercel.com/new](https://vercel.com/new). No build configuration or environment variables are needed — the defaults (`next build`) work out of the box. Point the `thermalforge.io` domain at the Vercel project when ready.

## Project structure

```
app/
  layout.tsx              # SEO metadata, self-hosted fonts, Sonner toaster
  page.tsx                # composes all sections inside <UIProvider>
  globals.css             # thermal design system (CSS vars + utility classes)
  data.ts                 # all domain content (products, cases, FAQs, nav, portal data)
  ui-context.tsx          # shared modal state (audit + portal) via React Context
  fonts/                  # self-hosted woff2 (Space Grotesk / Inter / JetBrains Mono)
  components/
    Header.tsx            # fixed nav, scrollspy, mobile menu
    Hero.tsx              # rotating imagery + live ThermalInstrument
    ThermalInstrument.tsx # signature air↔liquid live rack panel
    LogoStrip.tsx
    Problem.tsx           # the air-cooling wall + density chart
    Platform.tsx          # spec-sheet product explorer
    RoiCalculator.tsx     # TCO / PUE savings calculator (conversion centerpiece)
    Comparison.tsx        # air vs direct-to-chip vs immersion
    Process.tsx           # 4-phase deployment
    Proof.tsx             # case studies with before/after PUE
    Technology.tsx        # differentiators
    Resources.tsx         # downloads + FAQ
    FinalCta.tsx
    Footer.tsx
    AuditModal.tsx        # audit request form (validation, success ref #)
    PortalModal.tsx       # client portal demo (login → dashboard)
public/
  og-image.png            # 1200×630 social card
```

## Notes

- The portal demo login is prefilled (`alex.rivera@hyperscalex.ai` / `demo1234`) — it's a front-end demo, not a real auth backend.
- Case study figures and calculator constants are illustrative defaults; swap in real engagement data in `app/data.ts` and the constants at the top of `RoiCalculator.tsx` before going to market.

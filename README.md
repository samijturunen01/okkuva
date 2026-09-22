# OKKUVA – verkkosivusto

Marketing website for **OKKUVA**, a Finnish short-form video production company.
Built with React 19, Vite, plain modern CSS and React Router. No UI framework,
no animation library – every animation is CSS or a small hook.

- Prerendered static HTML for every page (real titles, descriptions and Open Graph
  tags for search engines and social previews) – works on GitHub Pages without
  the 404 redirect hack.
- Animated logo hero, scroll reveals, page transitions (View Transitions API),
  cursor-reactive glasses. Everything respects `prefers-reduced-motion`.
- Vertical phone-style video cards with muted hover previews and a modal player.
- Contact form → Google Apps Script with reCAPTCHA v3, honeypot and rate limiting.

## 1. Project structure

```
.
├── index.html                  HTML shell (meta defaults, favicon links)
├── vite.config.js              Vite config; BASE_PATH handling for GitHub Pages
├── .env.example                Environment variables (copy to .env)
├── public/                     Static files copied as-is
│   ├── videos/                 Optimized reference videos + posters
│   ├── favicon.svg, *.png      Icons, og-image.png, site.webmanifest, robots.txt
├── scripts/
│   ├── prerender.mjs           Renders every route to static HTML after build
│   ├── optimize-media.mjs      Converts a source video into web-ready files
│   └── generate-favicon.mjs    Rebuilds favicon.svg from the logo geometry
├── apps-script/
│   ├── Code.gs                 Google Apps Script backend for the contact form
│   └── README.md               Step-by-step deployment guide
├── .github/workflows/deploy.yml  GitHub Pages deployment
└── src/
    ├── main.jsx                Client entry (hydrates the prerendered HTML)
    ├── entry-server.jsx        Server entry used by the prerender script
    ├── App.jsx                 Layout + routes
    ├── routes.jsx              Lazy page modules + preloading
    ├── config/site.js          Public runtime config from env variables
    ├── data/                   ✏️ Editable content
    │   ├── site.js             Company details, navigation
    │   ├── videos.js           Reference videos
    │   ├── caseStudies.js      Results / case studies
    │   ├── pricing.js          Packages and prices
    │   ├── features.js         What every video includes
    │   └── process.js          Production steps
    ├── pages/                  Home, Pricing, Results, Contact, NotFound
    ├── sections/               Home page sections (Hero, Showreel, Process, …)
    ├── components/             Reusable UI (Navbar, Button, VideoCard, PricingCard, …)
    │   ├── glasses/            Animated SVG logo mark (geometry traced from the logo)
    │   └── video/              VideoCard, VideoReel, VideoModal + player context
    ├── hooks/                  useSeo, usePointerTilt, useReveal-style helpers, …
    ├── lib/contact.js          Form validation + Apps Script request
    ├── styles/                 tokens.css (design tokens), base, utilities, animations
    └── assets/                 Logo and portrait images imported by components
```

All visible text is Finnish and lives either in `src/data/*.js` or directly in the
section/page components, so copy changes are a one-file edit.

## 2. Run locally

```bash
npm install
npm run dev        # http://localhost:5273
npm run build      # production build → dist/ (client build + prerender)
npm run preview    # serve dist/ locally on http://localhost:4273
```

> **Ports:** this project uses **5273** (dev) and **4273** (preview) instead of
> Vite's defaults 5173/4173, because those are shared by every Vite project on
> your machine – if another project's dev server is still running, the browser
> can silently serve you *that* project on the same URL. `strictPort` is on, so
> a collision fails with a clear error instead of quietly moving to another
> port. Always open the exact URL the terminal prints.
>
> If a page ever looks like a different project, a stale dev server is still
> running. List them with:
> `Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -match 'vite' } | Select-Object ProcessId, CommandLine`
> and stop the unwanted one with `Stop-Process -Id <PID> -Force`.

`npm run build:spa` builds without prerendering (plain SPA) if you ever need it.

## 3. Replace or add reference videos

Videos live in `public/videos/` as three files per video:

| File                          | Purpose                                    |
| ----------------------------- | ------------------------------------------ |
| `<slug>.mp4`                  | Full video with sound (720×1280, H.264)    |
| `<slug>-preview.mp4`          | 6-second muted clip played on hover        |
| `<slug>-poster.webp`          | Still image shown before playback          |

Create them from any source video (an iPhone `.mov` is fine) with:

```bash
# needs ffmpeg on PATH – or run `npm i -D ffmpeg-static` once
node scripts/optimize-media.mjs "path/to/Video.mov" kesakampanja-2026 1.5
#                                 source file          slug            poster time (s)
```

Then add an entry to `src/data/videos.js`:

```js
{
  id: 'kesakampanja-2026',
  title: 'Kesäkampanja',
  kicker: 'Haastattelu',
  description: 'Lyhyt kuvaus videosta.',
  duration: '0:52',
  src: 'videos/kesakampanja-2026.mp4',
  preview: 'videos/kesakampanja-2026-preview.mp4',
  poster: 'videos/kesakampanja-2026-poster.webp',
  // Valinnainen: Instagramin todelliset luvut videon päälle (Reels-tyylinen
  // kerros). Jätä pois, jos lukuja ei ole.
  stats: { likes: 1234, comments: 56, shares: 78, saves: 90 },
  // Valinnainen: kuvatekstin ensimmäinen rivi, näkyy käyttäjätunnuksen alla.
  // Pidä lyhyenä ja päätä "…"-merkkiin kuten Instagramissa – tilaa on 1–2 riviä.
  caption: 'Lyhyt kuvaus somessa, …',
},
```

The home page reel shows every video in that list. To remove a video, delete
its entry (and the files).

### Instagram Reels -kerros

Jokaisen videon päälle piirretään Reels-tyylinen käyttöliittymä
(`src/components/video/ReelsOverlay.jsx`): oikeassa reunassa sydän, kommentti,
jako, tallennus + luvut, kolme pistettä ja tilin neliömerkki, vasemmassa
alareunassa profiilikuva, käyttäjätunnus, "Seuraa" ja kuvateksti. Sama kerros
renderöidään sekä kortille että suurennettuun modaalisoittimeen, ja se on
kokonaan `pointer-events: none` – klikkaus menee aina läpi videon avaamiseen.

Tili (käyttäjätunnus ja logo) tulee `reelsAccount`-objektista
`src/data/videos.js`:ssä. Logo on `public/brand/visitkarelia-logo.jpg`
(neliö, 150×150 tai isompi); korvaa tiedosto tai osoita `mark` toiseen
tiedostoon, niin merkki vaihtuu sekä profiilikuvaan että oikean reunan
neliöön. Käytä tiedostonimessä vain pieniä kirjaimia ja väliviivoja.

> The original `.mov` files in the project root are ignored by git (see
> `.gitignore`) – only the optimized versions in `public/videos` are deployed.

## 4. Add a case study

Edit `src/data/caseStudies.js` and add an object:

```js
{
  slug: 'asiakas-oy',              // anchor on /tulokset#asiakas-oy
  client: 'Asiakas Oy',
  summary: 'Mitä tehtiin ja miksi.',
  tags: ['Lyhytvideot', 'Haastattelut'],
  videos: ['kesakampanja-2026'],   // ids from videos.js
  metrics: [                        // REAL numbers only – empty array hides the block
    { value: '120 000', label: 'näyttökertaa', note: '30 päivässä' },
  ],
  quote: null,                      // or { text, author, role } – a real quote
  featured: true,                   // show in the home page preview
}
```

Metrics and quotes are rendered only when provided – nothing is invented.
The Business Joensuu entry currently has all four reference videos attached and
an empty `metrics` array; confirm the video mapping and fill in real numbers
when you have them (see the `TODO` comments in the file).

## 5. Google Apps Script (contact form backend)

Full guide: [`apps-script/README.md`](apps-script/README.md). Short version:

1. Create a new project at <https://script.google.com>, paste `apps-script/Code.gs`.
2. Project Settings → Script properties: `RECAPTCHA_SECRET` (required),
   optionally `TO_EMAIL`, `SHEET_ID`, `ALLOWED_HOSTNAMES`, `MIN_SCORE`.
3. Deploy → New deployment → Web app → *Execute as: Me*, *Who has access: Anyone*.
4. Copy the Web app URL into `VITE_APPS_SCRIPT_URL`.

The script validates every field again, verifies the reCAPTCHA token, applies
rate limits, escapes all content in the email and returns JSON.

## 6. reCAPTCHA v3

1. Create v3 keys at <https://www.google.com/recaptcha/admin/create> for your
   domain (add `localhost` for development).
2. **Site key** → `VITE_RECAPTCHA_SITE_KEY` in `.env` (public, shipped to browsers).
3. **Secret key** → `RECAPTCHA_SECRET` Script property in Apps Script (never in
   the website).

The script is loaded only on the contact page. The form shows the required
"protected by reCAPTCHA" notice with links to Google's privacy policy and terms,
so the badge is hidden with CSS.

## 7. Environment variables

Copy `.env.example` to `.env`:

| Variable                  | Where           | Description                                                      |
| ------------------------- | --------------- | ---------------------------------------------------------------- |
| `VITE_SITE_URL`           | build           | Public site URL (no trailing slash). Enables canonical URLs, OG URLs and `sitemap.xml`. |
| `VITE_APPS_SCRIPT_URL`    | build (public)  | Deployed Apps Script Web App URL                                 |
| `VITE_RECAPTCHA_SITE_KEY` | build (public)  | reCAPTCHA v3 site key                                            |
| `BASE_PATH`               | build           | `/` (default) or `/<repo>/` for a GitHub project site           |

Everything prefixed `VITE_` is embedded in the JavaScript bundle and is public
by design. The only secret (reCAPTCHA secret key) lives in Apps Script.

## 8. Deploy to GitHub Pages

The repository includes `.github/workflows/deploy.yml`.

1. Push the project to GitHub (branch `main`).
2. Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. **Settings → Secrets and variables → Actions → Variables** – add:
   `VITE_SITE_URL`, `VITE_APPS_SCRIPT_URL`, `VITE_RECAPTCHA_SITE_KEY`
   (and `CUSTOM_DOMAIN`, e.g. `okkuva.fi`, if you use one – the workflow then
   writes the `CNAME` file and builds with `BASE_PATH=/`).
4. Push to `main` – the workflow builds and publishes `dist/`.

The workflow picks the base path automatically: `/<repo>/` for a project site
(`https://<user>.github.io/<repo>/`), `/` for `<user>.github.io` repositories or
a custom domain.

Manual deployment works too: `BASE_PATH=/okkuva/ npm run build` and upload the
`dist/` folder (it contains a `.nojekyll` file).

## Editing tips

- Colours, radii, type scale and easing live in `src/styles/tokens.css`.
- Prices: `src/data/pricing.js` (shown exactly as written).
- Company details / phone / email / Y-tunnus: `src/data/site.js`.
- The animated logo is `src/components/glasses/` – its geometry was traced from
  the original logo file; the navbar and footer use the original PNG.

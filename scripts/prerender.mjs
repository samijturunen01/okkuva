/**
 * Prerender every route to static HTML after `vite build`.
 *
 * Produces:
 *   dist/index.html, dist/yhteistyot.html + dist/yhteistyot/index.html, …
 *   dist/hinnasto.html, dist/tulokset.html (+ …/index.html) – static redirects
 *                        for removed pages (LEGACY_REDIRECTS in src/data/site.js)
 *   dist/404.html        – branded not-found page (GitHub Pages serves it for unknown URLs)
 *   dist/sitemap.xml      – only when VITE_SITE_URL is set
 *   dist/robots.txt       – with a Sitemap: line when VITE_SITE_URL is set
 *   dist/.nojekyll        – so GitHub Pages serves files starting with "_"
 *
 * Run automatically by `npm run build`.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const root = process.cwd()
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const env = loadEnv('production', root, '')
const rawBase = process.env.BASE_PATH || env.BASE_PATH || '/'
const base = `/${rawBase.replace(/^\/+|\/+$/g, '')}/`.replace('//', '/')
const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || '').replace(/\/+$/, '')

// Plain data module without imports, so Node can load it directly.
const { ABOUT_PATH, COLLAB_PATH, CONTACT_PATH, LEGACY_REDIRECTS, VIDEOS_PATH } = await import(
  pathToFileURL(path.join(root, 'src/data/site.js')).href
)

/** "/videot" → ["videot.html", "videot/index.html"] (GitHub Pages serves both URL forms). */
const filesFor = (route) => [`${route.slice(1)}.html`, `${route.slice(1)}/index.html`]

// `source` is the page module, used to find its lazily loaded CSS/JS chunks.
const routes = [
  { path: '/', files: ['index.html'], priority: '1.0', source: 'src/pages/Home.jsx' },
  { path: COLLAB_PATH, files: filesFor(COLLAB_PATH), priority: '0.9', source: 'src/pages/Collaborations.jsx' },
  { path: VIDEOS_PATH, files: filesFor(VIDEOS_PATH), priority: '0.8', source: 'src/pages/Videos.jsx' },
  { path: ABOUT_PATH, files: filesFor(ABOUT_PATH), priority: '0.7', source: 'src/pages/About.jsx' },
  { path: CONTACT_PATH, files: filesFor(CONTACT_PATH), priority: '0.7', source: 'src/pages/Contact.jsx' },
  { path: '/404', files: ['404.html'], sitemap: false, source: 'src/pages/NotFound.jsx' },
]

const templatePath = path.join(dist, 'index.html')
if (!existsSync(templatePath)) {
  console.error('dist/index.html not found – run `vite build` first.')
  process.exit(1)
}
const template = readFileSync(templatePath, 'utf8')

const entryPath = path.join(ssrDir, 'entry-server.js')
if (!existsSync(entryPath)) {
  console.error('dist-ssr/entry-server.js not found – run `vite build --ssr src/entry-server.jsx --outDir dist-ssr` first.')
  process.exit(1)
}
const { render, renderHead } = await import(pathToFileURL(entryPath).href)

// Preload the two Latin font files so headlines render without a swap flash.
const assetsDir = path.join(dist, 'assets')
const fontPreloads = existsSync(assetsDir)
  ? readdirSync(assetsDir)
      .filter((file) => /-latin-wght-normal.*\.woff2$/.test(file))
      .map((file) => `<link rel="preload" href="${base}assets/${file}" as="font" type="font/woff2" crossorigin />`)
  : []

// Pages other than the home page are split into chunks whose CSS is normally
// injected only once their JavaScript has loaded. Linking that CSS (and
// preloading the JS) in the static HTML keeps the prerendered page styled from
// the first paint, so nothing jumps when the app hydrates.
const manifestDir = path.join(dist, '.vite')
const manifestPath = path.join(manifestDir, 'manifest.json')
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {}

function pageAssetTags(source) {
  const css = new Set()
  const js = new Set()
  const visit = (key) => {
    const chunk = manifest[key]
    // The entry chunk (and everything it links) is already in the template.
    if (!chunk || chunk.isEntry || js.has(chunk.file)) return
    js.add(chunk.file)
    for (const file of chunk.css || []) css.add(file)
    for (const dep of chunk.imports || []) visit(dep)
  }
  visit(source)
  const notInTemplate = (file) => !template.includes(file)
  return [
    ...[...css].filter(notInTemplate).map((f) => `<link rel="stylesheet" crossorigin href="${base}${f}" />`),
    ...[...js].filter(notInTemplate).map((f) => `<link rel="modulepreload" crossorigin href="${base}${f}" />`),
  ]
}

for (const route of routes) {
  const url = `${base.replace(/\/$/, '')}${route.path}`
  const { html, seo } = await render(url)

  // Stamp the prerendered route on the root so the client can decide whether
  // it is safe to hydrate (see src/main.jsx).
  let page = template.replace('<div id="root">', `<div id="root" data-route="${route.path}">`)
  page = page.replace('<!--app-html-->', () => html)
  page = page.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, () => renderHead(seo).trim())
  if (fontPreloads.length) page = page.replace('</head>', `    ${fontPreloads.join('\n    ')}\n  </head>`)
  const assetTags = pageAssetTags(route.source)
  if (assetTags.length) page = page.replace('</head>', `    ${assetTags.join('\n    ')}\n  </head>`)

  for (const file of route.files) {
    const out = path.join(dist, file)
    mkdirSync(path.dirname(out), { recursive: true })
    writeFileSync(out, page)
  }
  console.log(`prerendered ${route.path.padEnd(14)} → ${route.files.join(', ')}`)
}

// Removed pages → static redirects (GitHub Pages cannot send HTTP redirects).
// An instant meta refresh with a canonical link to the target is treated as a
// permanent redirect by search engines; the script makes it immediate.
const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const { from, to } of LEGACY_REDIRECTS) {
  const target = `${base}${to.slice(1)}`
  const canonical = siteUrl ? `<link rel="canonical" href="${escapeAttr(siteUrl + target.split('#')[0])}" />\n    ` : ''
  const redirectPage = `<!doctype html>
<html lang="fi">
  <head>
    <meta charset="UTF-8" />
    <title>OKKUVA</title>
    <meta name="robots" content="noindex" />
    ${canonical}<meta http-equiv="refresh" content="0; url=${escapeAttr(target)}" />
    <script>location.replace(${JSON.stringify(target)})</script>
  </head>
  <body>
    <p><a href="${escapeAttr(target)}">Jatka sivulle</a></p>
  </body>
</html>
`
  for (const file of filesFor(from)) {
    const out = path.join(dist, file)
    mkdirSync(path.dirname(out), { recursive: true })
    writeFileSync(out, redirectPage)
  }
  console.log(`redirect    ${from.padEnd(14)} → ${target}`)
}

// robots.txt + sitemap.xml ------------------------------------------------
let robots = 'User-agent: *\nAllow: /\n'
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes
    .filter((r) => r.sitemap !== false)
    .map((r) => {
      const loc = `${siteUrl}${base}${r.path === '/' ? '' : r.path.slice(1)}`
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    })
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
  robots += `\nSitemap: ${siteUrl}${base}sitemap.xml\n`
  console.log('sitemap.xml written')
} else {
  console.warn('VITE_SITE_URL is not set – skipping sitemap.xml and canonical URLs. Set it in .env for production.')
}
writeFileSync(path.join(dist, 'robots.txt'), robots)
writeFileSync(path.join(dist, '.nojekyll'), '')

rmSync(ssrDir, { recursive: true, force: true })
rmSync(manifestDir, { recursive: true, force: true })
console.log('prerender done')

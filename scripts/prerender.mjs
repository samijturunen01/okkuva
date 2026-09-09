/**
 * Prerender every route to static HTML after `vite build`.
 *
 * Produces:
 *   dist/index.html, dist/hinnasto.html + dist/hinnasto/index.html, …
 *   dist/404.html         – branded not-found page (GitHub Pages serves it for unknown URLs)
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

const routes = [
  { path: '/', files: ['index.html'] },
  { path: '/hinnasto', files: ['hinnasto.html', 'hinnasto/index.html'] },
  { path: '/tulokset', files: ['tulokset.html', 'tulokset/index.html'] },
  { path: '/ota-yhteytta', files: ['ota-yhteytta.html', 'ota-yhteytta/index.html'] },
  { path: '/404', files: ['404.html'], sitemap: false },
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

for (const route of routes) {
  const url = `${base.replace(/\/$/, '')}${route.path}`
  const { html, seo } = await render(url)

  // Stamp the prerendered route on the root so the client can decide whether
  // it is safe to hydrate (see src/main.jsx).
  let page = template.replace('<div id="root">', `<div id="root" data-route="${route.path}">`)
  page = page.replace('<!--app-html-->', () => html)
  page = page.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, () => renderHead(seo).trim())
  if (fontPreloads.length) page = page.replace('</head>', `    ${fontPreloads.join('\n    ')}\n  </head>`)

  for (const file of route.files) {
    const out = path.join(dist, file)
    mkdirSync(path.dirname(out), { recursive: true })
    writeFileSync(out, page)
  }
  console.log(`prerendered ${route.path.padEnd(14)} → ${route.files.join(', ')}`)
}

// robots.txt + sitemap.xml ------------------------------------------------
let robots = 'User-agent: *\nAllow: /\n'
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes
    .filter((r) => r.sitemap !== false)
    .map((r) => {
      const loc = `${siteUrl}${base}${r.path === '/' ? '' : r.path.slice(1)}`
      const priority = r.path === '/' ? '1.0' : '0.8'
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
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
console.log('prerender done')

/**
 * Server entry used by scripts/prerender.mjs at build time.
 * Renders a route to static HTML and returns the page's SEO data.
 */
import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Writable } from 'node:stream'
import App from './App.jsx'
import { SeoContext } from './hooks/useSeo.js'
import './styles/index.css'

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function render(url) {
  const seo = {}
  const collector = { collect: (data) => Object.assign(seo, data) }

  return new Promise((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <SeoContext.Provider value={collector}>
          <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
            <App />
          </StaticRouter>
        </SeoContext.Provider>
      </StrictMode>,
      {
        onAllReady() {
          const chunks = []
          const sink = new Writable({
            write(chunk, _encoding, callback) {
              chunks.push(Buffer.from(chunk))
              callback()
            },
            final(callback) {
              resolve({ html: Buffer.concat(chunks).toString('utf8'), seo })
              callback()
            },
          })
          pipe(sink)
        },
        onError(error) {
          reject(error)
        },
      },
    )
  })
}

/** Build the <head> tags for a page from the collected SEO data. */
export function renderHead(seo) {
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  ]
  if (seo.noindex) tags.push('<meta name="robots" content="noindex, nofollow" />')
  if (seo.canonical) tags.push(`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`)
  tags.push(
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="fi_FI" />',
    '<meta property="og:site_name" content="OKKUVA" />',
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
  )
  if (seo.canonical) tags.push(`<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`)
  if (seo.image) {
    tags.push(
      `<meta property="og:image" content="${escapeHtml(seo.image)}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
    )
  }
  tags.push(
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
  )
  if (seo.image) tags.push(`<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`)
  return tags.map((t) => `    ${t}`).join('\n')
}

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import './styles/index.css'

const KNOWN_ROUTES = new Set(['/', '/hinnasto', '/tulokset', '/ota-yhteytta'])
const base = import.meta.env.BASE_URL

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <BrowserRouter basename={base}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/** Current route without the base path, query string or trailing slash. */
function currentRoute() {
  let path = window.location.pathname
  if (base !== '/' && path.startsWith(base.replace(/\/$/, ''))) path = path.slice(base.length - 1)
  path = path.replace(/\/+$/, '')
  return path || '/'
}

/**
 * Production builds are prerendered to static HTML. Hydrate only when the
 * HTML on the page was rendered for this route – some hosts serve index.html
 * for unknown URLs, in which case a fresh client render avoids a mismatch.
 */
const prerenderedRoute = container.getAttribute('data-route')
const route = currentRoute()
const htmlMatchesRoute =
  prerenderedRoute === route || (prerenderedRoute === '/404' && !KNOWN_ROUTES.has(route))

if (container.firstElementChild && prerenderedRoute && htmlMatchesRoute) {
  hydrateRoot(container, app)
} else {
  container.replaceChildren()
  createRoot(container).render(app)
}

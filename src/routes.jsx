import { lazy } from 'react'
import Home from './pages/Home.jsx'

/**
 * Route → page module loaders. The home page is bundled eagerly (it is the
 * usual entry point); the other pages are split into their own chunks and
 * preloaded when a link is hovered / focused, so navigation feels instant.
 */
const loaders = {
  '/hinnasto': () => import('./pages/Pricing.jsx'),
  '/tulokset': () => import('./pages/Results.jsx'),
  '/ota-yhteytta': () => import('./pages/Contact.jsx'),
}

export const pages = {
  Home,
  Pricing: lazy(loaders['/hinnasto']),
  Results: lazy(loaders['/tulokset']),
  Contact: lazy(loaders['/ota-yhteytta']),
  NotFound: lazy(() => import('./pages/NotFound.jsx')),
}

function normalise(path) {
  if (!path) return '/'
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '')
  return clean || '/'
}

export function preloadRoute(path) {
  const loader = loaders[normalise(path)]
  if (loader) loader()
}

export function preloadAllRoutes() {
  Object.values(loaders).forEach((loader) => loader())
}

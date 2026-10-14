import { lazy } from 'react'
import Home from './pages/Home.jsx'
import { ABOUT_PATH, COLLAB_PATH, CONTACT_PATH, VIDEOS_PATH } from './data/site.js'

/**
 * Route → page module loaders. The home page is bundled eagerly (it is the
 * usual entry point); the other pages are split into their own chunks and
 * preloaded when a link is hovered / focused, so navigation feels instant.
 */
const loaders = {
  [VIDEOS_PATH]: () => import('./pages/Videos.jsx'),
  [COLLAB_PATH]: () => import('./pages/Collaborations.jsx'),
  [ABOUT_PATH]: () => import('./pages/About.jsx'),
  [CONTACT_PATH]: () => import('./pages/Contact.jsx'),
}

export const pages = {
  Home,
  Videos: lazy(loaders[VIDEOS_PATH]),
  Collaborations: lazy(loaders[COLLAB_PATH]),
  About: lazy(loaders[ABOUT_PATH]),
  Contact: lazy(loaders[CONTACT_PATH]),
  NotFound: lazy(() => import('./pages/NotFound.jsx')),
}

/** Every prerendered page route (used by main.jsx to decide whether to hydrate). */
export const PAGE_ROUTES = ['/', ...Object.keys(loaders)]

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

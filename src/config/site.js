/**
 * Public runtime configuration.
 *
 * Values come from Vite environment variables (see .env.example). Everything
 * here is PUBLIC and ends up in the built JavaScript – never add secrets.
 */
const env = import.meta.env

const trimSlash = (s) => (s || '').replace(/\/+$/, '')

export const config = {
  /** Public site URL without trailing slash, e.g. https://okkuva.fi (optional). */
  siteUrl: trimSlash(env.VITE_SITE_URL),
  /** Vite base path, always starts and ends with "/". */
  basePath: env.BASE_URL || '/',
  /** Google Apps Script Web App endpoint for the contact form. */
  appsScriptUrl: (env.VITE_APPS_SCRIPT_URL || '').trim(),
  /** reCAPTCHA v3 site key (public). */
  recaptchaSiteKey: (env.VITE_RECAPTCHA_SITE_KEY || '').trim(),
}

/** True when the contact form has everything it needs to send messages. */
export const isContactFormConfigured = Boolean(config.appsScriptUrl && config.recaptchaSiteKey)

/**
 * Resolve a path inside /public (e.g. "videos/clip.mp4") against the base path
 * so it works both at the domain root and under a GitHub Pages sub-folder.
 */
export function publicUrl(path) {
  return config.basePath + String(path).replace(/^\/+/, '')
}

/** Absolute URL for a route path (used for canonical / Open Graph). Null when siteUrl is unset. */
export function absoluteUrl(path = '/') {
  if (!config.siteUrl) return null
  return config.siteUrl + publicUrl(path === '/' ? '' : path.replace(/^\//, ''))
}

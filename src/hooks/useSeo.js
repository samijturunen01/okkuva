import { createContext, useContext, useEffect } from 'react'
import { absoluteUrl } from '../config/site'
import { site } from '../data/site'

/**
 * On the server (prerender) the provider collects the SEO data of the page
 * being rendered; on the client the hook updates <head> directly.
 */
export const SeoContext = createContext(null)

export function buildSeo({ title, description, path = '/', noindex = false } = {}) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} – ${site.tagline.replace(/\.$/, '')}`
  return {
    title: fullTitle,
    description: description || site.shortDescription,
    canonical: noindex ? null : absoluteUrl(path),
    image: absoluteUrl('og-image.png'),
    noindex,
  }
}

/**
 * Set the page title, description, canonical URL and Open Graph tags.
 * Call once per page component.
 */
export function useSeo(options) {
  const collector = useContext(SeoContext)
  const seo = buildSeo(options)

  // Server side: hand the data to the prerender script.
  if (collector) collector.collect(seo)

  useEffect(() => {
    applySeo(seo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seo.title, seo.description, seo.canonical, seo.image, seo.noindex])
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!content) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!href) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applySeo(seo) {
  document.title = seo.title
  setMeta('name', 'description', seo.description)
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  setMeta('property', 'og:url', seo.canonical)
  setMeta('property', 'og:image', seo.image)
  setMeta('name', 'twitter:title', seo.title)
  setMeta('name', 'twitter:description', seo.description)
  setMeta('name', 'twitter:image', seo.image)
  setMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : null)
  setLink('canonical', seo.canonical)
}

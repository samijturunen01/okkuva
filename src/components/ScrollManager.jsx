import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

/**
 * Scroll to the top on navigation (but let the browser restore the position
 * on back/forward), handle #hash targets and move keyboard focus to <main>.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let attempts = 0
      const tryScroll = () => {
        const target = document.getElementById(id)
        if (target) {
          target.scrollIntoView({ block: 'start' })
          return
        }
        // Lazy-loaded page content may not exist yet – retry briefly.
        if (attempts++ < 20) setTimeout(tryScroll, 60)
      }
      tryScroll()
      return
    }

    if (navigationType === 'POP') return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const main = document.getElementById('main')
    if (main) main.focus({ preventScroll: true })
  }, [pathname, hash, navigationType])

  return null
}

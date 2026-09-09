import { useEffect, useState } from 'react'

/**
 * SSR-safe media query hook. Returns `defaultValue` during the first render
 * (and on the server), then the real value after mount.
 */
export function useMediaQuery(query, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return matches
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** True on devices with a precise pointer (mouse / trackpad). */
export function useFinePointer() {
  return useMediaQuery('(pointer: fine)')
}

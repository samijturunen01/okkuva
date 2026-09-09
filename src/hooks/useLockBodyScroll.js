import { useEffect } from 'react'

/**
 * Prevent the page from scrolling while a modal / menu is open.
 * Compensates for the scrollbar so the layout does not jump.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const html = document.documentElement
    const scrollbar = window.innerWidth - html.clientWidth
    const prevOverflow = html.style.overflow
    const prevPadding = html.style.paddingRight
    const prevComp = html.style.getPropertyValue('--scrollbar-comp')

    html.style.overflow = 'hidden'
    if (scrollbar > 0) {
      html.style.paddingRight = `${scrollbar}px`
      html.style.setProperty('--scrollbar-comp', `${scrollbar}px`)
    }

    return () => {
      html.style.overflow = prevOverflow
      html.style.paddingRight = prevPadding
      if (prevComp) html.style.setProperty('--scrollbar-comp', prevComp)
      else html.style.removeProperty('--scrollbar-comp')
    }
  }, [locked])
}

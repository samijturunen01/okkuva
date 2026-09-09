import { useEffect, useRef } from 'react'

/**
 * Scroll-triggered reveal. Renders visible HTML on the server; on the client
 * (html.js) the element starts hidden and gets `.is-visible` once it enters
 * the viewport. Styles live in styles/animations.css.
 *
 *   <Reveal as="h2" delay={120} variant="scale">…</Reveal>
 */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, variant, children, style, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal when entering the viewport – or if it is already above it
          // (e.g. the browser restored a scroll position further down).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const classes = ['reveal', variant ? `reveal--${variant}` : '', className].filter(Boolean).join(' ')
  const mergedStyle = delay ? { ...style, '--reveal-delay': `${delay}ms` } : style

  return (
    <Tag ref={ref} className={classes} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  )
}

import './Sticker.css'

/**
 * Sticker-style chip (inspired by the sticker wall in the brand photo).
 *
 *   tone: 'light' | 'dark' | 'accent'
 *   rotate: degrees, e.g. -6
 *   dot: show a pulsing red "REC" dot
 */
export function Sticker({ tone = 'light', rotate = 0, dot = false, className = '', children, ...rest }) {
  return (
    <span className={`sticker sticker--${tone} ${className}`.trim()} style={{ '--rot': `${rotate}deg` }} {...rest}>
      {dot && <span className="sticker__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}

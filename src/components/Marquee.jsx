import './Marquee.css'

/**
 * Infinite horizontal ticker. Purely decorative (aria-hidden); the same
 * information is always available elsewhere on the page.
 */
export function Marquee({ items, duration = 38, className = '', dark = false }) {
  const renderItems = (prefix) =>
    items.map((item, i) => (
      <span className="marquee__item" key={`${prefix}-${i}`}>
        {item}
        <span className="marquee__dot" />
      </span>
    ))

  return (
    <div
      className={`marquee ${dark ? 'marquee--dark' : ''} ${className}`.trim()}
      aria-hidden="true"
      style={{ '--marquee-duration': `${duration}s` }}
    >
      <div className="marquee__track">
        {renderItems('a')}
        {renderItems('b')}
      </div>
    </div>
  )
}

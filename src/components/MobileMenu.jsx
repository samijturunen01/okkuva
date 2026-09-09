import { useEffect, useRef } from 'react'
import { AppLink } from './AppLink.jsx'
import { Button } from './Button.jsx'
import { MailIcon, PhoneIcon } from './icons.jsx'
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js'
import { CONTACT_PATH, nav, site } from '../data/site.js'

/**
 * Full-screen mobile navigation. Opens with a circular clip-path reveal from
 * the toggle button; links stagger in. Rendered as a sibling of the header so
 * the header's backdrop-filter does not break its fixed positioning.
 */
export function MobileMenu({ open, onClose }) {
  const firstLinkRef = useRef(null)
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const timer = setTimeout(() => firstLinkRef.current && firstLinkRef.current.focus(), 350)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(timer)
    }
  }, [open, onClose])

  return (
    <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`.trim()} inert={!open}>
      <div className="mobile-menu__glow" aria-hidden="true" />
      <nav className="mobile-menu__nav" aria-label="Mobiilivalikko">
        <ul className="mobile-menu__list">
          {nav.map((item, i) => (
            <li key={item.to} style={{ '--i': i }}>
              <AppLink
                nav
                to={item.to}
                end={item.end}
                ref={i === 0 ? firstLinkRef : undefined}
                className={({ isActive }) => `mobile-menu__link ${isActive ? 'is-active' : ''}`.trim()}
              >
                <span className="mobile-menu__index" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="mobile-menu__label">{item.label}</span>
              </AppLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mobile-menu__footer">
        <Button to={CONTACT_PATH} variant="accent" size="lg" className="btn--block">
          Ota yhteyttä
        </Button>
        <div className="mobile-menu__contact">
          <a href={`mailto:${site.email}`}>
            <MailIcon />
            {site.email}
          </a>
          <a href={site.phoneHref}>
            <PhoneIcon />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  )
}

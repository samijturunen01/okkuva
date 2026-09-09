import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { AppLink } from './AppLink.jsx'
import { Button } from './Button.jsx'
import { MobileMenu } from './MobileMenu.jsx'
import { CONTACT_PATH, nav } from '../data/site.js'
import logo from '../assets/okkuva-logo.png'
import logo2x from '../assets/okkuva-logo@2x.png'
import './Navbar.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const wasOpen = useRef(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu when the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Return focus to the toggle when the menu closes.
  useEffect(() => {
    if (wasOpen.current && !open && toggleRef.current) toggleRef.current.focus()
    wasOpen.current = open
  }, [open])

  return (
    <>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`.trim()}>
        <div className="navbar__inner container">
          <AppLink to="/" className="navbar__logo" aria-label="OKKUVA – etusivu">
            <img src={logo} srcSet={`${logo} 1x, ${logo2x} 2x`} alt="" width="640" height="403" />
          </AppLink>

          <nav className="navbar__nav" aria-label="Päävalikko">
            <ul className="navbar__list">
              {nav.map((item) => (
                <li key={item.to}>
                  <AppLink
                    nav
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`.trim()}
                  >
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <Button to={CONTACT_PATH} variant="accent" size="sm" className="navbar__cta">
              Ota yhteyttä
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="navbar__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="navbar__toggle-bars" aria-hidden="true" />
              <span className="visually-hidden">{open ? 'Sulje valikko' : 'Avaa valikko'}</span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

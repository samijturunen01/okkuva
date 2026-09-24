import { AppLink } from './AppLink.jsx'
import { InstagramIcon, MailIcon, PhoneIcon } from './icons.jsx'
import { nav, site } from '../data/site.js'
import logo from '../assets/okkuva-logo.png'
import logo2x from '../assets/okkuva-logo@2x.png'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <AppLink to="/" className="footer__logo" aria-label="OKKUVA – etusivu">
            <img src={logo} srcSet={`${logo} 1x, ${logo2x} 2x`} alt="OKKUVA" width="640" height="403" />
          </AppLink>
          <p className="footer__tagline">{site.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Alatunnisteen valikko">
          <h2 className="footer__title">Sivut</h2>
          <ul className="footer__links">
            {nav.map((item) => (
              <li key={item.to}>
                <AppLink to={item.to} className="footer__link">
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        <address className="footer__contact">
          <h2 className="footer__title">Yhteystiedot</h2>
          <a href={`mailto:${site.email}`} className="footer__link">
            <MailIcon />
            <span>{site.email}</span>
          </a>
          <a href={site.phoneHref} className="footer__link">
            <PhoneIcon />
            <span>{site.phone}</span>
          </a>
          <a href={site.instagramHref} className="footer__link" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
            <span>@{site.instagram}</span>
          </a>
          <p className="footer__meta">Y-tunnus {site.businessId}</p>
        </address>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}
        </p>
        <p>Y-tunnus {site.businessId}</p>
      </div>
    </footer>
  )
}

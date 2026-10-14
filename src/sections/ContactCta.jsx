import { Reveal } from '../components/Reveal.jsx'
import { SplitWords } from '../components/SplitWords.jsx'
import { Button } from '../components/Button.jsx'
import { Sticker } from '../components/Sticker.jsx'
import { InstagramIcon, MailIcon, PhoneIcon } from '../components/icons.jsx'
import { CONTACT_PATH, site } from '../data/site.js'
import portrait from '../assets/portrait-800.webp'
import portrait2x from '../assets/portrait-1400.webp'
import './ContactCta.css'

/**
 * Closing call-to-action block used on several pages.
 *
 *   visual – 'portrait' (Daniel's photo + intro) or 'contact' (quick contact
 *            links) – use 'contact' on pages that already show the portrait
 */
export function ContactCta({
  title = 'Tehdään yhdessä tarina, joka muistetaan.',
  highlight = ['muistetaan'],
  lead = 'Kerro, mitä haluaisit kertoa – ja kenelle. Mietitään yhdessä, millainen yhteistyö toimisi juuri teille.',
  buttonLabel = 'Ota yhteyttä',
  to = CONTACT_PATH,
  visual = 'portrait',
}) {
  return (
    <section className="section section--sm contact-cta" aria-labelledby="cta-title">
      <div className="sheet contact-cta__sheet">
        <div className="contact-cta__glow" aria-hidden="true" />
        <div className="container contact-cta__inner">
          <div className="contact-cta__text">
            <Reveal as="span" className="eyebrow eyebrow--on-dark">
              Ota yhteyttä
            </Reveal>
            <Reveal as="h2" id="cta-title" className="contact-cta__title" delay={60}>
              <SplitWords text={title} highlight={highlight} />
            </Reveal>
            <Reveal as="p" className="lead" delay={160}>
              {lead}
            </Reveal>
            <Reveal className="contact-cta__actions" delay={240}>
              <Button to={to} variant="accent" size="lg">
                {buttonLabel}
              </Button>
              {visual === 'portrait' && (
                <a href={site.phoneHref} className="contact-cta__phone">
                  <PhoneIcon />
                  <span>{site.phone}</span>
                </a>
              )}
            </Reveal>
          </div>

          {visual === 'portrait' ? (
            <div className="contact-cta__side">
              <Reveal className="contact-cta__visual" variant="scale" delay={200}>
                <div className="contact-cta__photo">
                  <img
                    src={portrait}
                    srcSet={`${portrait} 800w, ${portrait2x} 1400w`}
                    sizes="(min-width: 900px) 400px, 80vw"
                    alt="Daniel oransseissa aurinkolaseissa puukirkon juurakkoalttarin edessä"
                    width="800"
                    height="1000"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <Sticker className="contact-cta__sticker" tone="accent" rotate={-8}>
                  Moikka 👋
                </Sticker>
              </Reveal>
              <Reveal as="p" className="contact-cta__intro" delay={280}>
                {site.founderIntro}
              </Reveal>
            </div>
          ) : (
            <Reveal as="ul" className="contact-cta__links" delay={200} aria-label="Yhteystiedot">
              <li>
                <a href={`mailto:${site.email}`} className="contact-cta__link">
                  <MailIcon />
                  <span className="contact-cta__link-body">
                    <span className="contact-cta__link-label">Sähköposti</span>
                    <span>{site.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="contact-cta__link">
                  <PhoneIcon />
                  <span className="contact-cta__link-body">
                    <span className="contact-cta__link-label">Puhelin</span>
                    <span>{site.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={site.instagramHref} className="contact-cta__link" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                  <span className="contact-cta__link-body">
                    <span className="contact-cta__link-label">Instagram</span>
                    <span>@{site.instagram}</span>
                  </span>
                </a>
              </li>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

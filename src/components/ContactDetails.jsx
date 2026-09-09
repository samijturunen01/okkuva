import { Reveal } from './Reveal.jsx'
import { MailIcon, PhoneIcon, SparkIcon } from './icons.jsx'
import { site } from '../data/site.js'
import './ContactDetails.css'

/**
 * Email / phone / business id as large tappable rows.
 */
export function ContactDetails({ className = '' }) {
  return (
    <address className={`contact-details ${className}`.trim()}>
      <Reveal as="a" href={`mailto:${site.email}`} className="contact-details__item" delay={0}>
        <span className="contact-details__icon">
          <MailIcon />
        </span>
        <span className="contact-details__body">
          <span className="contact-details__label">Sähköposti</span>
          <span className="contact-details__value">{site.email}</span>
        </span>
      </Reveal>
      <Reveal as="a" href={site.phoneHref} className="contact-details__item" delay={80}>
        <span className="contact-details__icon">
          <PhoneIcon />
        </span>
        <span className="contact-details__body">
          <span className="contact-details__label">Puhelin</span>
          <span className="contact-details__value">{site.phone}</span>
        </span>
      </Reveal>
      <Reveal as="div" className="contact-details__item contact-details__item--static" delay={160}>
        <span className="contact-details__icon">
          <SparkIcon />
        </span>
        <span className="contact-details__body">
          <span className="contact-details__label">Y-tunnus</span>
          <span className="contact-details__value">{site.businessId}</span>
        </span>
      </Reveal>
    </address>
  )
}

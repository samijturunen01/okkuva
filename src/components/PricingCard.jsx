import { useRef } from 'react'
import { Reveal } from './Reveal.jsx'
import { Button } from './Button.jsx'
import { CheckIcon } from './icons.jsx'
import { usePointerTilt } from '../hooks/usePointerTilt.js'
import { features } from '../data/features.js'
import { VAT_NOTE } from '../data/pricing.js'
import { CONTACT_PATH } from '../data/site.js'
import './PricingCard.css'

/**
 * Interactive pricing card. Tilts subtly towards the pointer.
 *   compact – hides the feature list (home page preview)
 */
export function PricingCard({ pkg, delay = 0, compact = false }) {
  const ref = useRef(null)
  usePointerTilt(ref, { scope: 'element', ease: 0.12 })

  return (
    <Reveal
      as="article"
      className={`pricing-card ${pkg.highlighted ? 'pricing-card--highlight' : ''}`.trim()}
      delay={delay}
      variant="scale"
      aria-labelledby={`pkg-${pkg.id}-name`}
    >
      <div className="pricing-card__inner" ref={ref}>
        <span className="pricing-card__shine" aria-hidden="true" />
        <div className="pricing-card__head">
          <h3 className="pricing-card__name" id={`pkg-${pkg.id}-name`}>
            {pkg.name}
          </h3>
          {pkg.badge && <span className="pricing-card__badge">{pkg.badge}</span>}
        </div>

        <p className="pricing-card__price">
          <span className="pricing-card__amount">{pkg.price}</span>
          <span className="pricing-card__currency"> €</span>
        </p>
        <p className="pricing-card__vat">
          {VAT_NOTE}
          {pkg.perVideo && <span className="pricing-card__per"> · {pkg.perVideo} € / video</span>}
        </p>

        <p className="pricing-card__desc">{pkg.description}</p>

        {!compact && (
          <ul className="pricing-card__features" aria-label="Sisältää">
            {features.map((feature) => (
              <li key={feature.id}>
                <CheckIcon />
                <span>{feature.title}</span>
              </li>
            ))}
          </ul>
        )}

        <Button
          to={`${CONTACT_PATH}?paketti=${pkg.id}`}
          variant={pkg.highlighted ? 'accent' : 'ghost'}
          className="pricing-card__cta"
        >
          {pkg.cta}
        </Button>
      </div>
    </Reveal>
  )
}

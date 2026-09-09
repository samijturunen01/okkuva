import { SectionHeading } from '../components/SectionHeading.jsx'
import { PricingCard } from '../components/PricingCard.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { ArrowIcon } from '../components/icons.jsx'
import { packages } from '../data/pricing.js'
import { PRICING_PATH } from '../data/site.js'
import './PricingPreview.css'

export function PricingPreview() {
  return (
    <section className="section pricing-preview" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHeading
          id="pricing-title"
          eyebrow="Hinnasto"
          title="Yksi hinta. Kaikki mukana."
          highlight={['Kaikki']}
          lead="Valitse videoiden määrä – sisältö on sama jokaisessa paketissa. Hinnat sisältävät arvonlisäveron."
        />
        <div className="pricing-grid">
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.id} pkg={pkg} delay={i * 110} compact />
          ))}
        </div>
        <Reveal className="pricing-preview__more" delay={200}>
          <AppLink to={PRICING_PATH} className="link-arrow">
            Katso koko hinnasto
            <ArrowIcon />
          </AppLink>
        </Reveal>
      </div>
    </section>
  )
}

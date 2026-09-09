import { useSeo } from '../hooks/useSeo.js'
import { PageHeader } from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { FeatureGrid } from '../components/FeatureGrid.jsx'
import { PricingCard } from '../components/PricingCard.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { ArrowIcon } from '../components/icons.jsx'
import { ContactCta } from '../sections/ContactCta.jsx'
import { features } from '../data/features.js'
import { packages } from '../data/pricing.js'
import { CONTACT_PATH } from '../data/site.js'
import './Pricing.css'

export default function Pricing() {
  useSeo({
    title: 'Hinnasto',
    description:
      'OKKUVAn lyhytvideoiden hinnat: 1 video 149,90 €, 3 videota 399,90 € ja 6 videota 699,90 € sis. ALV. Jokainen video sisältää kuvauksen, käsikirjoituksen, juonnon ja editoinnin.',
    path: '/hinnasto',
  })

  return (
    <>
      <PageHeader
        eyebrow="Hinnasto"
        title="Yksi hinta. Kaikki mukana."
        highlight={['Kaikki']}
        lead="Jokainen paketti sisältää saman sisällön – paketin koko määrää vain videoiden määrän. Kaikki hinnat sisältävät arvonlisäveron."
      />

      <section className="section section--flush-top" aria-labelledby="included-list-title">
        <div className="container">
          <SectionHeading
            id="included-list-title"
            eyebrow="Jokaisessa videossa"
            title="Mitä jokainen video sisältää."
            highlight={['jokainen']}
          />
          <FeatureGrid features={features} variant="list" />
        </div>
      </section>

      <section className="section pricing-page__packages" aria-labelledby="packages-title">
        <div className="container">
          <SectionHeading
            id="packages-title"
            eyebrow="Paketit"
            title="Valitse videoiden määrä."
            highlight={['määrä']}
            lead="Jokainen paketti sisältää kaikki yllä listatut asiat. Hinnat sis. ALV."
          />
          <div className="pricing-grid">
            {packages.map((pkg, i) => (
              <PricingCard key={pkg.id} pkg={pkg} delay={i * 110} />
            ))}
          </div>
          <Reveal as="p" className="pricing-page__note" delay={200}>
            Etkö ole varma, mikä paketti sopii?{' '}
            <AppLink to={CONTACT_PATH} className="link-arrow">
              Kysy meiltä
              <ArrowIcon />
            </AppLink>
          </Reveal>
        </div>
      </section>

      <ContactCta title="Varataanko kuvauspäivä?" highlight={['kuvauspäivä']} />
    </>
  )
}

import { useSeo } from '../hooks/useSeo.js'
import { Hero } from '../sections/Hero.jsx'
import { Marquee } from '../components/Marquee.jsx'
import { MeetDaniel } from '../sections/MeetDaniel.jsx'
import { Showreel } from '../sections/Showreel.jsx'
import { ConceptsOverview } from '../sections/ConceptsOverview.jsx'
import { CollabTeaser } from '../sections/CollabTeaser.jsx'
import { ResultsHighlight } from '../sections/ResultsHighlight.jsx'
import { ContactCta } from '../sections/ContactCta.jsx'
import { concepts } from '../data/concepts.js'
import { contactPath } from '../data/site.js'

const MARQUEE_ITEMS = [
  ...concepts.map((c) => c.title),
  'Aitoja kohtaamisia',
  'Tunteita',
  'Naurua',
  'Inspiraatiota',
]

export default function Home() {
  useSeo({
    title: 'Daniel – tarinankertoja ja videontekijä',
    description:
      'Moro! Olen Daniel. Teen videoita ihmisistä ja tarinoista, jotka saavat tuntemaan, nauramaan ja inspiroitumaan. Tehdään yhdessä yhteistyö, joka muistetaan.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <MeetDaniel />
      <Showreel />
      <ConceptsOverview />
      <CollabTeaser />
      <ResultsHighlight />
      <ContactCta visual="contact" to={contactPath('yhteistyo')} buttonLabel="Ehdota yhteistyötä" />
    </>
  )
}

import { useSeo } from '../hooks/useSeo.js'
import { Hero } from '../sections/Hero.jsx'
import { Marquee } from '../components/Marquee.jsx'
import { Showreel } from '../sections/Showreel.jsx'
import { Process } from '../sections/Process.jsx'
import { Included } from '../sections/Included.jsx'
import { PricingPreview } from '../sections/PricingPreview.jsx'
import { ResultsPreview } from '../sections/ResultsPreview.jsx'
import { ContactCta } from '../sections/ContactCta.jsx'

const MARQUEE_ITEMS = [
  'Kuvaus',
  'Käsikirjoitus',
  'Juonto',
  'B-roll',
  'Editointi',
  '4K kuvalaatu',
  'HD äänenlaatu',
  'Tyytyväisyystakuu',
]

export default function Home() {
  useSeo({ path: '/' })

  return (
    <>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <Showreel />
      <Process />
      <Included />
      <PricingPreview />
      <ResultsPreview />
      <ContactCta />
    </>
  )
}

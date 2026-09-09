import { SectionHeading } from '../components/SectionHeading.jsx'
import { FeatureGrid } from '../components/FeatureGrid.jsx'
import { features } from '../data/features.js'

export function Included() {
  return (
    <section className="section included" aria-labelledby="included-title">
      <div className="container">
        <SectionHeading
          id="included-title"
          eyebrow="Mitä saat"
          title="Jokaisessa videossa mukana."
          highlight={['Jokaisessa']}
          lead="Sama sisältö jokaisessa paketissa – paketin koko määrää vain videoiden määrän."
          align="center"
        />
        <FeatureGrid features={features} />
      </div>
    </section>
  )
}

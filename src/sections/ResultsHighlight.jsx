import { SectionHeading } from '../components/SectionHeading.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { ImpactBlock } from '../components/ImpactBlock.jsx'
import { ArrowIcon } from '../components/icons.jsx'
import { KIND_LABELS, featuredCaseStudies } from '../data/caseStudies.js'
import { COLLAB_PATH } from '../data/site.js'
import './ResultsHighlight.css'

/** Home page: verified results of a featured reference. Hidden without data. */
export function ResultsHighlight() {
  const study = featuredCaseStudies.find((c) => c.impact)
  if (!study) return null

  return (
    <section className="section results-highlight" aria-labelledby="results-title">
      <div className="container results-highlight__inner">
        <div className="results-highlight__text">
          <SectionHeading
            id="results-title"
            eyebrow="Näyttöä"
            title="Hyvä tarina löytää yleisönsä."
            highlight={['yleisönsä']}
          />
          <Reveal as="p" className="results-highlight__client">
            <span className="chip chip--outline">{KIND_LABELS[study.kind] || 'Referenssi'}</span>
            <strong>{study.client}</strong>
          </Reveal>
          <Reveal as="p" className="lead" delay={80}>
            {study.impact.story}
          </Reveal>
          <Reveal as="p" className="results-highlight__note" delay={120}>
            Luvut ovat yhden toteutuneen projektin tuloksia. Jokainen yhteistyö on erilainen, eikä näkyvyyttä voi
            luvata etukäteen.
          </Reveal>
          <Reveal delay={160}>
            <AppLink to={`${COLLAB_PATH}#${study.slug}`} className="link-arrow">
              Lue koko referenssi
              <ArrowIcon />
            </AppLink>
          </Reveal>
        </div>
        <ImpactBlock impact={{ ...study.impact, eyebrow: null }} showStory={false} />
      </div>
    </section>
  )
}

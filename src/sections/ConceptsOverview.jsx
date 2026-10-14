import { SectionHeading } from '../components/SectionHeading.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { ArrowIcon } from '../components/icons.jsx'
import { concepts } from '../data/concepts.js'
import { videosForConcept } from '../data/videos.js'
import { VIDEOS_PATH } from '../data/site.js'
import { publicUrl } from '../config/site.js'
import './ConceptsOverview.css'

/** Main concept only: its themes and the stories already told in it. */
function ConceptExtras({ concept }) {
  const stories = videosForConcept(concept.id).map((v) => v.title)
  return (
    <>
      {concept.themes && (
        <ul className="concept-card__themes" aria-label="Teemat">
          {concept.themes.map((theme) => (
            <li key={theme}>{theme}</li>
          ))}
        </ul>
      )}
      {stories.length > 0 && (
        <p className="concept-card__stories">
          <span>Tarinoita mm.</span> {stories.join(' · ')}
        </p>
      )}
    </>
  )
}

/** Home page: the three video concepts, each linking to its section on /videot. */
export function ConceptsOverview() {
  return (
    <section className="section section--flush-top concepts" aria-labelledby="concepts-title">
      <div className="container">
        <SectionHeading
          id="concepts-title"
          eyebrow="Konseptit"
          title="Kolme konseptia, yksi tarinankertoja."
          highlight={['tarinankertoja']}
          lead="Danielin videot rakentuvat kolmen konseptin ympärille. Jokaisessa on sama ydin: aidot ihmiset, aidot reaktiot ja tarina, joka jää mieleen."
        />

        <ul className="concepts__grid">
          {concepts.map((concept, i) => (
            <Reveal
              as="li"
              key={concept.id}
              className={`concept-card ${concept.featured ? 'concept-card--featured' : ''}`.trim()}
              delay={i * 90}
              variant="scale"
            >
              {concept.cover && (
                <img
                  className="concept-card__cover"
                  src={publicUrl(concept.cover)}
                  alt=""
                  width="900"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <span className="concept-card__glow" aria-hidden="true" />
              <div className="concept-card__top">
                <span className="concept-card__number" aria-hidden="true">
                  {concept.number}
                </span>
                {concept.featured && <span className="chip chip--accent">Pääkonsepti</span>}
                {concept.status === 'coming' && <span className="chip chip--dark">Tulossa</span>}
              </div>
              <div className="concept-card__body">
                <h3 className="concept-card__title">
                  <AppLink to={`${VIDEOS_PATH}#${concept.id}`} className="concept-card__link">
                    {concept.title}
                  </AppLink>
                </h3>
                <p className="concept-card__tagline">{concept.tagline}</p>
                <p className="concept-card__summary">{concept.summary}</p>
                {concept.featured && <ConceptExtras concept={concept} />}
                <span className="concept-card__more" aria-hidden="true">
                  Tutustu konseptiin
                  <ArrowIcon />
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

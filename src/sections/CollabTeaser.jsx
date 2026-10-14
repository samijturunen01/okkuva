import { SectionHeading } from '../components/SectionHeading.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { Button } from '../components/Button.jsx'
import { audiences } from '../data/collaboration.js'
import { COLLAB_PATH, contactPath } from '../data/site.js'
import './CollabTeaser.css'

const POINTS = [
  {
    title: 'Sponsoroitu video',
    text: 'Yrityksesi tai organisaatiosi mukana yhdessä Danielin omista videosarjoista.',
  },
  {
    title: 'Yhdessä ideoitu tarina',
    text: 'Tarina, joka sopii sekä teidän viestiinne että Danielin tyyliin.',
  },
  {
    title: 'Suunniteltu erikseen',
    text: 'Ei valmiita paketteja: sisältö, kanavat, oikeudet ja hinta sovitaan aina tapauskohtaisesti.',
  },
]

/** Home page: commercial collaborations, written for organisations. */
export function CollabTeaser() {
  return (
    <section className="section section--sm collab-teaser" aria-labelledby="collab-teaser-title">
      <div className="sheet collab-teaser__sheet">
        <div className="collab-teaser__glow" aria-hidden="true" />
        <div className="container collab-teaser__inner">
          <SectionHeading
            id="collab-teaser-title"
            eyebrow="Kaupalliset yhteistyöt"
            title="Yrityksesi osaksi Danielin omaa sisältöä."
            highlight={['omaa']}
            lead="Kaupungit, kunnat, matkailu- ja aluekehitysorganisaatiot sekä brändit voivat tehdä Danielin kanssa yksittäisiä kaupallisia yhteistöitä. Tarina suunnitellaan yhdessä – ja kerrotaan Danielin omalla otteella."
            onDark
          />

          <ul className="collab-teaser__audiences" aria-label="Kenelle">
            {audiences.map((audience, i) => (
              <Reveal as="li" key={audience} className="collab-teaser__audience" delay={i * 50}>
                {audience}
              </Reveal>
            ))}
          </ul>

          <ol className="collab-teaser__points">
            {POINTS.map((point, i) => (
              <Reveal as="li" key={point.title} className="collab-teaser__point" delay={120 + i * 90} variant="scale">
                <span className="collab-teaser__point-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="collab-teaser__point-title">{point.title}</h3>
                <p className="collab-teaser__point-text">{point.text}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="collab-teaser__actions" delay={200}>
            <Button to={COLLAB_PATH} variant="accent" size="lg">
              Tutustu yhteistöihin
            </Button>
            <Button to={contactPath('yhteistyo')} variant="ghost-dark" size="lg">
              Ehdota yhteistyötä
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

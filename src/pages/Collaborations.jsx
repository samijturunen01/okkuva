import { useSeo } from '../hooks/useSeo.js'
import { PageHeader } from '../components/PageHeader.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { FeatureGrid } from '../components/FeatureGrid.jsx'
import { CaseStudy } from '../components/CaseStudy.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { Button } from '../components/Button.jsx'
import { CheckIcon } from '../components/icons.jsx'
import { Process } from '../sections/Process.jsx'
import { ContactCta } from '../sections/ContactCta.jsx'
import { audiences, collabForms, collabSteps, collabTerms, comparison } from '../data/collaboration.js'
import { caseStudies } from '../data/caseStudies.js'
import { COLLAB_PATH, VIDEOS_PATH, contactPath } from '../data/site.js'
import './Collaborations.css'

export default function Collaborations() {
  useSeo({
    title: 'Kaupalliset yhteistyöt',
    description:
      'Kaupalliset videoyhteistyöt Danielin kanssa: sponsoroidut videot ja sisältöyhteistyöt kaupungeille, kunnille, matkailuorganisaatioille ja brändeille.',
    path: COLLAB_PATH,
  })

  return (
    <>
      <PageHeader
        eyebrow="Yhteistyöt"
        title="Kerrotaan yhdessä tarina, joka jää mieleen."
        highlight={['mieleen']}
        lead="Kaupallinen yhteistyö Danielin kanssa ei ole tavallinen videotilaus. Yrityksesi tai organisaatiosi pääsee osaksi sisältöä, jota katsotaan tarinan ja persoonan takia – ei siksi, että mainos osui eteen."
      >
        <Reveal className="collab-page__header-actions" delay={260}>
          <Button to={contactPath('yhteistyo')} variant="accent" size="lg">
            Ehdota yhteistyötä
          </Button>
          <Button to={VIDEOS_PATH} variant="ghost" size="lg">
            Katso videot
          </Button>
        </Reveal>
        <Reveal as="ul" className="collab-page__audiences" delay={320} aria-label="Kenelle yhteistyöt sopivat">
          {audiences.map((audience) => (
            <li key={audience} className="chip chip--outline">
              {audience}
            </li>
          ))}
        </Reveal>
      </PageHeader>

      {/* B – the primary offering */}
      <section className="section section--flush-top" id="kaupallinen-yhteistyo" aria-labelledby="collab-title">
        <div className="container">
          <SectionHeading
            id="collab-title"
            eyebrow="Kaupallinen yhteistyö"
            title="Yrityksesi osaksi Danielin omaa sisältöä."
            highlight={['omaa']}
            lead="Toteutan yksittäisiä kaupallisia yhteistöitä omissa videosarjoissani. Kumppanina voi olla kaupunki, matkailuorganisaatio, brändi tai paikallinen yritys. Sisältö, julkaisukanavat ja mahdolliset rinnakkaisjulkaisuoikeudet sovitaan aina tapauskohtaisesti."
          />
          <FeatureGrid features={collabForms} />

          <div className="collab-page__compare">
            <Reveal as="h3" id="compare-title" className="collab-page__compare-title">
              Miksi tämä on eri asia kuin videotilaus?
            </Reveal>
            <div className="collab-page__compare-grid">
              {[comparison.traditional, comparison.collab].map((column, i) => (
                <Reveal
                  key={column.title}
                  className={`collab-page__compare-col ${i === 1 ? 'collab-page__compare-col--collab' : ''}`.trim()}
                  delay={i * 120}
                  variant={i === 0 ? 'left' : 'right'}
                >
                  <h4 className="collab-page__compare-heading">{column.title}</h4>
                  <ul className="collab-page__compare-list">
                    {column.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="collab-page__terms" variant="scale">
            <div className="collab-page__terms-text">
              <h3 className="collab-page__terms-title">Sovitaan aina erikseen</h3>
              <p>
                Jokainen yhteistyö suunnitellaan ja hinnoitellaan erikseen. Julkaisu kaikissa Danielin kanavissa ei
                sisälly automaattisesti, vaan kanavat ja käyttöoikeudet sovitaan yhdessä ennen kuvauksia.
              </p>
            </div>
            <ul className="collab-page__terms-list">
              {collabTerms.map((term) => (
                <li key={term}>
                  <span className="collab-page__terms-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  {term}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* C – the secondary offering */}
      <section className="section section--flush-top" id="videotuotanto" aria-labelledby="production-title">
        <div className="container">
          <Reveal className="collab-page__production" variant="scale">
            <div className="collab-page__production-text">
              <span className="eyebrow">Myös tarjolla</span>
              <h2 id="production-title" className="collab-page__production-title">
                Räätälöidyt videotuotannot
              </h2>
              <p>
                Teen myös räätälöityjä videoita organisaatioille ja yrityksille, kun löydämme yhdessä kiinnostavan
                idean ja selkeän tavoitteen. Ota yhteyttä ja kerro, millaista kokonaisuutta suunnittelet.
              </p>
              <p className="collab-page__production-note">
                Ei kiinteitä hintoja – jokainen projekti arvioidaan idean, tavoitteiden ja laajuuden mukaan.
              </p>
            </div>
            <div className="collab-page__production-actions">
              <Button to={contactPath('videotuotanto')} variant="primary">
                Kysy videotuotannosta
              </Button>
              <Button href="#referenssit" variant="ghost" icon={null}>
                Katso esimerkki
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* D – examples and results */}
      {caseStudies.length > 0 && (
        <section className="section section--flush-top" id="referenssit" aria-labelledby="references-title">
          <div className="container">
            <SectionHeading
              id="references-title"
              eyebrow="Esimerkkejä ja tuloksia"
              title="Referenssit ja tulokset."
              highlight={['tulokset']}
              lead="Alla toteutunut tilaustyö ja sen tulokset. Luvut ovat tämän projektin toteutuneita lukuja – jokainen yhteistyö on erilainen, eikä näkyvyyttä voi luvata etukäteen."
            />
            {caseStudies.map((study, i) => (
              <CaseStudy key={study.slug} study={study} index={i} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}

      {/* E – process */}
      <Process
        id="collab-process-title"
        eyebrow="Näin yhteistyö etenee"
        title="Joustava prosessi, ei valmista pakettia."
        highlight={['Joustava']}
        lead="Jokainen yhteistyö etenee omalla tavallaan. Tässä suuntaa antava kulku ideasta julkaisuun."
        steps={collabSteps}
      />

      {/* F – contact */}
      <ContactCta
        title="Onko teillä tarina, joka pitäisi kertoa?"
        highlight={['tarina']}
        lead="Kerro lyhyesti organisaatiostanne ja tavoitteestanne. Mietitään yhdessä, millainen yhteistyö sopisi juuri teille."
        buttonLabel="Ehdota yhteistyötä"
        to={contactPath('yhteistyo')}
      />
    </>
  )
}

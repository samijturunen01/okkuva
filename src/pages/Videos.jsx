import { useSeo } from '../hooks/useSeo.js'
import { PageHeader } from '../components/PageHeader.jsx'
import { ConceptSection } from '../components/ConceptSection.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { ArrowIcon } from '../components/icons.jsx'
import { VideoCard } from '../components/video/VideoCard.jsx'
import { ContactCta } from '../sections/ContactCta.jsx'
import { concepts } from '../data/concepts.js'
import { productionVideos, videosForConcept } from '../data/videos.js'
import { COLLAB_PATH, VIDEOS_PATH } from '../data/site.js'
import './Videos.css'

const TONES = ['dark', 'light', 'tint']

export default function Videos() {
  useSeo({
    title: 'Videot & konseptit',
    description:
      'Danielin videokonseptit: Ihmisten tarinat, Jatkoon vai ei ja Blessattu vai kokattu. Tarinoita ihmisten, yritysten ja kokemusten takaa.',
    path: VIDEOS_PATH,
  })

  return (
    <>
      <PageHeader
        eyebrow="Videot & konseptit"
        title="Kolme konseptia. Yksi tarinankertoja."
        highlight={['tarinankertoja']}
        lead="Danielin videot rakentuvat kolmen konseptin ympärille: ihmisistä ja heidän tarinoistaan, kokemuksista ja reaktioista – sekä uusista, vähän rohkeammistakin kokeiluista."
      >
        <Reveal as="nav" className="videos-page__jump" delay={260} aria-label="Konseptit">
          <ul>
            {concepts.map((concept) => (
              <li key={concept.id}>
                <a href={`#${concept.id}`} className="videos-page__jump-link">
                  <span className="videos-page__jump-number" aria-hidden="true">
                    {concept.number}
                  </span>
                  {concept.title}
                  {concept.status === 'coming' && <span className="chip chip--dark">Tulossa</span>}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </PageHeader>

      {concepts.map((concept, i) => (
        <ConceptSection
          key={concept.id}
          concept={concept}
          videos={videosForConcept(concept.id)}
          tone={concept.featured ? 'dark' : TONES[i % TONES.length]}
        />
      ))}

      {productionVideos.length > 0 && (
        <section className="section section--sm videos-page__productions" id="tilaustyot" aria-labelledby="productions-title">
          <div className="container">
            <div className="videos-page__productions-head">
              <SectionHeading
                id="productions-title"
                eyebrow="Tilaustyöt"
                title="Videoita asiakkaiden kanaviin."
                highlight={['asiakkaiden']}
                lead="Omien konseptien lisäksi Daniel tekee räätälöityjä videoita organisaatioille. Nämä videot on tehty VisitKarelialle, ja ne julkaistiin VisitKarelian omissa kanavissa."
              />
              <Reveal delay={240} className="videos-page__productions-link">
                <AppLink to={`${COLLAB_PATH}#referenssit`} className="link-arrow">
                  Katso projektin tulokset
                  <ArrowIcon />
                </AppLink>
              </Reveal>
            </div>
            <ul className="videos-page__grid" aria-label="Tilaustyöt">
              {productionVideos.map((video, i) => (
                <Reveal as="li" key={video.id} delay={Math.min(i, 3) * 90} variant="scale">
                  <VideoCard video={video} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContactCta
        title="Haluatko mukaan seuraavaan tarinaan?"
        highlight={['tarinaan']}
        lead="Kaupallinen yhteistyö, oma idea tai vinkki kiinnostavasta ihmisestä – laita viestiä, niin jutellaan."
      />
    </>
  )
}

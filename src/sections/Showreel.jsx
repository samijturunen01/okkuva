import { SectionHeading } from '../components/SectionHeading.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { ArrowIcon } from '../components/icons.jsx'
import { VideoReel } from '../components/video/VideoReel.jsx'
import { featuredVideos } from '../data/videos.js'
import { VIDEOS_PATH } from '../data/site.js'
import './Showreel.css'

/**
 * Home page: featured videos. Only videos with real media are listed, in the
 * `featured` order of src/data/videos.js – the Ihmisten tarinat episodes come
 * first as soon as their files are added.
 */
export function Showreel() {
  if (featuredVideos.length === 0) return null

  return (
    <section className="section section--flush-top showreel" id="videot" aria-labelledby="showreel-title">
      <div className="container">
        <div className="showreel__head">
          <SectionHeading
            id="showreel-title"
            eyebrow="Videot ja tarinat"
            title="Katso, miten tarinat heräävät henkiin."
            highlight={['henkiin']}
            lead="Poimintoja Danielin videoista. Jokaisen videon kohdalla lukee, onko kyseessä Danielin oma video, kaupallinen yhteistyö vai tilaustyö. Avaa video ja katso äänen kanssa."
          />
          <Reveal delay={240} className="showreel__link">
            <AppLink to={VIDEOS_PATH} className="link-arrow">
              Kaikki videot & konseptit
              <ArrowIcon />
            </AppLink>
          </Reveal>
        </div>
        <VideoReel videos={featuredVideos} label="Poimintoja Danielin videoista" />
      </div>
    </section>
  )
}

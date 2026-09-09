import { SectionHeading } from '../components/SectionHeading.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { ArrowIcon } from '../components/icons.jsx'
import { VideoReel } from '../components/video/VideoReel.jsx'
import { videos } from '../data/videos.js'
import { RESULTS_PATH } from '../data/site.js'
import './Showreel.css'

export function Showreel() {
  return (
    <section className="section showreel" id="nayteikkuna" aria-labelledby="showreel-title">
      <div className="container">
        <div className="showreel__head">
          <SectionHeading
            id="showreel-title"
            eyebrow="Referenssit"
            title="Näin se näyttää feedissä."
            highlight={['feedissä']}
            lead="Tuoreita kuvauksia. Avaa video ja katso äänen kanssa – juuri niin kuin asiakkaasi näkisi sen."
          />
          <Reveal delay={240} className="showreel__link">
            <AppLink to={RESULTS_PATH} className="link-arrow">
              Katso kaikki tulokset
              <ArrowIcon />
            </AppLink>
          </Reveal>
        </div>
        <VideoReel videos={videos} />
      </div>
    </section>
  )
}

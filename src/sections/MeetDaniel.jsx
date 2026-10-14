import { Reveal } from '../components/Reveal.jsx'
import { SplitWords } from '../components/SplitWords.jsx'
import { Sticker } from '../components/Sticker.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { ArrowIcon, InstagramIcon } from '../components/icons.jsx'
import { ABOUT_PATH, site } from '../data/site.js'
import portrait from '../assets/portrait-800.webp'
import portrait2x from '../assets/portrait-1400.webp'
import './MeetDaniel.css'

const PILLARS = [
  { title: 'Ihmiset', text: 'Jokaisen yrityksen ja paikan takana on joku, jolla on tarina.' },
  { title: 'Tunteet', text: 'Videoita, jotka saavat nauramaan, liikuttumaan ja inspiroitumaan.' },
  { title: 'Persoona', text: 'Oma ote, joka tekee videoista tunnistettavia.' },
]

/** Home page: who Daniel is – the person comes before the production company. */
export function MeetDaniel() {
  return (
    <section className="section meet" id="daniel" aria-labelledby="meet-title">
      <div className="container meet__inner">
        <Reveal className="meet__visual" variant="scale">
          <div className="meet__photo">
            <img
              src={portrait}
              srcSet={`${portrait} 800w, ${portrait2x} 1400w`}
              sizes="(min-width: 900px) 440px, 86vw"
              alt="Daniel hymyilee oransseissa aurinkolaseissa puukirkon juurakkoalttarin edessä"
              width="800"
              height="1000"
              loading="lazy"
              decoding="async"
            />
          </div>
          <Sticker className="meet__sticker" tone="accent" rotate={-7}>
            Moikka 👋
          </Sticker>
        </Reveal>

        <div className="meet__text">
          <Reveal as="span" className="eyebrow">
            Tässä Daniel
          </Reveal>
          <Reveal as="h2" id="meet-title" className="meet__title" delay={60}>
            <SplitWords text="Kamera kädessä, ihmiset edellä." highlight={['ihmiset']} />
          </Reveal>
          <Reveal as="p" className="lead" delay={160}>
            Olen Daniel – tarinankertoja, videontekijä ja OKKUVAn perustaja. Videoissani pääosassa ovat ihmiset:
            yrittäjät, tekijät ja persoonat, joiden tarinat ansaitsevat tulla kuulluiksi.
          </Reveal>
          <Reveal as="p" className="meet__body" delay={200}>
            Välillä istahdan alas kuuntelemaan, välillä heittäydyn itse kokeilemaan. Aina aidosti – ja ripaus huumoria
            mukana.
          </Reveal>

          <ul className="meet__pillars">
            {PILLARS.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} className="meet__pillar" delay={240 + i * 80}>
                <h3 className="meet__pillar-title">{pillar.title}</h3>
                <p className="meet__pillar-text">{pillar.text}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="meet__links" delay={420}>
            <AppLink to={ABOUT_PATH} className="link-arrow">
              Lue lisää Danielista
              <ArrowIcon />
            </AppLink>
            <a href={site.instagramHref} className="meet__social" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              <span>@{site.instagram}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

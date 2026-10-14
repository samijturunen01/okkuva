import { Fragment, useRef } from 'react'
import { Glasses } from '../components/glasses/Glasses.jsx'
import { SplitWords } from '../components/SplitWords.jsx'
import { Button } from '../components/Button.jsx'
import { Sticker } from '../components/Sticker.jsx'
import { ArrowDownIcon } from '../components/icons.jsx'
import { usePointerTilt } from '../hooks/usePointerTilt.js'
import { COLLAB_PATH, VIDEOS_PATH } from '../data/site.js'
import './Hero.css'

/** Two sentences, each on its own line(s). */
const HEADLINE = ['Tarinoita, jotka tuntuvat.', 'Videoita, jotka muistetaan.']
const HIGHLIGHT = ['tuntuvat', 'muistetaan']

/**
 * Home page hero. The glasses assemble with CSS keyframes (so the animation
 * starts before JavaScript loads); once hydrated they tilt towards the cursor.
 */
export function Hero() {
  const ref = useRef(null)
  usePointerTilt(ref, { scope: 'window', ease: 0.07 })

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero__glow-wrap" aria-hidden="true">
        <div className="hero__glow" />
      </div>

      <div className="container hero__inner">
        <div className="hero__stage">
          <div className="hero__float">
            <div className="hero__glasses">
              <Glasses variant="hero" title="OKKUVA-logon aurinkolasit, joissa on oranssit linssit" />
            </div>
          </div>
          <Sticker className="hero__sticker hero__sticker--rec" tone="dark" rotate={-7} dot>
            REC · Ihmisten tarinat
          </Sticker>
          <Sticker className="hero__sticker hero__sticker--format" rotate={6}>
            Jatkoon vai ei? 🤔
          </Sticker>
          <Sticker className="hero__sticker hero__sticker--caption" rotate={-3}>
            Tätä ei skrollata ohi 👀
          </Sticker>
        </div>

        <p className="hero__eyebrow eyebrow">
          Daniel · tarinankertoja<span className="hero__eyebrow-more"> ja videontekijä</span>
        </p>

        <h1 className="hero__title" id="hero-title">
          {HEADLINE.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && ' '}
              <span className="hero__line">
                <SplitWords
                  text={line}
                  highlight={HIGHLIGHT}
                  wordClassName="hero__word"
                  startIndex={HEADLINE.slice(0, i).join(' ').split(' ').filter(Boolean).length}
                />
              </span>
            </Fragment>
          ))}
        </h1>

        <p className="hero__lead">
          Moro! Olen Daniel. Tapaan kiinnostavia ihmisiä, tutustun heidän tarinoihinsa ja kokeilen asioita, jotka
          herättävät uteliaisuutta. Teen videoita, jotka saavat ihmiset tuntemaan, nauramaan ja inspiroitumaan.
        </p>

        <div className="hero__actions">
          <Button to={COLLAB_PATH} size="lg">
            Tehdään yhteistyötä
          </Button>
          <Button to={VIDEOS_PATH} variant="ghost" size="lg">
            Katso videot
          </Button>
        </div>
      </div>

      <a href="#daniel" className="hero__scroll" aria-label="Selaa alaspäin">
        <ArrowDownIcon />
      </a>
    </section>
  )
}

import { useRef } from 'react'
import { Glasses } from '../components/glasses/Glasses.jsx'
import { SplitWords } from '../components/SplitWords.jsx'
import { Button } from '../components/Button.jsx'
import { Sticker } from '../components/Sticker.jsx'
import { ArrowDownIcon } from '../components/icons.jsx'
import { usePointerTilt } from '../hooks/usePointerTilt.js'
import { CONTACT_PATH, RESULTS_PATH } from '../data/site.js'
import './Hero.css'

const HEADLINE = 'Videoita, jotka pysäyttävät scrollaamisen.'

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
            REC 00:59
          </Sticker>
          <Sticker className="hero__sticker hero__sticker--format" rotate={6}>
            9:16 · 4K
          </Sticker>
          <Sticker className="hero__sticker hero__sticker--caption" rotate={-3}>
            Tätä ei skrollata ohi 👀
          </Sticker>
        </div>

        <p className="hero__eyebrow eyebrow">Lyhytvideoita yrityksille</p>

        <h1 className="hero__title" id="hero-title">
          <SplitWords text={HEADLINE} highlight={['pysäyttävät']} wordClassName="hero__word" />
        </h1>

        <p className="hero__lead">
          Teemme yrityksellesi lyhytvideoita, jotka toimivat somessa. Me hoidamme käsikirjoituksen, kuvauksen ja
          editoinnin – sinun tarvitsee vain olla paikalla.
        </p>

        <div className="hero__actions">
          <Button to={CONTACT_PATH} size="lg">
            Ota yhteyttä
          </Button>
          <Button to={RESULTS_PATH} variant="ghost" size="lg">
            Katso tulokset
          </Button>
        </div>
      </div>

      <a href="#nayteikkuna" className="hero__scroll" aria-label="Selaa alaspäin">
        <ArrowDownIcon />
      </a>
    </section>
  )
}

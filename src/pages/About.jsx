import { useSeo } from '../hooks/useSeo.js'
import { Reveal } from '../components/Reveal.jsx'
import { SplitWords } from '../components/SplitWords.jsx'
import { Sticker } from '../components/Sticker.jsx'
import { Button } from '../components/Button.jsx'
import { AppLink } from '../components/AppLink.jsx'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { FeatureGrid } from '../components/FeatureGrid.jsx'
import { ArrowIcon, InstagramIcon } from '../components/icons.jsx'
import { ContactCta } from '../sections/ContactCta.jsx'
import { aboutStory, aboutValues } from '../data/about.js'
import { concepts } from '../data/concepts.js'
import { ABOUT_PATH, COLLAB_PATH, VIDEOS_PATH, site, socials } from '../data/site.js'
import portrait from '../assets/portrait-800.webp'
import portrait2x from '../assets/portrait-1400.webp'
import './About.css'

export default function About() {
  useSeo({
    title: 'Danielista',
    description:
      'Kuka on Daniel? Tarinankertoja ja videontekijä, joka tekee videoita ihmisistä, kokemuksista ja tarinoista, jotka saavat tuntemaan, nauramaan ja inspiroitumaan.',
    path: ABOUT_PATH,
  })

  return (
    <>
      <header className="about-hero">
        <div className="about-hero__glow" aria-hidden="true" />
        <div className="container about-hero__inner">
          <div className="about-hero__text">
            <Reveal as="span" className="eyebrow">
              Danielista
            </Reveal>
            <Reveal as="h1" className="about-hero__title" delay={60}>
              <SplitWords text="Moro, olen Daniel." highlight={['Daniel']} />
            </Reveal>
            <Reveal as="p" className="lead" delay={200}>
              Tarinankertoja ja videontekijä, jota kiinnostavat ihmiset – ja tarinat, jotka saavat tuntemaan, nauramaan
              ja inspiroitumaan.
            </Reveal>
            <Reveal className="about-hero__actions" delay={280}>
              <Button to={VIDEOS_PATH} size="lg">
                Katso videot
              </Button>
              <Button to={COLLAB_PATH} variant="ghost" size="lg">
                Tehdään yhteistyötä
              </Button>
            </Reveal>
          </div>

          <Reveal className="about-hero__visual" variant="scale" delay={160}>
            <div className="about-hero__photo">
              <img
                src={portrait}
                srcSet={`${portrait} 800w, ${portrait2x} 1400w`}
                sizes="(min-width: 900px) 460px, 86vw"
                alt="Daniel hymyilee oransseissa aurinkolaseissa puukirkon juurakkoalttarin edessä"
                width="800"
                height="1000"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <Sticker className="about-hero__sticker about-hero__sticker--a" tone="accent" rotate={-8}>
              Moikka 👋
            </Sticker>
            <Sticker className="about-hero__sticker about-hero__sticker--b" tone="dark" rotate={6} dot>
              REC
            </Sticker>
          </Reveal>
        </div>
      </header>

      <section className="section section--flush-top about-story" aria-labelledby="story-title">
        <div className="container about-story__inner">
          <SectionHeading
            id="story-title"
            eyebrow="Mistä videot syntyvät"
            title="Ihmiset kiinnostavat. Tarinat jäävät mieleen."
            highlight={['kiinnostavat']}
          />
          <div className="about-story__text">
            {aboutStory.map((paragraph, i) => (
              <Reveal as="p" key={paragraph} delay={i * 80}>
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top" aria-labelledby="values-title">
        <div className="container">
          <SectionHeading
            id="values-title"
            eyebrow="Mikä tekee videoista omanlaisiaan"
            title="Aitoutta, huumoria ja sydäntä."
            highlight={['sydäntä']}
          />
          <FeatureGrid features={aboutValues} />

          <Reveal className="about-concepts" delay={120}>
            <p className="about-concepts__label">Danielin konseptit:</p>
            <ul className="about-concepts__list">
              {concepts.map((concept) => (
                <li key={concept.id}>
                  <AppLink to={`${VIDEOS_PATH}#${concept.id}`} className="about-concepts__link">
                    {concept.title}
                    {concept.status === 'coming' && <span className="chip chip--dark">Tulossa</span>}
                    <ArrowIcon />
                  </AppLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top about-social" aria-labelledby="social-title">
        <div className="container about-social__inner">
          <div className="about-social__text">
            <SectionHeading id="social-title" eyebrow="Somessa" title="Löydä Daniel somesta." highlight={['somesta']} />
            <Reveal as="p" className="about-social__note">
              OKKUVA on Danielin perustama yritys (Y-tunnus {site.businessId}). Sen kautta sovitaan kaupalliset
              yhteistyöt ja videotuotannot.
            </Reveal>
          </div>
          <ul className="about-social__list">
            {socials.map((social, i) => (
              <Reveal as="li" key={social.id} delay={i * 80} variant="scale">
                <a href={social.href} className="about-social__card" target="_blank" rel="noopener noreferrer">
                  <span className="about-social__icon" aria-hidden="true">
                    {social.id === 'instagram' ? <InstagramIcon /> : <ArrowIcon />}
                  </span>
                  <span className="about-social__body">
                    <span className="about-social__label">{social.label}</span>
                    <span className="about-social__handle">{social.handle}</span>
                  </span>
                  <ArrowIcon className="about-social__arrow" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta visual="contact" />
    </>
  )
}

import { Reveal } from './Reveal.jsx'
import { SplitWords } from './SplitWords.jsx'
import { Sticker } from './Sticker.jsx'
import { Button } from './Button.jsx'
import { InstagramIcon } from './icons.jsx'
import { VideoCard } from './video/VideoCard.jsx'
import { contactPath, site } from '../data/site.js'
import './ConceptSection.css'

/**
 * One video concept on /videot: intro, themes and its videos (or an empty
 * state when no videos are on the site yet).
 *
 *   tone – 'dark' (main concept) | 'light' | 'tint'
 */
export function ConceptSection({ concept, videos, tone = 'light' }) {
  const titleId = `${concept.id}-title`
  const coming = concept.status === 'coming'
  const eyebrow = concept.featured ? 'Pääkonsepti' : coming ? 'Uusi konsepti' : 'Konsepti'
  const sheet = tone !== 'light'

  const content = (
    <div className={`container concept__inner ${videos.length === 0 ? 'concept__inner--empty' : ''}`.trim()}>
      <div className="concept__intro">
        <div className="concept__top">
          <span className="concept__number" aria-hidden="true">
            {concept.number}
          </span>
          {coming && <span className="chip chip--accent concept__status">Tulossa</span>}
        </div>
        <Reveal as="span" className={`eyebrow ${tone === 'dark' ? 'eyebrow--on-dark' : ''}`.trim()}>
          {eyebrow}
        </Reveal>
        <Reveal as="h2" id={titleId} className="concept__title" delay={60}>
          <SplitWords text={concept.title} />
        </Reveal>
        <Reveal as="p" className="concept__tagline" delay={120}>
          {concept.tagline}
        </Reveal>
        <Reveal className="concept__description" delay={160}>
          {concept.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        {concept.themes && (
          <Reveal as="ul" className="concept__themes" delay={200} aria-label="Teemat">
            {concept.themes.map((theme) => (
              <li key={theme} className="concept__theme">
                {theme}
              </li>
            ))}
          </Reveal>
        )}
        {concept.forPartners && (
          <Reveal as="p" className="concept__partners" delay={240}>
            <strong>Organisaatioille: </strong>
            {concept.forPartners}
          </Reveal>
        )}
      </div>

      <div className="concept__media">
        {concept.verdicts && (
          <div className="concept__verdicts" aria-hidden="true">
            <Sticker tone="accent" rotate={-6} className="concept__verdict">
              {concept.verdicts[0]}
            </Sticker>
            <Sticker tone="dark" rotate={5} className="concept__verdict">
              {concept.verdicts[1]}
            </Sticker>
          </div>
        )}

        {videos.length > 0 ? (
          <ul className="concept__videos" aria-label={`${concept.title}: videot`}>
            {videos.map((video, i) => (
              <Reveal as="li" key={video.id} delay={i * 90} variant="scale">
                <VideoCard video={video} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="concept__empty" variant="scale">
            <p className="concept__empty-title">
              {coming ? 'Ensimmäiset jaksot ovat työn alla.' : 'Jaksot lisätään sivulle pian.'}
            </p>
            <p className="concept__empty-text">
              {coming
                ? 'Tunnetko parturin, jonka tuolissa Danielin pitäisi istahtaa? Vinkkaa!'
                : 'Sillä välin Danielin videoita voi seurata Instagramissa.'}
            </p>
            <div className="concept__empty-actions">
              {coming && (
                <Button to={contactPath('tarina')} variant="primary" size="sm">
                  Ehdota tarinaa
                </Button>
              )}
              <a href={site.instagramHref} className="concept__social" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                <span>@{site.instagram}</span>
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  )

  return (
    <section
      id={concept.id}
      className={`concept concept--${tone} section section--sm`}
      aria-labelledby={titleId}
    >
      {sheet ? (
        <div className={`sheet concept__sheet ${tone === 'tint' ? 'sheet--tint' : ''}`.trim()}>
          <div className="concept__glow" aria-hidden="true" />
          {content}
        </div>
      ) : (
        content
      )}
    </section>
  )
}

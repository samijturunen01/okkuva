import { Reveal } from './Reveal.jsx'
import { SplitWords } from './SplitWords.jsx'
import { Button } from './Button.jsx'
import { VideoCard } from './video/VideoCard.jsx'
import { ArrowIcon } from './icons.jsx'
import { getVideos } from '../data/videos.js'
import { RESULTS_PATH } from '../data/site.js'
import './CaseStudy.css'

/**
 * One client case: name, summary, tags, videos and (only when provided)
 * real metrics and a quote.
 *
 *   compact – home page preview: fewer videos + link to the full case
 */
export function CaseStudy({ study, index = 0, compact = false, headingLevel: Heading = 'h2' }) {
  const videos = getVideos(compact ? study.videos.slice(0, 3) : study.videos)
  const titleId = `case-${study.slug}-title`
  const hasMetrics = !compact && Array.isArray(study.metrics) && study.metrics.length > 0
  const hasQuote = !compact && study.quote && study.quote.text
  const impact = !compact && study.impact ? study.impact : null
  const classes = ['case', compact ? 'case--compact' : '', impact ? 'case--with-impact' : ''].filter(Boolean).join(' ')

  return (
    <article className={classes} id={compact ? undefined : study.slug} aria-labelledby={titleId}>
      <div className="case__header">
        <Reveal as="span" className="eyebrow">
          {compact ? 'Asiakas' : `Case ${String(index + 1).padStart(2, '0')}`}
        </Reveal>
        <Reveal as={Heading} id={titleId} className="case__client" delay={60}>
          <SplitWords text={study.client} />
        </Reveal>
        {study.tags && study.tags.length > 0 && (
          <Reveal as="ul" className="case__tags" delay={120} aria-label="Sisältötyypit">
            {study.tags.map((tag) => (
              <li key={tag} className="chip chip--outline">
                {tag}
              </li>
            ))}
          </Reveal>
        )}
        <Reveal as="p" className="case__summary" delay={160}>
          {study.summary}
        </Reveal>
        {compact && (
          <Reveal delay={220}>
            <Button to={`${RESULTS_PATH}#${study.slug}`} variant="ghost">
              Katso koko case
            </Button>
          </Reveal>
        )}
      </div>

      {impact && (
        <div className="case__impact">
          {impact.eyebrow && (
            <Reveal as="span" className="eyebrow case__impact-eyebrow">
              {impact.eyebrow}
            </Reveal>
          )}
          {impact.story && (
            <Reveal as="p" className="case__impact-story" delay={60}>
              {impact.story}
            </Reveal>
          )}

          {impact.growth && (
            <Reveal className="case__growth" delay={120} variant="scale">
              <p className="case__growth-jump">
                <span className="case__growth-from">{impact.growth.from}</span>
                <ArrowIcon className="case__growth-arrow" />
                <span className="visually-hidden">kasvoi</span>
                <span className="case__growth-to text-gradient">{impact.growth.to}</span>
              </p>
              <span className="case__growth-bar" aria-hidden="true" />
              <p className="case__growth-label">{impact.growth.label}</p>
              {impact.growth.note && <p className="case__growth-note">{impact.growth.note}</p>}
            </Reveal>
          )}

          {impact.stats && impact.stats.length > 0 && (
            <div className="case__impact-stats">
              {impact.stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  className={`case__stat ${stat.tone === 'dark' ? 'case__stat--dark' : ''}`.trim()}
                  delay={180 + i * 90}
                  variant="scale"
                >
                  <p className="case__stat-value text-gradient">{stat.value}</p>
                  <p className="case__stat-label">{stat.label}</p>
                  {stat.note && <p className="case__stat-note">{stat.note}</p>}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="case__videos">
        {videos.map((video, i) => (
          <Reveal key={video.id} delay={i * 90} variant="scale">
            <VideoCard video={video} showMeta={false} />
          </Reveal>
        ))}
      </div>

      {hasMetrics && (
        <dl className="case__metrics">
          {study.metrics.map((metric) => (
            <div className="case__metric" key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>
                <span className="case__metric-value text-gradient">{metric.value}</span>
                {metric.note && <span className="case__metric-note">{metric.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {hasQuote && (
        <blockquote className="case__quote">
          <p>“{study.quote.text}”</p>
          {study.quote.author && (
            <footer>
              {study.quote.author}
              {study.quote.role ? `, ${study.quote.role}` : ''}
            </footer>
          )}
        </blockquote>
      )}
    </article>
  )
}

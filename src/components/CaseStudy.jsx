import { Reveal } from './Reveal.jsx'
import { SplitWords } from './SplitWords.jsx'
import { Button } from './Button.jsx'
import { ImpactBlock } from './ImpactBlock.jsx'
import { VideoCard } from './video/VideoCard.jsx'
import { getVideos } from '../data/videos.js'
import { KIND_LABELS } from '../data/caseStudies.js'
import { COLLAB_PATH } from '../data/site.js'
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
          {KIND_LABELS[study.kind] || (compact ? 'Asiakas' : `Case ${String(index + 1).padStart(2, '0')}`)}
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
            <Button to={`${COLLAB_PATH}#${study.slug}`} variant="ghost">
              Katso koko case
            </Button>
          </Reveal>
        )}
      </div>

      {impact && <ImpactBlock impact={impact} />}

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

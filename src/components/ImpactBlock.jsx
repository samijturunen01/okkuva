import { Reveal } from './Reveal.jsx'
import { ArrowIcon } from './icons.jsx'
import './CaseStudy.css'

/**
 * Results of a case study: optional story, the before → after jump and the
 * headline figures. Renders only what the data provides (REAL numbers only).
 */
export function ImpactBlock({ impact, showStory = true, className = '' }) {
  if (!impact) return null

  return (
    <div className={`case__impact ${className}`.trim()}>
      {impact.eyebrow && (
        <Reveal as="span" className="eyebrow case__impact-eyebrow">
          {impact.eyebrow}
        </Reveal>
      )}
      {showStory && impact.story && (
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
  )
}

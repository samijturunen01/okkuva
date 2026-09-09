import { Reveal } from './Reveal.jsx'
import { CheckIcon, Icon } from './icons.jsx'
import './FeatureGrid.css'

/**
 * What every video includes.
 *   variant 'bento' – mixed-size tiles (home page)
 *   variant 'list'  – compact rows with check marks (pricing page)
 */
export function FeatureGrid({ features, variant = 'bento' }) {
  return (
    <ul className={`features features--${variant}`}>
      {features.map((feature, i) => {
        const size = feature.size || 'md'
        return (
          <Reveal
            as="li"
            key={feature.id}
            className={`feature feature--${size} ${feature.big ? 'feature--big' : ''}`.trim()}
            delay={Math.min(i, 6) * 60}
            variant="scale"
          >
            {variant === 'list' ? (
              <span className="feature__icon feature__icon--check">
                <CheckIcon />
              </span>
            ) : feature.big ? (
              <span className="feature__big text-gradient" aria-hidden="true">
                {feature.big}
              </span>
            ) : (
              <span className="feature__icon">
                <Icon name={feature.icon} />
              </span>
            )}
            <div className="feature__body">
              <h3 className="feature__title">{feature.title}</h3>
              <p className="feature__text">{feature.text}</p>
            </div>
          </Reveal>
        )
      })}
    </ul>
  )
}

import { useRef } from 'react'
import { Reveal } from './Reveal.jsx'
import { useTimelineProgress } from '../hooks/useTimelineProgress.js'
import './ProcessSteps.css'

/**
 * Vertical timeline whose connector line "draws" as the reader scrolls.
 * Steps light up one by one when they pass the focus line.
 */
export function ProcessSteps({ steps }) {
  const ref = useRef(null)
  useTimelineProgress(ref)

  return (
    <ol className="timeline" ref={ref}>
      <span className="timeline__line" aria-hidden="true">
        <span className="timeline__line-fill" />
      </span>
      {steps.map((step, i) => (
        <li
          key={step.number}
          className={`timeline__step ${i % 2 ? 'timeline__step--right' : 'timeline__step--left'}`}
          data-step
        >
          <span className="timeline__dot" aria-hidden="true" />
          <Reveal className="timeline__card" delay={60} variant={i % 2 ? 'right' : 'left'}>
            <span className="timeline__number" aria-hidden="true">
              {step.number}
            </span>
            <h3 className="timeline__title">
              {step.title}
              {step.subtitle && <span className="timeline__subtitle"> – {step.subtitle}</span>}
            </h3>
            <p className="timeline__text">{step.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

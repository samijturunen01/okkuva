import { SectionHeading } from '../components/SectionHeading.jsx'
import { ProcessSteps } from '../components/ProcessSteps.jsx'
import './Process.css'

/** Dark sheet with a scroll-drawn timeline of steps. */
export function Process({ id = 'process-title', eyebrow, title, highlight, lead, steps, children }) {
  return (
    <section className="section section--sm process" aria-labelledby={id}>
      <div className="sheet process__sheet">
        <div className="process__glow" aria-hidden="true" />
        <div className="container process__inner">
          <SectionHeading
            id={id}
            eyebrow={eyebrow}
            title={title}
            highlight={highlight}
            lead={lead}
            onDark
            align="center"
          />
          <ProcessSteps steps={steps} />
          {children}
        </div>
      </div>
    </section>
  )
}

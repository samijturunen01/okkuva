import { SectionHeading } from '../components/SectionHeading.jsx'
import { ProcessSteps } from '../components/ProcessSteps.jsx'
import { processSteps } from '../data/process.js'
import './Process.css'

export function Process() {
  return (
    <section className="section section--sm process" aria-labelledby="process-title">
      <div className="sheet process__sheet">
        <div className="process__glow" aria-hidden="true" />
        <div className="container process__inner">
          <SectionHeading
            id="process-title"
            eyebrow="Näin se menee"
            title="Neljä steppiä. Nolla säätöä sinulle."
            highlight={['Nolla']}
            lead="Sinun ei tarvitse projektipäällikköidä videotuotantoa. Me viemme homman ideasta valmiiseen videoon – sinä tulet paikalle ja olet oma itsesi."
            onDark
            align="center"
          />
          <ProcessSteps steps={processSteps} />
        </div>
      </div>
    </section>
  )
}

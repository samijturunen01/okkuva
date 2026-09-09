import { SectionHeading } from '../components/SectionHeading.jsx'
import { CaseStudy } from '../components/CaseStudy.jsx'
import { featuredCaseStudies } from '../data/caseStudies.js'

export function ResultsPreview() {
  if (featuredCaseStudies.length === 0) return null

  return (
    <section className="section results-preview" aria-labelledby="results-title">
      <div className="container">
        <SectionHeading
          id="results-title"
          eyebrow="Tulokset"
          title="Töitä, joista olemme ylpeitä."
          highlight={['ylpeitä']}
          lead="Tässä muutama esimerkki siitä, millaisia videoita teemme ja kenelle."
        />
        {featuredCaseStudies.map((study, i) => (
          <CaseStudy key={study.slug} study={study} index={i} compact headingLevel="h3" />
        ))}
      </div>
    </section>
  )
}

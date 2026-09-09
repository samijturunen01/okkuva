import { useSeo } from '../hooks/useSeo.js'
import { PageHeader } from '../components/PageHeader.jsx'
import { CaseStudy } from '../components/CaseStudy.jsx'
import { ContactCta } from '../sections/ContactCta.jsx'
import { caseStudies } from '../data/caseStudies.js'

export default function Results() {
  useSeo({
    title: 'Tulokset',
    description:
      'Katso, millaisia lyhytvideoita OKKUVA on tehnyt asiakkailleen – esimerkkinä Business Joensuu. Videot, jotka pysäyttävät scrollaamisen.',
    path: '/tulokset',
  })

  return (
    <>
      <PageHeader
        eyebrow="Tulokset"
        title="Videoita, jotka tekevät töitä."
        highlight={['töitä']}
        lead="Tämä ei ole pelkkä portfolio. Tässä näet, millaisia videoita olemme tehneet, kenelle ja miksi."
      />

      <section className="section section--flush-top" aria-label="Asiakastyöt">
        <div className="container">
          {caseStudies.map((study, i) => (
            <CaseStudy key={study.slug} study={study} index={i} />
          ))}
        </div>
      </section>

      <ContactCta title="Seuraavaksi tähän listalle?" highlight={['listalle']} />
    </>
  )
}

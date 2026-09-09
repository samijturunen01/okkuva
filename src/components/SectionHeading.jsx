import { Reveal } from './Reveal.jsx'
import { SplitWords } from './SplitWords.jsx'
import './SectionHeading.css'

/**
 * Eyebrow label + big title + optional lead paragraph, with scroll reveal.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  lead,
  align = 'left',
  onDark = false,
  as: Heading = 'h2',
  className = '',
  id,
}) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`.trim()}>
      {eyebrow && (
        <Reveal as="span" className={`eyebrow ${onDark ? 'eyebrow--on-dark' : ''}`.trim()}>
          {eyebrow}
        </Reveal>
      )}
      <Reveal as={Heading} delay={60} id={id} className="section-heading__title">
        <SplitWords text={title} highlight={highlight} />
      </Reveal>
      {lead && (
        <Reveal as="p" className="lead" delay={180}>
          {lead}
        </Reveal>
      )}
    </div>
  )
}

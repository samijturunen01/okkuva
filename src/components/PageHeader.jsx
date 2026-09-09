import { Reveal } from './Reveal.jsx'
import { SplitWords } from './SplitWords.jsx'
import './PageHeader.css'

/**
 * Hero-like header for sub pages.
 */
export function PageHeader({ eyebrow, title, highlight, lead, children }) {
  return (
    <header className="page-header">
      <div className="page-header__glow" aria-hidden="true" />
      <div className="container page-header__inner">
        {eyebrow && (
          <Reveal as="span" className="eyebrow">
            {eyebrow}
          </Reveal>
        )}
        <Reveal as="h1" delay={60} className="page-header__title">
          <SplitWords text={title} highlight={highlight} />
        </Reveal>
        {lead && (
          <Reveal as="p" className="lead page-header__lead" delay={200}>
            {lead}
          </Reveal>
        )}
        {children}
      </div>
    </header>
  )
}

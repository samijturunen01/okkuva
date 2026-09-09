import { Fragment } from 'react'

/**
 * Splits text into words, each wrapped in a clipping mask so they can rise in
 * one by one (see .split styles in animations.css / Hero.css).
 *
 *   highlight – array of words (exact match) that get the gradient treatment
 *   wordClassName – extra class for every word (e.g. hero__word)
 */
export function SplitWords({ text, highlight = [], className = '', wordClassName = '', startIndex = 0 }) {
  const words = text.split(' ')
  const highlighted = new Set(highlight)
  return (
    <span className={`split ${className}`.trim()}>
      {words.map((word, i) => {
        const isHighlight = highlighted.has(word.replace(/[.,!?]$/, ''))
        return (
          <Fragment key={`${word}-${i}`}>
            <span className="split__mask">
              <span
                className={`split__word ${wordClassName} ${isHighlight ? 'text-gradient' : ''}`.trim()}
                style={{ '--i': i + startIndex }}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        )
      })}
    </span>
  )
}

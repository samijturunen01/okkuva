import { useEffect, useRef, useState } from 'react'
import { VideoCard } from './VideoCard.jsx'
import { Reveal } from '../Reveal.jsx'
import { ArrowIcon, ArrowLeftIcon } from '../icons.jsx'
import './VideoReel.css'

/**
 * Horizontally scrolling row of phone cards with scroll-snap, drag/swipe and
 * previous/next buttons (shown only when the row actually overflows).
 */
export function VideoReel({ videos, label = 'Referenssivideot' }) {
  const trackRef = useRef(null)
  const [overflowing, setOverflowing] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return undefined
    const check = () => setOverflowing(el.scrollWidth > el.clientWidth + 8)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollByCard = (direction) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.reel__item')
    const gap = parseFloat(getComputedStyle(el).columnGap || '16') || 16
    const amount = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <div className="reel">
      <ul className="reel__track" ref={trackRef} aria-label={label}>
        {videos.map((video, i) => (
          <li className="reel__item" key={video.id}>
            <Reveal delay={Math.min(i, 3) * 90}>
              <VideoCard video={video} eager={i === 0} />
            </Reveal>
          </li>
        ))}
      </ul>
      {overflowing && (
        <div className="reel__controls">
          <button type="button" className="reel__btn" onClick={() => scrollByCard(-1)} aria-label="Edellinen video">
            <ArrowLeftIcon />
          </button>
          <button type="button" className="reel__btn" onClick={() => scrollByCard(1)} aria-label="Seuraava video">
            <ArrowIcon />
          </button>
        </div>
      )}
    </div>
  )
}

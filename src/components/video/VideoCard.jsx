import { useRef, useState } from 'react'
import { useVideoPlayer } from './VideoPlayerContext.jsx'
import { publicUrl } from '../../config/site.js'
import { VIDEO_HEIGHT, VIDEO_WIDTH } from '../../data/videos.js'
import { PlayIcon } from '../icons.jsx'
import './Phone.css'
import './VideoCard.css'

/**
 * Vertical phone-style video card.
 *  - shows the poster image
 *  - on hover (mouse users only) plays a short muted preview
 *  - click opens the full video with sound in the modal player
 */
export function VideoCard({ video, eager = false, showMeta = true, className = '' }) {
  const { open } = useVideoPlayer()
  const previewRef = useRef(null)
  const [previewActive, setPreviewActive] = useState(false)
  const canPreview = Boolean(video.preview)

  const startPreview = () => {
    if (!canPreview) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = previewRef.current
    if (!el) return
    if (!el.getAttribute('src')) el.src = publicUrl(video.preview)
    const playing = el.play()
    if (playing && playing.catch) playing.catch(() => {})
    setPreviewActive(true)
  }

  const stopPreview = () => {
    const el = previewRef.current
    if (el) {
      el.pause()
      try {
        el.currentTime = 0
      } catch {
        /* ignore */
      }
    }
    setPreviewActive(false)
  }

  return (
    <article className={`video-card ${className}`.trim()}>
      <button
        type="button"
        className="video-card__button"
        onClick={() => open(video)}
        onPointerEnter={startPreview}
        onPointerLeave={stopPreview}
        onFocus={startPreview}
        onBlur={stopPreview}
        aria-label={`Toista video: ${video.title}`}
      >
        <span className="phone">
          <span className="phone__screen">
            <img
              className="phone__poster"
              src={publicUrl(video.poster)}
              alt=""
              width={VIDEO_WIDTH}
              height={VIDEO_HEIGHT}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={eager ? 'high' : undefined}
            />
            {canPreview && (
              <video
                ref={previewRef}
                className={`phone__media video-card__preview ${previewActive ? 'is-active' : ''}`.trim()}
                muted
                playsInline
                loop
                preload="none"
                tabIndex={-1}
                aria-hidden="true"
              />
            )}
            <span className="phone__island" aria-hidden="true" />
            <span className="video-card__shade" aria-hidden="true" />
            <span className="video-card__play" aria-hidden="true">
              <PlayIcon />
            </span>
            {video.duration && (
              <span className="video-card__duration chip chip--dark" aria-hidden="true">
                {video.duration}
              </span>
            )}
            {!showMeta && (
              <span className="video-card__caption" aria-hidden="true">
                {video.kicker && <span className="video-card__kicker">{video.kicker}</span>}
                <span className="video-card__caption-title">{video.title}</span>
              </span>
            )}
          </span>
        </span>
      </button>

      {showMeta && (
        <div className="video-card__meta">
          {video.kicker && <span className="video-card__kicker">{video.kicker}</span>}
          <h3 className="video-card__heading">{video.title}</h3>
          {video.description && <p className="video-card__desc">{video.description}</p>}
        </div>
      )}
    </article>
  )
}

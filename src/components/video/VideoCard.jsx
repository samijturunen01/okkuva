import { useRef, useState } from 'react'
import { useVideoPlayer } from './VideoPlayerContext.jsx'
import { ReelsOverlay } from './ReelsOverlay.jsx'
import { Glasses } from '../glasses/Glasses.jsx'
import { publicUrl } from '../../config/site.js'
import { VIDEO_HEIGHT, VIDEO_WIDTH, hasMedia } from '../../data/videos.js'
import { videoLabel } from '../../data/concepts.js'
import { ArrowIcon, PlayIcon } from '../icons.jsx'
import './Phone.css'
import './VideoCard.css'

/**
 * Vertical phone-style video card.
 *  - shows the poster image
 *  - on hover (mouse users only) plays a short muted preview
 *  - click opens the full video with sound in the modal player – or, when the
 *    video only has a link (`href`, no `src`), opens the published video
 *  - without a poster the card is a branded "video lisätään pian" placeholder,
 *    so pending videos can be listed before their files exist
 *  - `showMeta` adds the label/title/description block under the card. The
 *    label always says what the video is (own concept, commercial
 *    collaboration or client work).
 *  - shows the Instagram Reels overlay on top of the video: profile row and
 *    caption bottom left, engagement rail on the right (visual only,
 *    pointer-events: none, so the whole card stays clickable)
 */
export function VideoCard({ video, eager = false, showMeta = true, className = '' }) {
  const { open } = useVideoPlayer()
  const previewRef = useRef(null)
  const [previewActive, setPreviewActive] = useState(false)
  const pending = !hasMedia(video)
  const playable = Boolean(video.src) && !pending
  const canPreview = playable && Boolean(video.preview)
  const label = videoLabel(video)
  const platform = video.platform || 'some'

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

  const screen = pending ? (
    <span className="phone__screen video-card__placeholder">
      <span className="video-card__placeholder-glow" aria-hidden="true" />
      <span className="video-card__placeholder-mark" aria-hidden="true">
        <Glasses />
      </span>
      <span className="video-card__placeholder-text">
        <span className="video-card__placeholder-kicker">{label}</span>
        <span className="video-card__placeholder-title">{video.title}</span>
      </span>
      <span className="video-card__placeholder-status chip chip--dark">
        {video.href ? `Katso video: ${platform}` : 'Video lisätään pian'}
      </span>
    </span>
  ) : (
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
      <ReelsOverlay video={video} />
      <span className="video-card__play" aria-hidden="true">
        {playable ? <PlayIcon /> : <ArrowIcon />}
      </span>
      {video.duration && (
        <span className="video-card__duration chip chip--dark" aria-hidden="true">
          {video.duration}
        </span>
      )}
    </span>
  )

  const frame = <span className="phone">{screen}</span>

  let trigger
  if (playable) {
    trigger = (
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
        {frame}
      </button>
    )
  } else if (video.href) {
    trigger = (
      <a
        href={video.href}
        className="video-card__button"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Katso video: ${video.title} (${platform}, avautuu uuteen välilehteen)`}
      >
        {frame}
      </a>
    )
  } else {
    trigger = <div className="video-card__frame">{frame}</div>
  }

  return (
    <article className={`video-card ${pending ? 'video-card--pending' : ''} ${className}`.trim()}>
      {trigger}

      {showMeta && (
        <div className="video-card__meta">
          <span className={`video-card__badge video-card__badge--${video.kind || 'own'}`}>{label}</span>
          <h3 className="video-card__heading">{video.title}</h3>
          {video.description && <p className="video-card__desc">{video.description}</p>}
          {playable && video.href && (
            <a className="video-card__ext link-arrow" href={video.href} target="_blank" rel="noopener noreferrer">
              Katso julkaisu ({platform})
              <ArrowIcon />
            </a>
          )}
        </div>
      )}
    </article>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { useVideoPlayer } from './VideoPlayerContext.jsx'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll.js'
import { publicUrl } from '../../config/site.js'
import { CloseIcon } from '../icons.jsx'
import './Phone.css'
import './VideoModal.css'

/**
 * Phone-shaped modal player built on the native <dialog> element
 * (focus trapping, Escape and backdrop come for free).
 */
export function VideoModal() {
  const { current, close } = useVideoPlayer()
  const dialogRef = useRef(null)
  const videoRef = useRef(null)
  const [closing, setClosing] = useState(false)
  useLockBodyScroll(Boolean(current))

  useEffect(() => {
    const dialog = dialogRef.current
    const video = videoRef.current
    if (!dialog) return
    if (current) {
      if (!dialog.open) dialog.showModal()
      if (video) {
        video.src = publicUrl(current.src)
        video.load()
        const playing = video.play()
        if (playing && playing.catch) playing.catch(() => {})
      }
    } else {
      if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
      if (dialog.open) dialog.close()
    }
  }, [current])

  const requestClose = useCallback(() => {
    if (!current || closing) return
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      close()
    }, 220)
  }, [current, closing, close])

  return (
    <dialog
      ref={dialogRef}
      className={`video-modal ${closing ? 'is-closing' : ''}`.trim()}
      aria-labelledby="video-modal-title"
      onCancel={(event) => {
        event.preventDefault()
        requestClose()
      }}
      onClose={() => {
        if (current) close()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) requestClose()
      }}
    >
      <div className="video-modal__inner">
        <div className="phone phone--modal">
          <div className="phone__screen">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              ref={videoRef}
              className="phone__media"
              controls
              playsInline
              preload="metadata"
              poster={current ? publicUrl(current.poster) : undefined}
            />
          </div>
        </div>
        <div className="video-modal__caption">
          {current && current.kicker && <span className="eyebrow eyebrow--on-dark">{current.kicker}</span>}
          <h2 id="video-modal-title" className="video-modal__title">
            {current ? current.title : 'Video'}
          </h2>
          {current && current.description && <p>{current.description}</p>}
        </div>
      </div>
      <button type="button" className="video-modal__close" onClick={requestClose} aria-label="Sulje video">
        <CloseIcon />
      </button>
    </dialog>
  )
}

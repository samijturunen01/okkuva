import { useId } from 'react'
import {
  BROW_PATH,
  BROW_RIGHT_TRANSFORM,
  COLORS,
  FRAME_PATH,
  GLARE_PATH,
  GLARE_RIGHT_OFFSET,
  GLARE_STROKE_WIDTH,
  LENS_LEFT_PATH,
  LENS_RIGHT_PATH,
  VIEWBOX,
} from './geometry.js'
import './Glasses.css'

/**
 * The OKKUVA glasses + eyebrows as an SVG built from separate parts so they
 * can be animated.
 *
 *   variant: 'static'    – plain mark
 *            'hero'      – entrance choreography + idle animations (CSS)
 *            'surprised' – brows raised (404 page)
 *
 * Pointer reactivity: set `--tx` / `--ty` (-1…1) on any ancestor (see
 * usePointerTilt) and the brows + lens reflections follow the cursor.
 */
export function Glasses({ variant = 'static', className = '', title, ...rest }) {
  const uid = useId().replace(/:/g, '')
  const lensId = `lens-${uid}`
  const sweepId = `sweep-${uid}`
  const clipId = `clip-${uid}`
  const titleId = `title-${uid}`

  return (
    <svg
      viewBox={VIEWBOX}
      className={`glasses glasses--${variant} ${className}`.trim()}
      role={title ? 'img' : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
      {...rest}
    >
      {title && <title id={titleId}>{title}</title>}
      <defs>
        <linearGradient id={lensId} x1="0" y1="0" x2="0" y2="1">
          <stop className="glasses__stop glasses__stop--top" offset="0" stopColor={COLORS.lensTop} />
          <stop className="glasses__stop glasses__stop--mid" offset="0.55" stopColor={COLORS.lensMid} />
          <stop className="glasses__stop glasses__stop--bottom" offset="1" stopColor={COLORS.lensBottom} />
        </linearGradient>
        <linearGradient id={sweepId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={LENS_LEFT_PATH} />
          <path d={LENS_RIGHT_PATH} />
        </clipPath>
      </defs>

      {/* Unlit lenses – visible for a moment before the orange "ignites". */}
      <g className="glasses__lenses-dark">
        <path d={LENS_LEFT_PATH} className="glasses__lens-dark" />
        <path d={LENS_RIGHT_PATH} className="glasses__lens-dark" />
      </g>

      <g className="glasses__lenses">
        <path className="glasses__lens" d={LENS_LEFT_PATH} fill={`url(#${lensId})`} />
        <path className="glasses__lens" d={LENS_RIGHT_PATH} fill={`url(#${lensId})`} />
        <g clipPath={`url(#${clipId})`}>
          <g className="glasses__glare">
            <path
              d={GLARE_PATH}
              stroke={COLORS.glare}
              strokeWidth={GLARE_STROKE_WIDTH}
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
            <path
              d={GLARE_PATH}
              transform={`translate(${GLARE_RIGHT_OFFSET} 0)`}
              stroke={COLORS.glare}
              strokeWidth={GLARE_STROKE_WIDTH}
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
          </g>
          <rect className="glasses__sweep" x="0" y="140" width="320" height="520" fill={`url(#${sweepId})`} />
        </g>
      </g>

      <path className="glasses__frame" d={FRAME_PATH} fill={COLORS.ink} fillRule="evenodd" />

      <g className="glasses__brows">
        <g className="glasses__brow glasses__brow--left">
          <path d={BROW_PATH} fill={COLORS.brow} />
        </g>
        <g className="glasses__brow glasses__brow--right">
          <g className="glasses__brow-idle">
            <path d={BROW_PATH} transform={BROW_RIGHT_TRANSFORM} fill={COLORS.brow} />
          </g>
        </g>
      </g>
    </svg>
  )
}

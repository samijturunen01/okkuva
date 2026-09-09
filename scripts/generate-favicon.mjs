/**
 * Writes public/favicon.svg from the traced glasses geometry.
 * Run: node scripts/generate-favicon.mjs
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
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
} from '../src/components/glasses/geometry.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Square canvas with the mark centred (mark is 1339 × ~650 → pad vertically).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -380 1420 1420">
  <defs>
    <linearGradient id="lens" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${COLORS.lensTop}"/>
      <stop offset="0.55" stop-color="${COLORS.lensMid}"/>
      <stop offset="1" stop-color="${COLORS.lensBottom}"/>
    </linearGradient>
    <clipPath id="clip"><path d="${LENS_LEFT_PATH}"/><path d="${LENS_RIGHT_PATH}"/></clipPath>
  </defs>
  <path d="${LENS_LEFT_PATH}" fill="url(#lens)"/>
  <path d="${LENS_RIGHT_PATH}" fill="url(#lens)"/>
  <g clip-path="url(#clip)" stroke="${COLORS.glare}" stroke-width="${GLARE_STROKE_WIDTH}" stroke-linecap="round" fill="none" opacity="0.95">
    <path d="${GLARE_PATH}"/>
    <path d="${GLARE_PATH}" transform="translate(${GLARE_RIGHT_OFFSET} 0)"/>
  </g>
  <path d="${FRAME_PATH}" fill="${COLORS.ink}" fill-rule="evenodd"/>
  <path d="${BROW_PATH}" fill="${COLORS.brow}"/>
  <path d="${BROW_PATH}" transform="${BROW_RIGHT_TRANSFORM}" fill="${COLORS.brow}"/>
</svg>
`

writeFileSync(path.join(root, 'public', 'favicon.svg'), svg)
console.log('public/favicon.svg written')

/**
 * Vector geometry of the OKKUVA glasses mark.
 *
 * The shapes were traced from the original logo file so the animated SVG
 * matches the brand mark closely. All coordinates live in a 1339 × 660 box
 * (viewBox "0 -10 1339 660"); the mark is symmetric around x = 669.5.
 *
 * Do not "tune" these by hand unless you are intentionally changing the mark.
 */

export const WIDTH = 1339
export const VIEWBOX = '0 -10 1339 660'
export const CENTER_X = WIDTH / 2

const fmt = (n) => Number(n.toFixed(1))

/** Serialise a command list ([type, ...coords]) into a path `d` string. */
function toPath(cmds) {
  return cmds.map((c) => c[0] + c.slice(1).map(fmt).join(' ')).join(' ')
}

/** Mirror every coordinate pair in a command list around the centre axis. */
function mirrorCmds(cmds) {
  return cmds.map((c) => {
    const out = [c[0]]
    for (let i = 1; i < c.length; i += 2) out.push(WIDTH - c[i], c[i + 1])
    return out
  })
}

/**
 * Given an open boundary that runs from the top centre to the bottom centre of
 * the left half, produce the commands that continue the same boundary back on
 * the right half (mirrored, in reverse order).
 */
function mirrorContinue(cmds) {
  const ends = cmds.map((c) => [c[c.length - 2], c[c.length - 1]])
  const m = (p) => [WIDTH - p[0], p[1]]
  const out = []
  for (let k = cmds.length - 1; k >= 1; k--) {
    const c = cmds[k]
    const start = ends[k - 1]
    if (c[0] === 'C') out.push(['C', ...m([c[3], c[4]]), ...m([c[1], c[2]]), ...m(start)])
    else if (c[0] === 'Q') out.push(['Q', ...m([c[1], c[2]]), ...m(start)])
    else if (c[0] === 'L') out.push(['L', ...m(start)])
  }
  return out
}

/* Left half of the frame silhouette: top centre → outer edge → bottom → inner edge → bridge underside. */
const frameLeft = [
  ['M', 669.5, 231],
  ['C', 630, 231, 600, 214, 555, 204],
  ['C', 500, 193, 420, 185, 334, 184],
  ['C', 230, 184, 120, 190, 60, 200],
  ['C', 32, 203, 8, 214, 5, 240],
  ['L', 5, 300],
  ['C', 5, 320, 30, 335, 46, 362],
  ['Q', 60, 470, 111, 578],
  ['C', 128, 600, 170, 630, 244, 633],
  ['Q', 360, 636, 454, 622],
  ['C', 510, 608, 550, 570, 562, 530],
  ['L', 622, 362],
  ['C', 628, 345, 645, 333, 669.5, 333],
]

/* Left lens opening. */
const lensLeft = [
  ['M', 112, 300],
  ['C', 112, 272, 145, 248, 215, 241],
  ['Q', 330, 236, 455, 244],
  ['C', 515, 247, 560, 270, 564, 326],
  ['Q', 556, 440, 508, 530],
  ['C', 470, 575, 420, 596, 330, 596],
  ['C', 240, 596, 150, 575, 133, 518],
  ['Q', 108, 400, 112, 300],
  ['Z'],
]

const lensRight = mirrorCmds(lensLeft)

/** Frame outline with both lens openings cut out (use fill-rule="evenodd"). */
export const FRAME_PATH = `${toPath([...frameLeft, ...mirrorContinue(frameLeft), ['Z']])} ${toPath(lensLeft)} ${toPath(lensRight)}`

/** Full silhouette of the frame without lens cut-outs (useful for clip paths / shadows). */
export const FRAME_SILHOUETTE = toPath([...frameLeft, ...mirrorContinue(frameLeft), ['Z']])

export const LENS_LEFT_PATH = toPath(lensLeft)
export const LENS_RIGHT_PATH = toPath(lensRight)

/** Left eyebrow – the right one is the same path mirrored with BROW_RIGHT_TRANSFORM. */
export const BROW_PATH =
  'M106 6 C170 8 330 26 540 56 C560 50 582 40 596 46 C612 54 612 90 596 104 C585 116 560 122 520 120 L232 74 Q170 66 126 74 Q80 78 36 106 Q28 108 33 98 Q50 60 107 32 C118 28 116 16 106 6 Z'
export const BROW_RIGHT_TRANSFORM = `matrix(-1 0 0 1 ${WIDTH} 0)`

/** Highlight reflection inside the left lens (stroke). Shift by GLARE_RIGHT_OFFSET for the right lens. */
export const GLARE_PATH = 'M288 284 Q200 282 160 302 Q150 330 146 384'
export const GLARE_RIGHT_OFFSET = 663
export const GLARE_STROKE_WIDTH = 34

/** Brand colours sampled from the logo. */
export const COLORS = {
  ink: '#121213',
  brow: '#1B1811',
  lensTop: '#F58A2F',
  lensMid: '#F86B2C',
  lensBottom: '#F74D2C',
  glare: '#FBB068',
}

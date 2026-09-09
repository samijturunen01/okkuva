/**
 * Convert a source video (e.g. straight from an iPhone) into the three files
 * the site uses:
 *
 *   public/videos/<slug>.mp4           720×1280 H.264 + AAC, streaming friendly
 *   public/videos/<slug>-preview.mp4   first 6 s, 480px wide, no audio (hover preview)
 *   public/videos/<slug>-poster.webp   still frame used as the poster image
 *
 * Usage:
 *   node scripts/optimize-media.mjs "path/to/Video.mov" my-video-slug [posterSeconds]
 *
 * Requires ffmpeg on the PATH – or run `npm i -D ffmpeg-static` and the script
 * will use that binary instead.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const [input, slug, posterSeconds = '1.0'] = process.argv.slice(2)

if (!input || !slug) {
  console.error('Usage: node scripts/optimize-media.mjs <input video> <slug> [posterSeconds]')
  process.exit(1)
}
if (!existsSync(input)) {
  console.error(`Input file not found: ${input}`)
  process.exit(1)
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('Slug may only contain lowercase letters, numbers and dashes, e.g. "kesakampanja-2026".')
  process.exit(1)
}

async function findFfmpeg() {
  const probe = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' })
  if (probe.status === 0) return 'ffmpeg'
  try {
    const mod = await import('ffmpeg-static')
    return mod.default || mod
  } catch {
    console.error('ffmpeg not found. Install it (https://ffmpeg.org) or run: npm i -D ffmpeg-static')
    process.exit(1)
  }
}

const ffmpeg = await findFfmpeg()
const outDir = path.join(process.cwd(), 'public', 'videos')
mkdirSync(outDir, { recursive: true })

const run = (args, label) => {
  console.log(`→ ${label}`)
  const result = spawnSync(ffmpeg, ['-v', 'error', '-y', ...args], { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error(`ffmpeg failed while creating ${label}`)
    process.exit(result.status || 1)
  }
}

const full = path.join(outDir, `${slug}.mp4`)
const preview = path.join(outDir, `${slug}-preview.mp4`)
const poster = path.join(outDir, `${slug}-poster.webp`)

run(
  [
    '-i', input,
    '-vf', 'scale=720:-2',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '27',
    '-maxrate', '2500k', '-bufsize', '5000k',
    '-profile:v', 'high', '-level', '4.0', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
    '-movflags', '+faststart',
    full,
  ],
  `${slug}.mp4`,
)

run(
  [
    '-ss', '0', '-t', '6', '-i', input,
    '-vf', 'scale=480:-2', '-an',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '30',
    '-profile:v', 'main', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    preview,
  ],
  `${slug}-preview.mp4`,
)

run(
  ['-ss', String(posterSeconds), '-i', input, '-frames:v', '1', '-vf', 'scale=720:-2', '-c:v', 'libwebp', '-quality', '82', poster],
  `${slug}-poster.webp`,
)

console.log(`
Done. Add this to src/data/videos.js:

  {
    id: '${slug}',
    title: 'Videon otsikko',
    kicker: 'Haastattelu',
    description: 'Lyhyt kuvaus videosta.',
    duration: '0:00',
    src: 'videos/${slug}.mp4',
    preview: 'videos/${slug}-preview.mp4',
    poster: 'videos/${slug}-poster.webp',
  },
`)

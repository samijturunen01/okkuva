/**
 * Reference videos shown on the site.
 *
 * Files live in /public/videos. To add a video, drop the optimized files in
 * that folder (see README → "Videoiden lisääminen") and add an entry here:
 *
 *   src      – full video (MP4/H.264, 720×1280 recommended, sound on)
 *   preview  – short muted clip played on hover (optional, keep it < 1 MB)
 *   poster   – still image shown before playback (WebP/JPEG, same aspect ratio)
 *   duration – shown on the card, e.g. "0:49"
 *   kicker   – short category label, e.g. "Haastattelu"
 *
 * Paths are relative to /public and resolved with publicUrl() so they also
 * work under a GitHub Pages sub-folder.
 */
export const videos = [
  {
    id: 'kioski-70-luku',
    title: '70-luvun kioski',
    kicker: 'Haastattelu',
    description: 'Alkuperäinen 70-luvun kioski ja sen omistaja kertovat tarinansa.',
    duration: '0:49',
    src: 'videos/kioski-70-luku.mp4',
    preview: 'videos/kioski-70-luku-preview.mp4',
    poster: 'videos/kioski-70-luku-poster.webp',
  },
  {
    id: 'paateri-koli',
    title: 'Taiteilijakoti Paateri',
    kicker: 'Kohde-esittely',
    description: 'Kierros Kolin lähellä sijaitsevassa Taiteilijakoti Paaterissa ja Eva Ryynäsen veistosten parissa.',
    duration: '1:09',
    src: 'videos/paateri-koli.mp4',
    preview: 'videos/paateri-koli-preview.mp4',
    poster: 'videos/paateri-koli-poster.webp',
  },
  {
    id: 'liekinheitin-kirkossa',
    title: 'Liekinheitin kirkossa',
    kicker: 'Esitys',
    description: 'Euroviisukappale Liekinheitin esitettynä kirkossa.',
    duration: '0:57',
    src: 'videos/liekinheitin-kirkossa.mp4',
    preview: 'videos/liekinheitin-kirkossa-preview.mp4',
    poster: 'videos/liekinheitin-kirkossa-poster.webp',
  },
  {
    id: 'karjalainen-kansanmusiikki',
    title: 'Karjalaista kansanmusiikkia',
    kicker: 'Tapahtuma',
    description: 'Karjalaista kansanmusiikkia ja tanssia ulkoilmalavalla.',
    duration: '0:35',
    src: 'videos/karjalainen-kansanmusiikki.mp4',
    preview: 'videos/karjalainen-kansanmusiikki-preview.mp4',
    poster: 'videos/karjalainen-kansanmusiikki-poster.webp',
  },
]

/** Every video is vertical 9:16 – used for width/height attributes to avoid layout shift. */
export const VIDEO_WIDTH = 720
export const VIDEO_HEIGHT = 1280

export const videoById = Object.fromEntries(videos.map((v) => [v.id, v]))

export function getVideos(ids) {
  return ids.map((id) => videoById[id]).filter(Boolean)
}

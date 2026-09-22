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
 *   stats    – real Instagram engagement, shown in the Reels-style overlay on
 *              the video ({ likes, comments, shares, saves }). REAL numbers only.
 *   caption  – first line of the Instagram caption, shown under the username in
 *              the overlay. Keep it short and end it with "…" like Instagram's
 *              own truncation – the overlay only has room for 1–2 lines.
 *   account  – optional per-video override for `reelsAccount` below.
 *
 * Omit both `stats` and `caption` and no overlay is rendered.
 *
 * Paths are relative to /public and resolved with publicUrl() so they also
 * work under a GitHub Pages sub-folder.
 */
/**
 * The Instagram account the reference videos were published from. Shown in the
 * Reels-style overlay (profile picture, username, "Seuraa" button, and the
 * square mark at the bottom of the right-hand rail).
 *
 * `mark` is a square image in /public (150×150 or larger). Replace the file –
 * or point `mark` at another file in public/brand – to swap the logo.
 */
export const reelsAccount = {
  handle: 'visitkarelia_finland',
  followLabel: 'Seuraa',
  mark: 'brand/visitkarelia-logo.jpg',
  name: 'VisitKarelia',
}

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
    stats: { likes: 7844, comments: 154, shares: 1499, saves: 488 },
    caption: 'Pohjois-Karjalan vanhin alkuperäinen kioski, …',
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
    stats: { likes: 4863, comments: 148, shares: 301, saves: 217 },
    caption: 'Paateri sijaitsee Pohjois-Karjalassa, Lieksassa …',
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
    stats: { likes: 983, comments: 46, shares: 77, saves: 29 },
    caption: 'Greetings from Finland 🇫🇮 …',
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
    stats: { likes: 876, comments: 11, shares: 83, saves: 52 },
    caption: 'Karelian folk music has been an integral part of …',
  },
]

/** Every video is vertical 9:16 – used for width/height attributes to avoid layout shift. */
export const VIDEO_WIDTH = 720
export const VIDEO_HEIGHT = 1280

export const videoById = Object.fromEntries(videos.map((v) => [v.id, v]))

export function getVideos(ids) {
  return ids.map((id) => videoById[id]).filter(Boolean)
}

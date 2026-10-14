/**
 * Videos shown on the site.
 *
 * Files live in /public/videos. To add a video, drop the optimized files in
 * that folder (see README → "Videoiden lisääminen") and add or fill in an
 * entry here:
 *
 *   kind     – what the video is. Shown on the card so visitors can always tell:
 *                'own'        – Danielin oma video (one of his concepts)
 *                'collab'     – kaupallinen yhteistyö. The card is labelled
 *                               "Kaupallinen yhteistyö" (advertising must be
 *                               recognisable) – set `client` too.
 *                'production' – tilaustyö / videotuotanto for a client
 *   concept  – id from src/data/concepts.js (own / collab videos)
 *   client   – organisation the video was made with or for
 *   src      – full video (MP4/H.264, 720×1280 recommended, sound on)
 *   preview  – short muted clip played on hover (optional, keep it < 1 MB)
 *   poster   – still image shown before playback (WebP/JPEG, same aspect ratio)
 *   href     – link to the published video (Instagram, TikTok, YouTube…).
 *              Used when there is no `src`: the card then opens the link.
 *   platform – name of the service `href` points to, e.g. "Instagram"
 *   duration – shown on the card, e.g. "0:49"
 *   featured – order on the home page (1 = first). Only videos that have a
 *              poster are shown there, so pending entries never appear empty.
 *   stats    – real Instagram engagement, shown in the Reels-style overlay on
 *              the video ({ likes, comments, shares, saves }). REAL numbers only.
 *   caption  – first line of the Instagram caption, shown under the username in
 *              the overlay. Keep it short and end it with "…" like Instagram's
 *              own truncation – the overlay only has room for 1–2 lines.
 *   account  – optional per-video override for `reelsAccount` below.
 *
 * An entry without `poster` is shown as a "video lisätään pian" placeholder
 * card. Omit both `stats` and `caption` and no Reels overlay is rendered.
 *
 * Paths are relative to /public and resolved with publicUrl() so they also
 * work under a GitHub Pages sub-folder.
 */

/**
 * The Instagram account the VisitKarelia videos were published from. Shown in
 * the Reels-style overlay (profile picture, username, "Seuraa" button, and the
 * square mark at the bottom of the right-hand rail).
 *
 * `mark` is a square image in /public (150×150 or larger). Replace the file –
 * or point `mark` at another file in public/brand – to swap the logo. Videos
 * published on Daniel's own account should set `account: danielAccount`.
 */
export const reelsAccount = {
  handle: 'visitkarelia_finland',
  followLabel: 'Seuraa',
  mark: 'brand/visitkarelia-logo.jpg',
  name: 'VisitKarelia',
}

/**
 * Daniel's own Instagram account for the overlay.
 * TODO (Daniel): lisää neliön muotoinen profiilikuva public/brand/daniel-avatar.jpg
 * ennen kuin käytät tätä videoissa, joilla on `stats` tai `caption`.
 */
export const danielAccount = {
  handle: 'danielsilkin',
  followLabel: 'Seuraa',
  mark: 'brand/daniel-avatar.jpg',
  name: 'Daniel',
}

export const videos = [
  // --- Ihmisten tarinat ---------------------------------------------------
  // TODO (Daniel): lisää kansikuva, video tai linkki julkaisuun. Jos video oli
  // maksettu yhteistyö, vaihda kind: 'collab' ja lisää client.
  {
    id: 'pulla-puoti',
    title: 'Joensuun Pulla Puoti',
    kind: 'own',
    concept: 'ihmisten-tarinat',
    description: 'Tarina Joensuun Pulla Puodin ja sen tekijöiden takaa.',
    featured: 1,
    src: null,
    preview: null,
    poster: null,
    href: null,
    platform: 'Instagram',
  },
  {
    id: 'herkkupaja',
    title: 'Joensuun Herkkupaja',
    kind: 'own',
    concept: 'ihmisten-tarinat',
    description: 'Tarina Joensuun Herkkupajan ja sen tekijöiden takaa.',
    featured: 2,
    src: null,
    preview: null,
    poster: null,
    href: null,
    platform: 'Instagram',
  },

  // --- Tilaustyöt: VisitKarelia ------------------------------------------
  // TODO (Daniel): vahvista, että kaikki neljä videota kuuluvat VisitKarelia-
  // projektiin, ja lisää halutessasi linkit julkaisuihin (href).
  {
    id: 'kioski-70-luku',
    title: '70-luvun kioski',
    kind: 'production',
    client: 'VisitKarelia',
    kicker: 'Haastattelu',
    description: 'Alkuperäinen 70-luvun kioski ja sen omistaja kertovat tarinansa.',
    duration: '0:49',
    featured: 3,
    src: 'videos/kioski-70-luku.mp4',
    preview: 'videos/kioski-70-luku-preview.mp4',
    poster: 'videos/kioski-70-luku-poster.webp',
    stats: { likes: 7844, comments: 154, shares: 1499, saves: 488 },
    caption: 'Pohjois-Karjalan vanhin alkuperäinen kioski, …',
  },
  {
    id: 'paateri-koli',
    title: 'Taiteilijakoti Paateri',
    kind: 'production',
    client: 'VisitKarelia',
    kicker: 'Kohde-esittely',
    description: 'Kierros Kolin lähellä sijaitsevassa Taiteilijakoti Paaterissa ja Eva Ryynäsen veistosten parissa.',
    duration: '1:09',
    featured: 4,
    src: 'videos/paateri-koli.mp4',
    preview: 'videos/paateri-koli-preview.mp4',
    poster: 'videos/paateri-koli-poster.webp',
    stats: { likes: 4863, comments: 148, shares: 301, saves: 217 },
    caption: 'Paateri sijaitsee Pohjois-Karjalassa, Lieksassa …',
  },
  {
    id: 'liekinheitin-kirkossa',
    title: 'Liekinheitin kirkossa',
    kind: 'production',
    client: 'VisitKarelia',
    kicker: 'Esitys',
    description: 'Euroviisukappale Liekinheitin esitettynä kirkossa.',
    duration: '0:57',
    featured: 5,
    src: 'videos/liekinheitin-kirkossa.mp4',
    preview: 'videos/liekinheitin-kirkossa-preview.mp4',
    poster: 'videos/liekinheitin-kirkossa-poster.webp',
    stats: { likes: 983, comments: 46, shares: 77, saves: 29 },
    caption: 'Greetings from Finland 🇫🇮 …',
  },
  {
    id: 'karjalainen-kansanmusiikki',
    title: 'Karjalaista kansanmusiikkia',
    kind: 'production',
    client: 'VisitKarelia',
    kicker: 'Tapahtuma',
    description: 'Karjalaista kansanmusiikkia ja tanssia ulkoilmalavalla.',
    duration: '0:35',
    featured: 6,
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

/** True when the video has a cover image (and so can be shown as a real card). */
export const hasMedia = (video) => Boolean(video && video.poster)

export const videosForConcept = (conceptId) => videos.filter((v) => v.concept === conceptId)

export const productionVideos = videos.filter((v) => v.kind === 'production')

/** Home page selection: real media only, in `featured` order. */
export const featuredVideos = videos
  .filter((v) => v.featured && hasMedia(v))
  .sort((a, b) => a.featured - b.featured)

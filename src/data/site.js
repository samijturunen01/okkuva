/**
 * Company details, social links and navigation. Edit these in one place.
 */
export const site = {
  name: 'OKKUVA',
  /** The person the site is about. */
  person: 'Daniel',
  tagline: 'Tarinoita, jotka tuntuvat. Videoita, jotka muistetaan.',
  shortDescription:
    'Daniel tekee videoita ihmisistä, kokemuksista ja tarinoista. Kaupalliset videoyhteistyöt organisaatioille ja brändeille – jokainen tarina suunnitellaan yhdessä.',
  email: 'okkuvalle@gmail.com',
  phone: '044 578 8262',
  /** International format for tel: links. */
  phoneHref: 'tel:+358445788262',
  businessId: '3457728-9',
  instagram: 'danielsilkin',
  instagramHref: 'https://www.instagram.com/danielsilkin/',
  /** Shown under the portrait in the contact CTA and on the contact page. */
  founderIntro:
    'Moro! Olen Daniel, OKKUVAn perustaja. Miut saattaa nähdä tuolla somen puolella välillä vilahdukseltaan tai sitten useamminkin, jos kontenttini kiinnostaa. Tykkään tehdä viihdyttävää ja aitoa sisältöä – ja sitä kautta jeesata myös yrityksiä ja organisaatioita näkyvyyden kanssa. Ota rohkeasti yhteyttä, niin katsotaan mitä keksitään 🎬',
}

/**
 * Daniel's social media accounts, shown on the about page and in the footer.
 * Add a channel by filling in `handle` and `href` – entries without an `href`
 * are hidden. Only add accounts that really exist.
 */
export const socials = [
  { id: 'instagram', label: 'Instagram', handle: `@${site.instagram}`, href: site.instagramHref },
  // TODO (Daniel): lisää TikTok, YouTube tai muut kanavat, jos niitä on.
  { id: 'tiktok', label: 'TikTok', handle: '', href: '' },
  { id: 'youtube', label: 'YouTube', handle: '', href: '' },
].filter((s) => s.href)

export const HOME_PATH = '/'
export const VIDEOS_PATH = '/videot'
export const COLLAB_PATH = '/yhteistyot'
export const ABOUT_PATH = '/danielista'
export const CONTACT_PATH = '/ota-yhteytta'

/**
 * Link to the contact form with an inquiry type preselected
 * (ids from INQUIRY_TYPES in src/lib/contact.js).
 */
export const contactPath = (inquiry) => (inquiry ? `${CONTACT_PATH}?aihe=${inquiry}` : CONTACT_PATH)

/**
 * Main navigation. `cta: true` renders the item as the highlighted button on
 * the right of the desktop header instead of a plain link.
 */
export const nav = [
  { to: HOME_PATH, label: 'Etusivu', end: true },
  { to: VIDEOS_PATH, label: 'Videot & konseptit' },
  { to: COLLAB_PATH, label: 'Yhteistyöt' },
  { to: ABOUT_PATH, label: 'Danielista' },
  { to: CONTACT_PATH, label: 'Ota yhteyttä', cta: true },
]

/**
 * Removed pages whose URLs keep working. GitHub Pages cannot send HTTP 301s,
 * so scripts/prerender.mjs writes a static redirect page (instant meta refresh
 * + canonical link, which search engines treat as a permanent redirect) and
 * App.jsx redirects inside the app. `to` may include a #hash.
 */
export const LEGACY_REDIRECTS = [
  { from: '/hinnasto', to: COLLAB_PATH },
  { from: '/tulokset', to: `${COLLAB_PATH}#referenssit` },
]

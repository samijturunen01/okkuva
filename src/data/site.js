/**
 * Company details and navigation. Edit these in one place.
 */
export const site = {
  name: 'OKKUVA',
  tagline: 'Videoita, jotka pysäyttävät scrollaamisen.',
  shortDescription: 'Lyhytvideoita yrityksille – käsikirjoitus, kuvaus, juonto ja editointi yhdellä hinnalla.',
  email: 'okkuvalle@gmail.com',
  phone: '044 578 8262',
  /** International format for tel: links. */
  phoneHref: 'tel:+358445788262',
  businessId: '3457728-9',
  instagram: 'danielsilkin',
  instagramHref: 'https://www.instagram.com/danielsilkin/',
  /** Shown under the portrait in the contact CTA and on the contact page. */
  founderIntro:
    'Moro! Olen Daniel, Okkuvan perustaja. Miut saattaa nähdä tuolla somen puolella välillä vilahdukseltaan tai sitten useamminkin, jos kontenttini kiinnostaa. Tykkään tehdä viihdyttävää sisältöä ja sitä kautta jeesaa yrityksiä näkyvyyden kanssa. Ota rohkeasti yhteyttä, niin katsotaan mitä keksitään 🎬',
}

export const nav = [
  { to: '/', label: 'Etusivu', end: true },
  { to: '/tulokset', label: 'Tulokset' },
  { to: '/ota-yhteytta', label: 'Ota yhteyttä' },
]

export const CONTACT_PATH = '/ota-yhteytta'
export const RESULTS_PATH = '/tulokset'
/**
 * The old pricing page URL. The page has been removed; the URL redirects to
 * LEGACY_PRICING_REDIRECT so old links keep working (see App.jsx and
 * scripts/prerender.mjs). Point it at the new page once it exists.
 */
export const LEGACY_PRICING_PATH = '/hinnasto'
export const LEGACY_PRICING_REDIRECT = CONTACT_PATH

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
}

export const nav = [
  { to: '/', label: 'Etusivu', end: true },
  { to: '/hinnasto', label: 'Hinnasto' },
  { to: '/tulokset', label: 'Tulokset' },
  { to: '/ota-yhteytta', label: 'Ota yhteyttä' },
]

export const CONTACT_PATH = '/ota-yhteytta'
export const RESULTS_PATH = '/tulokset'
export const PRICING_PATH = '/hinnasto'

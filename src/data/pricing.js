/**
 * Packages and prices. Prices are shown exactly as written here.
 * `perVideo` is the price divided by the number of videos (shown as info only).
 */
export const VAT_NOTE = 'sis. ALV'

export const packages = [
  {
    id: '1',
    name: '1 video',
    count: 1,
    price: '149,90',
    perVideo: null,
    highlighted: false,
    badge: null,
    description: 'Yksi valmis lyhytvideo. Hyvä tapa kokeilla, miten video toimii juuri sinun yrityksellesi.',
    cta: 'Kysy lisää',
  },
  {
    id: '3',
    name: '3 videota',
    count: 3,
    price: '399,90',
    perVideo: '133,30',
    highlighted: true,
    badge: 'Hyvä startti',
    description: 'Kolme lyhytvideota. Enemmän sisältöä someen ja edullisempi hinta per video.',
    cta: 'Varaa kuvaus',
  },
  {
    id: '6',
    name: '6 videota',
    count: 6,
    price: '699,90',
    perVideo: '116,65',
    highlighted: false,
    badge: 'Edullisin per video',
    description: 'Kuusi lyhytvideota. Edullisin hinta per video ja sisältöä pitkäksi aikaa.',
    cta: 'Varaa kuvaus',
  },
]

/** Options for the "Kiinnostava paketti" select in the contact form. */
export const packageOptions = [
  { value: '1', label: '1 video' },
  { value: '3', label: '3 videota' },
  { value: '6', label: '6 videota' },
  { value: 'other', label: 'Muu / en tiedä vielä' },
]

export const packageById = Object.fromEntries(packages.map((p) => [p.id, p]))

/**
 * Daniel's video concepts. Shown on the home page (overview cards) and as
 * their own sections on /videot (anchor = id).
 *
 *   id          – anchor on /videot, also used as `concept` in videos.js
 *   status      – 'active' | 'coming' ('coming' shows the "Tulossa" label)
 *   featured    – the main concept, gets the strongest visual emphasis
 *   tagline     – one line under the title
 *   summary     – short text for the home page card
 *   description – paragraphs for the concept section on /videot
 *   themes      – short labels
 *   forPartners – why the concept interests organisations (optional)
 *   verdicts    – optional pair of playful stickers shown with the concept
 *   cover       – optional cover image in /public for the home page card,
 *                 e.g. 'images/ihmisten-tarinat-cover.webp' (3:4, ≥ 900×1200)
 */
export const concepts = [
  {
    id: 'ihmisten-tarinat',
    number: '01',
    title: 'Ihmisten tarinat',
    status: 'active',
    featured: true,
    tagline: 'Ihmiset yritysten ja kokemusten takana.',
    summary:
      'Kiinnostavia ihmisiä, yrittäjiä ja tarinoita, jotka ansaitsevat tulla kerrotuiksi – aidosti, lämmöllä ja tunteella.',
    description: [
      'Ihmisten tarinat on Danielin pääkonsepti. Siinä tutustutaan yrittäjiin, tekijöihin ja paikallisiin persoonoihin – ja annetaan heidän kertoa tarinansa omin sanoin.',
      'Keskiössä eivät ole tuotteet tai palvelut vaan ihmiset niiden takana: miksi joku teki rohkean päätöksen, mitä matkalla on tapahtunut ja mikä saa jatkamaan. Tuloksena on videoita, jotka tuntuvat.',
    ],
    themes: ['Yrittäjät', 'Paikalliset persoonat', 'Henkilökohtaiset kokemukset', 'Alueen tarinat'],
    forPartners:
      'Konsepti sopii erityisesti organisaatioille, jotka haluavat nostaa esiin yrittäjyyttä, alueen identiteettiä ja paikallisia tarinoita.',
    cover: null,
  },
  {
    id: 'jatkoon-vai-ei',
    number: '02',
    title: 'Jatkoon vai ei',
    status: 'active',
    tagline: 'Aitoja reaktioita – ja yksi kysymys.',
    summary:
      'Daniel testaa ravintoloita, ruokaelämyksiä ja muita kokemuksia. Rehellisiä reaktioita, huumoria ja lopuksi tuomio: jatkoon vai ei?',
    description: [
      'Jatkoon vai ei on viihteellinen konsepti, jossa Daniel kokeilee ravintoloita, ruokapaikkoja ja muita kiinnostavia kokemuksia – ja kertoo suoraan, mitä tykkäsi.',
      'Kyse ei ole ammattimaisesta ravintola-arvostelusta, vaan persoonallisesta ja hyväntuulisesta viihteestä: aitoja reaktioita, huumoria ja lopuksi se tärkein kysymys.',
    ],
    themes: ['Ravintolat', 'Ruokaelämykset', 'Kokemukset', 'Aidot reaktiot'],
    verdicts: ['Jatkoon ✅', 'Vai ei? ❌'],
    cover: null,
  },
  {
    id: 'blessattu-vai-kokattu',
    number: '03',
    title: 'Blessattu vai kokattu',
    status: 'active',
    tagline: 'Parturin tuoli, sakset ja jännittävä lopputulos.',
    summary:
      'Uusi konsepti, jossa Daniel kokeilee partureita ja hiustenleikkuukokemuksia. Onko lopputulos blessattu vai kokattu?',
    description: [
      'Blessattu vai kokattu on Danielin uusin konsepti, jossa hän kokeilee partureita ja hiustenleikkuukokemuksia.',
      'Ensimmäinen jakso on nyt katsottavissa. Seuraa Danielia somessa, niin näet ensimmäisenä, miten seuraavassa parturituolissa käy.',
    ],
    themes: ['Parturit', 'Hiustenleikkuu', 'Kokeilut'],
    verdicts: ['Blessattu 😇', 'Kokattu 🔥'],
    cover: null,
  },
]

export const conceptById = Object.fromEntries(concepts.map((c) => [c.id, c]))

/**
 * Short label telling what a video is – always shown with the video so own
 * content, commercial collaborations and client work are never mixed up.
 */
export function videoLabel(video) {
  if (!video) return ''
  if (video.kind === 'collab') return `Kaupallinen yhteistyö${video.client ? ` · ${video.client}` : ''}`
  if (video.kind === 'production') return `Tilaustyö${video.client ? ` · ${video.client}` : ''}`
  const concept = conceptById[video.concept]
  return concept ? concept.title : 'Danielin video'
}

/**
 * Content of the collaborations page (/yhteistyot) and the collaboration
 * teaser on the home page.
 */

/** Who the collaborations are for – shown as chips. Categories, not clients. */
export const audiences = [
  'Kaupungit ja kunnat',
  'Aluekehitysorganisaatiot',
  'Matkailu- ja kohdemarkkinointi',
  'Brändit ja yritykset',
  'Yrittäjät',
]

/**
 * What a commercial collaboration can be. Rendered with FeatureGrid:
 *   icon – key of an icon in src/components/icons.jsx
 *   size – bento tile size: 'lg' | 'md' | 'wide'
 */
export const collabForms = [
  {
    id: 'sponsoroitu-video',
    title: 'Sponsoroitu video Danielin sarjassa',
    text: 'Yrityksesi tai organisaatiosi mukana yhdessä Danielin omista konsepteista – esimerkiksi Ihmisten tarinoissa tai Jatkoon vai ei -jaksossa.',
    icon: 'film',
    size: 'lg',
  },
  {
    id: 'yhteinen-idea',
    title: 'Yhdessä ideoitu tarina',
    text: 'Kehitetään yhdessä tarina, joka sopii sekä teidän viestiinne että Danielin tyyliin.',
    icon: 'script',
    size: 'md',
  },
  {
    id: 'ihmiset-ja-paikat',
    title: 'Ihmiset, paikat ja kokemukset',
    text: 'Videossa voivat olla pääosassa teille tärkeät yrittäjät, kohteet, tapahtumat tai kokemukset.',
    icon: 'camera',
    size: 'md',
  },
  {
    id: 'tavoitteet',
    title: 'Tavoitteiden mukaan',
    text: 'Sisältö suunnitellaan viestinnän tai markkinoinnin tavoitteiden ympärille – ei toisinpäin.',
    icon: 'spark',
    size: 'md',
  },
  {
    id: 'merkinta',
    title: 'Avoimesti merkitty',
    text: 'Kaupallinen yhteistyö merkitään videoon aina selkeästi, kuten mainonnalta edellytetään.',
    icon: 'shield',
    size: 'md',
  },
  {
    id: 'tyyli',
    title: 'Danielin tyyli on yhteistyön ydin',
    text: 'Tarina kerrotaan Danielin omalla äänellä ja otteella. Juuri se tekee sisällöstä aitoa ja erottuvaa.',
    icon: 'heart',
    size: 'wide',
  },
]

/** "Why is this different from ordering a video?" – two-column comparison. */
export const comparison = {
  traditional: {
    title: 'Perinteinen videotilaus',
    points: [
      'Video tehdään yrityksen omiin kanaviin.',
      'Viesti kerrotaan yrityksen omalla äänellä.',
      'Sisältö suunnitellaan ensisijaisesti mainokseksi.',
    ],
  },
  collab: {
    title: 'Yhteistyö Danielin kanssa',
    points: [
      'Tarina kerrotaan Danielin konseptissa ja hänen persoonallaan.',
      'Ihmiset ja tarinat puhuvat puolestaan.',
      'Sisältö on ensin hyvä tarina – ja yhteistyö kerrotaan avoimesti.',
    ],
  },
}

/** Agreed separately for every collaboration. */
export const collabTerms = [
  'Sisältö ja toimitettavat videot',
  'Aikataulu',
  'Muokkauskierrokset',
  'Hinta ja maksuehdot',
  'Peruutusehdot',
  'Julkaisukanavat',
  'Mainoskäyttöoikeudet',
  'Rinnakkaisjulkaisut',
]

/** Collaboration process – a flexible outline, not a fixed package. */
export const collabSteps = [
  {
    number: '01',
    title: 'Yhteydenotto',
    text: 'Kerro idea, tavoite tai pelkkä fiilis. Jutellaan, mitä haluatte kertoa ja kenelle.',
  },
  {
    number: '02',
    title: 'Ideointi',
    subtitle: 'Sopiva konsepti',
    text: 'Mietitään yhdessä, mikä tarina, ihminen tai kokemus sopii viestiinne – ja istuuko se johonkin Danielin konseptiin vai omaksi kokonaisuudekseen.',
  },
  {
    number: '03',
    title: 'Sovitaan raamit',
    text: 'Laajuus, toimitettavat videot, julkaisukanavat, aikataulu, hinta ja käyttöoikeudet sovitaan selkeästi ennen kuvauksia.',
  },
  {
    number: '04',
    title: 'Tuotanto ja julkaisu',
    text: 'Daniel kuvaa ja editoi videon, ja se julkaistaan sovitun mukaisesti. Kaupallinen yhteistyö merkitään aina näkyvästi.',
  },
]

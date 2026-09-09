/**
 * What every video package includes.
 *
 *   icon  – key of an icon in src/components/icons.jsx
 *   big   – large typographic value shown instead of an icon (e.g. "4K")
 *   size  – bento tile size on the home page: 'lg' | 'md' | 'wide'
 */
export const features = [
  {
    id: 'kuvaus',
    title: 'Kuvaus',
    text: 'Kuvaamme paikan päällä – siellä missä yrityksesi on.',
    icon: 'camera',
    size: 'md',
  },
  {
    id: 'kasikirjoitus',
    title: 'Käsikirjoitus',
    text: 'Koukku, rakenne ja juonto suunnitellaan valmiiksi ennen kuvauksia.',
    icon: 'script',
    size: 'md',
  },
  {
    id: '4k',
    title: '4K kuvalaatu',
    text: 'Terävää kuvaa jokaiseen kanavaan.',
    big: '4K',
    size: 'lg',
  },
  {
    id: 'juonto',
    title: 'Juonto',
    text: 'Selkeä juonto, joka vie katsojan alusta loppuun.',
    icon: 'mic',
    size: 'md',
  },
  {
    id: 'b-roll',
    title: 'B-roll',
    text: 'Kuvituskuvaa, joka pitää videon elävänä ja katsojan kiinni.',
    icon: 'film',
    size: 'md',
  },
  {
    id: 'pituus',
    title: 'Videon pituus noin 1 min',
    text: 'Sopiva pituus lyhytvideoihin – tarpeeksi tarinalle, ei yhtään ylimääräistä.',
    big: '~1 min',
    size: 'lg',
  },
  {
    id: 'editointi',
    title: 'Editointi',
    text: 'Leikkaus, tekstit ja rytmi – video on valmis julkaistavaksi.',
    icon: 'scissors',
    size: 'md',
  },
  {
    id: 'aani',
    title: 'HD äänenlaatu',
    text: 'Selkeä ääni, joka kuuluu myös kännykän kaiuttimesta.',
    icon: 'waveform',
    size: 'md',
  },
  {
    id: 'takuu',
    title: 'Tyytyväisyystakuu',
    text: 'Jos jokin ei tunnu oikealta, muokkaamme videota.',
    icon: 'shield',
    size: 'wide',
  },
]

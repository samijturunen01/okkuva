import { BookmarkIcon, CommentIcon, HeartIcon, MoreIcon, RepostIcon, ShareIcon } from '../icons.jsx'
import { publicUrl } from '../../config/site.js'
import { reelsAccount } from '../../data/videos.js'
import './ReelsOverlay.css'

/**
 * Instagram Reels -tyylinen kerros videon päällä.
 *
 *   oikea reuna – sydän, kommentti, uudelleenjulkaisu, jako, tallennus
 *                 (+ luvut), kolme pistettä ja alimpana neliön muotoinen tilimerkki
 *   vasen alareuna – profiilikuva, käyttäjätunnus (yhteisjulkaisussa
 *                 "ja N muuta"), "Seuraa" ja kuvateksti
 *
 * Vain ne luvut näytetään, jotka videolle on annettu – puuttuvaa lukua ei
 * korvata millään.
 *
 * Kerros on puhtaasti visuaalinen: koko elementti on `pointer-events: none`,
 * joten klikkaus ikonien, tekstien tai logon päältä menee läpi videokortin
 * painikkeelle (ja modaalissa videon omille kontrolleille). Sama komponentti
 * renderöidään sekä kortille että modaalisoittimeen, jolloin kerros pysyy
 * kiinni videossa myös suurennettuna.
 *
 * Kaikki koot tulevat container query -yksiköistä (.phone on container), joten
 * kerros skaalautuu videon leveyden mukaan pienestä kortista modaaliin asti.
 *
 * HUOM: kortilla tämä renderöidään <button>-elementin sisään, joten rakenteessa
 * saa käyttää vain phrasing contentia (span / img / svg) – ei div- tai
 * p-elementtejä.
 */

/**
 * 7844 → "7 844" (kova välilyönti, ettei luku katkea riville). Merkkijono
 * näytetään sellaisenaan – sillä annetaan Instagramin pyöristämä luku, esim.
 * "85,1 t.", kun tarkkaa lukua ei tiedetä.
 */
function formatCount(value) {
  if (typeof value === 'string') return value
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/** Ruudunlukijalle "85,1 t." luetaan muodossa "85,1 tuhatta". */
const spokenCount = (value) => formatCount(value).replace(/\s*t\.$/, ' tuhatta')

const ITEMS = [
  { key: 'likes', Icon: HeartIcon, label: 'tykkäystä' },
  { key: 'comments', Icon: CommentIcon, label: 'kommenttia' },
  { key: 'reposts', Icon: RepostIcon, label: 'uudelleenjulkaisua' },
  { key: 'shares', Icon: ShareIcon, label: 'jakoa' },
  { key: 'saves', Icon: BookmarkIcon, label: 'tallennusta' },
]

export function ReelsOverlay({ video, variant = 'card', className = '' }) {
  if (!video) return null

  const stats = video.stats
  const account = video.account || reelsAccount
  const items = ITEMS.filter((item) => stats && stats[item.key] != null)
  if (items.length === 0 && !video.caption) return null

  const markUrl = publicUrl(account.mark)
  const others = video.collaborators ? ` ja ${video.collaborators} muuta` : ''
  const classes = ['reels', variant === 'modal' ? 'reels--modal' : '', className].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <span className="reels__profile" aria-hidden="true">
        <span className="reels__user">
          <img className="reels__avatar" src={markUrl} alt="" width="64" height="64" loading="lazy" decoding="async" />
          <span className="reels__handle">
            {account.handle}
            {others}
          </span>
          <span className="reels__follow">{account.followLabel}</span>
        </span>
        {video.caption && <span className="reels__caption">{video.caption}</span>}
      </span>

      <span className="reels__rail" aria-hidden="true">
        {items.map(({ key, Icon }) => (
          <span className="reels__action" key={key}>
            <Icon className="reels__icon" />
            <span className="reels__count">{formatCount(stats[key])}</span>
          </span>
        ))}
        <span className="reels__action">
          <MoreIcon className="reels__icon reels__icon--more" />
        </span>
        <span className="reels__badge">
          <img className="reels__badge-img" src={markUrl} alt="" width="64" height="64" loading="lazy" decoding="async" />
        </span>
      </span>

      <span className="visually-hidden">
        {`Instagram @${account.handle}`}
        {video.collaborators && ` ja ${video.collaborators} muuta tiliä`}
        {items.length > 0 && `: ${items.map(({ key, label }) => `${spokenCount(stats[key])} ${label}`).join(', ')}`}.
      </span>
    </span>
  )
}

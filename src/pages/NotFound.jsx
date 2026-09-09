import { useSeo } from '../hooks/useSeo.js'
import { Glasses } from '../components/glasses/Glasses.jsx'
import { Button } from '../components/Button.jsx'
import './NotFound.css'

export default function NotFound() {
  useSeo({
    title: 'Sivua ei löytynyt',
    description: 'Hups – tätä sivua ei löytynyt.',
    path: '/404',
    noindex: true,
  })

  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container not-found__inner">
        <div className="not-found__glasses">
          <Glasses variant="surprised" />
        </div>
        <p className="eyebrow">Virhe 404</p>
        <h1 id="not-found-title">Hups. Tätä sivua ei löytynyt.</h1>
        <p className="lead">Osoite voi olla vanhentunut tai siinä on kirjoitusvirhe.</p>
        <Button to="/">Takaisin etusivulle</Button>
      </div>
    </section>
  )
}

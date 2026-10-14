import { useSeo } from '../hooks/useSeo.js'
import { PageHeader } from '../components/PageHeader.jsx'
import { ContactDetails } from '../components/ContactDetails.jsx'
import { ContactForm } from '../components/ContactForm.jsx'
import { Reveal } from '../components/Reveal.jsx'
import { Sticker } from '../components/Sticker.jsx'
import { CONTACT_PATH, site } from '../data/site.js'
import portrait from '../assets/portrait-800.webp'
import portrait2x from '../assets/portrait-1400.webp'
import './Contact.css'

export default function Contact() {
  useSeo({
    title: 'Ota yhteyttä',
    description: `Ota yhteyttä Danieliin: kaupalliset yhteistyöt, videotuotannot ja tarinavinkit. ${site.email}, ${site.phone}.`,
    path: CONTACT_PATH,
  })

  return (
    <>
      <PageHeader
        eyebrow="Ota yhteyttä"
        title="Jutellaan yhteistyöstä."
        highlight={['yhteistyöstä']}
        lead="Kaupallinen yhteistyö, videotuotanto vai vinkki tarinasta, joka pitäisi kertoa? Kerro lyhyesti, mitä mielessä on – vastaan itse."
      />

      <section className="section section--flush-top contact-page" aria-label="Yhteystiedot ja yhteydenottolomake">
        <div className="container contact-page__grid">
          <div className="contact-page__aside">
            <ContactDetails />
            <Reveal className="contact-page__visual" variant="scale" delay={240}>
              <div className="contact-page__photo">
                <img
                  src={portrait}
                  srcSet={`${portrait} 800w, ${portrait2x} 1400w`}
                  sizes="(min-width: 900px) 360px, 80vw"
                  alt="Daniel oransseissa aurinkolaseissa"
                  width="800"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <Sticker className="contact-page__sticker" tone="dark" rotate={6}>
                Vastaan itse 📞
              </Sticker>
            </Reveal>
            <Reveal as="p" className="contact-page__intro" delay={320}>
              {site.founderIntro}
            </Reveal>
          </div>

          <div className="contact-page__form">
            <Reveal as="h2" className="contact-page__form-title">
              Lähetä viesti
            </Reveal>
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

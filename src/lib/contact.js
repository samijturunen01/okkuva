/**
 * Contact form: validation rules (shared idea with the Apps Script backend)
 * and the request to the Google Apps Script Web App.
 */
import { config } from '../config/site'
import { packageOptions } from '../data/pricing'

export const LIMITS = {
  name: { min: 2, max: 80 },
  company: { max: 100 },
  email: { max: 120 },
  phone: { max: 30 },
  message: { min: 10, max: 2000 },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d][\d\s()-]{5,}$/
const allowedPackages = new Set(packageOptions.map((o) => o.value))

export const emptyForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  package: '',
  message: '',
  /** Honeypot – must stay empty. Hidden from humans with CSS. */
  website: '',
}

/**
 * Validate form values. Returns an object of field → Finnish error message.
 * An empty object means the form is valid.
 */
export function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const message = values.message.trim()

  if (name.length < LIMITS.name.min) errors.name = 'Kerro vielä nimesi.'
  else if (name.length > LIMITS.name.max) errors.name = `Nimi voi olla enintään ${LIMITS.name.max} merkkiä.`

  if (values.company.trim().length > LIMITS.company.max)
    errors.company = `Yrityksen nimi voi olla enintään ${LIMITS.company.max} merkkiä.`

  if (!email) errors.email = 'Sähköposti tarvitaan, jotta voimme vastata.'
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email.max)
    errors.email = 'Tarkista sähköpostiosoitteen muoto.'

  if (phone && (!PHONE_RE.test(phone) || phone.length > LIMITS.phone.max))
    errors.phone = 'Tarkista puhelinnumeron muoto.'

  if (values.package && !allowedPackages.has(values.package)) errors.package = 'Valitse paketti listasta.'

  if (message.length < LIMITS.message.min) errors.message = 'Kerro muutamalla sanalla, mistä on kyse.'
  else if (message.length > LIMITS.message.max)
    errors.message = `Viesti voi olla enintään ${LIMITS.message.max} merkkiä.`

  return errors
}

export class ContactError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code
  }
}

/**
 * Send the submission to Google Apps Script.
 *
 * The request is sent as text/plain so the browser does not need a CORS
 * preflight (Apps Script Web Apps cannot answer OPTIONS requests). The script
 * reads the JSON from the request body.
 */
export async function submitContact(payload, { timeoutMs = 20000 } = {}) {
  if (!config.appsScriptUrl) {
    throw new ContactError('Lomaketta ei ole vielä otettu käyttöön.', 'not-configured')
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(config.appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      signal: controller.signal,
    })

    let data = null
    try {
      data = await response.json()
    } catch {
      data = null
    }

    if (!response.ok || !data || data.ok !== true) {
      const code = (data && data.error) || `http-${response.status}`
      throw new ContactError(messageForCode(code), code)
    }
    return data
  } catch (err) {
    if (err instanceof ContactError) throw err
    if (err.name === 'AbortError') throw new ContactError('Yhteys aikakatkaistiin. Yritä uudelleen.', 'timeout')
    throw new ContactError('Viestin lähetys ei onnistunut. Yritä uudelleen hetken päästä.', 'network')
  } finally {
    clearTimeout(timer)
  }
}

function messageForCode(code) {
  switch (code) {
    case 'recaptcha':
    case 'recaptcha-score':
      return 'Roskapostisuodatin esti lähetyksen. Yritä uudelleen tai lähetä sähköpostia.'
    case 'validation':
      return 'Tarkista lomakkeen tiedot ja yritä uudelleen.'
    case 'rate-limit':
      return 'Liian monta viestiä lyhyessä ajassa. Yritä hetken päästä uudelleen.'
    default:
      return 'Viestin lähetys ei onnistunut. Yritä uudelleen tai lähetä sähköpostia.'
  }
}

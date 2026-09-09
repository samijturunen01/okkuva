import { useEffect, useRef, useState } from 'react'
import { Button } from './Button.jsx'
import { CheckIcon } from './icons.jsx'
import { useRecaptcha } from '../hooks/useRecaptcha.js'
import { config, isContactFormConfigured } from '../config/site.js'
import { packageOptions } from '../data/pricing.js'
import { site } from '../data/site.js'
import { ContactError, LIMITS, emptyForm, submitContact, validate } from '../lib/contact.js'
import './ContactForm.css'

const FIELD_ORDER = ['name', 'company', 'email', 'phone', 'package', 'message']

function Field({ id, label, required, error, hint, children }) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field ${error ? 'field--invalid' : ''}`.trim()}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? (
          <span className="field__required" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="field__optional"> (valinnainen)</span>
        )}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Contact form → Google Apps Script (see apps-script/Code.gs).
 * Protection: reCAPTCHA v3 token, honeypot field, time-to-submit,
 * client + server validation and a double-submit guard.
 */
export function ContactForm({ defaultPackage = '' }) {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const submitting = useRef(false)
  const startedAt = useRef(0)
  const { execute } = useRecaptcha(config.recaptchaSiteKey)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  // Pre-select the package passed via ?paketti=…
  useEffect(() => {
    if (defaultPackage) setValues((v) => ({ ...v, package: defaultPackage }))
  }, [defaultPackage])

  const update = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }

  const blur = (event) => {
    const { name } = event.target
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  const reset = () => {
    setValues(emptyForm)
    setErrors({})
    setTouched({})
    setStatus('idle')
    setErrorMessage('')
    startedAt.current = Date.now()
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (submitting.current) return

    const allErrors = validate(values)
    setErrors(allErrors)
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])))
    const firstInvalid = FIELD_ORDER.find((f) => allErrors[f])
    if (firstInvalid) {
      const el = document.getElementById(`contact-${firstInvalid}`)
      if (el) el.focus()
      return
    }

    // Honeypot filled in → almost certainly a bot. Pretend everything went fine.
    if (values.website) {
      setStatus('success')
      return
    }

    submitting.current = true
    setStatus('submitting')
    setErrorMessage('')

    try {
      if (!isContactFormConfigured) {
        throw new ContactError('Lomake ei ole vielä käytössä. Lähetä viesti sähköpostilla.', 'not-configured')
      }
      const token = await execute('contact')
      await submitContact({
        name: values.name.trim(),
        company: values.company.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        package: values.package,
        message: values.message.trim(),
        website: values.website,
        token,
        elapsed: Date.now() - startedAt.current,
        page: window.location.href,
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err && err.message ? err.message : 'Viestin lähetys ei onnistunut. Yritä uudelleen.')
    } finally {
      submitting.current = false
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="form-success__icon" aria-hidden="true">
          <CheckIcon />
        </span>
        <h3 className="form-success__title">Kiitos, viesti lähti!</h3>
        <p>
          Olemme sinuun yhteydessä pian. Jos asia on kiireinen, soita{' '}
          <a href={site.phoneHref} className="form-success__link">
            {site.phone}
          </a>
          .
        </p>
        <Button variant="ghost" onClick={reset} icon={null}>
          Lähetä toinen viesti
        </Button>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form__grid">
        <Field id="contact-name" label="Nimi" required error={touched.name && errors.name}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={LIMITS.name.max}
              value={values.name}
              onChange={update}
              onBlur={blur}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              required
            />
          )}
        </Field>

        <Field id="contact-company" label="Yritys" error={touched.company && errors.company}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={LIMITS.company.max}
              value={values.company}
              onChange={update}
              onBlur={blur}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
            />
          )}
        </Field>

        <Field id="contact-email" label="Sähköposti" required error={touched.email && errors.email}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              maxLength={LIMITS.email.max}
              value={values.email}
              onChange={update}
              onBlur={blur}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              required
            />
          )}
        </Field>

        <Field id="contact-phone" label="Puhelinnumero" error={touched.phone && errors.phone}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              maxLength={LIMITS.phone.max}
              value={values.phone}
              onChange={update}
              onBlur={blur}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
            />
          )}
        </Field>

        <Field id="contact-package" label="Kiinnostava paketti" error={touched.package && errors.package}>
          {({ id, describedBy, invalid }) => (
            <div className="select-wrap">
              <select
                id={id}
                name="package"
                value={values.package}
                onChange={update}
                onBlur={blur}
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
              >
                <option value="">Valitse…</option>
                {packageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Field>

        <Field
          id="contact-message"
          label="Viesti"
          required
          error={touched.message && errors.message}
          hint="Kerro lyhyesti yrityksestäsi ja siitä, mitä haluaisit videoilla saavuttaa."
        >
          {({ id, describedBy, invalid }) => (
            <textarea
              id={id}
              name="message"
              rows={6}
              maxLength={LIMITS.message.max}
              value={values.message}
              onChange={update}
              onBlur={blur}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              required
            />
          )}
        </Field>
      </div>

      {/* Honeypot – invisible to people, tempting for bots. */}
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Verkkosivu</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={update}
        />
      </div>

      {status === 'error' && (
        <div className="form-alert" role="alert">
          <p>{errorMessage}</p>
          <p>
            Voit myös lähettää sähköpostia:{' '}
            <a href={`mailto:${site.email}`} className="form-alert__link">
              {site.email}
            </a>
          </p>
        </div>
      )}

      <div className="contact-form__footer">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={isSubmitting}
          aria-busy={isSubmitting || undefined}
          icon={isSubmitting ? <span className="btn__spinner" /> : 'arrow'}
        >
          {isSubmitting ? 'Lähetetään…' : 'Lähetä viesti'}
        </Button>
        <p className="contact-form__notice">
          Lomake on suojattu Google reCAPTCHA v3:lla.{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Tietosuoja
          </a>{' '}
          ·{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
            Käyttöehdot
          </a>
        </p>
      </div>
    </form>
  )
}

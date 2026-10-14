import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Button } from './Button.jsx'
import { CheckIcon } from './icons.jsx'
import { useRecaptcha } from '../hooks/useRecaptcha.js'
import { config, isContactFormConfigured } from '../config/site.js'
import { site } from '../data/site.js'
import {
  ContactError,
  INQUIRY_TYPES,
  LIMITS,
  composeMessage,
  emptyForm,
  inquiryById,
  submitContact,
  validate,
} from '../lib/contact.js'
import './ContactForm.css'

const FIELD_ORDER = ['inquiry', 'name', 'company', 'email', 'phone', 'message']
const fieldElementId = (field) =>
  field === 'inquiry' ? `contact-inquiry-${INQUIRY_TYPES[0].id}` : `contact-${field}`

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
export function ContactForm() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const submitting = useRef(false)
  const startedAt = useRef(0)
  const { execute } = useRecaptcha(config.recaptchaSiteKey)
  const [searchParams] = useSearchParams()
  const preset = searchParams.get('aihe')

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  // Links like /ota-yhteytta?aihe=yhteistyo preselect the inquiry type. Applied
  // after mount so the prerendered HTML and the first client render match.
  useEffect(() => {
    if (preset && inquiryById[preset]) setValues((v) => ({ ...v, inquiry: preset }))
  }, [preset])

  const update = (event) => {
    const { name, value } = event.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }

  const chooseInquiry = (event) => {
    const next = { ...values, inquiry: event.target.value }
    setValues(next)
    setTouched((t) => ({ ...t, inquiry: true }))
    setErrors(validate(next))
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
      const el = document.getElementById(fieldElementId(firstInvalid))
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
        inquiry: values.inquiry,
        message: composeMessage(values),
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
          Palaan asiaan mahdollisimman pian. Jos asia on kiireinen, soita{' '}
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
  const inquiryError = touched.inquiry && errors.inquiry
  const selectedInquiry = inquiryById[values.inquiry]

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <fieldset
        className={`inquiry ${inquiryError ? 'inquiry--invalid' : ''}`.trim()}
        aria-describedby={inquiryError ? 'contact-inquiry-error' : undefined}
      >
        <legend className="field__label inquiry__legend">
          Mitä yhteydenottosi koskee?
          <span className="field__required" aria-hidden="true">
            {' '}
            *
          </span>
        </legend>
        <div className="inquiry__options">
          {INQUIRY_TYPES.map((type, i) => {
            const checked = values.inquiry === type.id
            return (
              <label
                key={type.id}
                className={`inquiry__option ${i === 0 ? 'inquiry__option--primary' : ''} ${checked ? 'is-checked' : ''}`.trim()}
              >
                <input
                  className="inquiry__input"
                  type="radio"
                  id={`contact-inquiry-${type.id}`}
                  name="inquiry"
                  value={type.id}
                  checked={checked}
                  onChange={chooseInquiry}
                  aria-describedby={`contact-inquiry-${type.id}-desc`}
                  aria-invalid={inquiryError ? true : undefined}
                  required
                />
                <span className="inquiry__dot" aria-hidden="true" />
                <span className="inquiry__body">
                  <span className="inquiry__label">{type.label}</span>
                  <span className="inquiry__desc" id={`contact-inquiry-${type.id}-desc`}>
                    {type.description}
                  </span>
                </span>
              </label>
            )
          })}
        </div>
        {inquiryError && (
          <p className="field__error" id="contact-inquiry-error">
            {errors.inquiry}
          </p>
        )}
      </fieldset>

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

        <Field id="contact-company" label="Yritys tai organisaatio" error={touched.company && errors.company}>
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

        <Field
          id="contact-message"
          label="Viesti"
          required
          error={touched.message && errors.message}
          hint={selectedInquiry ? selectedInquiry.hint : 'Kerro lyhyesti, mitä mielessä on.'}
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

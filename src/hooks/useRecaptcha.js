import { useCallback, useEffect, useState } from 'react'

let loadPromise = null

/**
 * Load the reCAPTCHA v3 script once. Only the PUBLIC site key is used here;
 * the secret key is verified in Google Apps Script.
 */
function loadRecaptcha(siteKey) {
  if (loadPromise) return loadPromise
  loadPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha && window.grecaptcha.ready) {
      resolve(window.grecaptcha)
      return
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}&hl=fi`
    script.async = true
    script.defer = true
    script.onload = () => {
      if (window.grecaptcha) resolve(window.grecaptcha)
      else reject(new Error('reCAPTCHA did not initialise'))
    }
    script.onerror = () => {
      loadPromise = null
      reject(new Error('reCAPTCHA script failed to load'))
    }
    document.head.appendChild(script)
  })
  return loadPromise
}

/**
 * Returns { status, execute }. `execute(action)` resolves with a token that
 * must be sent to the backend for verification.
 */
export function useRecaptcha(siteKey) {
  const [status, setStatus] = useState(siteKey ? 'loading' : 'missing')

  useEffect(() => {
    if (!siteKey) return undefined
    let cancelled = false
    loadRecaptcha(siteKey)
      .then((grecaptcha) => {
        grecaptcha.ready(() => {
          if (!cancelled) setStatus('ready')
        })
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [siteKey])

  const execute = useCallback(
    async (action = 'contact') => {
      if (!siteKey) throw new Error('missing-site-key')
      const grecaptcha = await loadRecaptcha(siteKey)
      await new Promise((resolve) => grecaptcha.ready(resolve))
      return grecaptcha.execute(siteKey, { action })
    },
    [siteKey],
  )

  return { status, execute }
}

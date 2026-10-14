/**
 * OKKUVA – contact form backend (Google Apps Script Web App)
 * ==========================================================
 *
 * Receives POST requests from the website's contact form, validates them,
 * verifies the reCAPTCHA v3 token with Google, emails the message and
 * (optionally) logs it to a Google Sheet.
 *
 * SETUP – see apps-script/README.md for the full walkthrough.
 *
 *  1. Create a new Apps Script project (script.google.com) and paste this file.
 *  2. Project Settings → Script properties → add:
 *       RECAPTCHA_SECRET   = reCAPTCHA v3 SECRET key   ← REQUIRED, never put this in the website
 *       TO_EMAIL           = okkuvalle@gmail.com   ← where messages are delivered
 *       SHEET_ID           = <Google Sheet id>         ← optional, leave empty to skip logging
 *       ALLOWED_HOSTNAMES  = okkuva.fi,www.okkuva.fi   ← optional, comma separated; leave empty to allow any
 *       MIN_SCORE          = 0.5                        ← optional, reCAPTCHA score threshold (0–1)
 *  3. Deploy → New deployment → type "Web app":
 *       Execute as: Me   ·   Who has access: Anyone
 *  4. Copy the Web app URL into the website's .env as VITE_APPS_SCRIPT_URL.
 *
 * Secrets live ONLY in Script properties – nothing sensitive is in the website code.
 */

var CONFIG = {
  DEFAULT_TO_EMAIL: 'okkuvalle@gmail.com',
  SUBJECT_PREFIX: '[OKKUVA] Uusi yhteydenotto',
  SENDER_NAME: 'OKKUVA verkkosivu',
  MIN_ELAPSED_MS: 2500, // form filled in faster than this = probably a bot
  RATE_LIMIT_PER_EMAIL_SECONDS: 60,
  RATE_LIMIT_GLOBAL_PER_HOUR: 40,
  LIMITS: {
    name: { min: 2, max: 80 },
    company: { max: 100 },
    email: { max: 120 },
    phone: { max: 30 },
    message: { min: 10, max: 2000 },
  },
  // Inquiry types ("Aihe") – keep in sync with INQUIRY_TYPES in src/lib/contact.js.
  INQUIRY_TYPES: {
    yhteistyo: 'Kaupallinen yhteistyö',
    videotuotanto: 'Videotuotanto',
    tarina: 'Ehdota tarinaa',
    muu: 'Muu asia',
  },
}

/* ------------------------------------------------------------------ */
/* Entry points                                                          */
/* ------------------------------------------------------------------ */

/** Simple health check: open the Web app URL in a browser. */
function doGet() {
  return jsonResponse({ ok: true, service: 'okkuva-contact', time: new Date().toISOString() })
}

function doPost(e) {
  try {
    var payload = parseBody(e)
    if (!payload) return jsonResponse({ ok: false, error: 'bad-request' })

    // Honeypot: real users never see this field.
    if (payload.website) return jsonResponse({ ok: true, skipped: true })

    var validation = validatePayload(payload)
    if (validation.errors.length) {
      return jsonResponse({ ok: false, error: 'validation', details: validation.errors })
    }
    var data = validation.data

    if (typeof payload.elapsed === 'number' && payload.elapsed >= 0 && payload.elapsed < CONFIG.MIN_ELAPSED_MS) {
      return jsonResponse({ ok: false, error: 'recaptcha' })
    }

    // Verify first so requests without a valid token cannot use up the rate limit.
    var captcha = verifyRecaptcha(payload.token)
    if (!captcha.ok) return jsonResponse({ ok: false, error: captcha.error })

    if (!checkRateLimit(data.email)) return jsonResponse({ ok: false, error: 'rate-limit' })

    sendEmail(data, captcha, payload.page)
    appendToSheet(data, captcha, payload.page)

    return jsonResponse({ ok: true })
  } catch (err) {
    console.error(err)
    return jsonResponse({ ok: false, error: 'server' })
  }
}

/* ------------------------------------------------------------------ */
/* Request parsing & validation                                          */
/* ------------------------------------------------------------------ */

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) return null
  try {
    var body = JSON.parse(e.postData.contents)
    return body && typeof body === 'object' ? body : null
  } catch (err) {
    return null
  }
}

function str(value, max) {
  if (value === undefined || value === null) return ''
  var s = String(value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim()
  return max ? s.slice(0, max) : s
}

function validatePayload(payload) {
  var L = CONFIG.LIMITS
  var errors = []
  var data = {
    name: str(payload.name, 500),
    company: str(payload.company, 500),
    email: str(payload.email, 500),
    phone: str(payload.phone, 500),
    inquiry: str(payload.inquiry, 40),
    message: str(payload.message, 5000),
  }

  if (data.name.length < L.name.min || data.name.length > L.name.max) errors.push('name')
  if (data.company.length > L.company.max) errors.push('company')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) || data.email.length > L.email.max) errors.push('email')
  if (data.phone && (!/^[+\d][\d\s()-]{5,}$/.test(data.phone) || data.phone.length > L.phone.max)) errors.push('phone')
  if (data.inquiry && !CONFIG.INQUIRY_TYPES.hasOwnProperty(data.inquiry)) errors.push('inquiry')
  if (data.message.length < L.message.min || data.message.length > L.message.max) errors.push('message')
  if (!payload.token || typeof payload.token !== 'string' || payload.token.length > 5000) errors.push('token')

  return { errors: errors, data: data }
}

/* ------------------------------------------------------------------ */
/* reCAPTCHA v3                                                          */
/* ------------------------------------------------------------------ */

function verifyRecaptcha(token) {
  var props = PropertiesService.getScriptProperties()
  var secret = props.getProperty('RECAPTCHA_SECRET')
  if (!secret) {
    console.error('RECAPTCHA_SECRET is missing from Script properties')
    return { ok: false, error: 'server' }
  }
  var minScore = parseFloat(props.getProperty('MIN_SCORE') || '0.5')
  var allowedHosts = (props.getProperty('ALLOWED_HOSTNAMES') || '')
    .split(',')
    .map(function (h) {
      return h.trim().toLowerCase()
    })
    .filter(Boolean)

  var response = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'post',
    payload: { secret: secret, response: token },
    muteHttpExceptions: true,
  })
  var result
  try {
    result = JSON.parse(response.getContentText())
  } catch (err) {
    return { ok: false, error: 'recaptcha' }
  }

  if (!result.success) return { ok: false, error: 'recaptcha' }
  if (result.action && result.action !== 'contact') return { ok: false, error: 'recaptcha' }
  if (typeof result.score === 'number' && result.score < minScore) return { ok: false, error: 'recaptcha-score' }
  if (allowedHosts.length && allowedHosts.indexOf(String(result.hostname || '').toLowerCase()) === -1) {
    return { ok: false, error: 'recaptcha' }
  }
  return { ok: true, score: result.score, hostname: result.hostname }
}

/* ------------------------------------------------------------------ */
/* Rate limiting (CacheService, best effort)                             */
/* ------------------------------------------------------------------ */

function checkRateLimit(email) {
  var cache = CacheService.getScriptCache()
  var emailKey = 'rl:' + Utilities.base64EncodeWebSafe(email.toLowerCase())
  if (cache.get(emailKey)) return false
  cache.put(emailKey, '1', CONFIG.RATE_LIMIT_PER_EMAIL_SECONDS)

  var hourKey = 'rl:global:' + Math.floor(Date.now() / 3600000)
  var count = parseInt(cache.get(hourKey) || '0', 10) + 1
  cache.put(hourKey, String(count), 3600)
  return count <= CONFIG.RATE_LIMIT_GLOBAL_PER_HOUR
}

/* ------------------------------------------------------------------ */
/* Email                                                                 */
/* ------------------------------------------------------------------ */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function sendEmail(data, captcha, page) {
  var to = PropertiesService.getScriptProperties().getProperty('TO_EMAIL') || CONFIG.DEFAULT_TO_EMAIL
  var inquiryLabel = data.inquiry ? CONFIG.INQUIRY_TYPES[data.inquiry] : '–'
  var subject = CONFIG.SUBJECT_PREFIX + ': ' + data.name + (data.company ? ' (' + data.company + ')' : '')

  var rows = [
    ['Aihe', inquiryLabel],
    ['Nimi', data.name],
    ['Yritys', data.company || '–'],
    ['Sähköposti', data.email],
    ['Puhelin', data.phone || '–'],
  ]

  var plain =
    rows
      .map(function (r) {
        return r[0] + ': ' + r[1]
      })
      .join('\n') +
    '\n\nViesti:\n' +
    data.message +
    '\n\n—\nLähetetty sivulta: ' +
    (page || '-') +
    '\nreCAPTCHA-pisteet: ' +
    (captcha.score !== undefined ? captcha.score : '-')

  var html =
    '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#121213">' +
    '<h2 style="margin:0 0 16px">Uusi yhteydenotto verkkosivulta</h2>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows
      .map(function (r) {
        return (
          '<tr><td style="color:#666;padding-right:16px;vertical-align:top"><strong>' +
          escapeHtml(r[0]) +
          '</strong></td><td>' +
          escapeHtml(r[1]) +
          '</td></tr>'
        )
      })
      .join('') +
    '</table>' +
    '<h3 style="margin:20px 0 8px">Viesti</h3>' +
    '<p style="white-space:pre-wrap;background:#fff8f1;padding:12px 14px;border-left:4px solid #f86b2c;border-radius:6px">' +
    escapeHtml(data.message) +
    '</p>' +
    '<p style="color:#888;font-size:12px;margin-top:24px">Lähetetty sivulta: ' +
    escapeHtml(page || '-') +
    '<br>reCAPTCHA-pisteet: ' +
    escapeHtml(captcha.score !== undefined ? captcha.score : '-') +
    '</p></div>'

  MailApp.sendEmail({
    to: to,
    replyTo: data.email,
    name: CONFIG.SENDER_NAME,
    subject: subject,
    body: plain,
    htmlBody: html,
  })
}

/* ------------------------------------------------------------------ */
/* Google Sheet log (optional)                                           */
/* ------------------------------------------------------------------ */

function appendToSheet(data, captcha, page) {
  var sheetId = PropertiesService.getScriptProperties().getProperty('SHEET_ID')
  if (!sheetId) return
  try {
    var sheet = SpreadsheetApp.openById(sheetId).getSheets()[0]
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Aika', 'Nimi', 'Yritys', 'Sähköposti', 'Puhelin', 'Aihe', 'Viesti', 'reCAPTCHA', 'Sivu'])
    }
    sheet.appendRow([
      new Date(),
      cell(data.name),
      cell(data.company),
      cell(data.email),
      cell(data.phone),
      data.inquiry ? CONFIG.INQUIRY_TYPES[data.inquiry] : '',
      cell(data.message),
      captcha.score !== undefined ? captcha.score : '',
      cell(page || ''),
    ])
  } catch (err) {
    // Logging must never break the submission itself.
    console.error('Sheet logging failed: ' + err)
  }
}

/** Store user input as plain text: "+358…" or "=…" would otherwise be parsed as a formula. */
function cell(value) {
  var s = String(value)
  return /^[=+\-@]/.test(s) ? "'" + s : s
}

/* ------------------------------------------------------------------ */
/* Helpers                                                               */
/* ------------------------------------------------------------------ */

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

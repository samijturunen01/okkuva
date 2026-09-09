# Contact form backend – Google Apps Script

The contact form on `/ota-yhteytta` sends a JSON POST request to a Google Apps
Script Web App. The script validates the data, verifies the reCAPTCHA v3 token
with Google, emails the message to **danielsilkin@icloud.com** and optionally
appends a row to a Google Sheet.

No secrets are stored in the website. The reCAPTCHA **secret** key lives only in
the Apps Script project's Script properties.

## 1. Create reCAPTCHA v3 keys

1. Go to <https://www.google.com/recaptcha/admin/create>.
2. Label: `OKKUVA`, type: **reCAPTCHA v3**.
3. Domains: add your production domain (for example `okkuva.fi`) and, for local
   testing, `localhost`. For GitHub Pages add `<username>.github.io`.
4. Save. You get a **Site key** (public) and a **Secret key** (private).

## 2. Create the Apps Script project

1. Open <https://script.google.com> with the Google account that should send
   the emails and click **New project**.
2. Replace the contents of `Code.gs` with the file in this folder.
3. Open **Project Settings** (gear icon) → **Script properties** → **Add script property**:

   | Property            | Value                                              | Required |
   | ------------------- | -------------------------------------------------- | -------- |
   | `RECAPTCHA_SECRET`  | the reCAPTCHA **secret** key                       | yes      |
   | `TO_EMAIL`          | `danielsilkin@icloud.com`                          | no (default) |
   | `SHEET_ID`          | id of a Google Sheet to log submissions into       | no       |
   | `ALLOWED_HOSTNAMES` | `okkuva.fi,www.okkuva.fi` (comma separated)        | no       |
   | `MIN_SCORE`         | `0.5` – reject tokens with a lower reCAPTCHA score | no       |

   The Sheet id is the long string in the sheet's URL:
   `https://docs.google.com/spreadsheets/d/`**`<SHEET_ID>`**`/edit`.
   Leave `SHEET_ID` empty to skip logging.

4. Save the project (Ctrl/Cmd + S).

## 3. Deploy as a Web App

1. Click **Deploy** → **New deployment**.
2. Click the gear next to *Select type* and choose **Web app**.
3. Settings:
   - Description: `okkuva contact form`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Click **Deploy** and authorise the script when asked (it needs permission to
   send email, call an external URL and – if used – edit the Sheet).
5. Copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfycb.../exec`.
6. Open that URL in a browser – you should see `{"ok":true,"service":"okkuva-contact",...}`.

> After changing the code you must create a **new deployment** (or edit the
> existing deployment and pick a new version) – otherwise the old code stays live.

## 4. Configure the website

In the website's `.env` (locally) or in the GitHub repository variables (for the
deploy workflow):

```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
VITE_RECAPTCHA_SITE_KEY=6Lc...your-site-key...
```

Rebuild the site. Done.

## How it works

- The browser sends `Content-Type: text/plain` with a JSON body. Apps Script
  cannot answer CORS preflight requests, so a "simple request" is used on
  purpose; the JSON is read from `e.postData.contents`.
- Response is JSON: `{ ok: true }` or `{ ok: false, error: '<code>' }`.
  Error codes: `bad-request`, `validation`, `recaptcha`, `recaptcha-score`,
  `rate-limit`, `server`.
- Protection layers: honeypot field, minimum fill-in time, per-email and global
  rate limiting (CacheService), reCAPTCHA v3 verification (action + score +
  optional hostname check), input length/format validation, HTML escaping in
  the email.

## Quotas

Consumer Gmail accounts can send about 100 emails per day from Apps Script;
Google Workspace accounts 1,500. Plenty for a contact form.

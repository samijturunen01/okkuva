/**
 * Case studies for the "Tulokset" page (and the preview on the home page).
 *
 * To add a client, copy an object below. Fields:
 *
 *   slug     – URL-safe id, used as the anchor (#slug) on /tulokset
 *   client   – client name (shown as the heading)
 *   summary  – 1–3 sentences describing the project
 *   tags     – short descriptive labels
 *   videos   – ids from src/data/videos.js, shown as phone cards
 *   impact   – optional results block, shown after the summary and before the
 *              videos. REAL numbers only. Omit the key and the block is hidden.
 *              { eyebrow, story, growth: { from, to, label, note },
 *                stats: [{ value, label, note, tone: 'dark' | undefined }] }
 *   metrics  – REAL numbers only. Leave the array empty and the block is hidden.
 *              Example: { value: '120 000', label: 'näyttökertaa', note: 'ensimmäisen 30 päivän aikana' }
 *   quote    – optional real client quote: { text, author, role }. null hides it.
 *   featured – true = shown in the results preview on the home page
 *
 * Never invent metrics or quotes – the UI simply hides what is not provided.
 */
export const caseStudies = [
  {
    slug: 'business-joensuu',
    client: 'Business Joensuu',
    summary:
      'Sarja lyhytvideoita Pohjois-Karjalan paikoista, ihmisistä ja tapahtumista: alkuperäinen 70-luvun kioski, Kolin Taiteilijakoti Paateri, Liekinheitin kirkossa ja karjalaista kansanmusiikkia.',
    tags: ['Lyhytvideot', 'Haastattelut', 'Paikalliset kohteet'],
    // TODO (asiakas): vahvista, että kaikki neljä videota kuuluvat tähän projektiin.
    videos: ['kioski-70-luku', 'paateri-koli', 'liekinheitin-kirkossa', 'karjalainen-kansanmusiikki'],
    impact: {
      eyebrow: 'VisitKarelia',
      story:
        'Business Joensuun alla toimivalle organisaatiolle VisitKarelialle Daniel toteutti noin 20 lyhytvideon markkinointipaketin, joka saavutti Metassa (Instagram + Facebook) yhteensä yli 1 miljoona näyttökertaa alle kahdessa kuukaudessa. Samalta ajanjaksolta edellisenä vuonna näyttökertoja kertyi noin 10 000, joten näkyvyys kasvoi noin 10 000 näyttökerrasta yli miljoonaan. Mikä parasta, lyhytvideoihin käytettiin maksullista mainontaa tasan 0 €.',
      growth: {
        from: '10 000',
        to: '1 000 000+',
        label: 'näyttökertaa Metassa',
        note: 'Instagram + Facebook. Vertailukohtana sama ajanjakso vuotta aiemmin.',
      },
      stats: [
        {
          value: '0 €',
          label: 'maksettua mainontaa',
          note: 'Koko kasvu tuli ilman mainosbudjettia.',
          tone: 'dark',
        },
        {
          value: 'n. 20',
          label: 'lyhytvideota',
          note: 'Yhtenä markkinointipakettina, alle kahdessa kuukaudessa.',
        },
      ],
    },
    // TODO (asiakas): lisää todelliset luvut, esim.
    // { value: '120 000', label: 'näyttökertaa', note: '30 päivässä' },
    metrics: [],
    quote: null,
    featured: true,
  },
]

export const featuredCaseStudies = caseStudies.filter((c) => c.featured)

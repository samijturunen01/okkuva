/**
 * References / case studies. Shown on /yhteistyot#referenssit (and the
 * results highlight on the home page).
 *
 * To add a reference, copy an object below. Fields:
 *
 *   slug     – URL-safe id, used as the anchor (#slug) on /yhteistyot
 *   client   – client name (shown as the heading)
 *   kind     – what the work was, shown as the label above the client name:
 *              'production' (tilaustyö / videotuotanto) or 'collab'
 *              (kaupallinen yhteistyö Danielin omassa sisällössä)
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
 *   featured – true = shown in the results highlight on the home page
 *
 * Never invent metrics, quotes or clients – the UI simply hides what is not
 * provided.
 */
export const KIND_LABELS = {
  production: 'Videotuotanto',
  collab: 'Kaupallinen yhteistyö',
}

export const caseStudies = [
  {
    slug: 'visitkarelia',
    client: 'VisitKarelia',
    kind: 'production',
    summary:
      'Sarja lyhytvideoita Pohjois-Karjalan paikoista, ihmisistä ja tapahtumista: alkuperäinen 70-luvun kioski, Kolin Taiteilijakoti Paateri, Liekinheitin kirkossa ja karjalaista kansanmusiikkia. Videot julkaistiin VisitKarelian omissa kanavissa.',
    tags: ['Tilaustyö', 'Lyhytvideot', 'Haastattelut', 'Matkailu'],
    // TODO (Daniel): vahvista, että kaikki neljä videota kuuluvat tähän projektiin.
    videos: ['kioski-70-luku', 'paateri-koli', 'liekinheitin-kirkossa', 'karjalainen-kansanmusiikki'],
    // TODO (Daniel): tarkista luvut Meta-tilastoista ennen julkaisua ja lisää
    // halutessasi ajankohta (esim. "kesä 2026") growth.note-kenttään.
    impact: {
      eyebrow: 'Tulokset',
      story:
        'Business Joensuun alla toimivalle VisitKarelialle Daniel toteutti noin 20 lyhytvideon markkinointikokonaisuuden, joka saavutti Metassa (Instagram + Facebook) yhteensä yli 1 miljoona näyttökertaa alle kahdessa kuukaudessa. Samalta ajanjaksolta edellisenä vuonna näyttökertoja kertyi noin 10 000. Lyhytvideoihin käytettiin maksullista mainontaa tasan 0 €.',
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
          note: 'Näkyvyys syntyi ilman mainosbudjettia.',
          tone: 'dark',
        },
        {
          value: 'n. 20',
          label: 'lyhytvideota',
          note: 'Yhtenä kokonaisuutena, alle kahdessa kuukaudessa.',
        },
      ],
    },
    metrics: [],
    quote: null,
    featured: true,
  },
]

export const featuredCaseStudies = caseStudies.filter((c) => c.featured)

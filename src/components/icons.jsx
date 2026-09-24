/**
 * Small inline icon set (24×24, stroke = currentColor).
 */
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export const ArrowIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowLeftIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

export const ArrowDownIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)

export const PlayIcon = (props) => (
  <svg {...base} fill="currentColor" stroke="none" {...props}>
    <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.2-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z" />
  </svg>
)

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const CheckIcon = (props) => (
  <svg {...base} strokeWidth={2.4} {...props}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const CameraIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="7" width="13" height="11" rx="2.5" />
    <path d="M16 10.5l5-2.5v9l-5-2.5" />
  </svg>
)

export const ScriptIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M7 3.5h8l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19V5a1.5 1.5 0 0 1 2-1.5Z" />
    <path d="M15 3.5v4h4M8.5 11.5h7M8.5 15h5" />
  </svg>
)

export const MicIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" />
  </svg>
)

export const FilmIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4M7 12h10" />
  </svg>
)

export const ScissorsIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="6.5" cy="17.5" r="2.5" />
    <path d="M8.6 8.2L20 19M8.6 15.8L20 5M14 12l-1.5 1.4" />
  </svg>
)

export const WaveformIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 12h1M7 8v8M11 5v14M15 9v6M19 7v10M22 12h-1" />
  </svg>
)

export const ShieldIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3l7 3v5.5c0 4.4-2.9 7.9-7 9.5-4.1-1.6-7-5.1-7-9.5V6l7-3Z" />
    <path d="M9 12.2l2 2 4-4.2" />
  </svg>
)

export const ClockIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)

export const MailIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7.5l8.5 6 8.5-6" />
  </svg>
)

export const PhoneIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5.5 3.5h3l1.8 4.3-2.1 1.7a11 11 0 0 0 6.3 6.3l1.7-2.1 4.3 1.8v3a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 4 5.1a1.5 1.5 0 0 1 1.5-1.6Z" />
  </svg>
)

export const InstagramIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
)

export const HeartIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 20.4C7.2 17.3 3.5 14.2 3.5 10.3A4.8 4.8 0 0 1 12 7.2a4.8 4.8 0 0 1 8.5 3.1c0 3.9-3.7 7-8.5 10.1Z" />
  </svg>
)

export const CommentIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3.6c4.9 0 8.6 3.2 8.6 7.5s-3.7 7.5-8.6 7.5a10 10 0 0 1-2.6-.33L4.6 20.4l1.1-3.6A7.2 7.2 0 0 1 3.4 11c0-4.3 3.7-7.4 8.6-7.4Z" />
  </svg>
)

export const ShareIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M21 3.6 2.9 9.9a.35.35 0 0 0 0 .66l7.5 2.7 2.7 7.5a.35.35 0 0 0 .66 0L21 3.6Z" />
    <path d="m10.4 13.3 4.5-4.5" />
  </svg>
)

export const BookmarkIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6 3.7h12a.8.8 0 0 1 .8.8v15.3L12 15.6l-6.8 4.2V4.5a.8.8 0 0 1 .8-.8Z" />
  </svg>
)

/** Vertical "…" menu, as on the Instagram Reels action rail. */
export const MoreIcon = (props) => (
  <svg {...base} fill="currentColor" stroke="none" {...props}>
    <circle cx="12" cy="5" r="1.9" />
    <circle cx="12" cy="12" r="1.9" />
    <circle cx="12" cy="19" r="1.9" />
  </svg>
)

export const SparkIcon = (props) => (
  <svg {...base} fill="currentColor" stroke="none" {...props}>
    <path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7L12 2Z" />
  </svg>
)

const byName = {
  arrow: ArrowIcon,
  play: PlayIcon,
  close: CloseIcon,
  check: CheckIcon,
  camera: CameraIcon,
  script: ScriptIcon,
  mic: MicIcon,
  film: FilmIcon,
  scissors: ScissorsIcon,
  waveform: WaveformIcon,
  shield: ShieldIcon,
  clock: ClockIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  spark: SparkIcon,
  heart: HeartIcon,
  comment: CommentIcon,
  share: ShareIcon,
  bookmark: BookmarkIcon,
  more: MoreIcon,
}

/** Render an icon by name (used by data files). */
export function Icon({ name, ...props }) {
  const Component = byName[name]
  return Component ? <Component {...props} /> : null
}

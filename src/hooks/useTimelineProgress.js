import { useEffect } from 'react'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/**
 * Scroll-linked progress for the process timeline.
 *
 * Writes `--progress` (0…1) on the container as the reader scrolls through it
 * and toggles `.is-active` on every child with a [data-step] attribute once it
 * has passed the focus line (a fraction of the viewport height).
 */
export function useTimelineProgress(ref, { focus = 0.62 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const steps = Array.from(el.querySelectorAll('[data-step]'))
    let raf = 0

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const focusY = window.innerHeight * focus
      const progress = clamp((focusY - rect.top) / Math.max(rect.height, 1), 0, 1)
      el.style.setProperty('--progress', progress.toFixed(4))
      for (const step of steps) {
        const r = step.getBoundingClientRect()
        step.classList.toggle('is-active', r.top + 32 < focusY)
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [ref, focus])
}

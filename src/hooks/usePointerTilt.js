import { useEffect } from 'react'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/**
 * Tracks the pointer and writes smoothed, normalised coordinates (-1 … 1) into
 * the CSS custom properties `--tx` and `--ty` on the element. CSS then decides
 * what to do with them (tilt, parallax, glare…). No React re-renders involved.
 *
 * scope: 'element' – relative to the element's own box (resets on leave)
 *        'window'  – relative to the viewport while the element is on screen
 *
 * Does nothing for touch-only devices or when reduced motion is preferred.
 */
export function usePointerTilt(ref, { scope = 'element', ease = 0.1, enabled = true } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let raf = 0
    let visible = true

    const write = () => {
      el.style.setProperty('--tx', currentX.toFixed(3))
      el.style.setProperty('--ty', currentY.toFixed(3))
    }

    const tick = () => {
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
      if (Math.abs(targetX - currentX) > 0.0015 || Math.abs(targetY - currentY) > 0.0015) {
        write()
        raf = requestAnimationFrame(tick)
      } else {
        currentX = targetX
        currentY = targetY
        write()
        raf = 0
      }
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      if (!visible) return
      if (scope === 'window') {
        targetX = (event.clientX / window.innerWidth) * 2 - 1
        targetY = (event.clientY / window.innerHeight) * 2 - 1
      } else {
        const rect = el.getBoundingClientRect()
        targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1
        targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1
      }
      targetX = clamp(targetX, -1, 1)
      targetY = clamp(targetY, -1, 1)
      kick()
    }

    const reset = () => {
      targetX = 0
      targetY = 0
      kick()
    }

    const moveTarget = scope === 'window' ? window : el
    moveTarget.addEventListener('pointermove', onMove, { passive: true })
    if (scope === 'element') el.addEventListener('pointerleave', reset)
    else document.documentElement.addEventListener('pointerleave', reset)

    let observer
    if (scope === 'window' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        if (!visible) reset()
      })
      observer.observe(el)
    }

    return () => {
      moveTarget.removeEventListener('pointermove', onMove)
      if (scope === 'element') el.removeEventListener('pointerleave', reset)
      else document.documentElement.removeEventListener('pointerleave', reset)
      if (observer) observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
      el.style.removeProperty('--tx')
      el.style.removeProperty('--ty')
    }
  }, [ref, scope, ease, enabled])
}

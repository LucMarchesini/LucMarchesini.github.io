import type { PointerEvent } from 'react'

/** Spotlight que segue o cursor (desktop) ou o dedo (toque) via CSS vars — sem re-render */
export function useSpotlight() {
  const move = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    el.dataset.lit = 'true'
  }
  const leave = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    if (e.pointerType === 'mouse') el.dataset.lit = 'false'
    else setTimeout(() => (el.dataset.lit = 'false'), 380)
  }
  return {
    onPointerMove: move,
    onPointerDown: move,
    onPointerLeave: leave,
    onPointerUp: (e: PointerEvent<HTMLElement>) => e.pointerType !== 'mouse' && leave(e),
    onPointerCancel: leave,
  }
}

import { m, useReducedMotion } from 'motion/react'
import { useState, type PointerEvent } from 'react'
import { haptic } from '../lib/haptics'

type R = { id: number; x: number; y: number; size: number }

/**
 * Ripple verde que nasce no ponto do toque + vibração curta.
 * O elemento pai precisa de `relative overflow-hidden`.
 */
export function useRipple(tone: 'accent' | 'dark' = 'accent') {
  const reduced = useReducedMotion()
  const [ripples, setRipples] = useState<R[]>([])

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    haptic(e.pointerType)
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.hypot(rect.width, rect.height) * 2
    const id = e.timeStamp + Math.random()
    setRipples((a) => [...a.slice(-3), { id, x: e.clientX - rect.left, y: e.clientY - rect.top, size }])
  }

  const node = (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {ripples.map((r) => (
        <m.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setRipples((a) => a.filter((x) => x.id !== r.id))}
          className={`absolute rounded-full ${tone === 'accent' ? 'bg-accent/35' : 'bg-on-accent/25'}`}
          style={{ left: r.x - r.size / 2, top: r.y - r.size / 2, width: r.size, height: r.size }}
        />
      ))}
    </span>
  )
  return { node, onPointerDown }
}

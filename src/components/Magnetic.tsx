import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'

/** Puxa levemente o conteúdo em direção ao cursor (apenas mouse; nada no toque) */
export function Magnetic({ children, strength = 0.22, className }: { children: ReactNode; strength?: number; className?: string }) {
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength * 1.4)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <m.div className={className} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.div>
  )
}

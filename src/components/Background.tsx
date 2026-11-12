import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'

/** Dois brilhos verdes flutuando, grade de pontos com parallax na rolagem e grão */
export function Background() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1600], [0, reduced ? 0 : -140])
  return (
    <div aria-hidden="true">
      <div className="glow glow--a" />
      <div className="glow glow--b" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <m.div className="dots" style={{ y }} />
      </div>
      <div className="grain" />
    </div>
  )
}

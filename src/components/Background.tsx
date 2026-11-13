import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'

// Anéis concêntricos (raios em unidades do viewBox 0–1000, centro 500,500)
const RINGS = Array.from({ length: 34 }, (_, i) => 18 + i * 14.5)

/**
 * Fundo "campo NFC": anéis de linha fina saindo da foto, como o campo de um
 * toque. Sem blobs, sem grão, sem grade de pontos. Uma onda verde se propaga
 * devagar; na rolagem os anéis giram/deslizam de leve.
 */
export function Background() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 2000], [0, reduced ? 0 : -90])
  const scale = useTransform(scrollY, [0, 2000], [1, reduced ? 1 : 1.12])

  return (
    <div className="field" aria-hidden="true">
      <m.div className="field__rings" style={{ y, scale }}>
        <svg viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="xMidYMid meet">
          {RINGS.map((r, i) => (
            <circle
              key={r}
              cx="500"
              cy="500"
              r={r}
              stroke={i % 5 === 2 ? 'rgb(0 217 146 / 0.16)' : 'rgb(242 242 242 / 0.055)'}
              strokeWidth={i % 5 === 2 ? 0.9 : 0.6}
              vectorEffect="non-scaling-stroke"
              strokeDasharray={i % 3 === 1 ? '2 6' : undefined}
            />
          ))}
        </svg>
        <span className="field__wave" />
        <span className="field__wave field__wave--2" />
      </m.div>
    </div>
  )
}

import { m, useAnimationControls, useReducedMotion } from 'motion/react'
import { useEffect, type PointerEvent } from 'react'
import { profile, ui } from '../data/profile'
import { haptic } from '../lib/haptics'
import { useT } from '../lib/i18n'

const RINGS = [0, 1, 2]

/** Squircle com anel cônico verde, pop + scan na entrada e "campo NFC" ao tocar */
export function Photo() {
  const t = useT()
  const reduced = useReducedMotion()
  const rings = useAnimationControls()
  const base = import.meta.env.BASE_URL

  const emit = () => {
    if (reduced) return
    rings.set({ scale: 1, opacity: 0 })
    rings.start((i: number) => ({
      scale: [1, 2.4],
      opacity: [0.7, 0],
      transition: { duration: 1.6, delay: i * 0.26, ease: [0.16, 1, 0.3, 1] },
    }))
  }

  useEffect(() => {
    const id = setTimeout(emit, 650)
    return () => clearTimeout(id)
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- dispara só no carregamento
  }, [reduced])

  const onDown = (e: PointerEvent) => {
    haptic(e.pointerType)
    emit()
  }

  return (
    <m.div
      onPointerDown={onDown}
      initial={reduced ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.7, bounce: 0.35 }}
      whileTap={{ scale: 0.96 }}
      className="relative size-[104px] shrink-0 cursor-pointer select-none"
    >
      {RINGS.map((i) => (
        <m.span key={i} custom={i} animate={rings} className="field-ring" aria-hidden="true" />
      ))}
      <span className="photo-ring" aria-hidden="true" />
      <span className="absolute inset-0 overflow-hidden rounded-[32px] bg-raise">
        <picture>
          <source type="image/avif" srcSet={`${base}img/foto-200.avif 200w, ${base}${profile.photo.avif} 400w`} sizes="104px" />
          <source type="image/webp" srcSet={`${base}img/foto-200.webp 200w, ${base}${profile.photo.webp} 400w`} sizes="104px" />
          <img
            src={base + profile.photo.jpg}
            alt={t(ui.photoAlt)}
            width={400}
            height={400}
            fetchPriority="high"
            draggable={false}
            className="size-full object-cover"
          />
        </picture>
        {!reduced && (
          <m.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-accent/45 to-transparent mix-blend-screen"
            initial={{ y: '-110%' }}
            animate={{ y: '330%' }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </span>
    </m.div>
  )
}

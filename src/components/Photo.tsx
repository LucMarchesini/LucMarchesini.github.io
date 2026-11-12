import { m, useAnimationControls, useReducedMotion } from 'motion/react'
import { useEffect } from 'react'
import { profile, ui } from '../data/profile'
import { useT } from '../lib/i18n'

const RINGS = [0, 1, 2]

/** Foto com anel cônico girando + "campo NFC" que se propaga ao carregar e ao tocar */
export function Photo() {
  const t = useT()
  const reduced = useReducedMotion()
  const controls = useAnimationControls()
  const base = import.meta.env.BASE_URL

  const emit = () => {
    if (reduced) return
    controls.set({ scale: 1, opacity: 0 })
    controls.start((i: number) => ({
      scale: [1, 2.9],
      opacity: [0.75, 0],
      transition: { duration: 1.8, delay: i * 0.28, ease: [0.23, 1, 0.32, 1] },
    }))
  }

  useEffect(() => {
    const id = setTimeout(emit, 380)
    return () => clearTimeout(id)
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- dispara só no carregamento
  }, [reduced])

  return (
    <div onPointerDown={emit} className="relative size-[104px] shrink-0 cursor-pointer rounded-full select-none sm:size-[116px]">
      {RINGS.map((i) => (
        <m.span key={i} custom={i} animate={controls} className="field-ring" aria-hidden="true" />
      ))}
      <span className="photo-ring photo-ring--glow" aria-hidden="true" />
      <span className="photo-ring" aria-hidden="true" />
      <span className="absolute inset-0 rounded-full bg-ink p-[3px]">
        <picture>
          <source type="image/avif" srcSet={`${base}img/foto-200.avif 200w, ${base}${profile.photo.avif} 400w`} sizes="116px" />
          <source type="image/webp" srcSet={`${base}img/foto-200.webp 200w, ${base}${profile.photo.webp} 400w`} sizes="116px" />
          <img
            src={base + profile.photo.jpg}
            alt={t(ui.photoAlt)}
            width={400}
            height={400}
            fetchPriority="high"
            decoding="async"
            className="size-full rounded-full object-cover"
          />
        </picture>
      </span>
    </div>
  )
}

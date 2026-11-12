import type { Transition, Variants } from 'motion/react'

/** Mola "Apple-style" — sutil, sem quique exagerado */
export const spring: Transition = { type: 'spring', duration: 0.55, bounce: 0.18 }
export const snappy: Transition = { type: 'spring', duration: 0.3, bounce: 0.15 }

export const container = (reduced: boolean): Variants => ({
  hidden: {},
  show: {
    transition: reduced
      ? { staggerChildren: 0, delayChildren: 0 }
      : { staggerChildren: 0.055, delayChildren: 0.04 },
  },
})

export const item = (reduced: boolean): Variants =>
  reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }
    : {
        hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: spring },
      }

/** Feedback de toque/hover padrão para cards e botões */
export const press = {
  whileTap: { scale: 0.97 },
  transition: snappy,
}

import type { Transition, Variants } from 'motion/react'

export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const spring: Transition = { type: 'spring', duration: 0.55, bounce: 0.2 }
export const snappy: Transition = { type: 'spring', duration: 0.3, bounce: 0.15 }

export const container = (reduced: boolean): Variants => ({
  hidden: {},
  show: { transition: reduced ? {} : { staggerChildren: 0.06, delayChildren: 0.05 } },
})

export const item = (reduced: boolean): Variants =>
  reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: spring },
      }

/** Revela blocos abaixo da dobra ao rolar */
export const reveal = (reduced: boolean) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '0px 0px -12% 0px' },
        transition: { duration: 0.6, ease: EASE_OUT },
      }

/** Afundar ao tocar */
export const press = { whileTap: { scale: 0.96 }, transition: snappy }
export const pressSoft = { whileTap: { scale: 0.975 }, transition: snappy }

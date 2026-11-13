import { useInView } from 'motion/react'
import { useSyncExternalStore, type RefObject } from 'react'

const query = '(hover: none), (pointer: coarse)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const getTouch = () => window.matchMedia(query).matches

/** Verdadeiro em telas de toque (sem hover) */
export function useIsTouch() {
  return useSyncExternalStore(subscribe, getTouch, () => false)
}

/** No celular: verdadeiro quando o elemento cruza a faixa central da tela */
export function useTouchFocus(ref: RefObject<HTMLElement | null>) {
  const touch = useSyncExternalStore(subscribe, getTouch, () => false)
  const inMiddle = useInView(ref, { margin: '-46% 0px -46% 0px' })
  return touch && inMiddle
}

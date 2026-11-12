import { createContext, useContext } from 'react'
import type { Lang } from '../data/profile'

export const LangContext = createContext<Lang>('pt')
export const useLang = () => useContext(LangContext)

/** Seleciona o texto no idioma atual */
export function useT() {
  const lang = useLang()
  return <V,>(entry: Record<Lang, V>): V => entry[lang]
}

const KEY = 'lang'
export function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'pt' || v === 'en') return v
  } catch {
    /* storage indisponível */
  }
  return 'pt'
}
export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    /* ignore */
  }
}

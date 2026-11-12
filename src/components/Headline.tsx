import { m, useReducedMotion } from 'motion/react'
import { Fragment, useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useLang, useT } from '../lib/i18n'

/** Headline com as palavras-foco recebendo destaque em ciclo (Dados → IA → Segurança) */
export function Headline() {
  const t = useT()
  const lang = useLang()
  const words = profile.headline.focus[lang]
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActive((a) => (a + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [reduced, words.length])

  return (
    <p className="text-balance text-[15px] leading-relaxed text-muted sm:text-base">
      <span className="block">{t(profile.headline.prefix)}</span>
      <span className="sr-only">, </span>
      {words.map((w, i) => (
        <Fragment key={w}>
          <span className="relative inline-block whitespace-nowrap">
            <span
              className="transition-colors duration-500"
              style={{ color: !reduced && i === active ? 'var(--color-amber)' : 'var(--color-paper)' }}
            >
              {w}
            </span>
            {!reduced && (
              <m.span
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-amber/80"
                initial={false}
                animate={{ scaleX: i === active ? 1 : 0, opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                aria-hidden="true"
              />
            )}
          </span>
          {i < words.length - 2 ? ', ' : i === words.length - 2 ? ' & ' : ''}
        </Fragment>
      ))}
    </p>
  )
}

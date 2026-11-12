import { m, useReducedMotion } from 'motion/react'
import { Fragment, useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useLang, useT } from '../lib/i18n'
import { EASE_OUT } from './motion'

/** Nome: sobe palavra por palavra (blur → nítido, leve rotação) e o ponto verde estala */
export function Name() {
  const reduced = useReducedMotion()
  const words = profile.nameLines.map((l) => l.split(' '))
  const offsets = words.map((_, li) => words.slice(0, li).reduce((acc, l) => acc + l.length, 0))
  return (
    <h1
      id="name"
      translate="no"
      aria-label={profile.name}
      className="font-display text-[clamp(50px,14vw,76px)] leading-[0.92] font-semibold tracking-[-0.045em] text-ink-strong min-[900px]:text-[clamp(64px,6.4vw,88px)]"
    >
      {words.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.map((w, wi) => {
            const i = offsets[li] + wi
            const isLast = li === words.length - 1 && wi === line.length - 1
            return (
              <Fragment key={wi}>
              <span className="inline-block">
                <m.span
                  className="inline-block origin-bottom-left"
                  initial={reduced ? false : { y: '0.45em', opacity: 0, filter: 'blur(10px)', rotate: 5 }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)', rotate: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: EASE_OUT }}
                >
                  {w}
                </m.span>
                {isLast ? (
                  <m.span
                    className="inline-block text-accent"
                    initial={reduced ? false : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.6, delay: 0.15 + (i + 1) * 0.09 + 0.15 }}
                  >
                    .
                  </m.span>
                ) : null}
              </span>
              {isLast ? null : ' '}
              </Fragment>
            )
          })}
        </span>
      ))}
    </h1>
  )
}

/** Cargo com palavra rotativa (Dados → IA → Software) sem pulo de layout */
export function Role() {
  const t = useT()
  const lang = useLang()
  const words = profile.role.words[lang]
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setI((x) => (x + 1) % words.length), 2200)
    return () => clearInterval(id)
  }, [reduced, words.length])

  return (
    <p className="text-[16px] leading-snug text-mute">
      <span className="block">{t(profile.role.prefix)}</span>
      <span className="sr-only">
        {t(profile.role.lead)} {words.join(', ')}
      </span>
      <span aria-hidden="true">
        {t(profile.role.lead)}{' '}
        <span className="inline-grid align-bottom">
          {words.map((w, wi) => (
            <m.span
              key={w}
              className="col-start-1 row-start-1 font-medium text-ink"
              initial={false}
              animate={
                reduced
                  ? { opacity: wi === 0 ? 1 : 0 }
                  : { opacity: wi === i ? 1 : 0, y: wi === i ? 0 : wi === (i + words.length - 1) % words.length ? -10 : 10, filter: wi === i ? 'blur(0px)' : 'blur(4px)' }
              }
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              {w}
            </m.span>
          ))}
        </span>
      </span>
    </p>
  )
}

export function StatusPill() {
  const t = useT()
  return (
    <p className="meta inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-wash py-1.5 pr-3.5 pl-3 font-medium text-accent-soft">
      <span className="ping size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      <span translate="no">{t(profile.status)}</span>
    </p>
  )
}

/** Cidade + hora local (útil para quem é de outro fuso) */
export function LocalTime() {
  const lang = useLang()
  const t = useT()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  const time = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: profile.timeZone,
  }).format(now)
  return (
    <p className="meta flex flex-col gap-0.5 pb-1.5 text-mute">
      <span className="text-body">{t(profile.city)}</span>
      <span>
        <time dateTime={now.toISOString()}>{time}</time> {lang === 'pt' ? 'agora por aqui' : 'local time'}
      </span>
    </p>
  )
}

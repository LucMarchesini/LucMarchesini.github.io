import { AnimatePresence, m, useInView, useReducedMotion } from 'motion/react'
import { ChevronsRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { profile, ui } from '../data/profile'
import { haptic } from '../lib/haptics'
import { useT } from '../lib/i18n'
import { useIsTouch } from './useTouchFocus'

/** Carrossel "Agora": arrastável com o dedo, snap, card visível com borda verde e bolinhas */
export function NowCarousel() {
  const t = useT()
  const scroller = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [moved, setMoved] = useState(false)
  const touch = useIsTouch()
  const reduced = useReducedMotion()
  const seen = useInView(scroller, { once: true, amount: 0.6 })

  // "espiadinha": na primeira vez que aparece, o carrossel desliza um pouco e volta
  useEffect(() => {
    const root = scroller.current
    if (!seen || !root || reduced || !touch) return
    const a = setTimeout(() => root.scrollTo({ left: 64, behavior: 'smooth' }), 350)
    const b = setTimeout(() => root.scrollTo({ left: 0, behavior: 'smooth' }), 950)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [seen, reduced, touch])

  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = cards.current.indexOf(e.target as HTMLLIElement)
            if (i >= 0) {
              setActive(i)
              if (i > 0) setMoved(true)
            }
          }
        }
      },
      { root, threshold: 0.65 },
    )
    cards.current.forEach((c) => c && io.observe(c))
    return () => io.disconnect()
  }, [])

  // vibração curta quando o card ativo muda durante o arraste
  const last = useRef(0)
  useEffect(() => {
    if (last.current !== active) haptic('touch', 5)
    last.current = active
  }, [active])

  const go = (i: number) => {
    const c = cards.current[i]
    const root = scroller.current
    if (!c || !root) return
    const pad = parseFloat(getComputedStyle(root).paddingLeft) || 0
    root.scrollTo({ left: c.offsetLeft - root.offsetLeft - pad, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="now-h">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="now-h" className="meta font-medium text-mute">
          {t(ui.now)}
        </h2>
        <div className="-mr-2 flex">
          {profile.now.map((n, i) => (
            <button
              key={n.org}
              type="button"
              onClick={() => go(i)}
              aria-label={`${t(ui.slide)} ${i + 1}: ${n.org}`}
              aria-current={i === active}
              className="grid size-7 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-5 bg-accent' : 'w-1.5 bg-hairline'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        role="region"
        aria-label={t(ui.now)}
        className="snap-carousel -mx-[18px] flex gap-3 overflow-x-auto scroll-px-[18px] px-[18px] pb-1 min-[900px]:mx-0 min-[900px]:scroll-px-0 min-[900px]:px-0 min-[900px]:[mask-image:linear-gradient(to_right,#000_82%,transparent)]"
      >
        <ol className="contents">
          {profile.now.map((n, i) => (
            <li
              key={n.org}
              ref={(el) => {
                cards.current[i] = el
              }}
              className="w-[76%] max-w-[340px] shrink-0 snap-start"
            >
              <m.article
                animate={{ borderColor: i === active ? 'rgba(0, 217, 146, 0.55)' : 'rgba(242, 242, 242, 0.08)' }}
                transition={{ duration: 0.3 }}
                className="flex h-full min-h-[148px] flex-col rounded-[18px] border bg-raise p-4"
              >
                <span className={`meta mb-3 inline-flex items-center gap-1.5 ${n.upcoming ? 'text-accent-soft' : 'text-mute'}`}>
                  <span className={`size-1.5 rounded-full ${n.upcoming ? 'bg-accent' : 'bg-mute'}`} aria-hidden="true" />
                  {n.upcoming ? t(ui.upcoming) : t(ui.current)}
                </span>
                <h3 className="font-display text-[22px] leading-[1.08] font-semibold tracking-[-0.025em] text-ink" translate="no">
                  {n.org}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-snug text-body text-pretty">{t(n.title)}</p>
                <p className="meta mt-auto pt-3 text-mute">{t(n.period)}</p>
              </m.article>
            </li>
          ))}
        </ol>
        <span className="w-px shrink-0" aria-hidden="true" />
      </div>

      <AnimatePresence initial={false}>
        {!moved && (
          <m.p
            key="hint"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="meta flex items-center gap-1.5 overflow-hidden pt-3 text-mute"
          >
            {touch ? t(ui.swipeHint) : t(ui.scrollHint)}
            <m.span
              aria-hidden="true"
              className="inline-flex text-accent"
              animate={reduced ? undefined : { x: [0, 5, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronsRight className="size-4" />
            </m.span>
          </m.p>
        )}
      </AnimatePresence>
    </section>
  )
}

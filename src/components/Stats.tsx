import { animate, useInView, useReducedMotion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { profile, ui } from '../data/profile'
import { useT } from '../lib/i18n'

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduced) {
      el.textContent = `${to}${suffix}`
      return
    }
    const ctrl = animate(0, to, {
      duration: 1.1,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    })
    return () => ctrl.stop()
  }, [inView, reduced, to, suffix])

  return (
    <span ref={ref} className="tabular" aria-hidden="true">
      {`0${suffix}`}
    </span>
  )
}

export function Stats() {
  const t = useT()
  return (
    <section aria-labelledby="numbers-h" className="grid grid-cols-1 gap-2.5">
      <h2 id="numbers-h" className="sr-only">
        {t(ui.numbers)}
      </h2>
      <dl className="glass grid grid-cols-3 divide-x divide-line rounded-[22px]">
        {profile.stats.map((s) => (
          <div key={s.value} className="flex flex-col gap-1 px-3 py-4 sm:px-4">
            <dt className="order-2 text-[12px] leading-snug text-muted text-pretty">
              {t(s.label)}
              <span className="mt-1 block font-mono text-[10.5px] text-faint" translate="no">
                {s.source}
              </span>
            </dt>
            <dd className="order-1 font-display text-[30px] leading-none font-semibold tracking-[-0.04em] text-paper sm:text-[34px]">
              <span className="sr-only">
                {s.value}
                {s.suffix}
              </span>
              <Counter to={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="glass flex items-start gap-3.5 rounded-[22px] p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber/25 to-coral/10 text-amber ring-1 ring-amber/25 ring-inset">
          <Sparkles className="size-[18px]" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[12px] text-muted">{t(profile.featured.label)}</p>
          <p className="font-display text-[19px] leading-tight font-semibold tracking-[-0.02em]" translate="no">
            {profile.featured.title}
          </p>
          <p className="mt-1 text-[13.5px] leading-snug text-muted text-pretty">{t(profile.featured.description)}</p>
        </div>
      </div>
    </section>
  )
}

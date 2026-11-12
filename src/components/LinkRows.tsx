import { m } from 'motion/react'
import { ArrowUpRight, Download, Eye } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { profile, ui } from '../data/profile'
import { useT } from '../lib/i18n'
import { press, pressSoft } from './motion'
import { useRipple } from './useRipple'
import { useTouchFocus } from './useTouchFocus'

function Index({ n }: { n: number }) {
  return (
    <span className="row-index meta w-6 shrink-0 font-medium text-mute" aria-hidden="true">
      {String(n).padStart(2, '0')}
    </span>
  )
}

function Text({ title, sub, tag }: { title: string; sub: string; tag?: ReactNode }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
      <span className="flex items-center gap-2 font-display text-[20px] leading-tight font-semibold tracking-[-0.02em] text-ink">
        {title}
        {tag}
      </span>
      <span className="meta truncate text-mute">{sub}</span>
    </span>
  )
}

const rowBase =
  'row relative isolate flex min-h-[76px] items-center gap-3 overflow-hidden rounded-[18px] border border-transparent'

function LinkRow({ n, href, title, sub, tag }: { n: number; href: string; title: string; sub: string; tag?: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const focus = useTouchFocus(ref)
  const ripple = useRipple()
  return (
    <m.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-focus={focus}
      onPointerDown={ripple.onPointerDown}
      {...pressSoft}
      className={`${rowBase} py-3 pr-3 pl-4`}
    >
      {ripple.node}
      <Index n={n} />
      <Text title={title} sub={sub} tag={tag} />
      <span className="row-arrow grid size-10 shrink-0 place-items-center rounded-full border border-hairline text-ink">
        <ArrowUpRight className="size-[18px]" aria-hidden="true" />
      </span>
    </m.a>
  )
}

/** Currículo no formato da versão anterior (Ver / Baixar na própria linha); tocar no texto abre a prévia */
function ResumeRow({ n, onPreview }: { n: number; onPreview: () => void }) {
  const t = useT()
  const ref = useRef<HTMLDivElement>(null)
  const focus = useTouchFocus(ref)
  const ripple = useRipple()
  const href = import.meta.env.BASE_URL + profile.links.resume.pt
  const small = 'relative grid h-11 place-items-center rounded-full text-[14px] font-semibold transition-colors'
  return (
    <div ref={ref} data-focus={focus} className={`${rowBase} pr-2`}>
      {ripple.node}
      <m.button
        type="button"
        onClick={onPreview}
        onPointerDown={ripple.onPointerDown}
        {...pressSoft}
        aria-haspopup="dialog"
        className="flex min-w-0 flex-1 items-center gap-3 self-stretch py-3 pl-4 text-left"
      >
        <Index n={n} />
        <Text title={t(ui.resume)} sub={t(ui.resumeSub)} />
      </m.button>
      <div className="flex shrink-0 gap-1.5">
        <m.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...press}
          aria-label={`${t(ui.view)} ${t(ui.resume)}`}
          className={`${small} lift border border-hairline px-3.5 text-ink`}
        >
          <span className="flex items-center gap-1.5">
            <Eye className="size-4" aria-hidden="true" />
            <span className="hidden min-[400px]:inline">{t(ui.view)}</span>
          </span>
        </m.a>
        <m.a
          href={href}
          download={profile.links.resume.downloadName}
          {...press}
          aria-label={`${t(ui.download)} ${t(ui.resume)}`}
          className={`${small} bg-accent px-3.5 text-on-accent`}
        >
          <span className="flex items-center gap-1.5">
            <Download className="size-4" aria-hidden="true" />
            {t(ui.download)}
          </span>
        </m.a>
      </div>
    </div>
  )
}

export function LinkRows({ onResume }: { onResume: () => void }) {
  const t = useT()
  return (
    <section aria-labelledby="links-h">
      <h2 id="links-h" className="meta mb-2 font-medium text-mute">
        {t(ui.links)}
      </h2>
      <div className="-mx-2 grid grid-cols-1 gap-1">
        <LinkRow n={1} href={profile.links.linkedin} title="LinkedIn" sub={t(ui.linkedinSub)} />
        <LinkRow n={2} href={profile.links.github} title="GitHub" sub={t(ui.githubSub)} />
        <ResumeRow n={3} onPreview={onResume} />
        {/* TODO: trocar pelo link real do portfólio em src/data/profile.ts */}
        <LinkRow
          n={4}
          href={profile.links.portfolio}
          title={t(ui.portfolio)}
          sub={t(ui.portfolioSub)}
          tag={
            !profile.links.portfolioReady && (
              <span className="rounded-full border border-hairline px-2 py-px font-sans text-[12px] font-normal tracking-normal text-mute">
                {t(ui.soon)}
              </span>
            )
          }
        />
      </div>
    </section>
  )
}

import { m } from 'motion/react'
import { ArrowUpRight, Check, Copy, Download, Eye, FileText, LayoutGrid, Mail } from 'lucide-react'
import { useState, type ComponentType, type ReactNode, type SVGProps } from 'react'
import { profile, ui } from '../data/profile'
import { copyText } from '../lib/clipboard'
import { useLang, useT } from '../lib/i18n'
import { mailHref } from '../lib/links'
import { GitHubIcon, LinkedInIcon } from './Icons'
import { press } from './motion'
import { useToast } from './Toast'
import { useSpotlight } from './useSpotlight'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

function IconTile({ icon: I, tone = 'paper' }: { icon: Icon; tone?: 'paper' | 'amber' }) {
  return (
    <span
      className={`grid size-11 shrink-0 place-items-center rounded-[14px] ring-1 ring-inset ${
        tone === 'amber' ? 'bg-amber/12 text-amber ring-amber/25' : 'bg-white/[0.06] text-paper ring-white/10'
      }`}
    >
      <I className="size-[19px]" aria-hidden="true" />
    </span>
  )
}

function CardText({ title, sub, tag }: { title: string; sub: string; tag?: ReactNode }) {
  return (
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="flex items-center gap-2 text-[15.5px] font-semibold tracking-[-0.01em] text-paper">
        {title}
        {tag}
      </span>
      <span className="truncate text-[13px] text-muted">{sub}</span>
    </span>
  )
}

function LinkCard({ href, icon, title, sub, tag, external = true }: { href: string; icon: Icon; title: string; sub: string; tag?: ReactNode; external?: boolean }) {
  const spot = useSpotlight()
  return (
    <m.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...press}
      whileHover={{ scale: 1.01 }}
      {...spot}
      className="glass spotlight group flex min-h-[68px] items-center gap-3.5 rounded-[20px] py-3 pr-4 pl-3"
    >
      <IconTile icon={icon} />
      <CardText title={title} sub={sub} tag={tag} />
      <ArrowUpRight className="nudge nudge-diag size-[18px] shrink-0 text-faint transition-colors group-hover:text-amber" aria-hidden="true" />
    </m.a>
  )
}

const pill =
  'inline-flex h-11 items-center gap-1.5 rounded-xl px-3.5 text-[13.5px] font-semibold transition-colors duration-200'

function ResumeCard() {
  const t = useT()
  const spot = useSpotlight()
  const href = import.meta.env.BASE_URL + profile.links.resume
  return (
    <div {...spot} className="glass spotlight flex min-h-[68px] items-center gap-3.5 rounded-[20px] py-3 pr-3 pl-3">
      <IconTile icon={FileText} tone="amber" />
      <CardText title={t(ui.resume)} sub={t(ui.resumeSub)} />
      <div className="flex shrink-0 gap-1.5">
        <m.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...press}
          className={`${pill} bg-white/[0.07] text-paper hover:bg-white/[0.12]`}
          aria-label={`${t(ui.view)} ${t(ui.resume)}`}
        >
          <Eye className="size-4" aria-hidden="true" />
          {t(ui.view)}
        </m.a>
        <m.a
          href={href}
          download={profile.links.resumeDownloadName}
          {...press}
          className={`${pill} bg-amber/15 text-amber hover:bg-amber/25`}
          aria-label={`${t(ui.download)} ${t(ui.resume)}`}
        >
          <Download className="size-4" aria-hidden="true" />
          <span className="hidden min-[380px]:inline">{t(ui.download)}</span>
        </m.a>
      </div>
    </div>
  )
}

function EmailCard() {
  const t = useT()
  const lang = useLang()
  const notify = useToast()
  const spot = useSpotlight()
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (await copyText(profile.contact.email)) {
      setCopied(true)
      notify(ui.emailCopied[lang])
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <div {...spot} className="glass spotlight flex min-h-[68px] items-center gap-2 rounded-[20px] py-3 pr-3 pl-3">
      <a href={mailHref()} className="flex min-w-0 flex-1 items-center gap-3.5 rounded-[14px]">
        <IconTile icon={Mail} />
        <span className="flex min-w-0 flex-col">
          <span className="text-[15.5px] font-semibold tracking-[-0.01em] text-paper">{t(ui.email)}</span>
          <span className="truncate font-mono text-[12px] tracking-tight text-muted" translate="no">
            {profile.contact.email}
          </span>
        </span>
      </a>
      <m.button
        type="button"
        onClick={onCopy}
        {...press}
        aria-label={copied ? t(ui.copied) : t(ui.copyEmail)}
        className={`relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl transition-colors duration-200 ${copied ? 'bg-amber text-ink' : 'bg-white/[0.07] text-paper hover:bg-white/[0.12]'}`}
      >
        <m.span
          key={copied ? 'ok' : 'copy'}
          initial={{ opacity: 0, y: 8, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="grid place-items-center"
        >
          {copied ? <Check className="size-[18px]" strokeWidth={2.6} aria-hidden="true" /> : <Copy className="size-[17px]" aria-hidden="true" />}
        </m.span>
      </m.button>
    </div>
  )
}

export function Links() {
  const t = useT()
  return (
    <section aria-labelledby="links-h" className="grid grid-cols-1 gap-2.5">
      <h2 id="links-h" className="sr-only">
        {t(ui.elsewhere)}
      </h2>
      <LinkCard href={profile.links.linkedin} icon={LinkedInIcon} title="LinkedIn" sub={t(ui.linkedinSub)} />
      <ResumeCard />
      <LinkCard href={profile.links.github} icon={GitHubIcon} title="GitHub" sub={t(ui.githubSub)} />
      {/* TODO: trocar pelo link real do portfólio em src/data/profile.ts */}
      <LinkCard
        href={profile.links.portfolio}
        icon={LayoutGrid}
        title={t(ui.portfolio)}
        sub={t(ui.portfolioSub)}
        tag={
          !profile.links.portfolioReady && (
            <span className="rounded-full border border-line px-2 py-px text-[11px] font-medium text-muted">{t(ui.soon)}</span>
          )
        }
      />
      <EmailCard />
    </section>
  )
}

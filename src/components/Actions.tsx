import { m } from 'motion/react'
import { Check, Copy, Mail, UserPlus } from 'lucide-react'
import { forwardRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { profile, ui } from '../data/profile'
import { copyText } from '../lib/clipboard'
import { useLang, useT } from '../lib/i18n'
import { mailHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './Icons'
import { press } from './motion'
import { useToast } from './Toast'
import { useRipple } from './useRipple'

/** Baixa o vCard (módulo carregado sob demanda) */
export function useSaveContact() {
  const lang = useLang()
  const notify = useToast()
  const [busy, setBusy] = useState(false)
  const save = async () => {
    if (busy) return
    setBusy(true)
    try {
      const { downloadVCard } = await import('../lib/vcard')
      await downloadVCard(lang)
      notify(ui.contactSaved[lang])
    } finally {
      setBusy(false)
    }
  }
  return { save, busy }
}
export const preloadVCard = () => void import('../lib/vcard')

type PillProps = { children: ReactNode; variant?: 'primary' | 'soft'; className?: string } & (
  | ({ as: 'a' } & ComponentPropsWithoutRef<'a'>)
  | ({ as?: 'button' } & ComponentPropsWithoutRef<'button'>)
)

/** Pílula com ripple + afundar ao tocar */
export function Pill({ children, variant = 'soft', className = '', as = 'button', ...rest }: PillProps) {
  const ripple = useRipple(variant === 'primary' ? 'dark' : 'accent')
  const cls =
    variant === 'primary'
      ? 'bg-accent text-on-accent shadow-[0_14px_40px_-14px_rgb(0_217_146/0.75)]'
      : 'lift border border-hair-soft bg-raise text-ink'
  const common = {
    onPointerDown: ripple.onPointerDown,
    ...press,
    className: `relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold transition-colors ${cls} ${className}`,
  }
  if (as === 'a') {
    const { onPointerDown, ...a } = rest as ComponentPropsWithoutRef<'a'>
    return (
      <m.a {...(a as object)} {...common} onPointerDown={(e) => (common.onPointerDown(e), onPointerDown?.(e))}>
        {ripple.node}
        {children}
      </m.a>
    )
  }
  const { onPointerDown, type, ...b } = rest as ComponentPropsWithoutRef<'button'>
  return (
    <m.button type={type ?? 'button'} {...(b as object)} {...common} onPointerDown={(e) => (common.onPointerDown(e), onPointerDown?.(e))}>
      {ripple.node}
      {children}
    </m.button>
  )
}

/** WhatsApp (principal) + Salvar contato + E-mail, acima da dobra */
export const HeroActions = forwardRef<HTMLDivElement>(function HeroActions(_, ref) {
  const t = useT()
  const lang = useLang()
  const { save, busy } = useSaveContact()
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <div ref={ref} className="col-span-2">
        <Pill
          as="a"
          variant="primary"
          href={whatsappHref(profile.contact.whatsappMessage[lang])}
          target="_blank"
          rel="noopener noreferrer"
          className="h-14 w-full text-[16px]"
        >
          <WhatsAppIcon className="size-5" />
          {t(ui.whatsapp)}
        </Pill>
      </div>
      <Pill onClick={save} onPointerEnter={preloadVCard} onFocus={preloadVCard} aria-busy={busy} className="h-[52px] text-[15px]">
        <UserPlus className="size-[18px] text-accent" aria-hidden="true" />
        {t(ui.saveContact)}
      </Pill>
      <Pill as="a" href={mailHref()} className="h-[52px] text-[15px]">
        <Mail className="size-[18px] text-accent" aria-hidden="true" />
        {t(ui.email)}
      </Pill>
    </div>
  )
})

/** Pílula de e-mail com botão redondo de copiar que fica verde */
export function EmailPill() {
  const t = useT()
  const lang = useLang()
  const notify = useToast()
  const ripple = useRipple()
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    if (await copyText(profile.contact.email)) {
      setCopied(true)
      notify(ui.emailCopied[lang])
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <div className="flex h-16 items-center gap-2 rounded-full border border-hair-soft bg-raise py-2 pr-2 pl-5">
      <a href={mailHref()} className="flex min-w-0 flex-1 flex-col rounded-full">
        <span className="meta text-mute">{t(ui.email)}</span>
        <span className="truncate text-[15px] font-medium text-ink" translate="no">
          {profile.contact.email}
        </span>
      </a>
      <m.button
        type="button"
        onClick={onCopy}
        onPointerDown={ripple.onPointerDown}
        {...press}
        aria-label={copied ? t(ui.copied) : t(ui.copyEmail)}
        className={`relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full transition-colors duration-300 ${
          copied ? 'bg-accent text-on-accent' : 'border border-hair-soft bg-raise-2 text-ink'
        }`}
      >
        {ripple.node}
        <m.span
          key={copied ? 'ok' : 'copy'}
          initial={{ scale: 0.5, opacity: 0, rotate: copied ? -30 : 0 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.45 }}
          className="grid place-items-center"
        >
          {copied ? <Check className="size-5" strokeWidth={2.6} aria-hidden="true" /> : <Copy className="size-[18px]" aria-hidden="true" />}
        </m.span>
      </m.button>
    </div>
  )
}

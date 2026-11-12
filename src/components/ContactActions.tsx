import { m } from 'motion/react'
import { ArrowDownToLine, Mail } from 'lucide-react'
import { useState } from 'react'
import { profile, ui } from '../data/profile'
import { useLang, useT } from '../lib/i18n'
import { mailHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './Icons'
import { Magnetic } from './Magnetic'
import { press } from './motion'
import { useToast } from './Toast'
import { useSpotlight } from './useSpotlight'


/** Baixa o vCard (módulo carregado sob demanda) */
function useSaveContact() {
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

/** Pré-carrega o módulo do vCard quando há intenção (hover/focus/toque) */
const preloadVCard = () => void import('../lib/vcard')

export function ContactActions() {
  const t = useT()
  const lang = useLang()
  const { save, busy } = useSaveContact()
  const spot = useSpotlight()

  return (
    <div className="grid grid-cols-1 gap-2.5">
      <Magnetic strength={0.12}>
        <m.button
          type="button"
          onClick={save}
          onPointerEnter={preloadVCard}
          onFocus={preloadVCard}
          aria-busy={busy}
          {...press}
          whileHover={{ scale: 1.01 }}
          className="group relative flex h-[58px] w-full items-center justify-between overflow-hidden rounded-2xl bg-amber pr-2 pl-5 text-ink shadow-[0_12px_40px_-12px_rgb(255_160_60/0.65),inset_0_1px_0_rgb(255_255_255/0.5)] transition-[box-shadow] duration-300"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgb(255_255_255/0.45)_48%,transparent_62%)] [background-size:250%_100%] [background-position:120%_0] transition-[background-position] duration-700 ease-out group-hover:[background-position:-20%_0]"
          />
          <span className="relative flex flex-col items-start leading-tight">
            <span className="text-[16.5px] font-semibold tracking-[-0.01em]">{t(ui.saveContact)}</span>
            <span className="text-[12.5px] font-medium text-ink/65">{t(ui.saveContactHint)}</span>
          </span>
          <span className="relative grid size-[42px] place-items-center rounded-xl bg-ink/90 text-amber">
            <ArrowDownToLine className="size-[19px]" strokeWidth={2.2} aria-hidden="true" />
          </span>
        </m.button>
      </Magnetic>

      <div className="grid grid-cols-2 gap-2.5">
        <Magnetic strength={0.16}>
          <m.a
            href={whatsappHref(profile.contact.whatsappMessage[lang])}
            target="_blank"
            rel="noopener noreferrer"
            {...press}
            {...spot}
            className="glass spotlight flex h-[54px] items-center justify-center gap-2.5 rounded-2xl text-[15px] font-semibold text-paper"
          >
            <WhatsAppIcon className="size-[19px] text-[#4ade80]" />
            {t(ui.whatsapp)}
          </m.a>
        </Magnetic>
        <Magnetic strength={0.16}>
          <m.a
            href={mailHref()}
            {...press}
            {...spot}
            className="glass spotlight flex h-[54px] items-center justify-center gap-2.5 rounded-2xl text-[15px] font-semibold text-paper"
          >
            <Mail className="size-[19px] text-amber" strokeWidth={2} aria-hidden="true" />
            {t(ui.email)}
          </m.a>
        </Magnetic>
      </div>
    </div>
  )
}

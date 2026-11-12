import { AnimatePresence, m } from 'motion/react'
import { Mail } from 'lucide-react'
import { profile, ui } from '../data/profile'
import { useLang, useT } from '../lib/i18n'
import { mailHref, whatsappHref } from '../lib/links'
import { WhatsAppIcon } from './Icons'
import { press } from './motion'

/** Barra fixa de contato que aparece quando os botões do topo saem da tela */
export function StickyBar({ visible }: { visible: boolean }) {
  const t = useT()
  const lang = useLang()
  return (
    <AnimatePresence>
      {visible && (
        <m.nav
          aria-label={lang === 'pt' ? 'Contato rápido' : 'Quick contact'}
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.12 }}
          className="safe-bottom fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pt-3"
        >
          <div className="flex w-full max-w-[460px] gap-2 rounded-[22px] border border-white/10 bg-ink-2/80 p-2 shadow-[0_20px_60px_-10px_rgb(0_0_0/0.8)] backdrop-blur-xl">
            <m.a
              href={whatsappHref(profile.contact.whatsappMessage[lang])}
              target="_blank"
              rel="noopener noreferrer"
              {...press}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-amber text-[15px] font-semibold text-ink"
            >
              <WhatsAppIcon className="size-[18px]" />
              {t(ui.whatsapp)}
            </m.a>
            <m.a
              href={mailHref()}
              {...press}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-white/[0.08] text-[15px] font-semibold text-paper"
            >
              <Mail className="size-[18px]" aria-hidden="true" />
              {t(ui.email)}
            </m.a>
          </div>
        </m.nav>
      )}
    </AnimatePresence>
  )
}

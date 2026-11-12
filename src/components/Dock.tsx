import { AnimatePresence, m } from 'motion/react'
import { Mail } from 'lucide-react'
import { profile, ui } from '../data/profile'
import { useLang, useT } from '../lib/i18n'
import { mailHref, whatsappHref } from '../lib/links'
import { Pill } from './Actions'
import { WhatsAppIcon } from './Icons'

/** Dock de contato (só celular): pílula flutuante que aparece quando o WhatsApp do topo sai da tela */
export function Dock({ visible }: { visible: boolean }) {
  const t = useT()
  const lang = useLang()
  return (
    <AnimatePresence>
      {visible && (
        <m.nav
          aria-label={t(ui.quickContact)}
          initial={{ y: '140%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '140%', opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.18 }}
          className="safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-[18px] min-[900px]:hidden"
        >
          <div className="pointer-events-auto flex w-full max-w-[420px] gap-1.5 rounded-full border border-hair-soft bg-raise/75 p-1.5 shadow-[0_18px_50px_-12px_rgb(0_0_0/0.85)] backdrop-blur-xl">
            <Pill
              as="a"
              variant="primary"
              href={whatsappHref(profile.contact.whatsappMessage[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 flex-1 text-[15px] shadow-none"
            >
              <WhatsAppIcon className="size-[18px]" />
              {t(ui.whatsappShort)}
            </Pill>
            <Pill as="a" href={mailHref()} className="h-12 flex-1 border-transparent bg-raise-2 text-[15px]">
              <Mail className="size-[18px] text-accent" aria-hidden="true" />
              {t(ui.email)}
            </Pill>
          </div>
        </m.nav>
      )}
    </AnimatePresence>
  )
}

// Carregado sob demanda (React.lazy) quando a pessoa toca no currículo.
import { m } from 'motion/react'
import { Download, Eye } from 'lucide-react'
import { useState } from 'react'
import { profile, ui, type Lang } from '../data/profile'
import { useLang, useT } from '../lib/i18n'
import { Pill } from './Actions'
import { Sheet } from './Sheet'

/** Folha do currículo: prévia da página + Ver/Baixar, com toggle PT/EN quando houver PDF em inglês */
export default function ResumeSheet({ onClose }: { onClose: () => void }) {
  const t = useT()
  const lang = useLang()
  const r = profile.links.resume
  const hasEn = !!r.en
  const [which, setWhich] = useState<Lang>(hasEn ? lang : 'pt')
  const file = (which === 'en' && r.en) || r.pt
  const href = import.meta.env.BASE_URL + file
  const base = import.meta.env.BASE_URL

  return (
    <Sheet id="resume" title={t(ui.resumeTitle)} subtitle={t(ui.resumeSheetSub)} onClose={onClose}>
      {hasEn && (
        <div role="radiogroup" aria-label="PDF" className="mb-4 inline-flex rounded-full border border-hair-soft bg-raise-2 p-1">
          {(['pt', 'en'] as const).map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={which === l}
              onClick={() => setWhich(l)}
              className={`h-9 min-w-14 rounded-full px-4 text-[14px] font-semibold transition-colors ${
                which === l ? 'bg-accent text-on-accent' : 'text-mute'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      <m.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.985 }}
        className="relative block overflow-hidden rounded-[18px] border border-hair-soft bg-ink"
        aria-label={`${t(ui.view)} ${t(ui.resume)}`}
      >
        <img
          src={base + r.preview}
          alt=""
          width={560}
          height={725}
          draggable={false}
          className="block h-[46dvh] max-h-[420px] w-full object-cover object-top"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-raise to-transparent" aria-hidden="true" />
        <span className="meta absolute right-3 bottom-3 rounded-full bg-canvas/85 px-3 py-1.5 text-ink backdrop-blur">
          {r.pages} {lang === 'pt' ? 'páginas' : 'pages'}
        </span>
      </m.a>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Pill as="a" href={href} target="_blank" rel="noopener noreferrer" className="h-[52px] text-[15px]">
          <Eye className="size-[18px] text-accent" aria-hidden="true" />
          {t(ui.view)}
        </Pill>
        <Pill as="a" variant="primary" href={href} download={r.downloadName} className="h-[52px] text-[15px]">
          <Download className="size-[18px]" aria-hidden="true" />
          {t(ui.download)}
        </Pill>
      </div>
    </Sheet>
  )
}


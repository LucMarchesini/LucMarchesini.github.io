// Carregado sob demanda (React.lazy) — a lib `qrcode` só baixa quando o modal abre.
import { m, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import QRCode from 'qrcode'
import { useEffect, useRef, useState } from 'react'
import { profile, ui } from '../data/profile'
import { useT } from '../lib/i18n'

export default function QrSheet({ onClose }: { onClose: () => void }) {
  const t = useT()
  const reduced = useReducedMotion()
  const [svg, setSvg] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    QRCode.toString(profile.siteUrl, {
      type: 'svg',
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#0a0d16', light: '#00000000' },
    }).then(setSvg)
  }, [])

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        // focus trap simples
        const f = panelRef.current.querySelectorAll<HTMLElement>('button, a[href]')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      prev?.focus()
    }
  }, [onClose])

  const host = profile.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center" style={{ overscrollBehavior: 'contain' }}>
      <m.div
        className="absolute inset-0 bg-[rgb(5_7_12/0.72)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-title"
        aria-describedby="qr-desc"
        initial={reduced ? { opacity: 0 } : { y: '100%', opacity: 0.6 }}
        animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { y: '100%', opacity: 0.6, transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] } }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className="safe-bottom relative w-full max-w-[420px] rounded-t-[30px] border border-white/10 bg-ink-2 px-6 pt-3 sm:rounded-[30px] sm:pb-6"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15 sm:hidden" aria-hidden="true" />
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="qr-title" className="font-display text-2xl font-semibold tracking-[-0.03em]">
              {t(ui.qrTitle)}
            </h2>
            <p id="qr-desc" className="mt-1 text-sm text-muted">
              {t(ui.qrSub)}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t(ui.close)}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-white/[0.07] text-paper transition-colors hover:bg-white/[0.14]"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[300px] rounded-[26px] bg-paper p-6 shadow-[0_0_0_1px_rgb(255_181_71/0.4),0_30px_80px_-20px_rgb(255_160_60/0.45)]">
          {svg ? (
            <div className="size-full [&>svg]:size-full" role="img" aria-label={`QR Code: ${profile.siteUrl}`} dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <div className="size-full animate-pulse rounded-xl bg-ink/10" />
          )}
          <span className="absolute -top-px left-1/2 h-[3px] w-16 -translate-x-1/2 rounded-b-full bg-amber" aria-hidden="true" />
        </div>
        <p className="mt-4 mb-2 text-center font-mono text-[13px] text-amber-soft" translate="no">
          {host}
        </p>
      </m.div>
    </div>
  )
}

import { m, useDragControls, useReducedMotion, type PanInfo } from 'motion/react'
import { ChevronDown, X } from 'lucide-react'
import { useIsTouch } from './useTouchFocus'
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react'
import { ui } from '../data/profile'
import { useT } from '../lib/i18n'
import { press } from './motion'

const EASE_DRAWER = [0.32, 0.72, 0, 1] as const

/**
 * Bottom sheet: sobe com easing, scrim escuro, fecha tocando fora, Esc
 * ou arrastando para baixo (pela alça ou pelo cabeçalho).
 */
export function Sheet({
  id,
  title,
  subtitle,
  onClose,
  children,
}: {
  id: string
  title: string
  subtitle?: string
  onClose: () => void
  children: ReactNode
}) {
  const t = useT()
  const reduced = useReducedMotion()
  const drag = useDragControls()
  const touch = useIsTouch()
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeBtn.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('button, a[href]')
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
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      html.style.overflow = prevOverflow
      prev?.focus({ preventScroll: true })
    }
  }, [onClose])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 110 || info.velocity.y > 600) onClose()
  }
  const startDrag = (e: PointerEvent) => drag.start(e)

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center" style={{ overscrollBehavior: 'contain' }}>
      <m.div
        className="absolute inset-0 bg-black/65 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        aria-describedby={subtitle ? `${id}-sub` : undefined}
        drag={reduced ? false : 'y'}
        dragControls={drag}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={onDragEnd}
        initial={reduced ? { opacity: 0 } : { y: '100%' }}
        animate={reduced ? { opacity: 1 } : { y: 0 }}
        exit={reduced ? { opacity: 0 } : { y: '100%', transition: { duration: 0.28, ease: EASE_DRAWER } }}
        transition={{ duration: 0.48, ease: EASE_DRAWER }}
        className="safe-bottom relative max-h-[92dvh] w-full max-w-[480px] overflow-y-auto rounded-t-[28px] border border-b-0 border-hair-soft bg-raise px-5"
      >
        {/* alça + cabeçalho: área de arraste */}
        <div onPointerDown={startDrag} className="cursor-grab touch-none pt-2.5 active:cursor-grabbing">
          <div className="mx-auto h-1.5 w-11 rounded-full bg-hairline" aria-hidden="true" />
          <p className="meta mt-2 mb-4 flex items-center justify-center gap-1.5 text-mute">
            <m.span
              aria-hidden="true"
              className="inline-flex"
              animate={reduced || !touch ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="size-4" />
            </m.span>
            {touch ? t(ui.dragHint) : t(ui.escHint)}
          </p>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 id={`${id}-title`} className="font-display text-[25px] leading-[1.08] font-semibold tracking-[-0.025em]">
                {title}
              </h2>
              {subtitle && (
                <p id={`${id}-sub`} className="meta mt-1 text-mute">
                  {subtitle}
                </p>
              )}
            </div>
            <m.button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              onPointerDown={(e) => e.stopPropagation()}
              {...press}
              aria-label={t(ui.close)}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-hair-soft bg-raise-2 text-ink"
            >
              <X className="size-5" aria-hidden="true" />
            </m.button>
          </div>
        </div>
        <div className="pb-3">{children}</div>
      </m.div>
    </div>
  )
}

import { AnimatePresence, m } from 'motion/react'
import { Check } from 'lucide-react'
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'

const ToastCtx = createContext<(msg: string) => void>(() => {})
export const useToast = () => useContext(ToastCtx)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const notify = useCallback((msg: string) => {
    window.clearTimeout(timer.current)
    setToast({ id: Date.now(), msg })
    timer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  return (
    <ToastCtx.Provider value={notify}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-[max(14px,env(safe-area-inset-top))]"
      >
        <AnimatePresence>
          {toast && (
            <m.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
              className="flex items-center gap-2 rounded-full border border-amber/30 bg-ink-3/90 py-2 pr-4 pl-2.5 text-sm font-medium text-paper shadow-[0_10px_40px_-10px_rgb(0_0_0/0.7)] backdrop-blur-xl"
            >
              <span className="grid size-6 place-items-center rounded-full bg-amber text-ink">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              {toast.msg}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  )
}

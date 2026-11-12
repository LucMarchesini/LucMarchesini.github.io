import { AnimatePresence, LazyMotion, MotionConfig, m, useReducedMotion } from 'motion/react'
import { QrCode, Share2, UserPlus } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { profile, ui, type Lang } from './data/profile'
import { LangContext, readStoredLang, storeLang } from './lib/i18n'
import { shareSite } from './lib/share'
import { EmailPill, HeroActions, preloadVCard, useSaveContact } from './components/Actions'
import { Background } from './components/Background'
import { Dock } from './components/Dock'
import { LocalTime, Name, Role, StatusPill } from './components/Identity'
import { LinkRows } from './components/LinkRows'
import { container, item, press, reveal } from './components/motion'
import { NowCarousel } from './components/NowCarousel'
import { Photo } from './components/Photo'
import { ToastProvider, useToast } from './components/Toast'
import { useRipple } from './components/useRipple'

const YEAR = new Date().getFullYear()
const loadFeatures = () => import('./lib/motion-features').then((r) => r.default)
const QrSheet = lazy(() => import('./components/QrSheet'))
const ResumeSheet = lazy(() => import('./components/ResumeSheet'))
const preloadQr = () => void import('./components/QrSheet')
const preloadResume = () => void import('./components/ResumeSheet')

export default function App() {
  const [lang, setLang] = useState<Lang>(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next = l === 'pt' ? 'en' : 'pt'
      storeLang(next)
      return next
    })
  }, [])

  return (
    <LangContext.Provider value={lang}>
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion="user">
          <ToastProvider>
            <Background />
            <Card lang={lang} onToggleLang={toggleLang} />
          </ToastProvider>
        </MotionConfig>
      </LazyMotion>
    </LangContext.Provider>
  )
}

/** Botão utilitário (ícone sobre rótulo) com ripple */
function Tile({ icon, label, ...rest }: { icon: ReactNode; label: string } & ComponentPropsWithoutRef<'button'>) {
  const ripple = useRipple()
  const { onPointerDown, ...b } = rest
  return (
    <m.button
      type="button"
      {...(b as object)}
      onPointerDown={(e) => {
        ripple.onPointerDown(e)
        onPointerDown?.(e)
      }}
      {...press}
      className="lift relative flex h-[76px] flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[18px] border border-hair-soft bg-raise text-ink transition-colors"
    >
      {ripple.node}
      {icon}
      <span className="meta font-medium">{label}</span>
    </m.button>
  )
}

function Card({ lang, onToggleLang }: { lang: Lang; onToggleLang: () => void }) {
  const reduced = !!useReducedMotion()
  const notify = useToast()
  const { save } = useSaveContact()
  const [sheet, setSheet] = useState<null | 'qr' | 'resume'>(null)
  const closeSheet = useCallback(() => setSheet(null), [])
  const waRef = useRef<HTMLDivElement>(null)
  const [showDock, setShowDock] = useState(false)

  // dock: aparece quando o WhatsApp do topo sai da tela por cima
  useEffect(() => {
    const el = waRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShowDock(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onShare = async () => {
    const res = await shareSite({
      title: profile.name,
      text: `${profile.name} · ${profile.role.prefix[lang]}`,
      url: profile.siteUrl,
    })
    if (res === 'copied') notify(ui.linkCopied[lang])
  }

  const v = item(reduced)
  const r = reveal(reduced)

  return (
    <>
      <a
        href="#sobre"
        className="sr-only z-50 rounded-full bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {ui.skip[lang]}
      </a>

      <div
        inert={sheet !== null}
        className="relative z-10 mx-auto w-full max-w-[520px] overflow-x-clip px-[18px] pt-[max(12px,env(safe-area-inset-top))] pb-32 min-[900px]:grid min-[900px]:max-w-[1120px] min-[900px]:grid-cols-[minmax(0,460px)_minmax(0,1fr)] min-[900px]:gap-20 min-[900px]:px-10 min-[900px]:pt-12 min-[900px]:pb-20"
      >
        {/* ───── Identidade (sticky no desktop) ───── */}
        <m.header
          variants={container(reduced)}
          initial="hidden"
          animate="show"
          className="flex flex-col min-[900px]:sticky min-[900px]:top-12 min-[900px]:self-start"
        >
          <m.div variants={v} className="flex h-12 items-center justify-between">
            <p className="meta text-mute">
              {ui.card[lang]} {profile.cardNumber}
            </p>
            <m.button
              type="button"
              onClick={onToggleLang}
              {...press}
              aria-label={`PT / EN: ${ui.langSwitch[lang]}`}
              className="lift flex h-11 items-center rounded-full border border-hair-soft bg-raise px-4 text-[13px] font-semibold"
            >
              <span className={lang === 'pt' ? 'text-accent' : 'text-mute'}>PT</span>
              <span className="mx-1.5 text-hairline" aria-hidden="true">
                /
              </span>
              <span className={lang === 'en' ? 'text-accent' : 'text-mute'}>EN</span>
            </m.button>
          </m.div>

          <div className="mt-5 mb-5 flex items-end gap-5">
            <Photo />
            <m.div variants={v}>
              <LocalTime />
            </m.div>
          </div>

          <m.div variants={v} className="mb-4">
            <StatusPill />
          </m.div>

          <Name />

          <m.div variants={v} className="mt-4">
            <Role />
          </m.div>

          <m.div variants={v} className="mt-7">
            <HeroActions ref={waRef} />
          </m.div>
        </m.header>

        {/* ───── Conteúdo ───── */}
        <main className="mt-12 flex flex-col gap-11 min-[900px]:mt-[60px]">
          <m.section {...r} id="sobre" aria-labelledby="sobre-h" className="scroll-mt-6">
            <h2 id="sobre-h" className="meta mb-3 font-medium text-mute">
              {ui.about[lang]}
            </h2>
            <p className="max-w-[58ch] text-[16px] leading-[1.65] text-body text-pretty min-[900px]:text-[18px]">{profile.bio[lang]}</p>
          </m.section>

          <m.div {...r}>
            <NowCarousel />
          </m.div>

          <m.div {...r} onPointerEnter={preloadResume}>
            <LinkRows
              onResume={() => {
                preloadResume()
                setSheet('resume')
              }}
            />
          </m.div>

          <m.div {...r} className="flex flex-col gap-2.5">
            <EmailPill />
            <div className="grid grid-cols-3 gap-2.5">
              <Tile
                icon={<UserPlus className="size-5 text-accent" aria-hidden="true" />}
                label={ui.saveContact[lang]}
                onClick={save}
                onPointerEnter={preloadVCard}
              />
              <Tile
                icon={<QrCode className="size-5 text-accent" aria-hidden="true" />}
                label={ui.qr[lang]}
                aria-haspopup="dialog"
                onClick={() => setSheet('qr')}
                onPointerEnter={preloadQr}
                onFocus={preloadQr}
              />
              <Tile icon={<Share2 className="size-5 text-accent" aria-hidden="true" />} label={ui.share[lang]} onClick={onShare} />
            </div>
          </m.div>

          <footer className="meta flex flex-wrap items-center justify-between gap-2 border-t border-hair-soft pt-5 text-mute">
            <span>{ui.footer[lang]}</span>
            <span translate="no">
              © {YEAR} {profile.name}
            </span>
          </footer>
        </main>
      </div>

      <Dock visible={showDock && sheet === null} />

      <AnimatePresence>
        {sheet === 'qr' && (
          <Suspense key="qr" fallback={null}>
            <QrSheet onClose={closeSheet} />
          </Suspense>
        )}
        {sheet === 'resume' && (
          <Suspense key="resume" fallback={null}>
            <ResumeSheet onClose={closeSheet} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  )
}

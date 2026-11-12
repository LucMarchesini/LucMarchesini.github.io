import { AnimatePresence, LazyMotion, MotionConfig, m, useReducedMotion } from 'motion/react'
import { QrCode, Share2 } from 'lucide-react'
import { LocalTime } from './components/LocalTime'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { profile, ui, type Lang } from './data/profile'
import { LangContext, readStoredLang, storeLang } from './lib/i18n'
import { shareSite } from './lib/share'
import { Background } from './components/Background'
import { ContactActions } from './components/ContactActions'
import { Headline } from './components/Headline'
import { Links } from './components/Links'
import { container, item, press } from './components/motion'
import { Photo } from './components/Photo'
import { Stats } from './components/Stats'
import { StatusBadge } from './components/StatusBadge'
import { StickyBar } from './components/StickyBar'
import { ToastProvider, useToast } from './components/Toast'

const YEAR = new Date().getFullYear()
const loadFeatures = () => import('./lib/motion-features').then((r) => r.default)
const QrSheet = lazy(() => import('./components/QrSheet'))
const preloadQr = () => void import('./components/QrSheet')

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

function Card({ lang, onToggleLang }: { lang: Lang; onToggleLang: () => void }) {
  const reduced = !!useReducedMotion()
  const notify = useToast()
  const [qrOpen, setQrOpen] = useState(false)
  const actionsRef = useRef<HTMLDivElement>(null)
  const [showBar, setShowBar] = useState(false)
  const closeQr = useCallback(() => setQrOpen(false), [])

  // barra fixa: aparece quando os botões de contato do topo saem da tela (por cima)
  useEffect(() => {
    const el = actionsRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0), {
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onShare = async () => {
    const res = await shareSite({
      title: profile.name,
      text: `${profile.name} · ${profile.headline.prefix[lang]}`,
      url: profile.siteUrl,
    })
    if (res === 'copied') notify(ui.linkCopied[lang])
  }

  const v = item(reduced)
  const chrome =
    'h-11 rounded-full border border-white/10 bg-white/[0.04] text-paper backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.1] hover:border-white/20'
  const iconBtn = `${chrome} grid w-11 place-items-center`

  return (
    <>
      <a
        href="#bio"
        className="sr-only z-50 rounded-full bg-amber px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {ui.skip[lang]}
      </a>

      <div className="relative z-10 mx-auto w-full max-w-[480px] px-4 pt-[max(14px,env(safe-area-inset-top))] overflow-x-clip pb-28 min-[380px]:px-5 md:max-w-[520px] md:pt-14 md:pb-24">
        <m.main
          inert={qrOpen}
          variants={container(reduced)}
          initial="hidden"
          animate="show"
          className="md:glass flex flex-col gap-9 md:rounded-[36px] md:px-9 md:pt-7 md:pb-9 md:shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)]"
        >
          {/* ───── Topo ───── */}
          <m.header variants={v} className="flex h-12 items-center justify-between">
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={36} height={36} className="size-9 rounded-[10px]" />
            <div className="flex items-center gap-2">
              <m.button
                type="button"
                onClick={onToggleLang}
                {...press}
                aria-label={`PT / EN: ${ui.langSwitch[lang]}`}
                className={`${chrome} flex items-center px-3.5 font-mono text-[12px] font-semibold tracking-wide whitespace-nowrap`}
              >
                <span className={lang === 'pt' ? 'text-amber' : 'text-faint'}>PT</span>
                <span className="mx-1 text-faint" aria-hidden="true">
                  /
                </span>
                <span className={lang === 'en' ? 'text-amber' : 'text-faint'}>EN</span>
              </m.button>
              <m.button type="button" onClick={onShare} {...press} aria-label={ui.share[lang]} className={iconBtn}>
                <Share2 className="size-[18px]" aria-hidden="true" />
              </m.button>
            </div>
          </m.header>

          {/* ───── Hero ───── */}
          <section aria-labelledby="name" className="-mt-3 flex flex-col">
            <m.div variants={v} className="mb-5 flex items-end gap-5">
              <Photo />
              <LocalTime lang={lang} />
            </m.div>
            <m.div variants={v} className="mb-4">
              <StatusBadge />
            </m.div>
            <m.h1
              id="name"
              variants={v}
              className="font-display text-[clamp(2.7rem,12.4vw,3.5rem)] leading-[0.94] font-semibold tracking-[-0.045em] text-paper"
              translate="no"
            >
              Lucas Serra
              <br />
              Marchesini
            </m.h1>
            <m.div variants={v} className="mt-3.5 max-w-[34ch]">
              <Headline />
            </m.div>
            <m.div variants={v} ref={actionsRef} className="mt-6">
              <ContactActions />
            </m.div>
          </section>

          {/* ───── Bio ───── */}
          <m.section variants={v} id="bio" aria-labelledby="bio-h" className="scroll-mt-6">
            <h2 id="bio-h" className="mb-3 flex items-center gap-3 text-[13px] font-medium text-muted">
              {ui.about[lang]}
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
            </h2>
            <p className="text-[16.5px] leading-[1.6] text-paper/90 text-pretty">{profile.bio[lang]}</p>
          </m.section>

          <m.div variants={v}>
            <Stats />
          </m.div>

          <m.div variants={v}>
            <Links />
          </m.div>

          {/* ───── Compartilhar / QR ───── */}
          <m.div variants={v} className="grid grid-cols-2 gap-2.5">
            <m.button
              type="button"
              onClick={onShare}
              {...press}
              className="flex h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/10 text-[14.5px] font-semibold text-paper transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <Share2 className="size-[17px] text-amber" aria-hidden="true" />
              {ui.share[lang]}
            </m.button>
            <m.button
              type="button"
              onClick={() => setQrOpen(true)}
              onPointerEnter={preloadQr}
              onFocus={preloadQr}
              {...press}
              aria-haspopup="dialog"
              className="flex h-[52px] items-center justify-center gap-2 rounded-2xl border border-white/10 text-[14.5px] font-semibold text-paper transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              <QrCode className="size-[17px] text-amber" aria-hidden="true" />
              {ui.showQr[lang]}
            </m.button>
          </m.div>

          <m.footer variants={v} className="flex items-center justify-between border-t border-line pt-5 text-[12.5px] text-faint">
            <span>{ui.footer[lang]}</span>
            <span className="font-mono" translate="no">
              © {YEAR} {profile.initials}
            </span>
          </m.footer>
        </m.main>
      </div>

      <StickyBar visible={showBar && !qrOpen} />

      <AnimatePresence>
        {qrOpen && (
          <Suspense fallback={null}>
            <QrSheet onClose={closeQr} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  )
}

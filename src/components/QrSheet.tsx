// Carregado sob demanda (React.lazy): a lib `qrcode` só baixa quando a folha de QR abre.
import QRCode from 'qrcode'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { profile, ui } from '../data/profile'
import { useT } from '../lib/i18n'
import { Sheet } from './Sheet'

/**
 * QR desenhado à mão a partir da matriz, com cada módulo ocupando um número
 * INTEIRO de pixels CSS. Assim nenhum módulo sai mais grosso que o outro
 * (o SVG escalado para largura fracionária deixava o código "torto" no celular).
 */
export default function QrSheet({ onClose }: { onClose: () => void }) {
  const t = useT()
  const box = useRef<HTMLDivElement>(null)
  const [avail, setAvail] = useState(0)

  const qr = useMemo(() => {
    const { modules } = QRCode.create(profile.siteUrl, { errorCorrectionLevel: 'M' })
    const n = modules.size
    let d = ''
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (modules.get(y, x)) d += `M${x} ${y}h1v1h-1z`
      }
    }
    return { n, d }
  }, [])

  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => setAvail(Math.floor(el.getBoundingClientRect().width))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const quiet = 3 // zona de silêncio, em módulos
  const total = qr.n + quiet * 2
  const unit = Math.max(4, Math.floor(Math.min(avail || 264, 276) / total))
  const px = unit * total
  const host = profile.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <Sheet id="qr" title={t(ui.qrTitle)} subtitle={t(ui.qrSub)} onClose={onClose}>
      <div ref={box} className="w-full">
        <div
          className="rounded-[26px] bg-ink shadow-[0_0_0_1px_rgb(0_217_146/0.45),0_30px_80px_-24px_rgb(0_217_146/0.45)]"
          style={{ width: px, height: px, marginLeft: Math.max(0, Math.floor((avail - px) / 2)) }}
        >
          <svg
            role="img"
            aria-label={`QR code: ${profile.siteUrl}`}
            width={px}
            height={px}
            viewBox={`${-quiet} ${-quiet} ${total} ${total}`}
            shapeRendering="crispEdges"
            className="block"
          >
            <path d={qr.d} fill="#101010" />
          </svg>
        </div>
      </div>
      <p className="meta mt-4 mb-2 text-center text-accent-soft" translate="no">
        {host}
      </p>
    </Sheet>
  )
}

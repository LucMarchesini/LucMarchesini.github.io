// Carregado sob demanda (React.lazy): a lib `qrcode` só baixa quando a folha de QR abre.
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import { profile, ui } from '../data/profile'
import { useT } from '../lib/i18n'
import { Sheet } from './Sheet'

export default function QrSheet({ onClose }: { onClose: () => void }) {
  const t = useT()
  const [svg, setSvg] = useState('')
  useEffect(() => {
    QRCode.toString(profile.siteUrl, {
      type: 'svg',
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: '#101010', light: '#00000000' },
    }).then(setSvg)
  }, [])
  const host = profile.siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <Sheet id="qr" title={t(ui.qrTitle)} subtitle={t(ui.qrSub)} onClose={onClose}>
      <div className="relative mx-auto aspect-square w-full max-w-[300px] rounded-[26px] bg-ink p-6 shadow-[0_0_0_1px_rgb(0_217_146/0.45),0_30px_80px_-24px_rgb(0_217_146/0.45)]">
        {svg ? (
          <div
            className="size-full [&>svg]:size-full"
            role="img"
            aria-label={`QR code: ${profile.siteUrl}`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="size-full animate-pulse rounded-xl bg-canvas/10" />
        )}
      </div>
      <p className="meta mt-4 mb-2 text-center text-accent-soft" translate="no">
        {host}
      </p>
    </Sheet>
  )
}


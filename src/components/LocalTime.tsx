import { MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile, type Lang } from '../data/profile'

const fmt = (lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  })

/** Localização + hora local em São Paulo (útil para quem é de outro fuso) */
export function LocalTime({ lang }: { lang: Lang }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  return (
    <p className="flex flex-col gap-1 pb-2 text-[13px] leading-tight text-muted">
      <span className="flex items-center gap-1.5 text-paper/90">
        <MapPin className="size-3.5 text-amber" aria-hidden="true" />
        {profile.location[lang]}
      </span>
      <span className="pl-5 font-mono text-[12px] text-faint">
        <time dateTime={now.toISOString()} className="tabular">
          {fmt(lang).format(now)}
        </time>{' '}
        {lang === 'pt' ? 'agora por aqui' : 'local time'}
      </span>
    </p>
  )
}

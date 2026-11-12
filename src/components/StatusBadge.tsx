import { profile } from '../data/profile'
import { useT } from '../lib/i18n'

export function StatusBadge() {
  const t = useT()
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-amber/25 bg-amber/[0.07] py-1.5 pr-3.5 pl-3 font-mono text-[11.5px] font-medium tracking-tight text-amber-soft sm:text-xs">
      <span className="pulse-dot relative size-2 shrink-0 rounded-full text-amber" style={{ background: 'currentColor' }} aria-hidden="true" />
      <span translate="no">{t(profile.status)}</span>
    </p>
  )
}

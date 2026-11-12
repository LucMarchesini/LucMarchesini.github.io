// Carregado sob demanda (import dinâmico) quando a pessoa toca em "Salvar contato".
import { profile, type Lang } from '../data/profile'

const esc = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')

/** Dobra linhas longas em 75 octetos, como pede a RFC 2425/2426 */
function fold(line: string): string {
  if (line.length <= 75) return line
  const out: string[] = [line.slice(0, 75)]
  for (let i = 75; i < line.length; i += 74) out.push(' ' + line.slice(i, i + 74))
  return out.join('\r\n')
}

async function photoBase64(): Promise<string | null> {
  try {
    const res = await fetch(import.meta.env.BASE_URL + profile.photo.vcard)
    if (!res.ok) return null
    const buf = new Uint8Array(await res.arrayBuffer())
    let bin = ''
    for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i])
    return btoa(bin)
  } catch {
    return null
  }
}

export async function buildVCard(lang: Lang): Promise<string> {
  const p = profile
  const photo = await photoBase64()
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N;CHARSET=UTF-8:${esc(p.lastName)};${esc(p.firstName)};;;`,
    `FN;CHARSET=UTF-8:${esc(p.name)}`,
    `ORG;CHARSET=UTF-8:${esc(p.vcard.org)}`,
    `TITLE;CHARSET=UTF-8:${esc(p.vcard.title[lang])}`,
    `TEL;TYPE=CELL,VOICE:+${p.contact.phone}`,
    `EMAIL;TYPE=INTERNET,PREF:${p.contact.email}`,
    `URL:${p.siteUrl}`,
    `item1.URL:${p.links.linkedin}`,
    'item1.X-ABLabel:LinkedIn',
    `item2.URL:${p.links.github}`,
    'item2.X-ABLabel:GitHub',
    `X-SOCIALPROFILE;TYPE=linkedin:${p.links.linkedin}`,
    `X-SOCIALPROFILE;TYPE=github:${p.links.github}`,
    'ADR;TYPE=HOME;CHARSET=UTF-8:;;;São Paulo;SP;;Brasil',
    `NOTE;CHARSET=UTF-8:${esc(lang === 'pt' ? 'Contato salvo pelo cartão NFC' : 'Saved from NFC card')} — ${p.siteUrl}`,
  ]
  if (photo) lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${photo}`)
  lines.push('END:VCARD')
  return lines.map(fold).join('\r\n') + '\r\n'
}

export async function downloadVCard(lang: Lang) {
  const text = await buildVCard(lang)
  const file = 'Lucas-Serra-Marchesini.vcf'
  const blob = new Blob([text], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

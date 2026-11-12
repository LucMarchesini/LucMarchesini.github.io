import { copyText } from './clipboard'

/** Web Share API com fallback para copiar a URL. Retorna 'shared' | 'copied' | 'failed' */
export async function shareSite(data: { title: string; text: string; url: string }) {
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share(data)
      return 'shared' as const
    } catch (err) {
      if ((err as DOMException)?.name === 'AbortError') return 'shared' as const
    }
  }
  return (await copyText(data.url)) ? ('copied' as const) : ('failed' as const)
}

/** Vibração curta no toque (Android; iOS ignora). Nunca no mouse. */
export function haptic(pointerType?: string, ms = 8) {
  if (pointerType === 'mouse') return
  try {
    navigator.vibrate?.(ms)
  } catch {
    /* sem suporte */
  }
}

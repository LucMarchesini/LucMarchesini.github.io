---
version: alpha
name: Lucas-Marchesini-NFC-Card
description: Cartão de visitas digital aberto por NFC, feito primeiro para o celular. Base VoltAgent (grafite #101010, hairline quente, um único acento verde #00d992), em versão arredondada, macia e pensada para o toque, com motion que funciona sem mouse.

colors:
  canvas: "#101010"
  raise: "#171717"
  raise-2: "#1d1d1c"
  hairline: "#3d3a39"
  hair-soft: "rgba(242,242,242,0.08)"
  ink: "#f2f2f2"
  ink-strong: "#ffffff"
  body: "#c4c4c4"
  mute: "#8b949e"
  accent: "#00d992"
  accent-soft: "#2fd6a1"
  on-accent: "#0b1f17"
  accent-wash: "rgba(0,217,146,0.10)"

typography:
  display-xl:
    fontFamily: "Bricolage Grotesque, Arial Narrow, sans-serif"
    fontSize: clamp(50px, 14vw, 96px)
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: -0.045em
  display-md:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: 25px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.025em
  body:
    fontFamily: "Geist, Helvetica Neue, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  meta:
    fontFamily: "Geist, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    note: "texto pequeno: sentence case, sem caixa alta, sem mono, tabular-nums"
  button:
    fontFamily: "Geist, sans-serif"
    fontSize: 16px
    fontWeight: 600

rounded:
  sm: 12px
  md: 18px
  lg: 26px
  photo: 32px
  sheet: "28px 28px 0 0"
  pill: 9999px

motion:
  ease-out: "cubic-bezier(0.16, 1, 0.3, 1)"
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  entrance-total: "<= 1.3s"

components:
  photo:
    shape: "squircle 104px, radius 32px"
    ring: "anel cônico verde girando devagar (6s), 7px para fora"
    entrance: "pop com mola + faixa verde de scan de cima para baixo"
  status-pill:
    background: "{colors.accent-wash}"
    border: "1px rgba(0,217,146,0.25)"
    rounded: "{rounded.pill}"
    indicator: "ponto verde com anel de ping"
  now-carousel:
    behavior: "scroll horizontal com scroll-snap, arrastado com o dedo; card visível fica com borda verde; bolinhas indicam posição"
    card: "{colors.raise}, radius {rounded.md}, 76% da largura para mostrar o próximo card"
  link-row:
    layout: "índice 01–04 / título + subtítulo / seta em círculo 40px"
    rounded: "{rounded.md}"
    touch: "ripple verde a partir do ponto do toque + scale(.975) + vibração curta"
    scroll-focus: "no celular, a linha que cruza o meio da tela acende sozinha (fundo raise, índice verde, seta verde girada 45°)"
    hover: "só em @media (hover:hover)"
  bottom-sheet:
    use: "currículo (ver/baixar, PT/EN) e QR code"
    rounded: "{rounded.sheet}"
    behavior: "sobe com easing, scrim escuro, fecha tocando fora, Esc ou arrastando para baixo"
  button-primary:
    background: "{colors.accent}"
    text: "{colors.on-accent}"
    rounded: "{rounded.pill}"
    shadow: "glow verde suave embaixo"
  email-pill:
    layout: "pílula com texto + botão redondo de copiar que fica verde ao copiar"
  contact-dock:
    mobileOnly: true
    shape: "pílula flutuante com blur, WhatsApp + E-mail"
    appears: "quando o botão principal do WhatsApp sai da tela"
---

## Overview

Um cartão que se abre num toque de celular. **Todo o design parte do celular**: o desktop é só uma versão ampliada. A base de cor é a do VoltAgent: grafite, bordas suaves e **um único acento verde**, reservado para ação e estado ao vivo. A forma é **arredondada e macia**: pílulas, squircles e cantos de 12–28px. Nada de retângulos duros.

**Referência viva:** `prototipo.html`. Se houver dúvida, ele vence.

## Colors

- O verde aparece só em: botão do WhatsApp, status "ao vivo", ponto final do nome, anel da foto, linha focada, card ativo do carrossel e ícones utilitários.
- Superfícies elevadas em `raise`/`raise-2` com bordas `hair-soft` (8% de branco).
- A atmosfera não depende de mouse: dois brilhos verdes que flutuam sozinhos, uma grade de pontos com parallax leve na rolagem e grão.

## Typography

- **Bricolage Grotesque** só para o nome e os títulos (links, cards, folhas).
- **Geist** para todo o resto, **inclusive os textos pequenos** (relógio, legendas, rodapé, e-mail). Use sentence case, sem caixa alta espaçada e sem fonte mono, que deixava tudo "quadradão".
- Duas famílias, nada mais. Inter e Space Grotesk são proibidas.

## Layout (celular primeiro)

Ordem: barra (Cartão nº 001 · São Paulo + relógio) → foto + status → nome → cargo com palavra rotativa → bio → carrossel "Agora" → links 01–04 → WhatsApp → pílula de e-mail → Salvar contato / QR / Compartilhar → rodapé.

- Gutter de 18px, áreas de toque ≥ 44px e `env(safe-area-inset-*)` respeitado.
- Desktop (≥ 900px): duas colunas, com a identidade *sticky* à esquerda.
- **Sem régua de números.** A bio é geral sobre a pessoa, não uma lista de métricas.

## Motion para o toque

Hover não existe no celular, então toda resposta precisa vir do toque, da rolagem ou de movimento automático:

| Gatilho | O que acontece |
|---|---|
| Carregar | nome sobe palavra por palavra (blur→nítido, leve rotação), ponto verde estala com mola, foto faz pop + scan, linhas entram em stagger |
| Rolar | a linha de link no meio da tela acende sozinha; blocos abaixo da dobra se revelam; grade com parallax |
| Tocar | ripple verde nasce no ponto do dedo, o elemento afunda (`scale .96–.975`) e o celular vibra curto (`navigator.vibrate`, no Android) |
| Arrastar | carrossel "Agora" com snap e indicador; bottom sheet fecha ao arrastar para baixo |
| Ambiente | anel da foto girando, ping do status, brilhos flutuando, palavra rotativa no cargo |
| Copiar e-mail | botão fica verde, toast desce do topo |

- No React, use **Motion** (`motion/react`): `whileTap`, `useInView` (com `margin` para o foco central), `drag="y"` na sheet, `AnimatePresence` para sheet e toast, e springs.
- Hover só dentro de `@media (hover:hover)`, como bônus para desktop.
- `prefers-reduced-motion`: sem rotação, flutuação ou ripple. Tudo aparece pronto.

## Don'ts (cara de IA)

Inter/Roboto/Space Grotesk; gradiente roxo-azul; aurora colorida; glassmorphism em cards; blobs 3D; ícones de brilho ✨, cérebro, robô ou circuito; emoji como ícone; Linktree genérico centralizado; copy vazia; o mesmo fade-in em tudo; caixa alta espaçada em fonte mono em todos os textos pequenos.

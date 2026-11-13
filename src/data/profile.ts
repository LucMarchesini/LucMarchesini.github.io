/**
 * ─────────────────────────────────────────────────────────────
 *  TODO O CONTEÚDO DO SITE MORA AQUI.
 *  Edite textos, links e contatos neste arquivo — nenhum
 *  componente precisa ser alterado.
 * ─────────────────────────────────────────────────────────────
 */

export type Lang = 'pt' | 'en'
type T = Record<Lang, string>

export const profile = {
  /** URL pública do site (vai no QR Code, no vCard e na tag NFC) */
  siteUrl: 'https://lucmarchesini.github.io/',
  /** Número do cartão exibido no topo */
  cardNumber: '001',

  name: 'Lucas Serra Marchesini',
  /** Linhas do nome no topo (o ponto final verde é adicionado automaticamente) */
  nameLines: ['Lucas Serra', 'Marchesini'],
  /** Primeiro nome / sobrenome — usados no vCard */
  firstName: 'Lucas',
  lastName: 'Serra Marchesini',
  initials: 'LM',

  /** Fotos geradas por `npm run images` a partir de public/foto.jpg */
  photo: {
    avif: 'img/foto-400.avif',
    webp: 'img/foto-400.webp',
    jpg: 'img/foto-400.jpg',
    vcard: 'img/foto-vcard.jpg',
  },

  city: { pt: 'São Paulo', en: 'São Paulo' } as T,
  timeZone: 'America/Sao_Paulo',

  /** Cargo: prefixo + palavra que se alterna */
  role: {
    prefix: { pt: 'Engenharia da Computação @ Insper', en: 'Computer Engineering @ Insper' } as T,
    lead: { pt: 'Foco em', en: 'Focused on' } as T,
    words: {
      pt: ['Dados', 'IA', 'Software'],
      en: ['Data', 'AI', 'Software'],
    } as Record<Lang, string[]>,
  },

  status: {
    pt: 'Incoming Summer Intern @ Itaú · dez/26',
    en: 'Incoming Summer Intern @ Itaú · Dec/26',
  } as T,

  // TODO (Lucas): se quiser, cole aqui o "Sobre" do seu LinkedIn para adaptar a bio.
  bio: {
    pt: 'Sou estudante de Engenharia da Computação no Insper e gosto de transformar problemas bagunçados em soluções que funcionam de verdade. Transito entre dados, inteligência artificial e segurança da informação, e aprendo melhor construindo: automações, modelos e projetos com gente boa por perto.',
    en: 'I study Computer Engineering at Insper and I like turning messy problems into solutions that actually work. I move between data, artificial intelligence and information security, and I learn best by building: automations, models and projects with good people around.',
  } as T,

  /** Carrossel "Agora" */
  now: [
    {
      org: 'Itaú Unibanco',
      title: { pt: 'Estágio de férias', en: 'Summer internship' } as T,
      period: { pt: 'dez/26 – fev/27', en: 'Dec/26 – Feb/27' } as T,
      upcoming: true,
    },
    {
      org: 'Insper AI',
      title: { pt: 'Grupo de projetos: deep learning e agentes', en: 'Project group: deep learning & agents' } as T,
      period: { pt: 'desde mar/26', en: 'since Mar/26' } as T,
    },
    {
      org: 'Insper SEC',
      title: { pt: 'Blue Team: defesa e hardening', en: 'Blue Team: defense & hardening' } as T,
      period: { pt: 'desde mar/26', en: 'since Mar/26' } as T,
    },
    {
      org: 'Insper',
      title: {
        pt: 'Monitor de Design de Software, representante de turma e embaixador',
        en: 'Software Design TA, class representative and ambassador',
      } as T,
      period: { pt: 'desde ago/26', en: 'since Aug/26' } as T,
    },
  ],

  contact: {
    email: 'lucassmarchesini@gmail.com',
    emailSubject: 'Oi Lucas!',
    /** Somente dígitos, com DDI */
    phone: '5511957731229',
    whatsappMessage: {
      pt: 'Oi Lucas! Peguei seu contato pelo cartão NFC.',
      en: 'Hi Lucas! I got your contact from your NFC card.',
    } as T,
  },

  links: {
    linkedin: 'https://www.linkedin.com/in/lucas-serra-marchesini/',
    github: 'https://github.com/LucMarchesini',
    // TODO: trocar pelo link real do portfólio (e mudar `portfolioReady` para true)
    portfolio: 'https://example.com/portfolio',
    portfolioReady: false,
    resume: {
      pt: 'curriculo.pdf',
      // TODO: adicionar public/curriculo-en.pdf e trocar null por 'curriculo-en.pdf' (liga o toggle PT/EN na folha)
      en: null as string | null,
      pages: 2,
      preview: 'img/curriculo-p1.webp',
      downloadName: 'Lucas-Marchesini-Curriculo.pdf',
    },
  },

  /** vCard: organização/cargo que aparecem no contato salvo */
  vcard: {
    org: 'Insper',
    title: { pt: 'Estudante de Engenharia da Computação', en: 'Computer Engineering Student' } as T,
  },
}

/** Textos de interface */
export const ui = {
  card: { pt: 'Cartão nº', en: 'Card no.' },
  saveContact: { pt: 'Salvar contato', en: 'Save contact' },
  whatsapp: { pt: 'Chamar no WhatsApp', en: 'Message on WhatsApp' },
  whatsappShort: { pt: 'WhatsApp', en: 'WhatsApp' },
  email: { pt: 'E-mail', en: 'Email' },
  linkedinSub: { pt: 'Experiência e recomendações', en: 'Experience & recommendations' },
  githubSub: { pt: 'Código e projetos', en: 'Code & projects' },
  portfolio: { pt: 'Portfólio', en: 'Portfolio' },
  portfolioSub: { pt: 'Projetos com mais detalhes', en: 'Projects in depth' },
  soon: { pt: 'em breve', en: 'soon' },
  resume: { pt: 'Currículo', en: 'Résumé' },
  resumeSub: { pt: 'PDF · 2 páginas', en: 'PDF · 2 pages' },
  view: { pt: 'Ver', en: 'View' },
  download: { pt: 'Baixar', en: 'Download' },
  copyEmail: { pt: 'Copiar e-mail', en: 'Copy email' },
  copied: { pt: 'Copiado', en: 'Copied' },
  emailCopied: { pt: 'E-mail copiado', en: 'Email copied' },
  linkCopied: { pt: 'Link copiado', en: 'Link copied' },
  contactSaved: { pt: 'Contato baixado, é só abrir', en: 'Contact downloaded, just open it' },
  share: { pt: 'Compartilhar', en: 'Share' },
  qr: { pt: 'QR code', en: 'QR code' },
  qrTitle: { pt: 'Aponte a câmera', en: 'Point your camera' },
  qrSub: { pt: 'Para quem não tem NFC: escaneie e abra este cartão.', en: 'No NFC? Scan to open this card.' },
  resumeTitle: { pt: 'Currículo', en: 'Résumé' },
  resumeSheetSub: { pt: 'Prévia da primeira página.', en: 'Preview of the first page.' },
  close: { pt: 'Fechar', en: 'Close' },
  dragHint: { pt: 'Arraste para baixo para fechar', en: 'Drag down to close' },
  escHint: { pt: 'Esc ou clique fora para fechar', en: 'Press Esc or click outside to close' },
  swipeHint: { pt: 'Deslize para o lado para ver mais', en: 'Swipe sideways to see more' },
  scrollHint: { pt: 'Role para o lado ou use as bolinhas', en: 'Scroll sideways or use the dots' },
  about: { pt: 'Sobre', en: 'About' },
  now: { pt: 'Agora', en: 'Now' },
  upcoming: { pt: 'Em breve', en: 'Upcoming' },
  current: { pt: 'Atual', en: 'Current' },
  links: { pt: 'Links', en: 'Links' },
  langSwitch: { pt: 'Switch to English', en: 'Mudar para português' },
  skip: { pt: 'Pular para o conteúdo', en: 'Skip to content' },
  footer: { pt: 'Encoste, salve, converse.', en: 'Tap, save, talk.' },
  quickContact: { pt: 'Contato rápido', en: 'Quick contact' },
  photoAlt: { pt: 'Foto de Lucas Serra Marchesini sorrindo', en: 'Photo of Lucas Serra Marchesini smiling' },
  slide: { pt: 'Ir para o card', en: 'Go to card' },
} satisfies Record<string, T>

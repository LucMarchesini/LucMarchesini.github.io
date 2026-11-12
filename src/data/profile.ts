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

  name: 'Lucas Serra Marchesini',
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

  location: { pt: 'São Paulo, SP', en: 'São Paulo, Brazil' } as T,

  /** A headline é montada como: prefixo + palavras-foco (que se alternam em destaque) */
  headline: {
    prefix: { pt: 'Engenharia da Computação @ Insper', en: 'Computer Engineering @ Insper' } as T,
    focus: {
      pt: ['Dados', 'IA', 'Segurança'],
      en: ['Data', 'AI', 'Security'],
    } as Record<Lang, string[]>,
  },

  status: {
    pt: 'Incoming Summer Intern @ Itaú · Dez/26',
    en: 'Incoming Summer Intern @ Itaú · Dec/26',
  } as T,

  bio: {
    pt: 'Estudante de Engenharia da Computação no Insper que gosta de construir o caminho inteiro do dado, da ingestão ao modelo. No estágio na Tenda Atacado, criei 17 automações e centralizei os dados de performance de 45 lojas. No Insper AI, treino redes neurais e estudo agentes de IA; no Insper SEC, atuo no Blue Team. Próxima parada: estágio de férias no Itaú.',
    en: 'Computer Engineering student at Insper who likes building the whole path of data, from ingestion to model. As an intern at Tenda Atacado, I built 17 automations and centralized performance data for 45 stores. At Insper AI, I train neural networks and study AI agents; at Insper SEC, I work on the Blue Team. Next stop: summer internship at Itaú.',
  } as T,

  stats: [
    { value: 17, suffix: '', label: { pt: 'automações em produção', en: 'automations in production' } as T, source: 'Tenda Atacado' },
    { value: 45, suffix: '', label: { pt: 'lojas com dados centralizados', en: 'stores with centralized data' } as T, source: 'Tenda Atacado' },
    { value: 99, suffix: '%', label: { pt: 'de acurácia no MNIST', en: 'accuracy on MNIST' } as T, source: 'Insper AI' },
  ],

  featured: {
    title: 'FocusAI',
    description: {
      pt: 'Detecção de atenção com CNN + transfer learning (MobileNetV2).',
      en: 'Attention detection with a CNN + transfer learning (MobileNetV2).',
    } as T,
    label: { pt: 'Projeto em destaque', en: 'Featured project' } as T,
  },

  contact: {
    email: 'lucassmarchesini@gmail.com',
    emailSubject: 'Oi Lucas!',
    /** Somente dígitos, com DDI */
    phone: '5511957731229',
    phoneDisplay: '+55 11 95773-1229',
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
    resume: 'curriculo.pdf',
    resumeDownloadName: 'Lucas-Marchesini-Curriculo.pdf',
  },

  /** vCard: organização/cargo que aparecem no contato salvo */
  vcard: {
    org: 'Insper',
    title: { pt: 'Estudante de Engenharia da Computação', en: 'Computer Engineering Student' } as T,
  },
}

/** Textos de interface */
export const ui = {
  saveContact: { pt: 'Salvar contato', en: 'Save contact' },
  saveContactHint: { pt: 'Adiciona direto na agenda', en: 'Adds me to your contacts' },
  whatsapp: { pt: 'WhatsApp', en: 'WhatsApp' },
  email: { pt: 'E-mail', en: 'Email' },
  linkedinSub: { pt: 'Experiência e recomendações', en: 'Experience & recommendations' },
  githubSub: { pt: 'Código e projetos', en: 'Code & projects' },
  portfolio: { pt: 'Portfólio', en: 'Portfolio' },
  portfolioSub: { pt: 'Projetos com mais detalhes', en: 'Projects in depth' },
  soon: { pt: 'em breve', en: 'soon' },
  resume: { pt: 'Currículo', en: 'Résumé' },
  resumeSub: { pt: 'PDF', en: 'PDF · Portuguese' },
  view: { pt: 'Ver', en: 'View' },
  download: { pt: 'Baixar', en: 'Download' },
  copyEmail: { pt: 'Copiar e-mail', en: 'Copy email' },
  copied: { pt: 'Copiado', en: 'Copied' },
  emailCopied: { pt: 'E-mail copiado', en: 'Email copied' },
  linkCopied: { pt: 'Link copiado', en: 'Link copied' },
  contactSaved: { pt: 'Contato pronto para salvar', en: 'Contact ready to save' },
  share: { pt: 'Compartilhar', en: 'Share' },
  showQr: { pt: 'Mostrar QR', en: 'Show QR' },
  qrTitle: { pt: 'Aponte a câmera', en: 'Point your camera' },
  qrSub: { pt: 'Para quem não tem NFC: escaneie e abra este cartão.', en: 'No NFC? Scan to open this card.' },
  close: { pt: 'Fechar', en: 'Close' },
  about: { pt: 'Sobre', en: 'About' },
  numbers: { pt: 'Em números', en: 'By the numbers' },
  elsewhere: { pt: 'Links', en: 'Links' },
  langSwitch: { pt: 'Switch to English', en: 'Mudar para português' },
  skip: { pt: 'Pular para o conteúdo', en: 'Skip to content' },
  footer: { pt: 'Encoste, salve, converse.', en: 'Tap, save, talk.' },
  photoAlt: { pt: 'Foto de Lucas Serra Marchesini sorrindo', en: 'Photo of Lucas Serra Marchesini smiling' },
} satisfies Record<string, T>

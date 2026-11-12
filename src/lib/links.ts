import { profile } from '../data/profile'

export const whatsappHref = (msg: string) => `https://wa.me/${profile.contact.phone}?text=${encodeURIComponent(msg)}`
export const mailHref = () =>
  `mailto:${profile.contact.email}?subject=${encodeURIComponent(profile.contact.emailSubject)}`

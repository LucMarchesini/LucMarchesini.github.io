// Gera versões otimizadas da foto (AVIF/WebP/JPG) + miniatura para o vCard.
// Uso: npm run images  (rode de novo sempre que trocar public/foto.jpg)
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const src = 'public/foto.jpg'
mkdirSync('public/img', { recursive: true })
const meta = await sharp(src).metadata()
// recorte quadrado centrado no rosto (foto retrato: rosto no terço superior)
const side = Math.min(meta.width, meta.height) * 0.92
const left = Math.round((meta.width - side) / 2)
const top = Math.round(meta.height * 0.05)
const crop = () => sharp(src).extract({ left, top, width: Math.round(side), height: Math.round(side) })

for (const w of [200, 400]) {
  await crop().resize(w, w).avif({ quality: 55 }).toFile(`public/img/foto-${w}.avif`)
  await crop().resize(w, w).webp({ quality: 78 }).toFile(`public/img/foto-${w}.webp`)
  await crop().resize(w, w).jpeg({ quality: 80, mozjpeg: true }).toFile(`public/img/foto-${w}.jpg`)
}
await crop().resize(160, 160).jpeg({ quality: 70, mozjpeg: true }).toFile('public/img/foto-vcard.jpg')
await crop().resize(600, 600).jpeg({ quality: 85, mozjpeg: true }).toFile('public/img/foto-600.jpg')
console.log('ok', meta.width, meta.height)

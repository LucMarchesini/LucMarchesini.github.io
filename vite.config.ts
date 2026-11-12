import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Repo "LucMarchesini.github.io" = user site → base '/'.
// Se publicar em outro repo (ex.: /cartao/), troque para base: '/cartao/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: { target: 'es2022', cssCodeSplit: true },
})

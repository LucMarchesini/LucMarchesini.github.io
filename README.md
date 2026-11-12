# Cartão digital NFC: Lucas Serra Marchesini

Site de uma página que abre quando alguém encosta o celular na tag NFC.
**URL:** https://lucmarchesini.github.io/

Stack: Vite, React, TypeScript, Tailwind CSS v4, Motion e lucide-react, com deploy por GitHub Actions no GitHub Pages.

## Rodar localmente

```bash
npm i && npm run dev
```

`npm run build` gera o site em `dist/`, e `npm run preview` serve esse build.

## Onde editar

| O quê | Onde |
|---|---|
| Textos, links, contatos, bio, números (PT e EN) | `src/data/profile.ts` (é o único arquivo de conteúdo) |
| Link do portfólio | `links.portfolio` em `profile.ts`. Mude `portfolioReady: true` para tirar a tag "em breve" |
| Cores e fontes | tokens `@theme` em `src/index.css` |

### Trocar a foto
1. Substitua `public/foto.jpg` (de preferência uma foto retrato com o rosto centralizado).
2. Rode `npm run images`. Isso gera AVIF, WebP e JPG de 200 e 400px e a miniatura do vCard em `public/img/`.
3. (Opcional) Rode `bash scripts/brand.sh` para regenerar a imagem OG (`public/og.jpg`) e os ícones. Precisa do Google Chrome instalado.

### Trocar o currículo
Substitua `public/curriculo.pdf`. O botão "Baixar" salva o arquivo como `Lucas-Marchesini-Curriculo.pdf`.

## Deploy
Todo push na `main` dispara `.github/workflows/deploy.yml`, que faz o build e publica no Pages.
Uma vez só, no repositório: **Settings → Pages → Source: GitHub Actions**.

## Gravar a URL na tag NFC
1. Instale o app **NFC Tools** (iOS ou Android).
2. Vá em **Escrever → Adicionar um registro → URL / URI** e digite `https://lucmarchesini.github.io/`.
3. Toque em **Escrever** e encoste a tag no celular.
4. (Opcional) Em **Outros → Bloquear tag**, deixe a tag somente leitura. Atenção: isso é irreversível.

Como a URL é a raiz do user site, ela é permanente: você pode mudar o conteúdo à vontade sem regravar a tag.

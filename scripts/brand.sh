#!/usr/bin/env bash
# Regenera og.jpg e ícones (requer Google Chrome instalado). Uso: bash scripts/brand.sh
set -e
cd "$(dirname "$0")/.."
CH="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
D=$(cygpath -w "$PWD" 2>/dev/null || pwd)
"$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=3000 --screenshot="$D/scripts/brand/og.png" "file:///$D/scripts/brand/og.html" 2>/dev/null
"$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=512,512 --virtual-time-budget=2000 --screenshot="$D/scripts/brand/icon-512.png" "file:///$D/scripts/brand/icon.html" 2>/dev/null
node -e "
const sharp=require('sharp');(async()=>{
const s='scripts/brand/icon-512.png';
await sharp(s).resize(512,512).png().toFile('public/icon-512.png');
await sharp(s).resize(192,192).png().toFile('public/icon-192.png');
await sharp(s).resize(180,180).png().toFile('public/apple-touch-icon.png');
await sharp(s).resize(32,32).png().toFile('public/favicon-32.png');
await sharp('scripts/brand/og.png').jpeg({quality:84,mozjpeg:true}).toFile('public/og.jpg');
console.log('brand ok')})()"

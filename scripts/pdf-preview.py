"""Gera a prévia da 1ª página do currículo (public/img/curriculo-p1.png).
Uso: pip install pymupdf && python scripts/pdf-preview.py  (depois rode npm run images)"""
import pymupdf as fitz, sys
doc = fitz.open(sys.argv[1] if len(sys.argv) > 1 else "public/curriculo.pdf")
print("pages:", doc.page_count)
pix = doc[0].get_pixmap(dpi=110)
pix.save("public/img/curriculo-p1.png")
print(pix.width, pix.height)

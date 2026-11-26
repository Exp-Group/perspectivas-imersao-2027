#!/usr/bin/env python3
"""Gera a versão ARQUIVO ÚNICO (imagens embutidas em base64, abre offline e por WhatsApp/e-mail).
Uso: python3 scripts/build-arquivo-unico.py [saida.html]   (padrão: dist/perspectivas-imersao-2027.html)
"""
import base64, json, re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
site = root / 'site'
out = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'dist' / 'perspectivas-imersao-2027.html'
b64 = lambda p: 'data:image/webp;base64,' + base64.b64encode((site / 'img' / p).read_bytes()).decode()
s = (site / 'index.html').read_text()
s = re.sub(r'\s(srcset|sizes)="[^"]*"', '', s)
s = s.replace('<link rel="preload" as="image" href="img/sf-600.webp" fetchpriority="high">', '')
s = s.replace('img/${d.img}-1000.webp', 'img/${d.img}-600.webp')
for name in set(re.findall(r'img/([a-z0-9-]+\.webp)', s)):
    s = s.replace('img/' + name, b64(name))
dimg = {k: b64(f'{k}-600.webp') for k in ['sf', 'sf2', 'st', 'st2', 'np']}
s = s.replace('img/${d.img}-600.webp', '${DIMG[d.img]}')
s = s.replace('/* ===== CONFIG ===== */', 'const DIMG=' + json.dumps(dimg) + ';\n/* ===== CONFIG ===== */')
s = s.replace('<meta property="og:image" content="img/og.jpg">', '')
assert 'img/' not in s.replace('<img', '').replace('img/>', ''), re.findall(r'.{30}img/.{30}', s)[:3]
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(s)
print(out, len(s) // 1024, 'KB')

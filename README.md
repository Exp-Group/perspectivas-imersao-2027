# Perspectivas · Imersão 2027

Site da imersão **Perspectivas 2027** (São Francisco · Stanford · Napa, 12–19/03/2027), conduzida por Bruna Donadio. Foi feito como presente para a Bruna.

| Para quem | Link |
|---|---|
| **Bruna** (abre com o envelope e a carta) | https://perspectivas-imersao-2027.vercel.app/#presente |
| **Participantes** (entra direto no site) | https://perspectivas-imersao-2027.vercel.app |

## Estrutura

```
site/                    ← o que vai ao ar (Vercel, Root Directory = site)
  index.html             ← o site todo (HTML + CSS + JS nativos, sem bibliotecas)
  img/                   ← fotos WebP em 600/1000/1600 px + og.jpg
  vercel.json            ← cache: img/ imutável por 1 ano, HTML sempre revalida
scripts/
  build-arquivo-unico.py ← gera dist/perspectivas-imersao-2027.html (imagens embutidas, abre offline)
qa/
  qa.js                  ← 5 aparelhos (desktop, iPhone 13, Pixel 7 com UA do WhatsApp, iPad Mini, 360 px)
  perf.js                ← LCP/CLS em celular lento (Pixel 7, CPU 4x, rede limitada)
  err.js                 ← erros de JS e imagens quebradas
docs/artifacts/          ← registro do artifact (ARTIFACT.md)
```

## Como mexer

Edite `site/index.html` e faça push na `main`. A Vercel publica sozinha. Branches e PRs ganham um link de preview.

O que muda com mais frequência:
- `CONFIG.whatsapp`, no topo do `<script>` principal: número da Bruna que recebe o "Quero participar" (hoje 5511991239290).
- Envelope e carta: o bloco `#gift` no início do `<body>` (procure "Para Bruna").

## Testar antes de publicar

```bash
cd site && python3 -m http.server 8765 &        # serve local
node qa/qa.js http://localhost:8765/            # 5 aparelhos; capturas em qa/shots/
node qa/perf.js http://localhost:8765/          # desempenho no celular lento
node qa/err.js http://localhost:8765/#presente  # erros e imagens
```

Os testes usam `playwright-core`. Instale com `npm i -D playwright-core` ou aponte `PW_CORE` para uma instalação existente. O Chromium usa o Chrome do Mac (ou o caminho em `CHROME`).

## Arquivo único (para mandar por WhatsApp ou e-mail)

```bash
python3 scripts/build-arquivo-unico.py                       # → dist/perspectivas-imersao-2027.html
python3 scripts/build-arquivo-unico.py ~/Downloads/perspectivas-imersao-2027.html
```

## Onde mais está

- **Vercel:** equipe `lilai`, projeto `perspectivas-imersao-2027`, ligado a este repositório.
- **Arquivo interno:** a íntegra, as versões anteriores e as fotos originais ficam no arquivo interno do Grupo EXP (fora do repositório).

## Créditos das fotos

As fotos são do Wikimedia Commons, licença CC BY-SA. Os créditos aparecem no rodapé do site e em `docs/artifacts/…/ARTIFACT.md`.

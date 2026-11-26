# Perspectivas · Imersão 2027: site (presente para a Bruna)

- **Data:** 2026-11-26
- **No ar:** https://perspectivas-imersao-2027.vercel.app. O link do presente, que abre com o envelope, é `/#presente`.
- **Fonte:** `site/` deste repositório. A Vercel publica a cada push na `main`.
- **Íntegra e versões anteriores:** no arquivo interno do Grupo EXP, fora deste repositório.

## De onde vieram os dados
- Texto, datas, programação, FAQ, atividades, ateliê e biblioteca vêm do site original da imersão.
- As fotos dos lugares são do Wikimedia Commons, licença CC BY-SA. Autores:
  - Frank Schulenburg: "The Bridge", "Stanford University campus in 2016" e "Schramsberg Vineyards".
  - King of Hearts: "Painted Ladies".
  - Jawed: "Stanford University Arches with Memorial Church".
  - Rhododendrites: "Vineyard in Napa Valley".
- A foto da Bruna foi cedida para o site.

## Histórico
- v1 e v2: versão com GSAP/Lenis, que ficou lenta (LCP 6,6 s no celular).
- v3: refeita do zero sem bibliotecas.
  - Imagens WebP com srcset.
  - Envelope com selo de cera e carta com selo-foto.
  - Polaroides no topo da página.
  - Carrossel dos lugares.
  - Jornada em linha única, com "hoje" e o próximo passo.
  - "Quero participar" em 3 passos, com prévia da mensagem do WhatsApp.
  - Barra de abas no celular.
  - LCP 2,9 s no ar.
- 2026-11-26: repositório próprio, com deploy automático pela Vercel.

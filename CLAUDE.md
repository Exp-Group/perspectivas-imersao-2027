# perspectivas-imersao-2027

Site estático (sem build). Fonte única: `site/index.html` + `site/img/`. Vercel (equipe lilai, Root Directory `site`) publica a cada push na `main`.

- Sem bibliotecas nem framework. Mantenha assim: o site foi refeito porque a versão com GSAP/Lenis estava lenta (LCP 6,6 s → 2,9 s).
- Não use `content-visibility` (quebra os saltos por âncora).
- `#presente` abre o envelope; o link limpo NÃO pode mostrar o envelope (o `qa/qa.js` confere).
- Antes de push na main: `node qa/qa.js http://localhost:8765/` (0 erros, sem rolagem lateral) e `node qa/perf.js`.
- Mudou o site? Regere o arquivo único (`python3 scripts/build-arquivo-unico.py`) e atualize a cópia no arquivo interno (caminho no ARTIFACT.md do SSD / memória da sessão).

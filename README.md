# Brasília 3D

[![CI](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/ci.yml/badge.svg)](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/ci.yml)
[![Deploy GitHub Pages](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/pages.yml/badge.svg)](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/pages.yml)
[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-0f6d6a.svg)](LICENSE)

Site no ar: https://luisguilherme605.github.io/Brasilia3D/

Um guia turístico de Brasília feito com HTML, CSS e JavaScript, sem framework. O destaque é uma maquete 3D da cidade que eu desenhei direto no canvas 2D.

## A ideia

Brasília foi projetada no papel antes de existir, então quis que o site tivesse essa cara de prancha técnica: fundo cinza com grid, dados em monoespaçada, e cada ponto turístico numerado como folha de projeto (PL-01, PL-02...).

## O que tem

- 9 pontos turísticos com nota, horário, preço e ilustração SVG feita por mim
- Fotos da Wikimedia Commons carregadas em tempo real, com filtro pra descartar brasão, logo e imagem pequena
- Busca sem acento (`brasilia` acha `Brasília`), filtro por categoria e favoritos salvos no navegador
- Maquete 3D com Congresso, Catedral, Torre de TV, palácios, Museu Nacional e Lago Paranoá
- Galeria em mosaico com lightbox

## Como fiz a maquete 3D

A parte mais trabalhosa do projeto. Não usa WebGL nem lib 3D nenhuma, é canvas 2D e matemática na mão.

**Projeção** (`src/skyline/projecao.js`) - Cada vértice (x, y, z) gira no eixo vertical, sofre elevação da câmera e divide pela profundidade pra criar a perspectiva.

**Faces** (`formas.js`) - Caixa, disco, cúpula convexa e côncava viram polígonos, cada um guarda a profundidade média.

**Desenho** (`index.js`) - Ordena da face mais longe pra mais perto e pinta nessa ordem (algoritmo do pintor). Só roda quando a seção tá visível e a aba tá em foco.

## Estrutura

```
index.html              página principal
style.css               estilos e variáveis
src/
  main.js               liga os dados na interface
  dados/                pontos turísticos, galeria e dicas
  nucleo/               DOM, armazenamento, texto, filtro, Wikimedia
  ui/                   cards, galeria, modal, lightbox, navegação
  skyline/              projeção, formas, cidade e render
scripts/gerar-seo.js    gera JSON-LD e sitemap
tests/unidade/          Vitest
tests/e2e/              Playwright
```

## Rodando

O site é estático mas usa módulos ES, então precisa de servidor HTTP:

```bash
npm run dev          # http://localhost:8000
```

Pra mexer no código:

```bash
npm install
npm run check        # lint, formatação, SEO e testes
npm run test:e2e     # testes no navegador
```

## Decisões técnicas

Por que canvas 2D e não WebGL, por que sem build, por que as fotos vêm da Wikipédia: tá tudo em [`docs/decisoes-tecnicas.md`](docs/decisoes-tecnicas.md).

## Contribuindo

Abre issue antes de mandar PR. Roda `npm run check` e `npm run test:e2e` antes.

## Créditos

- Fotos: [Wikimedia Commons](https://commons.wikimedia.org/) (CC BY-SA)
- Dados turísticos: Secretaria de Turismo do DF
- Fontes: [Archivo](https://fonts.google.com/specimen/Archivo) e [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)

## Licença

[MIT](LICENSE).

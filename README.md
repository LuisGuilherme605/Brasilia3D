# Brasília 3D

[![CI](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/ci.yml/badge.svg)](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/ci.yml)
[![Deploy GitHub Pages](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/pages.yml/badge.svg)](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/pages.yml)
[![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-0f6d6a.svg)](LICENSE)

**Site no ar:** https://luisguilherme605.github.io/Brasilia3D/

Um guia turístico de Brasília que fiz com HTML, CSS e JavaScript puro — sem
framework e sem build. O centro do projeto é uma maquete 3D da cidade que
desenhei no canvas 2D, do zero.

## A ideia

Brasília foi um desenho antes de ser cidade, então resolvi que o site devia
parecer uma prancha: papel cinza com malha de desenho técnico ao fundo, os
dados todos em monoespaçada e um acento só, no verde-azulado do vidro do
Niemeyer. Cada ponto turístico recebe um número de prancha (PL-01, PL-02...),
como folha de um caderno de projeto.

## O que tem

- nove pontos turísticos com categoria, nota, horário e preço, cada um com uma
  ilustração SVG minha que aparece enquanto a foto não carrega
- fotos vindas da Wikimedia Commons em tempo real, com um filtro que descarta
  vetor, brasão, logotipo e imagem pequena demais pra ser foto
- busca que ignora acento (`brasilia` acha `Brasília`), filtro por categoria e
  favoritos que ficam salvos no navegador
- a maquete 3D com Congresso, Catedral, Torre de TV, os palácios, o Museu
  Nacional e o Lago Paranoá
- galeria em mosaico com lightbox

## Como fiz a maquete 3D

Essa foi a parte mais trabalhosa, e foi onde mais aprendi no projeto. Não usa
WebGL nem biblioteca 3D: é canvas 2D e matemática na mão, em três etapas.

**Projeção** (`src/skyline/projecao.js`). Cada vértice `(x, y, z)` gira em torno
do eixo vertical, sofre a elevação da câmera e é dividido pela profundidade —
que é o que cria a perspectiva. A distância focal acompanha a altura do canvas,
senão a maquete fica minúscula em tela grande.

**Montagem das faces** (`formas.js`). Caixa, disco, cúpula convexa e côncava
viram polígonos, e cada um guarda a profundidade média dos seus vértices.

**Ordenação e desenho** (`index.js`). As faces são ordenadas da mais longe pra
mais perto e pintadas nessa ordem. É o algoritmo do pintor: resolve a oclusão
sem precisar de z-buffer.

O laço só roda quando a seção está visível na tela e a aba está em primeiro
plano, e para de girar sozinho se a pessoa pediu menos movimento no sistema.

## Estrutura

```
index.html              marcação e metadados
style.css               estilos e tokens de cor e tipografia
src/
  main.js               liga os dados na interface
  dados/                pontos turísticos, galeria e dicas
  nucleo/               DOM, armazenamento, texto, filtro, Wikimedia
  ui/                   cards, galeria, modal, lightbox, navegação
  skyline/              projeção, formas, cidade e o laço de render
scripts/gerar-seo.js    gera o JSON-LD e o sitemap a partir dos dados
tests/unidade/          Vitest
tests/e2e/              Playwright
```

## Rodando

O site é estático, mas usa módulos ES — então precisa ser servido por HTTP, não
adianta abrir o arquivo direto:

```bash
npm run dev          # http://localhost:8000
```

Pra mexer no código:

```bash
npm install
npm run check        # lint, formatação, SEO e os testes de unidade
npm run test:e2e     # os testes no navegador
```

Se você já tem um Chromium instalado e não quer baixar outro:

```bash
PLAYWRIGHT_CHROMIUM_PATH=/caminho/para/chrome npm run test:e2e
```

## Se mexer nos pontos turísticos

O JSON-LD e o sitemap são gerados de `src/dados/pontos.js`. Depois de editar
esse arquivo, roda:

```bash
npm run seo
```

A CI quebra se isso não tiver sido feito.

## Decisões técnicas

Por que canvas 2D e não WebGL, por que sem build, por que a foto vem da
Wikipédia — está tudo em [`docs/decisoes-tecnicas.md`](docs/decisoes-tecnicas.md),
com o que cada escolha custou.

## Contribuindo

Abre uma issue antes de mandar PR. Antes de abrir, roda `npm run check` e
`npm run test:e2e`.

## Créditos

- Fotos: [Wikimedia Commons](https://commons.wikimedia.org/) (CC BY-SA)
- Dados turísticos: Secretaria de Turismo do Distrito Federal
- Tipografia: [Archivo](https://fonts.google.com/specimen/Archivo) e
  [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)

## Licença

[MIT](LICENSE).

# Brasilia 3D

[![CI](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/ci.yml/badge.svg)](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/ci.yml)
[![Deploy GitHub Pages](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/pages.yml/badge.svg)](https://github.com/LuisGuilherme605/Brasilia3D/actions/workflows/pages.yml)
[![Licenca MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-0f6d6a.svg)](LICENSE)

Site no ar: https://luisguilherme605.github.io/Brasilia3D/

Guia turistico interativo de Brasilia construido com React 19, Vite e Framer Motion. O destaque e uma maquete 3D da cidade desenhada em canvas 2D puro, sem WebGL e sem biblioteca grafica.

## A ideia

Brasilia foi projetada no papel antes de existir, entao quis que o site tivesse essa cara de prancha tecnica: fundo cinza com grid, dados em monoespaçada, e cada ponto turistico numerado como folha de projeto (PL-01, PL-02...).

## O que tem

- 9 pontos turisticos com nota, horario, preço e ilustracao SVG
- Fotos da Wikimedia Commons carregadas em tempo real, com filtro pra descartar brasao, logo e imagem pequena
- Busca sem acento (`brasilia` acha `Brasilia`), filtro por categoria e favoritos salvos no navegador
- Maquete 3D com Congresso, Catedral, Torre de TV, palacios, Museu Nacional e Lago Paranoa
- Galeria em mosaico com lightbox
- Animaçoes de scroll-reveal e transicoes com Framer Motion
- Modal e lightbox com AnimatePresence e trap de foco

## Como fiz a maquete 3D

A parte mais trabalhosa do projeto. Nao usa WebGL nem lib 3D nenhuma, e canvas 2D e matematica na mao.

**Projecao** (`src/skyline/projecao.js`) — Cada vertice (x, y, z) gira no eixo vertical, sofre elevacao da camera e divide pela profundidade pra criar a perspectiva.

**Faces** (`src/skyline/formas.js`) — Caixa, disco, cupula convexa e concava viram poligonos, cada um guarda a profundidade media.

**Render** (`src/components/Skyline.jsx`) — Ordena da face mais longe pra mais perto e pinta nessa ordem (algoritmo do pintor). So roda quando a secao ta visivel e a aba ta em foco. O componente React gerencia o ciclo de vida do canvas com refs e cleanup no unmount.

## Estrutura

```
index.html                  pagina principal (Vite entry)
style.css                   estilos e variaveis
vite.config.js              build e dev server
src/
  main.jsx                  entry point React
  App.jsx                   componente raiz
  components/
    Hero.jsx                poster e titulo
    Navbar.jsx              navegacao com scroll suave
    Pontos.jsx              cards dos pontos turisticos
    Card.jsx                card individual com animacao
    Galeria.jsx             mosaico de fotos
    Lightbox.jsx            visualizacao em tela cheia
    Modal.jsx               detalhes do ponto turistico
    Skyline.jsx             maquete 3D em canvas
    Dicas.jsx               dicas de viagem
    Jornada.jsx             roteiro sugerido
    RevealSection.jsx       wrapper de scroll-reveal
    Stats.jsx               contadores animados
    ProgressBar.jsx         barra de leitura
    BackToTop.jsx           botao voltar ao topo
    Footer.jsx              rodape
  hooks/
    useFavoritos.js         estado global de favoritos (useSyncExternalStore)
    useFoto.js              carregamento de fotos da Wikimedia
  dados/                    pontos turisticos, galeria e dicas
  nucleo/                   DOM, armazenamento, texto, filtro, Wikimedia
  skyline/                  projecao, formas e geometria da cidade
scripts/gerar-seo.js        gera JSON-LD e sitemap
tests/unidade/              Vitest
tests/e2e/                  Playwright
```

## Rodando

```bash
npm install
npm run dev          # http://localhost:5173
```

Pra verificar tudo antes de commitar:

```bash
npm run check        # lint, formatacao, SEO e testes
npm run test:e2e     # testes no navegador
npm run build        # build de producao
```

## Decisoes tecnicas

Por que canvas 2D e nao WebGL, por que as fotos vem da Wikipedia: ta tudo em [`docs/decisoes-tecnicas.md`](docs/decisoes-tecnicas.md).

## Contribuindo

Abre issue antes de mandar PR. Roda `npm run check` e `npm run test:e2e` antes.

## Creditos

- Fotos: [Wikimedia Commons](https://commons.wikimedia.org/) (CC BY-SA)
- Dados turisticos: Secretaria de Turismo do DF
- Fontes: [Archivo](https://fonts.google.com/specimen/Archivo) e [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)

## Licenca

[MIT](LICENSE).

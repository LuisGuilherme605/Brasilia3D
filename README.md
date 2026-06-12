# Brasília 3D

Site de turismo interativo sobre Brasília, construído inteiramente com HTML, CSS e JavaScript puro — sem frameworks, sem bibliotecas externas, sem build step. Basta abrir o `index.html` no navegador.

## Estrutura do projeto

```
index.html   → Estrutura HTML semântica
style.css    → Estilos visuais (layout, animações, responsividade)
script.js    → Lógica da aplicação (dados, renderização, interatividade)
assets/      → Arte da marca (pôster modernista de Brasília)
```

## Visão geral

O projeto apresenta os principais pontos turísticos da capital federal com uma identidade visual editorial inspirada no modernismo de Brasília: fundo cor de papel, tipografia Archivo + Fraunces, paleta azul/terracota/mostarda e linhas finas de grade. Inclui um skyline tridimensional interativo e ilustrações vetoriais para cada atração.

## O que foi desenvolvido

### Hero editorial com pôster da casa

A abertura combina tipografia em escala de cartaz com um pôster de viagem retrô de Brasília (torres e cúpulas do Congresso Nacional), criado no Canva e emoldurado como peça gráfica da marca.

### Cards de pontos turísticos

Nove atrações cobertas, cada uma com ilustração SVG própria, tag de categoria, avaliação, horário de funcionamento e valor de entrada. Um clique abre um modal com mais detalhes e dicas práticas.

Atrações incluídas: Congresso Nacional, Catedral Metropolitana, Torre de TV, Parque Nacional de Brasília, Pontão do Lago Sul, Museu Nacional Honestino Guimarães, Palácio do Itamaraty, Jardim Botânico e Memorial JK.

### Motor de renderização 3D (Canvas 2D)

O skyline foi construído com um rasterizador de software escrito do zero. A cada frame, o sistema coleta todas as faces de todos os edifícios, calcula a profundidade média de cada face após a projeção e as ordena de trás para frente antes de desenhar — painter's algorithm clássico aplicado face a face, não por objeto.

A projeção usa uma câmera com distância fixa (`CAM_D = 14` unidades) e ângulo de elevação constante, o que garante que `rzCam` seja sempre positivo e elimina os artefatos de clipping que aparecem quando objetos cruzam o plano da câmera.

Detalhes de implementação:
- Rotação apenas no eixo Y, controlada pelo arraste do mouse ou toque na tela
- Iluminação simulada por três tons distintos por face (topo, frente, lateral)
- Janelas com padrão fixo gerado por hash determinístico — sem flickering entre frames
- Congresso Nacional com cúpula côncava (bowl com gradiente interno escuro) e cúpula convexa renderizadas como faces independentes
- Torre de TV com base, shaft inferior, deck de observação e shaft superior empilhados por `base` offset, sem geometria solta
- Catedral com 16 colunas distribuídas em anel usando trigonometria simples
- Lago Paranoá como polígono projetado com gradiente e linhas de reflexo animadas

### Outras seções

Barra de estatísticas com dados reais do Distrito Federal, oito cards de dicas de viagem e navbar fixa com backdrop-filter.

## Como rodar

Abra o `index.html` direto no navegador. Para testar com servidor local:

```bash
python -m http.server 8000
# acesse http://localhost:8000
```

## GitHub Pages

Para publicar via GitHub Pages: **Settings → Pages → Branch: main → Save**.

O site ficará disponível em `https://luisguilherme605.github.io/Brasilia3D`.

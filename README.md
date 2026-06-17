# Brasília 3D

Um site de turismo sobre Brasília que fiz com HTML, CSS e JavaScript puro — sem
framework e sem build, é só abrir o `index.html`.

## A ideia

Mostrar os principais pontos turísticos da cidade com uma cara mais editorial,
inspirada no modernismo de Brasília: fundo cor de papel, tipografia Archivo +
Fraunces e uma paleta azul/terracota/mostarda. Tem também um skyline 3D
interativo que dá pra girar.

## O que tem

- nove pontos turísticos, cada um com ilustração própria, categoria, nota,
  horário e preço; clicando abre um modal com mais detalhes e dicas
- um skyline 3D desenhado no canvas que gira com o mouse ou o toque
  (Congresso, Catedral, Torre de TV, o lago...)
- barra de estatísticas do DF, cards de dicas de viagem e navbar fixa

O skyline 3D foi a parte mais trabalhosa: desenhei tudo no canvas 2D, calculando
a ordem das faces pra desenhar de trás pra frente. Foi onde mais aprendi no projeto.

## Como rodar

Abre o `index.html` direto no navegador. Se quiser rodar com um servidor local:

```bash
python -m http.server 8000
# acesse http://localhost:8000
```

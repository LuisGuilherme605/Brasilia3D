# Decisões técnicas

Anotei aqui as escolhas que fiz no projeto e o que cada uma custou, pra não
ficar refazendo a mesma discussão comigo mesmo daqui a seis meses.

## Site estático, sem framework e sem build

O projeto é uma página só: conteúdo fixo, sem login, sem backend. Não tem estado
compartilhado complicado nem marcação repetida o bastante pra justificar
componentes, então React ou um gerador estático só somariam uma camada que eu
teria que manter.

Sem build, o que está no repositório é exatamente o que vai pro ar. Isso torna o
deploy trivial e o código legível pra quem abre pela primeira vez.

O que custa: não tem minificação nem tree-shaking, e o navegador baixa um arquivo
por módulo. Com menos de 100 KB de código isso não pesa. Se crescer muito, vale
reavaliar.

## Módulos ES nativos em vez de um arquivo só

O código nasceu como um `script.js` de 410 linhas com dados, interface e render
3D no mesmo lugar. Qualquer mudança exigia ler o arquivo inteiro e nada dava pra
testar isolado.

Quebrei em `src/`, uma responsabilidade por arquivo, com `import`/`export`
nativos. Módulos ES rodam em qualquer navegador atual sem bundler, o que preserva
a decisão de cima. E a separação deixou a matemática da projeção e a regra de
filtragem como funções puras — que hoje têm teste.

O que custa: uma requisição por módulo no primeiro carregamento, e nada de
suporte a navegador sem módulos ES.

## Canvas 2D com algoritmo do pintor, não WebGL

A maquete tem uns 20 volumes simples girando devagar. WebGL resolveria com
z-buffer de verdade, mas traria uma dependência de centenas de kilobytes e
quebraria a decisão de não ter build.

Como as formas são convexas e bem separadas, ordenar as faces por profundidade
média e pintar de trás pra frente não gera artefato visível. E foi a parte em que
mais aprendi: a projeção está escrita na mão.

O que custa: o algoritmo do pintor erra quando duas faces se cruzam ou se
sobrepõem em ciclo. Se a maquete ganhar geometria mais complexa, vai ser preciso
particionar as faces ou migrar pra WebGL.

## Foto vinda da Wikipédia em tempo de execução

O guia precisa de foto real dos monumentos, mas hospedar imagem no repositório
significa resolver licença e peso de cada arquivo.

Busco na API REST da Wikipédia no carregamento, com uma lista de artigos
candidatos por ponto. O filtro descarta SVG, brasão, logotipo e imagem com menos
de 400 px — sem ele a Wikipédia devolve o brasão do DF no lugar da foto do
palácio, o que aconteceu de verdade.

O que custa: o site depende de um serviço de fora. Se a API cair ou a pessoa
estiver sem rede, aparece a ilustração SVG do ponto em vez da foto. E não tenho
controle editorial sobre qual foto vem. O `AbortSignal` de 5 s evita que a página
fique presa esperando.

## JSON-LD e sitemap gerados do próprio código

O JSON-LD de SEO repete nome, descrição e horário de cada ponto — informação que
já existe em `src/dados/pontos.js`. Manter as duas cópias na mão é garantia de
divergir.

O `scripts/gerar-seo.js` gera o bloco e o `sitemap.xml` a partir dos dados, e a
CI roda o mesmo script com `--check` pra quebrar quando o HTML estiver
desatualizado. Elimina uma classe inteira de bug silencioso sem introduzir build.

O que custa: um passo a mais (`npm run seo`) depois de editar os pontos.

## CSP por `<meta>`, com o que o GitHub Pages permite

O Pages não deixa definir cabeçalho HTTP, então a Content Security Policy vai por
`<meta http-equiv>`. Tirei os `onclick` do HTML pra poder remover o
`'unsafe-inline'` do `script-src` — que é a proteção que mais importa aqui, já que
a página insere conteúdo vindo de uma API de fora.

O que custa: `frame-ancestors` é ignorado quando entregue por `<meta>`, então não
existe proteção contra clickjacking hoje. Resolver exigiria sair do Pages pra uma
hospedagem que permita cabeçalho. Pra um site sem login nem formulário, não
compensa.

## Teste dividido em dois níveis

Boa parte do código toca no DOM ou no canvas, onde teste unitário rende pouco.
Então: Vitest pra lógica pura (projeção, cores, filtro, normalização de texto,
armazenamento) e Playwright pro comportamento real no navegador (busca, filtro,
foco no modal, favoritos, giro do skyline pelo teclado).

Nos testes de ponta a ponta as chamadas à Wikipédia são interceptadas, senão o
resultado passa a depender da rede.

O que custa: duas ferramentas, dois comandos e um navegador pra CI baixar.

## Identidade visual de prancha técnica

O visual anterior era fundo creme com serifa de alto contraste e acento
terracota. É um conjunto bonito, mas virou o padrão que aparece em qualquer
página gerada automaticamente hoje — não dizia nada sobre Brasília.

Troquei por uma leitura que sai do próprio assunto: Brasília existe porque
alguém desenhou uma prancha antes. Papel cinza-frio com malha de desenho, tinta
quase preta, um acento só no verde-azulado do vidro do Niemeyer, e todo dado
(horário, nota, número da prancha, contador de resultados) em monoespaçada.
Nenhuma serifa. A faixa de números da cidade virou uma linha de cota, com traço
de chamada em cada valor.

O que custa: a categoria dos pontos perdeu a cor própria — agora todas as
etiquetas têm a mesma forma, e quem separa categoria são os botões de filtro. E
o pôster do hero continua na paleta antiga, quente; ele funciona como objeto
sobre a mesa, mas se um dia eu refizer o pôster, é bom aproximar da paleta nova.

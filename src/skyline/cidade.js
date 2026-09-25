// Maquete branca do Plano Piloto — uma leitura de maquete de arquitetura, não de
// cidade noturna. O eixo z corre no sentido do Eixo Monumental; x atravessa em
// direção às alas dos ministérios. `tipo` decide como o monumento é construído
// em formas.js. As cores são tons de concreto: quem dá o relevo é o sombreado
// das faces, não a cor de cada prédio. As posições mantêm o conjunto centrado
// na origem para a maquete girar sem sair do quadro.

const CONCRETO = '#e6e8e2';
const CONCRETO_ALT = '#dcded7';
const VIDRO = '#cdddd8'; // acento teal discreto para os volumes envidraçados

export const MONUMENTOS = [
  // ── Esplanada dos Ministérios: duas alas idênticas ladeando o eixo. A
  //    repetição regular é o que dá leitura de projeto, e não de bagunça.
  ...[-1.4, 0, 1.4].flatMap((cz) =>
    [-2.6, 2.6].map((cx) => ({
      tipo: 'caixa',
      cx,
      cz,
      largura: 1.15,
      profundidade: 0.85,
      altura: 2.5,
      cor: CONCRETO_ALT,
    })),
  ),

  // ── Praça dos Três Poderes: os palácios baixos que fecham a Esplanada.
  {
    tipo: 'caixa',
    cx: -4.1,
    cz: -2.5,
    largura: 1.9,
    profundidade: 1.05,
    altura: 0.95,
    cor: CONCRETO,
    rotulo: 'Palácio do Planalto',
  },
  {
    tipo: 'caixa',
    cx: 4.1,
    cz: -2.5,
    largura: 1.9,
    profundidade: 1.05,
    altura: 1.05,
    cor: CONCRETO,
    rotulo: 'Palácio do Itamaraty',
  },

  // ── Congresso Nacional: o ícone. Tabuleiro horizontal, as duas torres
  //    gêmeas da Secretaria e, sobre a laje, a tigela (Senado) e a cúpula
  //    (Câmara).
  {
    tipo: 'congresso',
    cx: 0,
    cz: -3.7,
    largura: 4.6,
    profundidade: 1.3,
    altura: 0.5,
    cor: CONCRETO,
    rotulo: 'Congresso Nacional',
  },

  // ── Catedral Metropolitana: coroa de pilares e o anel de vidro no topo.
  {
    tipo: 'catedral',
    cx: -4.3,
    cz: 1.5,
    raio: 1.05,
    altura: 2.8,
    cor: CONCRETO,
    corVidro: VIDRO,
    rotulo: 'Catedral',
  },

  // ── Museu Nacional: a cúpula branca.
  {
    tipo: 'cupula',
    cx: 4.3,
    cz: 1.6,
    raio: 1.35,
    altura: 2.1,
    cor: CONCRETO,
    rotulo: 'Museu Nacional',
  },

  // ── Torre de TV: fecha o eixo no extremo oposto ao Congresso.
  {
    tipo: 'torre',
    cx: 0,
    cz: 4.4,
    largura: 0.42,
    profundidade: 0.42,
    altura: 6.8,
    cor: CONCRETO,
    rotulo: 'Torre de TV',
  },
];

// Lago Paranoá, recuado numa das margens do plano do solo.
export const LAGO = [
  [4.8, 0, 2.6],
  [7.2, 0, 2.6],
  [7.2, 0, 5.6],
  [4.8, 0, 5.6],
];

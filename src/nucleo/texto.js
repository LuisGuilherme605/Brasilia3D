// Normalização de texto para busca: sem acento, sem caixa, sem espaço sobrando.
// Assim "brasilia" encontra "Brasília" e "itamaraty " encontra "Itamaraty".

export const normalizar = (valor) =>
  (valor ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

// Corta no limite sem partir palavra ao meio.
export function resumir(valor, limite = 110) {
  if (valor.length <= limite) return valor;
  const corte = valor.slice(0, limite);
  const espaco = corte.lastIndexOf(' ');
  const base = espaco > limite * 0.6 ? corte.slice(0, espaco) : corte;
  // Tira pontuação da ponta para não sair "1960.…".
  return `${base.replace(/[\s.,;:—-]+$/, '')}…`;
}

// Número da prancha: a posição do ponto no roteiro, como folha de um caderno de
// desenho. É o que dá a leitura de projeto aos cards e ao modal.
export const codigoPrancha = (indice) => `PL-${String(indice + 1).padStart(2, '0')}`;

// A nota vem dos dados como estrelas ('★★★★☆'). Na prancha ela vira número:
// combina com o resto dos dados e ocupa menos espaço no rodapé do card.
export const notaDeEstrelas = (estrelas) => `${[...estrelas].filter((c) => c === '★').length}/5`;

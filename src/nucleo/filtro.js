// Regra de filtragem dos pontos turísticos, isolada do DOM para poder ser testada.

import { normalizar } from './texto.js';

export const CATEGORIA_TODOS = 'todos';
export const CATEGORIA_FAVORITOS = '_favoritos';

/**
 * @param {Array<{id: number, nome: string, tag: string}>} pontos
 * @param {{categoria?: string, busca?: string, favoritos?: Set<number>}} criterios
 * @returns {number[]} ids dos pontos que devem aparecer
 */
export function filtrarPontos(pontos, { categoria = CATEGORIA_TODOS, busca = '', favoritos } = {}) {
  const termo = normalizar(busca);

  return pontos
    .filter((ponto) => {
      const categoriaOk =
        categoria === CATEGORIA_TODOS ||
        (categoria === CATEGORIA_FAVORITOS
          ? Boolean(favoritos?.has(ponto.id))
          : ponto.tag === categoria);
      const buscaOk = !termo || normalizar(ponto.nome).includes(termo);
      return categoriaOk && buscaOk;
    })
    .map((ponto) => ponto.id);
}

// Vazio quando nada foi filtrado: não faz sentido dizer '9 resultados' de 9.
export function rotuloResultados(visiveis, total) {
  if (visiveis === total) return '';
  if (visiveis === 0) return 'Nenhum ponto encontrado';
  return `${visiveis} ${visiveis === 1 ? 'resultado' : 'resultados'}`;
}

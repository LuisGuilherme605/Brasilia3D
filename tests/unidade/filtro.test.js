import { describe, it, expect } from 'vitest';
import {
  CATEGORIA_TODOS,
  CATEGORIA_FAVORITOS,
  filtrarPontos,
  rotuloResultados,
} from '../../src/nucleo/filtro.js';

const pontos = [
  { id: 0, nome: 'Congresso Nacional', tag: 'Historia' },
  { id: 1, nome: 'Catedral Metropolitana', tag: 'Cultura' },
  { id: 2, nome: 'Parque Nacional de Brasília', tag: 'Natureza' },
];

describe('filtrarPontos', () => {
  it('devolve tudo sem critério', () => {
    expect(filtrarPontos(pontos)).toEqual([0, 1, 2]);
  });

  it('filtra por categoria', () => {
    expect(filtrarPontos(pontos, { categoria: 'Cultura' })).toEqual([1]);
  });

  it('busca ignorando acento', () => {
    expect(filtrarPontos(pontos, { busca: 'brasilia' })).toEqual([2]);
  });

  it('combina categoria e busca', () => {
    expect(filtrarPontos(pontos, { categoria: 'Historia', busca: 'catedral' })).toEqual([]);
  });

  it('mostra só os favoritos quando a categoria é favoritos', () => {
    const favoritos = new Set([1, 2]);
    expect(filtrarPontos(pontos, { categoria: CATEGORIA_FAVORITOS, favoritos })).toEqual([1, 2]);
  });

  it('não quebra em favoritos sem nenhum favorito marcado', () => {
    expect(filtrarPontos(pontos, { categoria: CATEGORIA_FAVORITOS })).toEqual([]);
  });

  it('trata a categoria todos como ausência de filtro', () => {
    expect(filtrarPontos(pontos, { categoria: CATEGORIA_TODOS })).toHaveLength(3);
  });
});

describe('rotuloResultados', () => {
  it('fica vazio quando nada foi filtrado', () => {
    expect(rotuloResultados(3, 3)).toBe('');
  });

  it('usa singular e plural corretamente', () => {
    expect(rotuloResultados(1, 3)).toBe('1 resultado');
    expect(rotuloResultados(2, 3)).toBe('2 resultados');
  });

  it('avisa quando não encontrou nada', () => {
    expect(rotuloResultados(0, 3)).toBe('Nenhum ponto encontrado');
  });
});

import { describe, it, expect } from 'vitest';
import { codigoPrancha, normalizar, notaDeEstrelas, resumir } from '../../src/nucleo/texto.js';

describe('normalizar', () => {
  it('remove acentos para que a busca sem acento encontre o ponto', () => {
    expect(normalizar('Brasília')).toBe('brasilia');
    expect(normalizar('Pontão do Lago Sul')).toBe('pontao do lago sul');
  });

  it('ignora caixa e espaços nas pontas', () => {
    expect(normalizar('  ITAMARATY  ')).toBe('itamaraty');
  });

  it('trata valores ausentes sem quebrar', () => {
    expect(normalizar(null)).toBe('');
    expect(normalizar(undefined)).toBe('');
  });
});

describe('resumir', () => {
  it('devolve o texto inteiro quando cabe no limite', () => {
    expect(resumir('Congresso Nacional', 110)).toBe('Congresso Nacional');
  });

  it('corta no espaço para não partir palavra ao meio', () => {
    const resumo = resumir('Símbolo da democracia brasileira projetado por Niemeyer', 30);
    expect(resumo.endsWith('…')).toBe(true);
    expect(resumo.length).toBeLessThanOrEqual(31);
    expect(resumo).not.toContain('democracia b');
  });

  it('não deixa pontuação colada nas reticências', () => {
    const resumo = resumir('Projetado por Niemeyer e inaugurado em 1960. Fica na Esplanada', 45);
    expect(resumo).toBe('Projetado por Niemeyer e inaugurado em 1960…');
    expect(resumo).not.toMatch(/[.,;:]…$/);
  });
});

describe('codigoPrancha', () => {
  it('numera a partir de 1 com dois dígitos', () => {
    expect(codigoPrancha(0)).toBe('PL-01');
    expect(codigoPrancha(11)).toBe('PL-12');
  });
});

describe('notaDeEstrelas', () => {
  it('conta só as estrelas cheias', () => {
    expect(notaDeEstrelas('★★★★★')).toBe('5/5');
    expect(notaDeEstrelas('★★★★☆')).toBe('4/5');
  });
});

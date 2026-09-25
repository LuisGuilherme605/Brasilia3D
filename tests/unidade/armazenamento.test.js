import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { lerJSON, gravarJSON } from '../../src/nucleo/armazenamento.js';

describe('armazenamento', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('grava e lê de volta', () => {
    expect(gravarJSON('favoritos', [1, 2])).toBe(true);
    expect(lerJSON('favoritos', [])).toEqual([1, 2]);
  });

  it('devolve o padrão quando não há nada salvo', () => {
    expect(lerJSON('inexistente', 'padrao')).toBe('padrao');
  });

  it('devolve o padrão quando o conteúdo salvo está corrompido', () => {
    localStorage.setItem('favoritos', '{isso não é json');
    expect(lerJSON('favoritos', [])).toEqual([]);
  });

  it('não quebra quando o navegador bloqueia a gravação', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(gravarJSON('favoritos', [1])).toBe(false);
  });

  it('não quebra quando o navegador bloqueia a leitura', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    expect(lerJSON('favoritos', 'padrao')).toBe('padrao');
  });
});

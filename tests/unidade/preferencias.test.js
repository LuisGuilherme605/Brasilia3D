import { describe, it, expect, vi, afterEach } from 'vitest';

function mockarMatchMedia(matches) {
  const ouvintes = [];
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches,
      addEventListener: (_, fn) => ouvintes.push(fn),
    })),
  );
  return ouvintes;
}

describe('preferencias', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('reflete o movimento reduzido pedido pelo sistema', async () => {
    mockarMatchMedia(true);
    const { movimentoReduzido } = await import('../../src/nucleo/preferencias.js');
    expect(movimentoReduzido()).toBe(true);
  });

  it('assume movimento normal quando matchMedia não existe', async () => {
    vi.stubGlobal('matchMedia', undefined);
    const { movimentoReduzido, aoMudarMovimento } =
      await import('../../src/nucleo/preferencias.js');
    expect(movimentoReduzido()).toBe(false);
    expect(() => aoMudarMovimento(() => {})).not.toThrow();
  });

  it('avisa quando a preferência muda', async () => {
    const ouvintes = mockarMatchMedia(false);
    const { aoMudarMovimento } = await import('../../src/nucleo/preferencias.js');
    const callback = vi.fn();
    aoMudarMovimento(callback);
    ouvintes[0]({ matches: true });
    expect(callback).toHaveBeenCalledWith(true);
  });
});

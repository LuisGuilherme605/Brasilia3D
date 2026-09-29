import { describe, it, expect, vi, beforeEach } from 'vitest';

function simularMatchMedia() {
  const ouvintes = new Set();
  const consulta = {
    matches: false,
    addEventListener: (_, fn) => ouvintes.add(fn),
    removeEventListener: (_, fn) => ouvintes.delete(fn),
  };
  vi.stubGlobal('matchMedia', () => consulta);
  return { consulta, ouvintes };
}

describe('aoMudarMovimento', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('chama o callback quando a preferência muda', async () => {
    const { ouvintes } = simularMatchMedia();
    const { aoMudarMovimento } = await import('../../src/nucleo/preferencias.js');
    const callback = vi.fn();
    aoMudarMovimento(callback);
    ouvintes.forEach((fn) => fn({ matches: true }));
    expect(callback).toHaveBeenCalledWith(true);
  });

  it('para de avisar depois de cancelar', async () => {
    const { ouvintes } = simularMatchMedia();
    const { aoMudarMovimento } = await import('../../src/nucleo/preferencias.js');
    const cancelar = aoMudarMovimento(vi.fn());
    cancelar();
    expect(ouvintes.size).toBe(0);
  });
});

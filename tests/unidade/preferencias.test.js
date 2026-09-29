import { afterEach, describe, expect, it, vi } from 'vitest';

async function carregar(consulta) {
  vi.resetModules();
  vi.stubGlobal('matchMedia', consulta ? () => consulta : undefined);
  return import('../../src/nucleo/preferencias.js');
}

describe('preferencias', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('sem matchMedia, movimento não é reduzido e cancelar é seguro', async () => {
    const { movimentoReduzido, aoMudarMovimento } = await carregar(null);
    expect(movimentoReduzido()).toBe(false);
    expect(() => aoMudarMovimento(() => {})()).not.toThrow();
  });

  it('avisa mudanças e para de avisar depois de cancelar', async () => {
    const consulta = new EventTarget();
    consulta.matches = false;
    const { aoMudarMovimento } = await carregar(consulta);
    const callback = vi.fn();
    const cancelar = aoMudarMovimento(callback);

    consulta.dispatchEvent(Object.assign(new Event('change'), { matches: true }));
    expect(callback).toHaveBeenCalledWith(true);

    cancelar();
    consulta.dispatchEvent(Object.assign(new Event('change'), { matches: false }));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

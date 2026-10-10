import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  buscarFoto,
  ehFotoUtilizavel,
  separarFonte,
  urlResumo,
} from '../../src/nucleo/wikimedia.js';

describe('ehFotoUtilizavel', () => {
  it('aceita uma foto grande em jpg', () => {
    expect(ehFotoUtilizavel('https://x/Congresso.jpg', { width: 1200 })).toBe(true);
  });

  it('rejeita vetores', () => {
    expect(ehFotoUtilizavel('https://x/Bandeira.svg', { width: 1200 })).toBe(false);
  });

  it('rejeita logotipos, brasões e selos', () => {
    expect(ehFotoUtilizavel('https://x/Brasao_do_DF.png', { width: 900 })).toBe(false);
    expect(ehFotoUtilizavel('https://x/logo-gov.png', { width: 900 })).toBe(false);
  });

  it('reconhece brasão mesmo com o nome do arquivo codificado na url', () => {
    expect(ehFotoUtilizavel('https://x/Bras%C3%A3o_do_DF.png', { width: 900 })).toBe(false);
  });

  it('não confunde palavras que só contêm "logo" com logotipo', () => {
    expect(ehFotoUtilizavel('https://x/Catalogo_de_obras.jpg', { width: 900 })).toBe(true);
  });

  it('rejeita imagem pequena demais para ser foto', () => {
    expect(ehFotoUtilizavel('https://x/mini.jpg', { width: 120 })).toBe(false);
  });

  it('aceita quando a largura original é desconhecida', () => {
    expect(ehFotoUtilizavel('https://x/foto.jpg', undefined)).toBe(true);
  });

  it('rejeita url vazia', () => {
    expect(ehFotoUtilizavel('', { width: 900 })).toBe(false);
  });
});

describe('separarFonte', () => {
  it('separa idioma e título', () => {
    expect(separarFonte('pt:Catedral_de_Brasília')).toEqual({
      idioma: 'pt',
      titulo: 'Catedral_de_Brasília',
    });
  });

  it('mantém dois-pontos que aparecem no título', () => {
    expect(separarFonte('en:Brasilia:_A_City').titulo).toBe('Brasilia:_A_City');
  });
});

describe('urlResumo', () => {
  it('codifica o título para caber na URL', () => {
    expect(urlResumo('pt', 'Palácio do Planalto')).toBe(
      'https://pt.wikipedia.org/api/rest_v1/page/summary/Pal%C3%A1cio%20do%20Planalto',
    );
  });
});

describe('buscarFoto', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('não guarda em cache o resultado quando a rede falha', async () => {
    const fetchFalho = vi.fn().mockRejectedValue(new Error('offline'));
    vi.stubGlobal('fetch', fetchFalho);
    expect(await buscarFoto('rede-falha', ['pt:Catedral'])).toBeNull();

    const url = 'https://upload.wikimedia.org/catedral.jpg';
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue({
          ok: true,
          json: async () => ({ originalimage: { source: url, width: 1200 } }),
        }),
    );
    expect(await buscarFoto('rede-falha', ['pt:Catedral'])).toBe(url);
  });

  it('guarda em cache quando o artigo existe mas não tem foto', async () => {
    const fetchSemFoto = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal('fetch', fetchSemFoto);
    expect(await buscarFoto('sem-foto', ['pt:Nada'])).toBeNull();
    expect(await buscarFoto('sem-foto', ['pt:Nada'])).toBeNull();
    expect(fetchSemFoto).toHaveBeenCalledTimes(1);
  });
});

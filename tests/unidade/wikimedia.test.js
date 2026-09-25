import { describe, it, expect } from 'vitest';
import { ehFotoUtilizavel, separarFonte, urlResumo } from '../../src/nucleo/wikimedia.js';

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

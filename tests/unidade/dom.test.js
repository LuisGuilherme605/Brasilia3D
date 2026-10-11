import { describe, it, expect } from 'vitest';
import { criarElemento } from '../../src/nucleo/dom.js';

describe('criarElemento', () => {
  it('aplica classe, atributos e texto', () => {
    const el = criarElemento('button', {
      classe: 'botao',
      atributos: { type: 'button', 'aria-label': 'Fechar' },
      texto: 'x',
    });
    expect(el.tagName).toBe('BUTTON');
    expect(el.className).toBe('botao');
    expect(el.getAttribute('aria-label')).toBe('Fechar');
    expect(el.textContent).toBe('x');
  });

  it('texto não interpreta HTML', () => {
    const el = criarElemento('p', { texto: '<b>oi</b>' });
    expect(el.querySelector('b')).toBeNull();
  });

  it('cria o elemento vazio quando nenhuma opção é passada', () => {
    const el = criarElemento('div');
    expect(el.className).toBe('');
    expect(el.childNodes).toHaveLength(0);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { $, $$, criarElemento, prenderFoco } from '../../src/nucleo/dom.js';

describe('dom', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('criarElemento aplica classe, atributos e texto', () => {
    const el = criarElemento('button', {
      classe: 'botao',
      atributos: { type: 'button', 'aria-label': 'fechar' },
      texto: 'x',
    });
    expect(el.tagName).toBe('BUTTON');
    expect(el.className).toBe('botao');
    expect(el.getAttribute('aria-label')).toBe('fechar');
    expect(el.textContent).toBe('x');
  });

  it('criarElemento não interpreta html quando recebe só texto', () => {
    const el = criarElemento('p', { texto: '<b>oi</b>' });
    expect(el.querySelector('b')).toBeNull();
    expect(el.textContent).toBe('<b>oi</b>');
  });

  it('$ e $$ respeitam o escopo informado', () => {
    document.body.innerHTML = '<div id="a"><i></i><i></i></div><i></i>';
    const a = $('#a');
    expect($$('i', a)).toHaveLength(2);
    expect($$('i')).toHaveLength(3);
  });

  it('prenderFoco foca o container e devolve o foco ao soltar', () => {
    document.body.innerHTML = '<button id="abre">abre</button><div id="modal"></div>';
    const abre = $('#abre');
    const modal = $('#modal');
    abre.focus();

    const soltar = prenderFoco(modal);
    expect(document.activeElement).toBe(modal);
    expect(modal.getAttribute('tabindex')).toBe('-1');

    soltar();
    expect(document.activeElement).toBe(abre);
  });
});

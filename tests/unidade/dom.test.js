import { describe, it, expect, beforeEach } from 'vitest';
import { prenderFoco } from '../../src/nucleo/dom.js';

function teclar(alvo, opcoes) {
  const evento = new KeyboardEvent('keydown', {
    key: 'Tab',
    bubbles: true,
    cancelable: true,
    ...opcoes,
  });
  alvo.dispatchEvent(evento);
  return evento;
}

describe('prenderFoco', () => {
  let container;
  let a;
  let b;

  beforeEach(() => {
    document.body.innerHTML =
      '<div id="c"><button id="a">a</button><button id="b">b</button></div>';
    container = document.getElementById('c');
    a = document.getElementById('a');
    b = document.getElementById('b');
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
      configurable: true,
      get: () => document.body,
    });
  });

  it('leva o foco para o primeiro elemento ao prender', () => {
    prenderFoco(container);
    expect(document.activeElement).toBe(a);
  });

  it('volta para o primeiro ao dar Tab no último', () => {
    prenderFoco(container);
    b.focus();
    const evento = teclar(b);
    expect(evento.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(a);
  });

  it('Shift+Tab com o foco no próprio container vai para o último', () => {
    prenderFoco(container);
    container.focus();
    const evento = teclar(container, { shiftKey: true });
    expect(evento.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(b);
  });

  it('devolve o foco ao elemento anterior ao soltar', () => {
    const fora = document.createElement('button');
    document.body.append(fora);
    fora.focus();
    const soltar = prenderFoco(container);
    soltar();
    expect(document.activeElement).toBe(fora);
  });
});

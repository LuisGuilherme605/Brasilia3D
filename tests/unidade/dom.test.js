import { describe, it, expect, beforeEach } from 'vitest';
import { prenderFoco } from '../../src/nucleo/dom.js';

describe('prenderFoco', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="modal"><button id="a">a</button><button id="b">b</button></div>';
    // jsdom não faz layout, então offsetParent vem sempre null
    for (const el of document.querySelectorAll('button')) {
      Object.defineProperty(el, 'offsetParent', { get: () => document.body });
    }
  });

  it('Shift+Tab a partir do container volta para o último foco', () => {
    const modal = document.getElementById('modal');
    prenderFoco(modal);
    modal.focus();
    const evento = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    modal.dispatchEvent(evento);
    expect(evento.defaultPrevented).toBe(true);
    expect(document.activeElement.id).toBe('b');
  });
});

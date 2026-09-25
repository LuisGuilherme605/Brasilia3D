// Atalhos de DOM usados pelos módulos de interface.

export const $ = (seletor, escopo = document) => escopo.querySelector(seletor);

export const $$ = (seletor, escopo = document) => [...escopo.querySelectorAll(seletor)];

/**
 * Cria um elemento já com classe, atributos e conteúdo.
 * @param {string} tag
 * @param {{classe?: string, atributos?: Record<string, string>, html?: string, texto?: string}} opcoes
 */
export function criarElemento(tag, { classe, atributos, html, texto } = {}) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (atributos)
    for (const [chave, valor] of Object.entries(atributos)) el.setAttribute(chave, valor);
  if (html !== undefined) el.innerHTML = html;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

const SELETOR_FOCAVEL = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// Prende o foco do teclado dentro do container e devolve a função que solta o
// foco e o manda de volta pra onde estava.
export function prenderFoco(container) {
  const anterior = document.activeElement;
  const focaveis = $$(SELETOR_FOCAVEL, container).filter((el) => el.offsetParent !== null);
  const primeiro = focaveis[0] ?? container;
  const ultimo = focaveis[focaveis.length - 1] ?? container;

  if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '-1');
  primeiro.focus();

  function aoTeclar(evento) {
    if (evento.key !== 'Tab' || focaveis.length === 0) return;
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  container.addEventListener('keydown', aoTeclar);

  return () => {
    container.removeEventListener('keydown', aoTeclar);
    if (anterior instanceof HTMLElement) anterior.focus();
  };
}

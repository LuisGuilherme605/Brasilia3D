// Visualização ampliada das fotos da galeria e dos cards.

import { $ } from '../nucleo/dom.js';
import { criarDialogo } from './dialogo.js';

const CREDITO = 'Foto: Wikimedia Commons (CC BY-SA)';

let dialogo = null;

export function iniciarLightbox() {
  const caixa = $('#lightbox');
  if (!caixa) return;
  dialogo = criarDialogo(caixa);
  $('#lightbox-close')?.addEventListener('click', () => dialogo.fechar());
}

export function abrirLightbox(url, legenda) {
  if (!dialogo || !url) return;
  const img = $('#lightbox-img');
  img.src = url;
  img.alt = legenda;
  $('#lightbox-caption').textContent = legenda;
  $('#lightbox-credit').textContent = CREDITO;
  dialogo.abrir();
}

export const fecharLightbox = () => dialogo?.fechar();

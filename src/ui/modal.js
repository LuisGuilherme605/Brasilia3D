// Modal com os detalhes de um ponto turístico.

import { $ } from '../nucleo/dom.js';
import { criarDialogo } from './dialogo.js';
import { fotoEmCache } from '../nucleo/wikimedia.js';
import { codigoPrancha } from '../nucleo/texto.js';

let dialogo = null;

export function iniciarModal() {
  const overlay = $('#modal-overlay');
  if (!overlay) return;
  dialogo = criarDialogo(overlay);
  $('#modal-close')?.addEventListener('click', () => dialogo.fechar());
}

export function abrirModal(ponto, indice = 0) {
  if (!dialogo) return;

  const cabecalho = $('#modal-tag');
  cabecalho.textContent = '';
  const etiqueta = document.createElement('span');
  etiqueta.className = 'card-tag';
  etiqueta.textContent = ponto.tag;
  const prancha = document.createElement('span');
  prancha.className = 'card-plate';
  prancha.textContent = codigoPrancha(indice);
  cabecalho.append(etiqueta, prancha);
  $('#modal-title').textContent = ponto.nome;
  $('#modal-desc').textContent = ponto.desc;

  const info = $('#modal-info');
  info.textContent = '';
  for (const [rotulo, valor] of [
    ['Horário', ponto.horario],
    ['Entrada', ponto.entrada],
    ['Dica', ponto.dica],
  ]) {
    const pill = document.createElement('span');
    pill.className = 'modal-pill';
    const forte = document.createElement('strong');
    forte.textContent = rotulo;
    pill.append(forte, document.createTextNode(valor));
    info.append(pill);
  }

  // A foto só aparece se já tiver sido resolvida; sem isso o <img> ficaria
  // com src vazio e o navegador recarregaria a própria página.
  const foto = $('#modal-photo');
  const url = fotoEmCache(ponto.id);
  foto.classList.remove('loaded');
  foto.hidden = !url;
  if (url) {
    foto.alt = ponto.nome;
    // onload antes do src para não perder o evento quando a imagem já está em
    // cache (senão a foto ficaria em opacity 0).
    foto.onload = () => foto.classList.add('loaded');
    foto.src = url;
    if (foto.complete && foto.naturalWidth > 0) foto.classList.add('loaded');
  } else {
    foto.removeAttribute('src');
  }

  dialogo.abrir();
}

export const fecharModal = () => dialogo?.fechar();

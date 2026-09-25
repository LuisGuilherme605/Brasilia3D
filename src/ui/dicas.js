// Cards de dicas de viagem.

import { $, criarElemento } from '../nucleo/dom.js';

export function iniciarDicas(dicas) {
  const container = $('#dicas-container');
  if (!container) return;

  const fragmento = document.createDocumentFragment();
  dicas.forEach((dica, indice) => {
    const card = criarElemento('article', { classe: 'dica-card reveal' });
    card.style.transitionDelay = `${indice * 0.05}s`;
    card.innerHTML = '<h3></h3><p></p>';
    card.querySelector('h3').textContent = dica.title;
    card.querySelector('p').textContent = dica.text;
    fragmento.append(card);
  });
  container.append(fragmento);
}

// Grade de cards dos pontos turísticos, com favoritos, filtro e busca.

import { $, criarElemento } from '../nucleo/dom.js';
import { codigoPrancha, notaDeEstrelas, resumir } from '../nucleo/texto.js';
import { buscarFoto, fotoEmCache } from '../nucleo/wikimedia.js';
import {
  CATEGORIA_TODOS,
  CATEGORIA_FAVORITOS,
  filtrarPontos,
  rotuloResultados,
} from '../nucleo/filtro.js';
import { alternarFavorito, aoMudarFavoritos, ehFavorito } from './favoritos.js';
import { abrirModal } from './modal.js';
import { abrirLightbox } from './lightbox.js';

let estado = { categoria: CATEGORIA_TODOS, busca: '' };
let pontosRef = [];
let favoritosRef = new Set();

function montarCard(ponto, indice) {
  const card = criarElemento('article', {
    classe: 'card reveal',
    atributos: { 'data-id': String(ponto.id) },
  });
  card.style.transitionDelay = `${indice * 0.06}s`;

  const favorito = ehFavorito(ponto.id);
  card.innerHTML = `
    <div class="card-photo">
      <div class="photo-skeleton"></div>
      <img class="card-real-img" alt="" loading="lazy" decoding="async">
      <div class="card-art" aria-hidden="true">${ponto.svg}</div>
      <div class="photo-credit">Wikimedia Commons · CC BY-SA</div>
      <button class="fav-btn${favorito ? ' favorited' : ''}" type="button"
              aria-pressed="${favorito}" aria-label="Favoritar ${ponto.nome}">${favorito ? '♥' : '♡'}</button>
    </div>
    <div class="card-body">
      <span class="card-tag">${ponto.tag}</span>
      <h3><button type="button" class="card-abrir"></button></h3>
      <p></p>
    </div>
    <div class="card-footer">
      <span class="card-meta">
        <span class="card-plate">${codigoPrancha(indice)}</span>
        <span class="card-horario"></span>
      </span>
      <span class="rating">Nota ${notaDeEstrelas(ponto.rating)}</span>
    </div>`;

  const abrir = card.querySelector('.card-abrir');
  abrir.textContent = ponto.nome;
  abrir.setAttribute('aria-label', `Ver detalhes de ${ponto.nome}`);
  card.querySelector('.card-body p').textContent = resumir(ponto.desc);
  card.querySelector('.card-horario').textContent = ponto.horario;

  const botaoFavorito = card.querySelector('.fav-btn');
  botaoFavorito.addEventListener('click', (evento) => {
    evento.stopPropagation();
    const ativo = alternarFavorito(ponto.id);
    botaoFavorito.classList.toggle('favorited', ativo);
    botaoFavorito.textContent = ativo ? '♥' : '♡';
    botaoFavorito.setAttribute('aria-pressed', String(ativo));
  });

  card.querySelector('.card-photo').addEventListener('click', (evento) => {
    if (evento.target.closest('.fav-btn')) return;
    evento.stopPropagation();
    const url = fotoEmCache(ponto.id);
    if (url) abrirLightbox(url, ponto.nome);
    else abrirModal(ponto, indice);
  });

  // O título é o controle acessível (foco por teclado abre o modal); o clique
  // no card inteiro é um atalho extra para mouse.
  abrir.addEventListener('click', (evento) => {
    evento.stopPropagation();
    abrirModal(ponto, indice);
  });
  card.addEventListener('click', () => abrirModal(ponto, indice));

  buscarFoto(ponto.id, ponto.wikis).then((url) => {
    const esqueleto = card.querySelector('.photo-skeleton');
    if (!url) {
      esqueleto?.remove();
      return;
    }
    const img = card.querySelector('.card-real-img');
    img.alt = ponto.nome;
    // O onload precisa ser ligado antes do src: com a imagem em cache o load
    // dispara na hora e, ligando depois, a foto ficaria presa em opacity 0.
    const mostrar = () => {
      img.classList.add('loaded');
      card.querySelector('.card-art')?.classList.add('hidden');
      esqueleto?.remove();
    };
    img.onload = mostrar;
    img.onerror = () => esqueleto?.remove();
    img.src = url;
    if (img.complete && img.naturalWidth > 0) mostrar();
  });

  return card;
}

function aplicarFiltros() {
  const visiveis = new Set(filtrarPontos(pontosRef, { ...estado, favoritos: favoritosRef }));
  for (const card of document.querySelectorAll('#cards-container .card')) {
    card.classList.toggle('hidden', !visiveis.has(Number(card.dataset.id)));
  }
  const contador = $('#results-count');
  if (contador) contador.textContent = rotuloResultados(visiveis.size, pontosRef.length);
}

function marcarBotaoAtivo(alvo) {
  for (const botao of document.querySelectorAll('.filter-btn')) {
    const ativo = botao === alvo;
    botao.classList.toggle('active', ativo);
    botao.setAttribute('aria-pressed', String(ativo));
  }
}

export function iniciarCards(pontos) {
  const container = $('#cards-container');
  if (!container) return;

  pontosRef = pontos;
  const fragmento = document.createDocumentFragment();
  pontos.forEach((ponto, indice) => fragmento.append(montarCard(ponto, indice)));
  container.append(fragmento);

  for (const botao of document.querySelectorAll('.filter-btn')) {
    botao.addEventListener('click', () => {
      estado = { ...estado, categoria: botao.dataset.cat };
      marcarBotaoAtivo(botao);
      aplicarFiltros();
    });
  }

  $('#search-input')?.addEventListener('input', (evento) => {
    estado = { ...estado, busca: evento.target.value };
    aplicarFiltros();
  });

  aoMudarFavoritos(() => {
    favoritosRef = new Set(pontos.filter((ponto) => ehFavorito(ponto.id)).map((ponto) => ponto.id));
    if (estado.categoria === CATEGORIA_FAVORITOS) aplicarFiltros();
  });
}

// Alterna entre a lista completa e só os favoritos.
export function alternarFiltroFavoritos() {
  if (estado.categoria === CATEGORIA_FAVORITOS) {
    const todos = document.querySelector(`.filter-btn[data-cat="${CATEGORIA_TODOS}"]`);
    estado = { ...estado, categoria: CATEGORIA_TODOS };
    marcarBotaoAtivo(todos);
  } else {
    estado = { ...estado, categoria: CATEGORIA_FAVORITOS };
    marcarBotaoAtivo(null);
    $('#pontos')?.scrollIntoView({ behavior: 'smooth' });
  }
  aplicarFiltros();
}

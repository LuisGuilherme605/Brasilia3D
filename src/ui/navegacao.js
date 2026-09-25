// Navegação: menu mobile, barra de progresso, botão de voltar ao topo,
// revelação das seções ao rolar e o atalho de favoritos.

import { $, $$ } from '../nucleo/dom.js';
import { movimentoReduzido } from '../nucleo/preferencias.js';
import { aoMudarFavoritos } from './favoritos.js';
import { alternarFiltroFavoritos } from './cards.js';
import { fecharDialogoAtivo } from './dialogo.js';

const ROLAGEM_PARA_TOPO = 500;

function iniciarMenuMobile() {
  const botao = $('#hamburger');
  const menu = $('#mobile-menu');
  if (!botao || !menu) return () => {};

  const fechar = () => {
    botao.classList.remove('open');
    menu.classList.remove('open');
    botao.setAttribute('aria-expanded', 'false');
  };

  botao.addEventListener('click', () => {
    const aberto = botao.classList.toggle('open');
    menu.classList.toggle('open', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
  });

  for (const link of $$('a', menu)) link.addEventListener('click', fechar);

  return fechar;
}

function iniciarRolagem() {
  const barra = $('#progress-bar');
  const topo = $('#back-to-top');

  window.addEventListener(
    'scroll',
    () => {
      const posicao = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (barra) barra.style.width = total > 0 ? `${(posicao / total) * 100}%` : '0%';
      topo?.classList.toggle('visible', posicao > ROLAGEM_PARA_TOPO);
    },
    { passive: true },
  );

  topo?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: movimentoReduzido() ? 'auto' : 'smooth' });
  });
}

function iniciarRevelacao() {
  const alvos = $$('.reveal');
  if (movimentoReduzido() || !('IntersectionObserver' in window)) {
    for (const alvo of alvos) alvo.classList.add('visible');
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
  );

  for (const alvo of alvos) observador.observe(alvo);
}

function iniciarAtalhoFavoritos() {
  const atalho = $('#nav-fav');
  const contador = $('#fav-nav-count');
  const atalhoMobile = $('#mobile-fav');

  const acionar = (evento) => {
    evento.preventDefault();
    alternarFiltroFavoritos();
  };

  atalho?.addEventListener('click', acionar);
  atalhoMobile?.addEventListener('click', acionar);

  aoMudarFavoritos((total) => {
    if (contador) contador.textContent = String(total);
    if (atalho) atalho.hidden = total === 0;
  });
}

export function iniciarNavegacao() {
  const fecharMenu = iniciarMenuMobile();
  iniciarRolagem();
  iniciarRevelacao();
  iniciarAtalhoFavoritos();

  document.addEventListener('keydown', (evento) => {
    if (evento.key !== 'Escape') return;
    fecharDialogoAtivo();
    fecharMenu();
  });
}

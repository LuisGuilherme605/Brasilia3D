// Comportamento comum ao modal de ponto turístico e ao lightbox da galeria:
// abre, prende o foco, fecha no Esc ou no clique fora e devolve o foco.

import { prenderFoco } from '../nucleo/dom.js';

let aberto = null;

export function criarDialogo(elemento) {
  let soltarFoco = null;

  const controle = {
    abrir() {
      if (aberto && aberto !== controle) aberto.fechar();
      elemento.classList.add('open');
      document.body.classList.add('sem-rolagem');
      soltarFoco = prenderFoco(elemento);
      aberto = controle;
    },
    fechar() {
      if (!elemento.classList.contains('open')) return;
      elemento.classList.remove('open');
      document.body.classList.remove('sem-rolagem');
      soltarFoco?.();
      soltarFoco = null;
      if (aberto === controle) aberto = null;
    },
    estaAberto: () => elemento.classList.contains('open'),
  };

  elemento.addEventListener('click', (evento) => {
    if (evento.target === evento.currentTarget) controle.fechar();
  });

  return controle;
}

// Fecha o diálogo aberto, se houver.
export const fecharDialogoAtivo = () => aberto?.fechar();

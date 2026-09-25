import { pontos } from '../dados/pontos.js';
import { $ } from '../nucleo/dom.js';
import { buscarFoto } from '../nucleo/wikimedia.js';
import { movimentoReduzido } from '../nucleo/preferencias.js';

const DESTAQUES = [0, 1, 6, 5, 8, 2];

function formatarNumero(n) {
  return String(n + 1).padStart(2, '0');
}

function criarCena(ponto, indice) {
  const div = document.createElement('div');
  div.className = 'jornada-cena';
  div.setAttribute('aria-hidden', 'true');

  div.innerHTML =
    `<div class="jornada-fundo">` +
      `<img class="jornada-img" alt="${ponto.nome}" draggable="false" />` +
      `<div class="jornada-overlay"></div>` +
    `</div>` +
    `<div class="jornada-texto">` +
      `<span class="jornada-numero">${formatarNumero(indice)}</span>` +
      `<span class="jornada-cat">${ponto.tag}</span>` +
      `<h3 class="jornada-nome">${ponto.nome}</h3>` +
      `<p class="jornada-desc">${ponto.desc.split('.')[0]}.</p>` +
      `<span class="jornada-info">${ponto.horario} · ${ponto.entrada}</span>` +
    `</div>`;

  return div;
}

function aplicarTransformacao(cena, estado) {
  const { opacidade, escala, translateY, translateZ, rotateX, textoVisivel } = estado;
  cena.style.opacity = opacidade;
  cena.style.transform =
    `perspective(1200px) translateZ(${translateZ}px) translateY(${translateY}px) ` +
    `rotateX(${rotateX}deg) scale(${escala})`;
  cena.style.pointerEvents = textoVisivel > 0.5 ? 'auto' : 'none';

  const img = cena.querySelector('.jornada-img');
  if (img) {
    const parallax = -translateY * 0.3;
    img.style.transform = `scale(1.15) translate3d(0, ${parallax}px, 0)`;
  }

  const texto = cena.querySelector('.jornada-texto');
  if (texto) {
    texto.style.opacity = textoVisivel;
    const deslocamento = (1 - textoVisivel) * 30;
    texto.style.transform = `translateY(${deslocamento}px)`;
  }
}

export function iniciarJornada() {
  const secao = $('#jornada');
  if (!secao) return;

  const viewport = secao.querySelector('.jornada-viewport');
  if (!viewport) return;

  const cenas = [];
  const totalCenas = DESTAQUES.length;

  DESTAQUES.forEach((idx, i) => {
    const ponto = pontos[idx];
    const cena = criarCena(ponto, i);
    viewport.appendChild(cena);
    cenas.push(cena);

    buscarFoto(`jornada-${ponto.id}`, ponto.wikis).then(url => {
      if (!url) return;
      const img = cena.querySelector('.jornada-img');
      if (!img) return;
      img.src = url;
      img.addEventListener('load', () => img.classList.add('carregada'), { once: true });
    });
  });

  const indicadores = secao.querySelector('.jornada-dots');
  if (indicadores) {
    for (let i = 0; i < totalCenas; i++) {
      const dot = document.createElement('button');
      dot.className = 'jornada-dot';
      dot.setAttribute('aria-label', pontos[DESTAQUES[i]].nome);
      dot.type = 'button';
      indicadores.appendChild(dot);
    }
  }
  const dots = indicadores ? [...indicadores.querySelectorAll('.jornada-dot')] : [];

  if (movimentoReduzido()) {
    cenas.forEach((c, i) => {
      aplicarTransformacao(c, {
        opacidade: i === 0 ? 1 : 0,
        escala: 1,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        textoVisivel: i === 0 ? 1 : 0,
      });
    });
    return;
  }

  const barra = secao.querySelector('.jornada-barra');
  const nav = document.querySelector('nav');
  let ultimaCena = -1;

  function atualizar() {
    const rect = secao.getBoundingClientRect();
    const visivel = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
    if (barra) barra.classList.toggle('visivel', visivel);
    if (nav) nav.classList.toggle('nav-escura', rect.top < 60 && rect.bottom > 60);
    const alturaTotalScroll = secao.offsetHeight - window.innerHeight;
    if (alturaTotalScroll <= 0) return;

    const scrolled = Math.max(0, -rect.top);
    const progresso = Math.min(scrolled / alturaTotalScroll, 1) * totalCenas;
    const cenaAtual = Math.min(Math.floor(progresso), totalCenas - 1);
    const t = progresso - cenaAtual;

    if (cenaAtual !== ultimaCena) {
      ultimaCena = cenaAtual;
      cenas.forEach((c, i) => c.setAttribute('aria-hidden', i !== cenaAtual ? 'true' : 'false'));
      dots.forEach((d, i) => d.classList.toggle('ativo', i === cenaAtual));
    }

    const contadorEl = secao.querySelector('.jornada-contador');
    if (contadorEl) contadorEl.textContent = `${formatarNumero(cenaAtual)} / ${formatarNumero(totalCenas - 1)}`;

    cenas.forEach((cena, i) => {
      if (i === cenaAtual) {
        const textoSaindo = t < 0.5 ? 1 : t < 0.72 ? 1 - (t - 0.5) / 0.22 : 0;
        aplicarTransformacao(cena, {
          opacidade: 1 - t * 0.9,
          escala: 1 + t * 0.08,
          translateY: t * -60,
          translateZ: t * 150,
          rotateX: t * 2,
          textoVisivel: textoSaindo,
        });
        cena.style.zIndex = String(totalCenas - i);
      } else if (i === cenaAtual + 1) {
        const textoEntrando = t < 0.78 ? 0 : Math.min(1, (t - 0.78) / 0.2);
        aplicarTransformacao(cena, {
          opacidade: 0.2 + t * 0.8,
          escala: 0.92 + t * 0.08,
          translateY: (1 - t) * 60,
          translateZ: (1 - t) * -200,
          rotateX: (1 - t) * -3,
          textoVisivel: textoEntrando,
        });
        cena.style.zIndex = String(totalCenas - i);
      } else {
        aplicarTransformacao(cena, {
          opacidade: 0,
          escala: i < cenaAtual ? 1.08 : 0.92,
          translateY: 0,
          translateZ: i < cenaAtual ? 150 : -200,
          rotateX: 0,
          textoVisivel: 0,
        });
        cena.style.zIndex = '0';
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      atualizar();
      ticking = false;
    });
  }, { passive: true });

  atualizar();
}

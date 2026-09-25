// Maquete 3D do Plano Piloto desenhada no canvas 2D, com ordenação de faces
// pelo algoritmo do pintor. É uma maquete branca sobre a prancha, não uma
// cidade noturna: concreto, sombra de contato e rótulos de chamada. O laço só
// roda quando a maquete está visível na tela e a aba está em primeiro plano.

import { $ } from '../nucleo/dom.js';
import { movimentoReduzido } from '../nucleo/preferencias.js';
import { focalPara, projetar, tonalizar } from './projecao.js';
import { criarFormas } from './formas.js';
import { MONUMENTOS, LAGO } from './cidade.js';

const ROTACAO_INICIAL = 0.32;
const VELOCIDADE_AUTOMATICA = 0.0022;
const SENSIBILIDADE_ARRASTE = 0.006;
const PASSO_TECLADO = 0.12;

// Altura do apex de cada tipo, em unidades de mundo, onde o rótulo se prende.
const APICE = {
  congresso: (m) => m.altura + 6.3,
  torre: (m) => m.altura + 1.5,
  cupula: (m) => m.altura * 0.9 + m.raio * 0.5 + 0.3,
  catedral: (m) => m.altura + 0.35,
  caixa: (m) => m.altura + 0.35,
};

export function iniciarSkyline() {
  const canvas = $('#city-canvas');
  const moldura = $('#city-canvas-wrapper');
  if (!canvas || !moldura) return;

  const ctx = canvas.getContext('2d');
  const camera = { largura: 0, altura: 0, rotacao: ROTACAO_INICIAL, focal: 0 };
  const formas = criarFormas(ctx, camera);
  const proj = (x, y, z) => projetar(camera, x, y, z);

  let rotacaoAutomatica = !movimentoReduzido();
  let arrastando = false;
  let ultimoX = 0;
  let quadro = null;
  let visivel = true;

  // O canvas é ampliado pela densidade de pixels da tela e reduzido de volta
  // pelo CSS — sem isso a maquete fica borrada em telas retina.
  function redimensionar() {
    const densidade = Math.min(window.devicePixelRatio || 1, 2);
    camera.largura = moldura.clientWidth;
    camera.altura = moldura.clientHeight;
    camera.focal = focalPara(camera.altura);
    canvas.width = Math.round(camera.largura * densidade);
    canvas.height = Math.round(camera.altura * densidade);
    canvas.style.width = `${camera.largura}px`;
    canvas.style.height = `${camera.altura}px`;
    ctx.setTransform(densidade, 0, 0, densidade, 0, 0);
    if (!quadro) desenhar();
  }

  function montarFaces() {
    const faces = [];
    for (const m of MONUMENTOS) {
      if (m.tipo === 'caixa') {
        faces.push(...formas.caixa(m.cx, m.cz, m.largura, m.profundidade, m.altura, m.cor));
      } else if (m.tipo === 'congresso') {
        // Tabuleiro horizontal.
        faces.push(...formas.caixa(m.cx, m.cz, m.largura, m.profundidade, m.altura, m.cor));
        // Torres gêmeas da Secretaria, sobre a laje.
        const t = m.altura;
        faces.push(...formas.caixa(m.cx - 0.34, m.cz, 0.42, 0.78, 5.2, m.cor, t));
        faces.push(...formas.caixa(m.cx + 0.34, m.cz, 0.42, 0.78, 5.2, m.cor, t));
        // Tigela do Senado (côncava) e cúpula da Câmara (convexa).
        faces.push(formas.tigela(m.cx - m.largura * 0.32, t + 0.02, m.cz, 0.92, m.cor));
        faces.push(formas.cupula(m.cx + m.largura * 0.32, t + 0.06, m.cz, 1.02, m.cor));
      } else if (m.tipo === 'torre') {
        const l = m.largura;
        // Base, fuste, mirante alargado e ponta antes do mastro.
        faces.push(...formas.caixa(m.cx, m.cz, l * 3.0, l * 3.0, 0.12, tonalizar(m.cor, 0.9)));
        faces.push(...formas.caixa(m.cx, m.cz, l, l, m.altura * 0.62, tonalizar(m.cor, 0.96)));
        faces.push(
          ...formas.caixa(m.cx, m.cz, l * 3.6, l * 1.5, m.altura * 0.09, m.cor, m.altura * 0.6),
        );
        faces.push(
          ...formas.caixa(
            m.cx,
            m.cz,
            l * 0.7,
            l * 0.7,
            m.altura * 0.29,
            tonalizar(m.cor, 0.96),
            m.altura * 0.69,
          ),
        );
      } else if (m.tipo === 'cupula') {
        faces.push(
          ...formas.caixa(m.cx, m.cz, m.raio * 0.7, m.raio * 0.7, 0.22, tonalizar(m.cor, 0.9)),
        );
        faces.push(formas.cupula(m.cx, m.altura * 0.9, m.cz, m.raio, m.cor));
      } else if (m.tipo === 'catedral') {
        faces.push(formas.disco(m.cx, 0.02, m.cz, m.raio * 1.2, tonalizar(m.cor, 0.88)));
        for (let i = 0; i < 16; i += 1) {
          const angulo = (i / 16) * Math.PI * 2;
          const px = m.cx + Math.cos(angulo) * m.raio * 0.82;
          const pz = m.cz + Math.sin(angulo) * m.raio * 0.82;
          faces.push(...formas.caixa(px, pz, 0.13, 0.13, m.altura, m.cor));
        }
        // Anel de vidro no topo, único toque de cor teal.
        faces.push(formas.disco(m.cx, m.altura * 0.9, m.cz, m.raio * 0.32, m.corVidro));
      }
    }
    return faces;
  }

  function desenharCeu() {
    const { largura: W, altura: H } = camera;
    const ceu = ctx.createLinearGradient(0, 0, 0, H);
    ceu.addColorStop(0, '#eef0ec');
    ceu.addColorStop(0.62, '#e7e8e2');
    ceu.addColorStop(1, '#dedfd8');
    ctx.fillStyle = ceu;
    ctx.fillRect(0, 0, W, H);
  }

  // O modelo assenta sobre uma poça de concreto suave (sem borda dura) com a
  // malha da prancha esmaecendo com a distância — a mesma leitura de papel
  // vegetal do resto do site, sem virar um tabuleiro recortado.
  function desenharSolo() {
    const { largura: W, altura: H } = camera;

    const pool = ctx.createRadialGradient(W * 0.5, H * 0.52, W * 0.05, W * 0.5, H * 0.52, W * 0.52);
    pool.addColorStop(0, 'rgba(214, 216, 208, 0.92)');
    pool.addColorStop(0.55, 'rgba(214, 216, 208, 0.6)');
    pool.addColorStop(1, 'rgba(214, 216, 208, 0)');
    ctx.fillStyle = pool;
    ctx.fillRect(0, 0, W, H);

    const malha = ctx.createLinearGradient(0, H * 0.12, 0, H);
    malha.addColorStop(0, 'rgba(16, 22, 31, 0)');
    malha.addColorStop(0.45, 'rgba(16, 22, 31, 0.05)');
    malha.addColorStop(1, 'rgba(16, 22, 31, 0.12)');
    ctx.strokeStyle = malha;
    ctx.lineWidth = 0.6;
    for (let x = -9; x <= 9; x += 1.75) {
      const a = proj(x, 0, -5);
      const b = proj(x, 0, 7.5);
      if (!a || !b) continue;
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.stroke();
    }
    for (let z = -5; z <= 7.5; z += 1.75) {
      const a = proj(-9, 0, z);
      const b = proj(9, 0, z);
      if (!a || !b) continue;
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy);
      ctx.lineTo(b.sx, b.sy);
      ctx.stroke();
    }
  }

  function desenharLago() {
    const cantos = LAGO.map(([x, y, z]) => proj(x, y, z));
    if (!cantos.every(Boolean)) return;
    ctx.beginPath();
    ctx.moveTo(cantos[0].sx, cantos[0].sy);
    for (const p of cantos) ctx.lineTo(p.sx, p.sy);
    ctx.closePath();
    ctx.fillStyle = 'rgba(15, 109, 106, 0.18)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(15, 109, 106, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Sombra de contato: uma mancha macia sob cada volume para a maquete assentar
  // no chão em vez de flutuar.
  function desenharSombras() {
    ctx.save();
    for (const m of MONUMENTOS) {
      const raio = m.raio ? m.raio * 1.4 : Math.max(m.largura, m.profundidade) * 0.9;
      const centro = proj(m.cx, 0, m.cz);
      const extremo = proj(m.cx + raio, 0, m.cz);
      if (!centro || !extremo) continue;
      const rx = Math.abs(extremo.sx - centro.sx);
      const g = ctx.createRadialGradient(centro.sx, centro.sy, 0, centro.sx, centro.sy, rx);
      g.addColorStop(0, 'rgba(16, 22, 31, 0.22)');
      g.addColorStop(1, 'rgba(16, 22, 31, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(centro.sx, centro.sy, Math.max(1, rx), Math.max(1, rx * 0.42), 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function desenharMastro() {
    const torre = MONUMENTOS.find((m) => m.tipo === 'torre');
    if (!torre) return;
    const base = proj(torre.cx, torre.altura, torre.cz);
    const topo = proj(torre.cx, torre.altura + 1.35, torre.cz);
    if (!base || !topo) return;
    ctx.beginPath();
    ctx.moveTo(base.sx, base.sy);
    ctx.lineTo(topo.sx, topo.sy);
    ctx.strokeStyle = 'rgba(16, 22, 31, 0.55)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.fillStyle = '#0f6d6a';
    ctx.beginPath();
    ctx.arc(topo.sx, topo.sy, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rótulos de chamada: uma etiqueta de tinta sobre papel, ligada ao topo do
  // monumento por um fio. As etiquetas são empilhadas para nunca se sobreporem.
  function desenharRotulos() {
    ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.textBaseline = 'middle';

    const alvos = [];
    for (const m of MONUMENTOS) {
      if (!m.rotulo) continue;
      const y = (APICE[m.tipo] ?? APICE.caixa)(m);
      const p = proj(m.cx, y, m.cz);
      if (!p) continue;
      alvos.push({ texto: m.rotulo, ax: p.sx, ay: p.sy });
    }
    alvos.sort((a, b) => a.ay - b.ay);

    const alturaLinha = 20;
    const colocados = [];
    for (const alvo of alvos) {
      const largura = ctx.measureText(alvo.texto).width + 16;
      let cx = alvo.ax;
      let cy = alvo.ay - 26;
      cx = Math.max(largura / 2 + 6, Math.min(camera.largura - largura / 2 - 6, cx));
      // Empurra para cima enquanto colidir com uma etiqueta já colocada.
      let seguro = false;
      let tentativas = 0;
      while (!seguro && tentativas < 40) {
        seguro = true;
        for (const c of colocados) {
          if (
            Math.abs(cy - c.cy) < alturaLinha &&
            Math.abs(cx - c.cx) < (largura + c.largura) / 2 + 4
          ) {
            cy = c.cy - alturaLinha;
            seguro = false;
            break;
          }
        }
        tentativas += 1;
      }
      cy = Math.max(11, cy);
      colocados.push({ ...alvo, cx, cy, largura });
    }

    for (const c of colocados) {
      // Fio de chamada do topo do monumento até a etiqueta.
      ctx.beginPath();
      ctx.moveTo(c.ax, c.ay);
      ctx.lineTo(c.cx, c.cy + 8);
      ctx.strokeStyle = 'rgba(16, 22, 31, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#0f6d6a';
      ctx.beginPath();
      ctx.arc(c.ax, c.ay, 2, 0, Math.PI * 2);
      ctx.fill();

      // Etiqueta.
      const h = 16;
      ctx.fillStyle = 'rgba(242, 242, 238, 0.94)';
      ctx.strokeStyle = 'rgba(16, 22, 31, 0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(c.cx - c.largura / 2, c.cy - h / 2, c.largura, h);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#10161f';
      ctx.textAlign = 'center';
      ctx.fillText(c.texto, c.cx, c.cy + 0.5);
    }
  }

  function desenhar() {
    ctx.clearRect(0, 0, camera.largura, camera.altura);
    desenharCeu();
    desenharSolo();
    desenharLago();
    desenharSombras();

    const faces = montarFaces().sort((a, b) => b.profundidade - a.profundidade);
    for (const face of faces) face.desenhar();

    desenharMastro();
    desenharRotulos();
  }

  function laco() {
    desenhar();
    if (rotacaoAutomatica) camera.rotacao += VELOCIDADE_AUTOMATICA;
    quadro = requestAnimationFrame(laco);
  }

  function retomar() {
    if (quadro === null) quadro = requestAnimationFrame(laco);
  }

  function pausar() {
    if (quadro === null) return;
    cancelAnimationFrame(quadro);
    quadro = null;
  }

  function girar(delta) {
    camera.rotacao += delta;
    if (quadro === null) desenhar();
  }

  canvas.addEventListener('pointerdown', (evento) => {
    arrastando = true;
    rotacaoAutomatica = false;
    ultimoX = evento.clientX;
    canvas.setPointerCapture(evento.pointerId);
  });
  canvas.addEventListener('pointermove', (evento) => {
    if (!arrastando) return;
    girar((evento.clientX - ultimoX) * SENSIBILIDADE_ARRASTE);
    ultimoX = evento.clientX;
  });
  const soltar = () => {
    arrastando = false;
    rotacaoAutomatica = !movimentoReduzido();
  };
  canvas.addEventListener('pointerup', soltar);
  canvas.addEventListener('pointercancel', soltar);

  canvas.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') girar(-PASSO_TECLADO);
    else if (evento.key === 'ArrowRight') girar(PASSO_TECLADO);
    else return;
    evento.preventDefault();
    rotacaoAutomatica = false;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden || !visivel) pausar();
    else retomar();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;
        if (visivel && !document.hidden) retomar();
        else pausar();
      },
      { threshold: 0.01 },
    ).observe(moldura);
  }

  new ResizeObserver(redimensionar).observe(moldura);
  redimensionar();

  if (movimentoReduzido()) desenhar();
  else retomar();
}

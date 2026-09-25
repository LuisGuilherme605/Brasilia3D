// Construção das faces desenhadas no canvas. Cada face guarda sua profundidade
// para que o desenhista possa ordená-las de trás para frente (pintor). O modelo
// é de concreto: o relevo vem do sombreado das faces, com um fio de tinta na
// aresta para a leitura de maquete.

import { projetar, profundidadeFace, tonalizar } from './projecao.js';

const BORDA = 'rgba(16, 22, 31, 0.28)';

export function criarFormas(ctx, camera) {
  const proj = (x, y, z) => projetar(camera, x, y, z);
  const profundidade = (pontos) => profundidadeFace(camera, pontos);

  function poligono(pontos, preenchimento, borda) {
    const tela = pontos.map(([x, y, z]) => proj(x, y, z));
    if (tela.some((p) => !p)) return;
    ctx.beginPath();
    ctx.moveTo(tela[0].sx, tela[0].sy);
    for (let i = 1; i < tela.length; i += 1) ctx.lineTo(tela[i].sx, tela[i].sy);
    ctx.closePath();
    ctx.fillStyle = preenchimento;
    ctx.fill();
    if (!borda) return;
    ctx.strokeStyle = borda;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }

  // Cinco faces visíveis do paralelepípedo, cada uma com seu tom. O topo é o
  // mais claro; as laterais escurecem para dar volume ao concreto.
  function caixa(cx, cz, largura, profundidadeCaixa, altura, cor, base = 0) {
    const x1 = cx - largura / 2;
    const x2 = cx + largura / 2;
    const z1 = cz - profundidadeCaixa / 2;
    const z2 = cz + profundidadeCaixa / 2;
    const y0 = base;
    const y1 = base + altura;

    return [
      {
        pts: [
          [x1, y1, z1],
          [x2, y1, z1],
          [x2, y1, z2],
          [x1, y1, z2],
        ],
        tom: 1.0,
      },
      {
        pts: [
          [x1, y0, z1],
          [x2, y0, z1],
          [x2, y1, z1],
          [x1, y1, z1],
        ],
        tom: 0.82,
      },
      {
        pts: [
          [x1, y0, z2],
          [x2, y0, z2],
          [x2, y1, z2],
          [x1, y1, z2],
        ],
        tom: 0.66,
      },
      {
        pts: [
          [x1, y0, z1],
          [x1, y0, z2],
          [x1, y1, z2],
          [x1, y1, z1],
        ],
        tom: 0.74,
      },
      {
        pts: [
          [x2, y0, z1],
          [x2, y0, z2],
          [x2, y1, z2],
          [x2, y1, z1],
        ],
        tom: 0.78,
      },
    ].map(({ pts, tom }) => ({
      profundidade: profundidade(pts),
      desenhar: () => poligono(pts, tonalizar(cor, tom), BORDA),
    }));
  }

  // Disco horizontal aproximado por um polígono de N lados.
  function disco(cx, y, cz, raio, cor, lados = 28) {
    const pts = Array.from({ length: lados }, (_, i) => {
      const angulo = (i / lados) * Math.PI * 2;
      return [cx + Math.cos(angulo) * raio, y, cz + Math.sin(angulo) * raio];
    });
    return {
      profundidade: profundidade(pts),
      desenhar: () => poligono(pts, cor, tonalizar(cor, 0.7)),
    };
  }

  // Elipse com gradiente: as cúpulas do Congresso e do Museu.
  function elipseSombreada(cx, y, cz, raio, cor, { proporcaoY, paradas }) {
    const cantos = [
      [cx - raio, y, cz - raio],
      [cx + raio, y, cz - raio],
      [cx + raio, y, cz + raio],
      [cx - raio, y, cz + raio],
    ];
    return {
      profundidade: profundidade(cantos),
      desenhar() {
        const centro = proj(cx, y, cz);
        const extremo = proj(cx + raio, y, cz);
        if (!centro || !extremo) return;
        const rx = Math.abs(extremo.sx - centro.sx);
        const ry = rx * proporcaoY;
        const gradiente = paradas(ctx, centro, rx, ry);
        ctx.beginPath();
        ctx.ellipse(centro.sx, centro.sy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2);
        ctx.fillStyle = gradiente;
        ctx.fill();
        ctx.strokeStyle = BORDA;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      },
    };
  }

  // Cúpula convexa: Câmara dos Deputados / Museu Nacional.
  const cupula = (cx, y, cz, raio, cor) =>
    elipseSombreada(cx, y, cz, raio, cor, {
      proporcaoY: 0.5,
      paradas: (contexto, centro, rx, ry) => {
        const g = contexto.createRadialGradient(
          centro.sx - rx * 0.28,
          centro.sy - ry * 0.55,
          rx * 0.1,
          centro.sx,
          centro.sy,
          rx * 1.15,
        );
        g.addColorStop(0, tonalizar(cor, 1.05));
        g.addColorStop(0.55, tonalizar(cor, 0.86));
        g.addColorStop(1, tonalizar(cor, 0.6));
        return g;
      },
    });

  // Cúpula côncava: Senado Federal.
  const tigela = (cx, y, cz, raio, cor) =>
    elipseSombreada(cx, y, cz, raio, cor, {
      proporcaoY: 0.42,
      paradas: (contexto, centro, rx) => {
        const g = contexto.createRadialGradient(centro.sx, centro.sy, 0, centro.sx, centro.sy, rx);
        g.addColorStop(0, tonalizar(cor, 0.72));
        g.addColorStop(0.6, tonalizar(cor, 0.86));
        g.addColorStop(1, tonalizar(cor, 1.0));
        return g;
      },
    });

  return { poligono, caixa, disco, cupula, tigela, proj };
}

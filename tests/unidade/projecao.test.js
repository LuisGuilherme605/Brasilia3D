import { describe, it, expect } from 'vitest';
import {
  DISTANCIA_CAMERA,
  focalPara,
  paraRgb,
  profundidadeFace,
  projetar,
  tonalizar,
} from '../../src/skyline/projecao.js';

const camera = { largura: 800, altura: 400, rotacao: 0 };

describe('projetar', () => {
  it('coloca a origem no centro horizontal da tela', () => {
    const p = projetar(camera, 0, 0, 0);
    expect(p.sx).toBe(400);
    expect(p.profundidade).toBe(DISTANCIA_CAMERA);
  });

  it('devolve null para pontos atrás da câmera', () => {
    expect(projetar(camera, 0, 0, -100)).toBeNull();
  });

  it('desenha o que está mais longe menor que o que está perto', () => {
    const perto = projetar(camera, 2, 0, 0);
    const longe = projetar({ ...camera }, 2, 0, 8);
    expect(Math.abs(perto.sx - 400)).toBeGreaterThan(Math.abs(longe.sx - 400));
  });

  it('gira a maquete conforme a rotação da câmera', () => {
    const semGiro = projetar({ ...camera, rotacao: 0 }, 3, 0, 0);
    const comGiro = projetar({ ...camera, rotacao: Math.PI / 2 }, 3, 0, 0);
    expect(semGiro.sx).not.toBeCloseTo(comGiro.sx);
  });
});

describe('profundidadeFace', () => {
  it('usa a média das profundidades dos vértices', () => {
    const pontos = [
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(profundidadeFace(camera, pontos)).toBe(DISTANCIA_CAMERA);
  });

  it('manda a face para o fim da fila quando nenhum vértice é visível', () => {
    expect(profundidadeFace(camera, [[0, 0, -100]])).toBe(Number.MAX_SAFE_INTEGER);
  });
});

describe('cores', () => {
  it('converte hexadecimal em canais rgb', () => {
    expect(paraRgb('#4a90d9')).toEqual([74, 144, 217]);
  });

  it('aceita a forma curta do hexadecimal', () => {
    expect(paraRgb('#fff')).toEqual([255, 255, 255]);
  });

  it('aceita rgb() para poder tonalizar uma cor já tonalizada', () => {
    expect(paraRgb('rgb(87, 132, 191)')).toEqual([87, 132, 191]);
    expect(tonalizar(tonalizar('#74b0ff', 0.75), 0.5)).toBe('rgb(44, 66, 96)');
  });

  it('escurece e clareia sem estourar 255', () => {
    expect(tonalizar('#4a90d9', 0.5)).toBe('rgb(37, 72, 109)');
    expect(tonalizar('#ffffff', 2)).toBe('rgb(255, 255, 255)');
  });
});

describe('focalPara', () => {
  it('cresce com a altura do canvas para a maquete não encolher em tela grande', () => {
    expect(focalPara(700)).toBeGreaterThan(focalPara(400));
  });

  it('respeita o piso e o teto', () => {
    expect(focalPara(10)).toBe(210);
    expect(focalPara(5000)).toBe(900);
  });

  it('é usada pela projeção quando a câmera define uma', () => {
    const padrao = projetar({ largura: 800, altura: 400, rotacao: 0 }, 2, 0, 0);
    const ampliada = projetar({ largura: 800, altura: 400, rotacao: 0, focal: 600 }, 2, 0, 0);
    expect(Math.abs(ampliada.sx - 400)).toBeGreaterThan(Math.abs(padrao.sx - 400));
  });
});

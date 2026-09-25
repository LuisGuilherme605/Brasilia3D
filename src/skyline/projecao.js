// Projeção em perspectiva da maquete. Nada aqui toca no DOM, então dá pra
// testar a matemática sozinha.

export const ELEVACAO = 0.56;
export const DISTANCIA_CAMERA = 14;
export const DISTANCIA_FOCAL = 210;

const FOCAL_POR_ALTURA = 0.95;
const FOCAL_MINIMA = 210;
const FOCAL_MAXIMA = 900;
const PROFUNDIDADE_MINIMA = 0.1;

const COS_ELEVACAO = Math.cos(ELEVACAO);
const SEN_ELEVACAO = Math.sin(ELEVACAO);

// A focal acompanha o tamanho do canvas. Com um valor fixo a maquete ficava
// minúscula em tela grande, porque a escala não mudava junto.
export function focalPara(altura) {
  return Math.min(FOCAL_MAXIMA, Math.max(FOCAL_MINIMA, altura * FOCAL_POR_ALTURA));
}

/**
 * @param {{largura: number, altura: number, rotacao: number, focal?: number}} camera
 * @returns {{sx: number, sy: number, profundidade: number}|null} null se o ponto ficou atrás da câmera
 */
export function projetar(camera, x, y, z) {
  const cos = Math.cos(camera.rotacao);
  const sen = Math.sin(camera.rotacao);

  const xRotacionado = x * cos - z * sen;
  const zRotacionado = x * sen + z * cos;

  // O sinal negativo no termo em z faz o fundo da maquete subir na tela, dando
  // a leitura de vista aérea (de cima) em vez de vista de baixo do plano.
  const yCamera = -y * COS_ELEVACAO - zRotacionado * SEN_ELEVACAO;
  const zCamera = y * SEN_ELEVACAO + zRotacionado * COS_ELEVACAO + DISTANCIA_CAMERA;
  if (zCamera < PROFUNDIDADE_MINIMA) return null;

  const escala = (camera.focal ?? DISTANCIA_FOCAL) / zCamera;
  return {
    sx: camera.largura / 2 + xRotacionado * escala,
    sy: camera.altura * 0.52 + yCamera * escala,
    profundidade: zCamera,
  };
}

// Média das profundidades dos vértices. É por esse número que as faces são
// ordenadas antes de desenhar.
export function profundidadeFace(camera, pontos) {
  let soma = 0;
  let contagem = 0;
  for (const [x, y, z] of pontos) {
    const p = projetar(camera, x, y, z);
    if (!p) continue;
    soma += p.profundidade;
    contagem += 1;
  }
  return contagem ? soma / contagem : Number.MAX_SAFE_INTEGER;
}

// Aceita '#4a90d9' e 'rgb(74, 144, 217)'. O segundo formato é necessário porque
// tonalizar() devolve rgb() e monumentos compostos reaproveitam esse resultado
// como cor de entrada. Sem isso o parse dava NaN e a face saía preta.
export function paraRgb(cor) {
  if (cor.startsWith('rgb')) {
    const canais = cor.match(/-?\d+(\.\d+)?/g) ?? [];
    return [0, 1, 2].map((i) => Math.round(Number(canais[i] ?? 0)));
  }
  const hex = cor.replace('#', '');
  const completo = hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex;
  const valor = Number.parseInt(completo, 16);
  return [(valor >> 16) & 255, (valor >> 8) & 255, valor & 255];
}

// fator > 1 clareia, fator < 1 escurece.
export function tonalizar(cor, fator) {
  const [r, g, b] = paraRgb(cor).map((canal) => Math.round(Math.min(255, canal * fator)));
  return `rgb(${r}, ${g}, ${b})`;
}

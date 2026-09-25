// Favoritos do visitante, guardados no navegador.

import { lerJSON, gravarJSON } from '../nucleo/armazenamento.js';

const CHAVE = 'brasilia3d_favorites';

const salvos = lerJSON(CHAVE, []);
const favoritos = new Set(Array.isArray(salvos) ? salvos : []);
const ouvintes = new Set();

export const ehFavorito = (id) => favoritos.has(id);
export const totalFavoritos = () => favoritos.size;

// Inverte o estado e avisa quem estiver ouvindo.
export function alternarFavorito(id) {
  if (favoritos.has(id)) favoritos.delete(id);
  else favoritos.add(id);
  gravarJSON(CHAVE, [...favoritos]);
  ouvintes.forEach((ouvinte) => ouvinte(favoritos.size));
  return favoritos.has(id);
}

export function aoMudarFavoritos(ouvinte) {
  ouvintes.add(ouvinte);
  ouvinte(favoritos.size);
}

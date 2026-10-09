import { useSyncExternalStore, useCallback } from 'react';
import { lerJSON, gravarJSON } from '../nucleo/armazenamento.js';

const CHAVE = 'brasilia3d_favorites';
const ouvintes = new Set();

function lerSalvos() {
  const salvos = lerJSON(CHAVE, []);
  return new Set(Array.isArray(salvos) ? salvos : []);
}

let favoritos = lerSalvos();

// Favoritar numa aba precisa refletir nas outras abertas do site.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (evento) => {
    if (evento.key !== CHAVE && evento.key !== null) return;
    favoritos = lerSalvos();
    ouvintes.forEach((cb) => cb());
  });
}

function subscribe(cb) {
  ouvintes.add(cb);
  return () => ouvintes.delete(cb);
}

function getSnapshot() {
  return favoritos;
}

function notificar() {
  favoritos = new Set(favoritos);
  ouvintes.forEach((cb) => cb());
}

export function useFavoritos() {
  const favs = useSyncExternalStore(subscribe, getSnapshot);

  const alternar = useCallback((id) => {
    if (favoritos.has(id)) favoritos.delete(id);
    else favoritos.add(id);
    gravarJSON(CHAVE, [...favoritos]);
    notificar();
    return favoritos.has(id);
  }, []);

  const ehFavorito = useCallback((id) => favs.has(id), [favs]);
  const total = favs.size;

  return { favoritos: favs, ehFavorito, alternar, total };
}

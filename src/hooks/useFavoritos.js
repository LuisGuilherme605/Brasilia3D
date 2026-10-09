import { useSyncExternalStore, useCallback } from 'react';
import { lerJSON, gravarJSON } from '../nucleo/armazenamento.js';

const CHAVE = 'brasilia3d_favorites';
const ouvintes = new Set();
let favoritos = new Set(
  (() => {
    const salvos = lerJSON(CHAVE, []);
    return Array.isArray(salvos) ? salvos : [];
  })(),
);

// Mantém abas abertas ao mesmo tempo em sincronia quando os favoritos mudam em outra.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== CHAVE) return;
    const salvos = lerJSON(CHAVE, []);
    favoritos = new Set(Array.isArray(salvos) ? salvos : []);
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

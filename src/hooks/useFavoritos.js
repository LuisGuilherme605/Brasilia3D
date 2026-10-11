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

function subscribe(cb) {
  ouvintes.add(cb);
  return () => ouvintes.delete(cb);
}

function getSnapshot() {
  return favoritos;
}

function notificar(proximo) {
  favoritos = proximo;
  ouvintes.forEach((cb) => cb());
}

export function useFavoritos() {
  const favs = useSyncExternalStore(subscribe, getSnapshot);

  const alternar = useCallback((id) => {
    // Cria um Set novo em vez de mutar o atual, que pode ainda estar em uso
    // como snapshot por algum componente.
    const proximo = new Set(favoritos);
    if (!proximo.delete(id)) proximo.add(id);
    gravarJSON(CHAVE, [...proximo]);
    notificar(proximo);
    return proximo.has(id);
  }, []);

  const ehFavorito = useCallback((id) => favs.has(id), [favs]);
  const total = favs.size;

  return { favoritos: favs, ehFavorito, alternar, total };
}

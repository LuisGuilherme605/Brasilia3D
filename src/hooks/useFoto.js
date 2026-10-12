import { useState, useEffect } from 'react';
import { buscarFoto } from '../nucleo/wikimedia.js';

export function useFoto(chave, wikis) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let cancelado = false;
    // Ao trocar de lugar, a foto do anterior não pode ficar na tela enquanto a nova carrega.
    setUrl(null);
    buscarFoto(chave, wikis)
      .then((resultado) => {
        if (!cancelado && resultado) setUrl(resultado);
      })
      .catch(() => {});
    return () => {
      cancelado = true;
    };
  }, [chave, wikis]);

  return url;
}

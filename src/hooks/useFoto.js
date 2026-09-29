import { useState, useEffect } from 'react';
import { buscarFoto } from '../nucleo/wikimedia.js';

export function useFoto(chave, wikis) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let cancelado = false;
    buscarFoto(chave, wikis).then((resultado) => {
      if (!cancelado) setUrl(resultado);
    });
    return () => {
      cancelado = true;
    };
  }, [chave, wikis]);

  return url;
}

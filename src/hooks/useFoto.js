import { useState, useEffect } from 'react';
import { buscarFoto } from '../nucleo/wikimedia.js';

export function useFoto(chave, wikis) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let cancelado = false;
    setUrl(null);
    buscarFoto(chave, wikis).then((resultado) => {
      if (!cancelado && resultado) setUrl(resultado);
    });
    return () => {
      cancelado = true;
    };
  }, [chave, wikis]);

  return url;
}

import { useState, useEffect } from 'react';
import { buscarFoto } from '../nucleo/wikimedia.js';

export function useFoto(chave, wikis) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let cancelado = false;
    // Sem isso, trocar de ponto mantém a foto do anterior até a nova chegar
    // (ou para sempre, se a nova não tiver foto).
    setUrl(null);
    buscarFoto(chave, wikis).then((resultado) => {
      if (!cancelado) setUrl(resultado);
    });
    return () => {
      cancelado = true;
    };
  }, [chave, wikis]);

  return url;
}

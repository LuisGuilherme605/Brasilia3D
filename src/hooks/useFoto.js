import { useState, useEffect } from 'react';
import { buscarFoto, fotoEmCache } from '../nucleo/wikimedia.js';

export function useFoto(chave, wikis) {
  const [url, setUrl] = useState(() => fotoEmCache(chave));

  useEffect(() => {
    let cancelado = false;
    // Sem isto, ao trocar de chave a foto do ponto anterior ficava na tela
    // até a nova chegar (e pra sempre, se o novo ponto não tivesse foto).
    setUrl(fotoEmCache(chave));
    buscarFoto(chave, wikis).then((resultado) => {
      if (!cancelado) setUrl(resultado);
    });
    return () => {
      cancelado = true;
    };
  }, [chave, wikis]);

  return url;
}

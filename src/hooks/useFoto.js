import { useState, useEffect } from 'react';
import { buscarFoto } from '../nucleo/wikimedia.js';

export function useFoto(chave, wikis) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let cancelado = false;
    // Ao trocar de ponto, não deixa a foto do anterior na tela enquanto a nova carrega.
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

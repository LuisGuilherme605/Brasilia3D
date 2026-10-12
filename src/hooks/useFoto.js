import { useState, useEffect } from 'react';
import { buscarFoto } from '../nucleo/wikimedia.js';

export function useFoto(chave, wikis) {
  // A url guarda a chave a que pertence: ao trocar de local, a foto do
  // anterior não aparece no novo enquanto a busca não termina.
  const [foto, setFoto] = useState({ chave: null, url: null });

  useEffect(() => {
    let cancelado = false;
    buscarFoto(chave, wikis).then((resultado) => {
      if (!cancelado && resultado) setFoto({ chave, url: resultado });
    });
    return () => {
      cancelado = true;
    };
  }, [chave, wikis]);

  return foto.chave === chave ? foto.url : null;
}

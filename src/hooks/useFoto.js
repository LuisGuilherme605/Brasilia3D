import { useState, useEffect } from 'react';
import { buscarFoto } from '../nucleo/wikimedia.js';

export function useFoto(chave, wikis) {
  // A chave fica junto da url: se o componente trocar de ponto, a foto do
  // anterior não aparece enquanto a nova ainda carrega.
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

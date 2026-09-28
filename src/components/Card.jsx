import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useFoto } from '../hooks/useFoto.js';
import { useFavoritos } from '../hooks/useFavoritos.js';
import { codigoPrancha, notaDeEstrelas, resumir } from '../nucleo/texto.js';

export default function Card({ ponto, indice, onAbrirModal, onAbrirFoto }) {
  const url = useFoto(ponto.id, ponto.wikis);
  const [imgCarregada, setImgCarregada] = useState(false);
  const { ehFavorito, alternar } = useFavoritos();
  const favorito = ehFavorito(ponto.id);

  const onFavClick = useCallback(
    (e) => {
      e.stopPropagation();
      alternar(ponto.id);
    },
    [alternar, ponto.id],
  );

  const onFotoClick = useCallback(
    (e) => {
      if (e.target.closest('.fav-btn')) return;
      e.stopPropagation();
      onAbrirFoto(ponto, indice);
    },
    [onAbrirFoto, ponto, indice],
  );

  const onTituloClick = useCallback(
    (e) => {
      e.stopPropagation();
      onAbrirModal(ponto, indice);
    },
    [onAbrirModal, ponto, indice],
  );

  return (
    <motion.article
      className="card"
      data-id={ponto.id}
      onClick={() => onAbrirModal(ponto, indice)}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay: indice * 0.06 }}
      whileHover={{ x: -4, y: -4, boxShadow: '8px 8px 0 rgba(15, 109, 106, 0.2)' }}
    >
      <div className="card-photo" onClick={onFotoClick}>
        {!imgCarregada && <div className="photo-skeleton" />}
        {url && (
          <img
            className={`card-real-img${imgCarregada ? ' loaded' : ''}`}
            src={url}
            alt={ponto.nome}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgCarregada(true)}
          />
        )}
        <div
          className={`card-art${imgCarregada ? ' hidden' : ''}`}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: ponto.svg }}
        />
        <div className="photo-credit">Wikimedia Commons · CC BY-SA</div>
        <button
          className={`fav-btn${favorito ? ' favorited' : ''}`}
          type="button"
          aria-pressed={favorito}
          aria-label={`Favoritar ${ponto.nome}`}
          onClick={onFavClick}
        >
          {favorito ? '♥' : '♡'}
        </button>
      </div>
      <div className="card-body">
        <span className="card-tag">{ponto.tag}</span>
        <h3>
          <button
            type="button"
            className="card-abrir"
            aria-label={`Ver detalhes de ${ponto.nome}`}
            onClick={onTituloClick}
          >
            {ponto.nome}
          </button>
        </h3>
        <p>{resumir(ponto.desc)}</p>
      </div>
      <div className="card-footer">
        <span className="card-meta">
          <span className="card-plate">{codigoPrancha(indice)}</span>
          <span className="card-horario">{ponto.horario}</span>
        </span>
        <span className="rating">Nota {notaDeEstrelas(ponto.rating)}</span>
      </div>
    </motion.article>
  );
}

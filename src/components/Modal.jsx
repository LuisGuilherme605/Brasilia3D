import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { codigoPrancha } from '../nucleo/texto.js';
import { fotoEmCache } from '../nucleo/wikimedia.js';
import { prenderFoco } from '../nucleo/dom.js';

export default function Modal({ ponto, indice, onFechar }) {
  const caixaRef = useRef(null);
  const url = fotoEmCache(ponto.id);

  useEffect(() => {
    return prenderFoco(caixaRef.current);
  }, []);

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onFechar();
  };

  return (
    <motion.div
      id="modal-overlay"
      className="open"
      onClick={onOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        id="modal-box"
        ref={caixaRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <button id="modal-close" type="button" aria-label="Fechar detalhes" onClick={onFechar}>
          ✕
        </button>
        {url && (
          <img id="modal-photo" className="loaded" src={url} alt={ponto.nome} loading="lazy" />
        )}
        <div id="modal-content">
          <div id="modal-tag">
            <span className="card-tag">{ponto.tag}</span>
            <span className="card-plate">{codigoPrancha(indice)}</span>
          </div>
          <h2 id="modal-title">{ponto.nome}</h2>
          <p id="modal-desc">{ponto.desc}</p>
          <div id="modal-info">
            {[
              ['Horário', ponto.horario],
              ['Entrada', ponto.entrada],
              ['Dica', ponto.dica],
            ].map(([rotulo, valor]) => (
              <span key={rotulo} className="modal-pill">
                <strong>{rotulo}</strong>
                {valor}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

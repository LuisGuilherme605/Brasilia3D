import { useState } from 'react';
import { motion } from 'framer-motion';
import RevealSection from './RevealSection.jsx';
import { useFoto } from '../hooks/useFoto.js';
import { fotoEmCache } from '../nucleo/wikimedia.js';

function GalleryItem({ item, onAbrir }) {
  const url = useFoto(item.label, item.wikis);
  const [carregada, setCarregada] = useState(false);

  const classes = ['gallery-item', item.tall && 'tall', item.wide && 'wide']
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      className={classes}
      type="button"
      aria-label={`Ampliar foto: ${item.label}`}
      onClick={() => onAbrir(fotoEmCache(item.label), item.label)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {!carregada && <div className="gallery-skel" />}
      {url && (
        <img
          src={url}
          alt={item.label}
          loading="lazy"
          decoding="async"
          className={`gallery-img${carregada ? ' carregada' : ''}`}
          onLoad={() => setCarregada(true)}
        />
      )}
      <div className="gallery-overlay">
        <span>{item.label}</span>
      </div>
    </motion.button>
  );
}

export default function Galeria({ itens, onAbrir }) {
  return (
    <section id="galeria" aria-labelledby="titulo-galeria">
      <RevealSection className="section-title">
        <span>Fotografia</span>
        <h2 id="titulo-galeria">Galeria de Brasília</h2>
        <p>A cidade em imagens: dos monumentos da Esplanada ao cerrado que a cerca.</p>
      </RevealSection>
      <RevealSection className="gallery-grid" id="gallery-grid">
        {itens.map((item) => (
          <GalleryItem key={item.label} item={item} onAbrir={onAbrir} />
        ))}
      </RevealSection>
      <p className="gallery-note">Fotos: Wikimedia Commons (CC BY-SA) · Clique para ampliar</p>
    </section>
  );
}

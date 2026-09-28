import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Lightbox({ url, legenda, onFechar }) {
  const fecharRef = useRef(null);

  useEffect(() => {
    fecharRef.current?.focus();
  }, []);

  return (
    <motion.div
      id="lightbox"
      className="open"
      role="dialog"
      aria-modal="true"
      aria-label="Foto ampliada"
      onClick={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        id="lightbox-close"
        type="button"
        aria-label="Fechar foto"
        ref={fecharRef}
        onClick={onFechar}
      >
        ✕
      </button>
      <motion.img
        id="lightbox-img"
        src={url}
        alt={legenda}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <p id="lightbox-caption">{legenda}</p>
      <p id="lightbox-credit">Foto: Wikimedia Commons (CC BY-SA)</p>
    </motion.div>
  );
}

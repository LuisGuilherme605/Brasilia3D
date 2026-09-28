import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { movimentoReduzido } from '../nucleo/preferencias.js';

export default function BackToTop() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const atualizar = () => setVisivel(window.scrollY > 500);
    window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.button
          id="back-to-top"
          type="button"
          aria-label="Voltar ao topo"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: movimentoReduzido() ? 'auto' : 'smooth' })
          }
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'fixed' }}
        >
          <span aria-hidden="true">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

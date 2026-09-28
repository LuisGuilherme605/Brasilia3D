import { motion } from 'framer-motion';
import RevealSection from './RevealSection.jsx';

export default function Dicas({ dicas }) {
  return (
    <section id="dicas" aria-labelledby="titulo-dicas">
      <RevealSection className="section-title">
        <span>Planeje</span>
        <h2 id="titulo-dicas">Dicas Essenciais</h2>
        <p>O que ajuda de verdade antes de pisar no Eixo Monumental.</p>
      </RevealSection>
      <div className="dicas-grid" id="dicas-container">
        {dicas.map((dica, i) => (
          <motion.article
            key={dica.title}
            className="dica-card"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <h3>{dica.title}</h3>
            <p>{dica.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

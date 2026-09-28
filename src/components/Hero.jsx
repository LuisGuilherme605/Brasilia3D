import { motion } from 'framer-motion';

const base = import.meta.env.BASE_URL;

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
});

export default function Hero() {
  return (
    <header id="hero">
      <div className="hero-grid">
        <div className="hero-text">
          <motion.p className="hero-kicker" {...rise(0)}>
            Guia da capital · Patrimônio Mundial da UNESCO desde 1987
          </motion.p>
          <motion.h1 className="hero-title" {...rise(0.1)}>
            Brasília<span>.</span>
          </motion.h1>
          <motion.p className="hero-sub" {...rise(0.2)}>
            A cidade que Lúcio Costa traçou e Oscar Niemeyer ergueu em concreto e curva, no meio do
            cerrado — inaugurada em 1960 e, até hoje, sem nada parecido no mundo.
          </motion.p>
          <motion.div className="hero-actions" {...rise(0.3)}>
            <a href="#pontos" className="btn btn-solid">
              Ver pontos turísticos
            </a>
            <a href="#galeria" className="btn">
              Galeria de fotos
            </a>
          </motion.div>
        </div>
        <motion.figure className="hero-poster" {...rise(0.25)}>
          <picture>
            <source srcSet={`${base}assets/poster-brasilia.webp`} type="image/webp" />
            <img
              src={`${base}assets/poster-brasilia.png`}
              alt="Pôster modernista de Brasília com as torres e as cúpulas do Congresso Nacional"
              width="1200"
              height="1697"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <figcaption>Pôster da casa — série Capital Modernista</figcaption>
        </motion.figure>
      </div>
    </header>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Jornada from './components/Jornada.jsx';
import Stats from './components/Stats.jsx';
import Galeria from './components/Galeria.jsx';
import Pontos from './components/Pontos.jsx';
import Skyline from './components/Skyline.jsx';
import Dicas from './components/Dicas.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import Lightbox from './components/Lightbox.jsx';
import BackToTop from './components/BackToTop.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import { pontos } from './dados/pontos.js';
import { itensGaleria } from './dados/galeria.js';
import { dicas } from './dados/dicas.js';
import { fotoEmCache } from './nucleo/wikimedia.js';

export default function App() {
  const [modal, setModal] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [navEscura, setNavEscura] = useState(false);

  const abrirModal = useCallback((ponto, indice) => {
    setModal({ ponto, indice });
  }, []);

  const abrirLightbox = useCallback((url, legenda) => {
    if (url) setLightbox({ url, legenda });
  }, []);

  const abrirFotoOuModal = useCallback(
    (ponto, indice) => {
      const url = fotoEmCache(ponto.id);
      if (url) abrirLightbox(url, ponto.nome);
      else abrirModal(ponto, indice);
    },
    [abrirLightbox, abrirModal],
  );

  useEffect(() => {
    const travar = modal || lightbox;
    document.body.classList.toggle('sem-rolagem', Boolean(travar));
    return () => document.body.classList.remove('sem-rolagem');
  }, [modal, lightbox]);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(null);
        else if (modal) setModal(null);
      }
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [modal, lightbox]);

  return (
    <>
      <a className="skip-link" href="#pontos">
        Pular para os pontos turísticos
      </a>
      <ProgressBar />
      <Navbar navEscura={navEscura} />
      <Hero />
      <Jornada pontos={pontos} onNavEscura={setNavEscura} />

      <main>
        <Stats />
        <Galeria itens={itensGaleria} onAbrir={abrirLightbox} />
        <Pontos pontos={pontos} onAbrirModal={abrirModal} onAbrirFoto={abrirFotoOuModal} />
        <Skyline />
        <Dicas dicas={dicas} />
      </main>

      <Footer />

      <AnimatePresence>
        {modal && (
          <Modal
            key="modal"
            ponto={modal.ponto}
            indice={modal.indice}
            onFechar={() => setModal(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key="lightbox"
            url={lightbox.url}
            legenda={lightbox.legenda}
            onFechar={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>

      <BackToTop />
    </>
  );
}

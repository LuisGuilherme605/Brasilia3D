import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFavoritos } from '../hooks/useFavoritos.js';

export default function Navbar({ navEscura }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const { total } = useFavoritos();

  const fecharMenu = useCallback(() => setMenuAberto(false), []);

  const scrollParaFavoritos = useCallback((e) => {
    e.preventDefault();
    document.getElementById('pontos')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <nav className={navEscura ? 'nav-escura' : ''} aria-label="Navegação principal">
        <a href="#hero" className="nav-logo">
          Brasília<em>3D</em>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#jornada">Jornada</a>
          </li>
          <li>
            <a href="#galeria">Galeria</a>
          </li>
          <li>
            <a href="#pontos">Pontos Turísticos</a>
          </li>
          <li>
            <a href="#mapa3d">Cidade 3D</a>
          </li>
          <li>
            <a href="#dicas">Dicas</a>
          </li>
          <li>
            {total > 0 && (
              <button
                type="button"
                id="nav-fav"
                aria-label="Ver apenas os favoritos"
                onClick={scrollParaFavoritos}
              >
                <span aria-hidden="true">♥</span> Favoritos <span id="fav-nav-count">{total}</span>
              </button>
            )}
          </li>
        </ul>
        <button
          className={`hamburger${menuAberto ? ' open' : ''}`}
          type="button"
          id="hamburger"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="mobile-menu"
          onClick={() => setMenuAberto((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            id="mobile-menu"
            className="open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <a href="#jornada" onClick={fecharMenu}>
              Jornada
            </a>
            <a href="#galeria" onClick={fecharMenu}>
              Galeria
            </a>
            <a href="#pontos" onClick={fecharMenu}>
              Pontos Turísticos
            </a>
            <a href="#mapa3d" onClick={fecharMenu}>
              Cidade 3D
            </a>
            <a href="#dicas" onClick={fecharMenu}>
              Dicas
            </a>
            <a href="#pontos" id="mobile-fav" onClick={fecharMenu}>
              <span aria-hidden="true">♥</span> Favoritos
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

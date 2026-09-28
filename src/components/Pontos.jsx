import { useState, useMemo } from 'react';
import RevealSection from './RevealSection.jsx';
import Card from './Card.jsx';
import { filtrarPontos, rotuloResultados, CATEGORIA_TODOS } from '../nucleo/filtro.js';
import { useFavoritos } from '../hooks/useFavoritos.js';

const CATEGORIAS = [
  { cat: 'todos', label: 'Todos' },
  { cat: 'Historia', label: 'História' },
  { cat: 'Cultura', label: 'Cultura' },
  { cat: 'Natureza', label: 'Natureza' },
  { cat: 'Lazer', label: 'Lazer' },
  { cat: 'Gastronomia', label: 'Gastronomia' },
];

export default function Pontos({ pontos, onAbrirModal, onAbrirFoto }) {
  const [categoria, setCategoria] = useState(CATEGORIA_TODOS);
  const [busca, setBusca] = useState('');
  const { favoritos } = useFavoritos();

  const visiveis = useMemo(
    () => new Set(filtrarPontos(pontos, { categoria, busca, favoritos })),
    [pontos, categoria, busca, favoritos],
  );

  const rotulo = rotuloResultados(visiveis.size, pontos.length);

  return (
    <section id="pontos" aria-labelledby="titulo-pontos">
      <RevealSection className="section-title">
        <span>Roteiro</span>
        <h2 id="titulo-pontos">Pontos Turísticos</h2>
        <p>
          De palácios e museus a parques de cerrado nativo — o essencial para montar seu roteiro.
        </p>
      </RevealSection>
      <RevealSection className="filter-wrap">
        <div className="filter-group" role="group" aria-label="Filtrar por categoria">
          {CATEGORIAS.map(({ cat, label }) => (
            <button
              key={cat}
              className={`filter-btn${categoria === cat ? ' active' : ''}`}
              type="button"
              data-cat={cat}
              aria-pressed={categoria === cat}
              onClick={() => setCategoria(cat)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="search-wrap">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <label className="sr-only" htmlFor="search-input">
            Buscar ponto turístico
          </label>
          <input
            className="search-input"
            id="search-input"
            type="search"
            placeholder="Buscar ponto…"
            autoComplete="off"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <span className="results-count" id="results-count" role="status" aria-live="polite">
          {rotulo}
        </span>
      </RevealSection>
      <div className="cards-grid" id="cards-container">
        {pontos.map((ponto, indice) =>
          visiveis.has(ponto.id) ? (
            <Card
              key={ponto.id}
              ponto={ponto}
              indice={indice}
              onAbrirModal={onAbrirModal}
              onAbrirFoto={onAbrirFoto}
            />
          ) : null,
        )}
      </div>
    </section>
  );
}

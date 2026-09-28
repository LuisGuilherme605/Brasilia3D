import { useEffect, useRef, useState, useCallback } from 'react';
import { useFoto } from '../hooks/useFoto.js';
import { movimentoReduzido } from '../nucleo/preferencias.js';

const DESTAQUES = [0, 1, 6, 5, 8, 2];

function formatarNumero(n) {
  return String(n + 1).padStart(2, '0');
}

function JornadaImagem({ ponto }) {
  const url = useFoto(`jornada-${ponto.id}`, ponto.wikis);
  const [carregada, setCarregada] = useState(false);

  return (
    <img
      className={`jornada-img${carregada ? ' carregada' : ''}`}
      src={url || ''}
      alt={ponto.nome}
      draggable={false}
      onLoad={() => setCarregada(true)}
      style={!url ? { display: 'none' } : undefined}
    />
  );
}

export default function Jornada({ pontos, onNavEscura }) {
  const secaoRef = useRef(null);
  const cenasRef = useRef([]);
  const [cenaAtual, setCenaAtual] = useState(0);
  const [barraVisivel, setBarraVisivel] = useState(false);
  const totalCenas = DESTAQUES.length;
  const reduzido = movimentoReduzido();

  const destaques = DESTAQUES.map((idx) => pontos[idx]);

  const atualizar = useCallback(() => {
    const secao = secaoRef.current;
    if (!secao) return;

    const rect = secao.getBoundingClientRect();
    const visivel = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
    setBarraVisivel(visivel);
    onNavEscura(rect.top < 60 && rect.bottom > 60);

    const alturaTotalScroll = secao.offsetHeight - window.innerHeight;
    if (alturaTotalScroll <= 0) return;

    const scrolled = Math.max(0, -rect.top);
    const progresso = Math.min(scrolled / alturaTotalScroll, 1) * totalCenas;
    const atual = Math.min(Math.floor(progresso), totalCenas - 1);
    const t = progresso - atual;

    setCenaAtual(atual);

    cenasRef.current.forEach((cena, i) => {
      if (!cena) return;

      let estado;
      if (i === atual) {
        const textoSaindo = t < 0.5 ? 1 : t < 0.72 ? 1 - (t - 0.5) / 0.22 : 0;
        estado = {
          opacidade: 1 - t * 0.9,
          escala: 1 + t * 0.08,
          translateY: t * -60,
          translateZ: t * 150,
          rotateX: t * 2,
          textoVisivel: textoSaindo,
          zIndex: totalCenas - i,
        };
      } else if (i === atual + 1) {
        const textoEntrando = t < 0.78 ? 0 : Math.min(1, (t - 0.78) / 0.2);
        estado = {
          opacidade: 0.2 + t * 0.8,
          escala: 0.92 + t * 0.08,
          translateY: (1 - t) * 60,
          translateZ: (1 - t) * -200,
          rotateX: (1 - t) * -3,
          textoVisivel: textoEntrando,
          zIndex: totalCenas - i,
        };
      } else {
        estado = {
          opacidade: 0,
          escala: i < atual ? 1.08 : 0.92,
          translateY: 0,
          translateZ: i < atual ? 150 : -200,
          rotateX: 0,
          textoVisivel: 0,
          zIndex: 0,
        };
      }

      cena.style.opacity = estado.opacidade;
      cena.style.transform =
        `perspective(1200px) translateZ(${estado.translateZ}px) translateY(${estado.translateY}px) ` +
        `rotateX(${estado.rotateX}deg) scale(${estado.escala})`;
      cena.style.pointerEvents = estado.textoVisivel > 0.5 ? 'auto' : 'none';
      cena.style.zIndex = String(estado.zIndex);

      const img = cena.querySelector('.jornada-img');
      if (img) {
        const parallax = -estado.translateY * 0.3;
        img.style.transform = `scale(1.15) translate3d(0, ${parallax}px, 0)`;
      }

      const texto = cena.querySelector('.jornada-texto');
      if (texto) {
        texto.style.opacity = estado.textoVisivel;
        const deslocamento = (1 - estado.textoVisivel) * 30;
        texto.style.transform = `translateY(${deslocamento}px)`;
      }
    });
  }, [totalCenas, onNavEscura]);

  useEffect(() => {
    if (reduzido) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        atualizar();
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    atualizar();
    return () => window.removeEventListener('scroll', onScroll);
  }, [atualizar, reduzido]);

  return (
    <section id="jornada" ref={secaoRef} aria-label="Jornada pelos pontos turísticos de Brasília">
      <div className="jornada-viewport">
        {destaques.map((ponto, i) => (
          <div
            key={ponto.id}
            className="jornada-cena"
            ref={(el) => {
              cenasRef.current[i] = el;
            }}
            aria-hidden={i !== cenaAtual}
            style={
              reduzido
                ? {
                    opacity: i === 0 ? 1 : 0,
                    transform: 'none',
                  }
                : undefined
            }
          >
            <div className="jornada-fundo">
              <JornadaImagem ponto={ponto} />
              <div className="jornada-overlay" />
            </div>
            <div
              className="jornada-texto"
              style={
                reduzido
                  ? {
                      opacity: i === 0 ? 1 : 0,
                    }
                  : undefined
              }
            >
              <span className="jornada-numero">{formatarNumero(i)}</span>
              <span className="jornada-cat">{ponto.tag}</span>
              <h3 className="jornada-nome">{ponto.nome}</h3>
              <p className="jornada-desc">{ponto.desc.split('.')[0]}.</p>
              <span className="jornada-info">
                {ponto.horario} · {ponto.entrada}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={`jornada-barra${barraVisivel ? ' visivel' : ''}`}>
        <div className="jornada-dots" role="tablist" aria-label="Pontos turísticos">
          {destaques.map((ponto, i) => (
            <button
              key={ponto.id}
              className={`jornada-dot${i === cenaAtual ? ' ativo' : ''}`}
              aria-label={ponto.nome}
              type="button"
            />
          ))}
        </div>
        <span className="jornada-contador">
          {formatarNumero(cenaAtual)} / {formatarNumero(totalCenas - 1)}
        </span>
        <span className="jornada-dica">Role para explorar</span>
      </div>
    </section>
  );
}

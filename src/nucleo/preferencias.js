// Preferências de exibição declaradas pelo sistema operacional do visitante.

const consulta =
  typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;

export const movimentoReduzido = () => consulta?.matches ?? false;

// Devolve a função que cancela a inscrição.
export function aoMudarMovimento(callback) {
  const ouvinte = (evento) => callback(evento.matches);
  consulta?.addEventListener('change', ouvinte);
  return () => consulta?.removeEventListener('change', ouvinte);
}

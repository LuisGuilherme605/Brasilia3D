// Preferências de exibição declaradas pelo sistema operacional do visitante.

const consulta =
  typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;

export const movimentoReduzido = () => consulta?.matches ?? false;

// Devolve a função que cancela a inscrição, para uso no cleanup de effects.
export function aoMudarMovimento(callback) {
  if (!consulta) return () => {};
  const ouvinte = (evento) => callback(evento.matches);
  consulta.addEventListener('change', ouvinte);
  return () => consulta.removeEventListener('change', ouvinte);
}

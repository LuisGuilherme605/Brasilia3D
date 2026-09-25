// Preferências de exibição declaradas pelo sistema operacional do visitante.

const consulta =
  typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;

export const movimentoReduzido = () => consulta?.matches ?? false;

export function aoMudarMovimento(callback) {
  consulta?.addEventListener('change', (evento) => callback(evento.matches));
}

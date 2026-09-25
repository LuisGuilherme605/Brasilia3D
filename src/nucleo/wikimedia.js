// Busca a foto de cada ponto na API REST da Wikipédia, com uma lista de
// artigos candidatos por item: se o primeiro não tiver imagem utilizável,
// tenta o próximo.

const TEMPO_LIMITE_MS = 5000;
const LARGURA_MINIMA = 400;
const PREFIXO_DIRETO = 'direct:';
const NAO_FOTOGRAFICO = /logo|brand|icon|seal|bras[aã]o|marca|badge|escudo/i;

/** @type {Map<string|number, string|null>} */
const cache = new Map();

// A Wikipédia devolve como imagem principal muita coisa que não é foto do
// lugar: brasão do estado, logotipo do órgão, mapa em SVG. Este filtro corta
// esses casos.
export function ehFotoUtilizavel(url, original) {
  if (!url) return false;
  const minuscula = url.toLowerCase();
  if (minuscula.includes('.svg')) return false;
  if (NAO_FOTOGRAFICO.test(minuscula)) return false;
  if (original && typeof original.width === 'number' && original.width < LARGURA_MINIMA)
    return false;
  return true;
}

// Quebra 'pt:Catedral_de_Brasília' em idioma e título do artigo.
export function separarFonte(fonte) {
  const corte = fonte.indexOf(':');
  return { idioma: fonte.slice(0, corte), titulo: fonte.slice(corte + 1) };
}

export function urlResumo(idioma, titulo) {
  return `https://${idioma}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`;
}

export const fotoEmCache = (chave) => cache.get(chave) ?? null;

/**
 * @param {string|number} chave id do ponto ou rótulo da galeria
 * @param {string[]} fontes artigos candidatos, em ordem de preferência
 */
export async function buscarFoto(chave, fontes) {
  if (cache.has(chave)) return cache.get(chave);

  for (const fonte of fontes) {
    if (fonte.startsWith(PREFIXO_DIRETO)) {
      const url = fonte.slice(PREFIXO_DIRETO.length);
      cache.set(chave, url);
      return url;
    }

    const { idioma, titulo } = separarFonte(fonte);
    try {
      const resposta = await fetch(urlResumo(idioma, titulo), {
        signal: AbortSignal.timeout(TEMPO_LIMITE_MS),
      });
      if (!resposta.ok) continue;

      const dados = await resposta.json();
      const url = dados.originalimage?.source || dados.thumbnail?.source;
      if (!ehFotoUtilizavel(url, dados.originalimage)) continue;

      cache.set(chave, url);
      return url;
    } catch {
      continue;
    }
  }

  cache.set(chave, null);
  return null;
}

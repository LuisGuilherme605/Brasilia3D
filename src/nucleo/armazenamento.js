// Acesso ao localStorage tolerante a falha. Em navegação privativa ou com
// cookies bloqueados o acesso lança exceção — nesse caso o site segue
// funcionando, só não persiste nada entre visitas.

export function lerJSON(chave, padrao) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto === null ? padrao : JSON.parse(bruto);
  } catch {
    return padrao;
  }
}

// Devolve false quando o navegador não deixou gravar.
export function gravarJSON(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

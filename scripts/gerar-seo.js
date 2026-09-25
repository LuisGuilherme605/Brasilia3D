// Gera o sitemap.xml e injeta os dados estruturados (JSON-LD) no index.html a
// partir de src/dados/pontos.js, para que SEO e conteúdo nunca saiam de sincronia.
//
//   node scripts/gerar-seo.js            grava os arquivos
//   node scripts/gerar-seo.js --check    apenas verifica se estão atualizados (usado na CI)

import { readFileSync, writeFileSync } from 'node:fs';
import { pontos } from '../src/dados/pontos.js';

const SITE = 'https://luisguilherme605.github.io/Brasilia3D/';
const INICIO = '<!-- dados-estruturados:inicio -->';
const FIM = '<!-- dados-estruturados:fim -->';

const apenasVerificar = process.argv.includes('--check');

const dadosEstruturados = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE}#site`,
      url: SITE,
      name: 'Brasília 3D',
      inLanguage: 'pt-BR',
      description:
        'Guia turístico de Brasília com pontos turísticos, fotos e skyline 3D interativo.',
    },
    {
      '@type': 'ItemList',
      name: 'Pontos turísticos de Brasília',
      numberOfItems: pontos.length,
      itemListElement: pontos.map((ponto, indice) => ({
        '@type': 'ListItem',
        position: indice + 1,
        item: {
          '@type': 'TouristAttraction',
          name: ponto.nome,
          description: ponto.desc,
          openingHours: ponto.horario,
          isAccessibleForFree: /gratuit/i.test(ponto.entrada),
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Brasília',
            addressRegion: 'DF',
            addressCountry: 'BR',
          },
        },
      })),
    },
  ],
};

const bloco = [
  INICIO,
  '  <script type="application/ld+json">',
  JSON.stringify(dadosEstruturados, null, 2)
    .split('\n')
    .map((linha) => `  ${linha}`)
    .join('\n'),
  '  </script>',
  `  ${FIM}`,
].join('\n');

const html = readFileSync('index.html', 'utf8');
const inicio = html.indexOf(INICIO);
const fim = html.indexOf(FIM);
if (inicio === -1 || fim === -1) {
  console.error('Marcadores de dados estruturados não encontrados em index.html.');
  process.exit(1);
}
const htmlNovo = html.slice(0, inicio) + bloco + html.slice(fim + FIM.length);

const dataHoje = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}</loc>
    <lastmod>${dataHoje}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

if (apenasVerificar) {
  if (htmlNovo !== html) {
    console.error('index.html está desatualizado. Rode: npm run seo');
    process.exit(1);
  }
  console.log('Dados estruturados em dia.');
} else {
  writeFileSync('index.html', htmlNovo);
  writeFileSync('sitemap.xml', sitemap);
  console.log(`index.html e sitemap.xml atualizados com ${pontos.length} pontos.`);
}

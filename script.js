/* ── DATA ───────────────────────────────────────────────────────── */
const pontos = [
  { id:0, nome:"Congresso Nacional",                tag:"Historia",    tagClass:"tag-historia",
    wikis:['en:Palace_of_the_National_Congress','pt:Congresso_Nacional_do_Brasil'],
    desc:"Símbolo da democracia brasileira, o Congresso Nacional foi projetado por Oscar Niemeyer e inaugurado em 1960. As duas cúpulas — uma côncava (Senado) e uma convexa (Câmara) — são ícones do modernismo mundial.",
    rating:"★★★★★", horario:"Seg–Sex 9h–17h", entrada:"Gratuita", dica:"Tours guiados disponíveis", color:"#4a90d9",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0d2240"/><stop offset="1" stop-color="#040c18"/></linearGradient></defs><rect width="300" height="200" fill="url(#g1)"/><circle cx="20" cy="20" r="1" fill="white" opacity=".6"/><circle cx="140" cy="30" r="1" fill="white" opacity=".7"/><circle cx="260" cy="25" r="1.5" fill="white" opacity=".6"/><rect x="40" y="150" width="220" height="8" rx="2" fill="#1a3a6e"/><rect x="60" y="140" width="180" height="12" rx="1" fill="#1e4080"/><rect x="90" y="80" width="120" height="62" fill="#1a3a6e"/><ellipse cx="118" cy="82" rx="28" ry="12" fill="#4a90d9" opacity=".9"/><ellipse cx="118" cy="82" rx="20" ry="8" fill="#2a5fa8"/><ellipse cx="182" cy="78" rx="28" ry="16" fill="#4a90d9" opacity=".9"/><ellipse cx="182" cy="74" rx="20" ry="10" fill="#2a5fa8"/><rect x="60" y="160" width="180" height="40" fill="#061528" opacity=".8"/></svg>` },

  { id:1, nome:"Catedral Metropolitana",             tag:"Cultura",    tagClass:"tag-cultura",
    wikis:['en:Cathedral_of_Brasília','pt:Catedral_de_Brasília'],
    desc:"Uma obra-prima de Niemeyer: 16 colunas de concreto inclinadas formam um hiperbólico de vidro e aço. O interior inunda de luz colorida pelos vitrais de Marianne Peretti — uma experiência transcendente.",
    rating:"★★★★★", horario:"Ter–Dom 8h–18h", entrada:"Gratuita", dica:"Missa dominical às 10h", color:"#1de9b6",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#001a2c"/><stop offset="1" stop-color="#040c18"/></linearGradient><radialGradient id="g2r" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#1de9b6" stop-opacity=".3"/><stop offset="1" stop-color="transparent"/></radialGradient></defs><rect width="300" height="200" fill="url(#g2)"/><circle cx="150" cy="160" r="100" fill="url(#g2r)"/><g stroke="#1de9b6" stroke-width="2" fill="none" opacity=".9"><path d="M150 40 Q130 120 110 160"/><path d="M150 40 Q170 120 190 160"/><path d="M150 40 Q115 100 95 160"/><path d="M150 40 Q185 100 205 160"/><path d="M150 40 Q105 90 85 155"/><path d="M150 40 Q195 90 215 155"/></g><ellipse cx="150" cy="130" rx="65" ry="50" fill="rgba(29,233,182,.07)" stroke="#1de9b6" stroke-width="1"/><line x1="150" y1="20" x2="150" y2="5" stroke="white" stroke-width="2"/><line x1="145" y1="12" x2="155" y2="12" stroke="white" stroke-width="2"/></svg>` },

  { id:2, nome:"Torre de TV de Brasília",            tag:"Lazer",      tagClass:"tag-lazer",
    wikis:['en:Brasília_TV_Tower','pt:Torre_de_TV_de_Brasília'],
    desc:"Com 224 metros de altura, a Torre de TV oferece um mirante com vista 360° da capital federal. É o ponto ideal para contemplar o traçado em forma de avião do Plano Piloto e o pôr do sol sobre o Lago Paranoá.",
    rating:"★★★★☆", horario:"Ter–Dom 9h–20h", entrada:"Gratuita", dica:"Melhor horário: pôr do sol", color:"#74b0ff",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g3" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0a1628"/><stop offset="1" stop-color="#040c18"/></linearGradient></defs><rect width="300" height="200" fill="url(#g3)"/><ellipse cx="150" cy="200" rx="200" ry="100" fill="rgba(255,120,50,.12)"/><polygon points="135,170 165,170 158,80 142,80" fill="#1a3a6e"/><rect x="128" y="65" width="44" height="18" rx="4" fill="#2a5fa8"/><rect x="130" y="63" width="40" height="4" rx="2" fill="#74b0ff"/><polygon points="142,80 158,80 155,20 145,20" fill="#1e4080"/><circle cx="150" cy="18" r="4" fill="#74b0ff"/><line x1="150" y1="14" x2="150" y2="2" stroke="#74b0ff" stroke-width="1.5"/><circle cx="150" cy="2" r="2" fill="red"/></svg>` },

  { id:3, nome:"Parque Nacional de Brasília",        tag:"Natureza",   tagClass:"tag-natureza",
    wikis:['direct:https://commons.wikimedia.org/wiki/Special:FilePath/Parque_Nacional_de_Brasilia_-_piscina_pedreira_vista.jpg?width=800'],
    desc:"Conhecido como 'Água Mineral', o parque preserva 42.355 hectares de Cerrado nativo com piscinas naturais, trilhas ecológicas e rica biodiversidade. Um refúgio verde no coração da capital.",
    rating:"★★★★★", horario:"Diário 8h–16h", entrada:"R$ 15", dica:"Leve protetor solar e água", color:"#1de9b6",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g4" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#051a10"/><stop offset="1" stop-color="#040c18"/></linearGradient></defs><rect width="300" height="200" fill="url(#g4)"/><polygon points="0,130 60,70 120,130" fill="#0a2a18"/><polygon points="80,130 150,60 220,130" fill="#0d3320"/><polygon points="160,130 240,75 300,130" fill="#0a2a18"/><g fill="#1a5c30"><ellipse cx="50" cy="120" rx="18" ry="14"/><ellipse cx="90" cy="112" rx="15" ry="12"/><ellipse cx="130" cy="108" rx="20" ry="15"/><ellipse cx="175" cy="115" rx="16" ry="13"/><ellipse cx="220" cy="118" rx="18" ry="14"/></g><ellipse cx="150" cy="170" rx="80" ry="22" fill="rgba(29,233,182,.25)"/><ellipse cx="150" cy="170" rx="60" ry="16" fill="rgba(29,233,182,.15)"/></svg>` },

  { id:4, nome:"Pontão do Lago Sul",                 tag:"Gastronomia",tagClass:"tag-gastronomia",
    wikis:['en:Lake_Paranoá','pt:Lago_Paranoá'],
    desc:"O centro gastronômico e de lazer às margens do Lago Paranoá reúne restaurantes sofisticados, bares à beira d'água e música ao vivo. Um dos pontos mais animados para curtir o fim de semana brasiliense.",
    rating:"★★★★☆", horario:"Diário 12h–00h", entrada:"Gratuita", dica:"Reservas recomendadas p/ jantares", color:"#ff9f43",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g5" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0d1a2a"/><stop offset="1" stop-color="#040c18"/></linearGradient></defs><rect width="300" height="200" fill="url(#g5)"/><rect x="0" y="120" width="300" height="80" fill="rgba(255,120,50,.12)"/><rect x="30" y="80" width="50" height="50" rx="4" fill="#1a2a40"/><rect x="90" y="70" width="40" height="60" rx="4" fill="#1a2a40"/><rect x="170" y="75" width="55" height="55" rx="4" fill="#1a2a40"/><rect x="120" y="130" width="60" height="6" rx="2" fill="#223355"/><ellipse cx="220" cy="148" rx="20" ry="7" fill="#2a4070"/></svg>` },

  { id:5, nome:"Museu Nacional Honestino Guimarães", tag:"Cultura",    tagClass:"tag-cultura",
    wikis:['pt:Complexo_Cultural_da_República','pt:Complexo_Cultural_da_República_João_Herculino'],
    desc:"Outro projeto visionário de Niemeyer, o museu tem formato de cúpula branca e abriga exposições permanentes e temporárias de arte, ciência e história. Um dos maiores museus da América Latina.",
    rating:"★★★★★", horario:"Qua–Dom 9h–18h30", entrada:"R$ 10 (Qua gratuito)", dica:"Exposições temporárias imperdíveis", color:"#c89fff",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g6" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0e0a20"/><stop offset="1" stop-color="#040c18"/></linearGradient><radialGradient id="g6r" cx="50%" cy="70%" r="60%"><stop offset="0" stop-color="#c89fff" stop-opacity=".15"/><stop offset="1" stop-color="transparent"/></radialGradient></defs><rect width="300" height="200" fill="url(#g6)"/><rect width="300" height="200" fill="url(#g6r)"/><ellipse cx="150" cy="162" rx="110" ry="20" fill="#1a1030"/><ellipse cx="150" cy="120" rx="90" ry="75" fill="#f0eef8"/><ellipse cx="150" cy="120" rx="88" ry="73" fill="#e8e6f5"/><ellipse cx="150" cy="145" rx="90" ry="20" fill="rgba(0,0,0,.3)"/><rect x="130" y="148" width="40" height="22" rx="3" fill="#1a1030"/></svg>` },

  { id:6, nome:"Palácio do Itamaraty",               tag:"Historia",   tagClass:"tag-historia",
    wikis:['en:Itamaraty_Palace','pt:Palácio_do_Itamaraty'],
    desc:"Sede do Ministério das Relações Exteriores, o Itamaraty é considerado a obra-prima de Oscar Niemeyer. Arcos monumentais refletem no espelho d'água, combinando arquitetura modernista com obras de arte excepcionais.",
    rating:"★★★★★", horario:"Seg–Sex 14h–17h (visitas guiadas)", entrada:"Gratuita", dica:"Agendamento obrigatório online", color:"#f5c842",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g7" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#0d1a0d"/><stop offset="1" stop-color="#040c18"/></linearGradient></defs><rect width="300" height="200" fill="url(#g7)"/><rect x="0" y="140" width="300" height="60" fill="rgba(13,30,60,.8)"/><g fill="none" stroke="#f5c842" stroke-width="3"><path d="M50 140 Q50 80 90 80 Q130 80 130 140"/><path d="M90 140 Q90 70 130 70 Q170 70 170 140"/><path d="M130 140 Q130 70 170 70 Q210 70 210 140"/><path d="M170 140 Q170 80 210 80 Q250 80 250 140"/></g><rect x="50" y="80" width="200" height="62" fill="rgba(20,40,20,.6)"/><rect x="45" y="75" width="210" height="8" rx="2" fill="#2a4a20"/><g fill="none" stroke="#f5c842" stroke-width="1.5" opacity=".4"><path d="M50 140 Q50 175 90 175 Q130 175 130 140"/><path d="M90 140 Q90 178 130 178 Q170 178 170 140"/></g></svg>` },

  { id:7, nome:"Jardim Botânico de Brasília",        tag:"Natureza",   tagClass:"tag-natureza",
    wikis:['en:Brasília_Botanical_Garden','pt:Jardim_Botânico_de_Brasília'],
    desc:"Um dos maiores jardins botânicos do mundo, com 4.516 hectares preservando espécies nativas do cerrado. O estufa em forma de pirâmide de vidro abriga plantas de todos os biomas brasileiros.",
    rating:"★★★★☆", horario:"Ter–Dom 9h–17h", entrada:"R$ 5", dica:"Melhor época: abril a setembro", color:"#1de9b6",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g8" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#051a10"/><stop offset="1" stop-color="#040c18"/></linearGradient></defs><rect width="300" height="200" fill="url(#g8)"/><polygon points="150,30 220,150 80,150" fill="rgba(29,233,182,.08)" stroke="#1de9b6" stroke-width="1.5"/><line x1="150" y1="30" x2="150" y2="150" stroke="#1de9b6" stroke-width=".8" opacity=".4"/><ellipse cx="150" cy="130" rx="25" ry="18" fill="rgba(20,100,50,.5)"/><g fill="#0d3a1a"><ellipse cx="30" cy="140" rx="22" ry="18"/><ellipse cx="270" cy="142" rx="18" ry="14"/></g></svg>` },

  { id:8, nome:"Memorial JK",                        tag:"Historia",   tagClass:"tag-historia",
    wikis:['en:Memorial_JK','pt:Memorial_JK'],
    desc:"Homenagem ao presidente Juscelino Kubitschek, fundador de Brasília. O memorial abriga o túmulo de JK, seu acervo pessoal, documentos históricos e esculturas monumentais. Um tributo à visão que criou a capital.",
    rating:"★★★★☆", horario:"Ter–Dom 9h–18h", entrada:"R$ 12", dica:"Tour noturno às sextas-feiras", color:"#c89fff",
    svg:`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g9" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#100a1a"/><stop offset="1" stop-color="#040c18"/></linearGradient></defs><rect width="300" height="200" fill="url(#g9)"/><circle cx="250" cy="35" r="20" fill="rgba(200,159,255,.15)"/><polygon points="150,20 165,160 135,160" fill="#2a1a4a"/><polygon points="150,20 160,160 150,160" fill="#3a2560"/><polygon points="150,12 152,18 158,18 153,22 155,28 150,24 145,28 147,22 142,18 148,18" fill="#c89fff" opacity=".9"/><circle cx="150" cy="100" r="14" fill="#3a2560" stroke="#c89fff" stroke-width="1" opacity=".7"/><rect x="110" y="155" width="80" height="15" rx="3" fill="#2a1a4a"/><rect x="100" y="168" width="100" height="10" rx="2" fill="#1e1030"/><text x="150" y="164" text-anchor="middle" fill="rgba(200,159,255,.6)" font-size="5" font-family="serif">JUSCELINO KUBITSCHEK</text></svg>` },
];

const galleryItems = [
  { wikis:['en:Palace_of_the_National_Congress','pt:Congresso_Nacional_do_Brasil'],    label:'Congresso Nacional',       tall:true  },
  { wikis:['en:Cathedral_of_Brasília','pt:Catedral_de_Brasília'],                       label:'Catedral Metropolitana'               },
  { wikis:['en:Brasília_TV_Tower','pt:Torre_de_TV_de_Brasília'],                        label:'Torre de TV'                          },
  { wikis:['en:Palácio_do_Planalto','pt:Palácio_do_Planalto'],                          label:'Palácio do Planalto',      tall:true  },
  { wikis:['en:Lake_Paranoá','pt:Lago_Paranoá'],                                        label:'Lago Paranoá'                         },
  { wikis:['en:Esplanade_of_the_Ministries','pt:Esplanada_dos_Ministérios'],            label:'Esplanada dos Ministérios', wide:true },
  { wikis:['pt:Complexo_Cultural_da_República','pt:Complexo_Cultural_da_República_João_Herculino'], label:'Museu Nacional'            },
  { wikis:['en:Itamaraty_Palace','pt:Palácio_do_Itamaraty'],                            label:'Palácio do Itamaraty'                 },
];

const dicas = [
  { title:"Clima",           text:"Brasília tem duas estações: seca (maio–setembro) e chuvosa (outubro–abril). A umidade cai muito no inverno — leve hidratante e água." },
  { title:"Transporte",      text:"A cidade é planejada para carros, mas o metrô conecta as principais áreas. Apps de mobilidade (99, Uber) funcionam muito bem." },
  { title:"Gastronomia",     text:"Além do Pontão, o Setor de Clubes Norte e o Lago Norte têm ótimos restaurantes. O pão de queijo e o pequi são obrigatórios!" },
  { title:"Passeios Grátis", text:"Congresso Nacional, Catedral, Palácio do Itamaraty, Torre de TV e Esplanada dos Ministérios são gratuitos para visitar." },
  { title:"Fotografia",      text:"O Eixo Monumental ao amanhecer e o espelho d'água do Itamaraty ao entardecer são os melhores spots para fotos." },
  { title:"Natureza",        text:"Reserve um dia para o Parque Nacional e outro para o Jardim Botânico — biodiversidade do cerrado que encanta qualquer visitante." },
  { title:"Cultura",         text:"A Funarte, o Cine Brasília e o Clube do Choro têm programação cultural intensa e acessível durante todo o ano." },
  { title:"Melhor Época",    text:"Maio a agosto: clima seco e agradável, céu azul intenso — perfeito para a arquitetura modernista brilhar nas fotos." },
];

/* ── WIKIPEDIA FETCHER ──────────────────────────────────────────── */
// Cache keyed by ponto ID or gallery label (not by title, since we try multiple)
const photoCache = {};

async function fetchWikiPhoto(cacheKey, sources) {
  if (photoCache[cacheKey] !== undefined) return photoCache[cacheKey];

  for (const source of sources) {
    // Direct Wikimedia Commons URL — skip API fetch entirely
    if (source.startsWith('direct:')) {
      const url = source.slice(7);
      photoCache[cacheKey] = url;
      return url;
    }

    const sep   = source.indexOf(':');
    const lang  = source.slice(0, sep);                 // 'pt' or 'en'
    const title = source.slice(sep + 1);                // article title
    try {
      const ctl = new AbortController();
      const tid = setTimeout(() => ctl.abort(), 5000);
      const r = await fetch(
        `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
        { signal: ctl.signal }
      );
      clearTimeout(tid);
      if (!r.ok) continue;
      const d = await r.json();
      const url = d.originalimage?.source || d.thumbnail?.source;
      if (!url) continue;

      // ── Quality filters ──────────────────────────────────────
      const lower = url.toLowerCase();
      // Reject vector graphics
      if (lower.includes('.svg')) continue;
      // Reject logos, icons, seals, coats of arms
      if (/logo|brand|icon|seal|bras[aã]o|marca|badge|escudo/i.test(lower)) continue;
      // Reject images too small to be real photos
      if (d.originalimage && d.originalimage.width < 400) continue;
      // ─────────────────────────────────────────────────────────

      photoCache[cacheKey] = url;
      return url;
    } catch { continue; }
  }

  photoCache[cacheKey] = null;
  return null;
}

/* ── FAVORITES ──────────────────────────────────────────────────── */
let favorites = new Set(JSON.parse(localStorage.getItem('brasilia3d_favorites') || '[]'));
function saveFavorites() { localStorage.setItem('brasilia3d_favorites', JSON.stringify([...favorites])); }
function toggleFavorite(id, btn) {
  if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
  saveFavorites();
  btn.classList.toggle('favorited', favorites.has(id));
  btn.textContent = favorites.has(id) ? '♥' : '♡';
  updateNavFav();
}
function updateNavFav() {
  const nav = document.getElementById('nav-fav');
  const cnt = document.getElementById('fav-nav-count');
  cnt.textContent = favorites.size;
  nav.style.display = favorites.size > 0 ? 'flex' : 'none';
}

/* ── FILTER + SEARCH ────────────────────────────────────────────── */
let currentFilter = 'todos', currentSearch = '';

window.setFilter = (btn, cat) => {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = cat;
  applyFilters();
};
window.searchCards = q => { currentSearch = q.toLowerCase().trim(); applyFilters(); };
window.filterFavorites = () => {
  if (currentFilter === '_fav') {
    setFilter(document.querySelector('.filter-btn[data-cat="todos"]'), 'todos');
  } else {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    currentFilter = '_fav';
    applyFilters();
    document.querySelector('#pontos').scrollIntoView({ behavior:'smooth' });
  }
};

function applyFilters() {
  let visible = 0;
  document.querySelectorAll('#cards-container .card').forEach(card => {
    const cat  = card.dataset.cat;
    const name = card.dataset.name;
    const id   = parseInt(card.dataset.id);
    const catOk  = currentFilter === 'todos' || cat === currentFilter
                || (currentFilter === '_fav' && favorites.has(id));
    const textOk = !currentSearch || name.includes(currentSearch);
    const show   = catOk && textOk;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  const cnt = document.getElementById('results-count');
  cnt.textContent = visible < pontos.length ? `${visible} resultado${visible !== 1 ? 's' : ''}` : '';
}

/* ── MODAL ──────────────────────────────────────────────────────── */
function openModal(p) {
  document.getElementById('modal-tag').innerHTML   = `<span class="card-tag ${p.tagClass}">${p.tag}</span>`;
  document.getElementById('modal-title').textContent = p.nome;
  document.getElementById('modal-desc').textContent  = p.desc;
  document.getElementById('modal-info').innerHTML    = `
    <span class="modal-pill"><strong>Horário</strong>${p.horario}</span>
    <span class="modal-pill"><strong>Entrada</strong>${p.entrada}</span>
    <span class="modal-pill"><strong>Dica</strong>${p.dica}</span>`;
  const img = document.getElementById('modal-photo');
  img.classList.remove('loaded');
  const cached = photoCache[p.id];
  if (cached) { img.src = cached; img.onload = () => img.classList.add('loaded'); }
  else img.src = '';
  document.getElementById('modal-overlay').classList.add('open');
}
window.closeModal = () => document.getElementById('modal-overlay').classList.remove('open');
document.getElementById('modal-overlay').addEventListener('click', e => { if (e.target===e.currentTarget) closeModal(); });

/* ── LIGHTBOX ───────────────────────────────────────────────────── */
function openLightbox(src, caption) {
  if (!src) return;
  document.getElementById('lightbox-img').src       = src;
  document.getElementById('lightbox-caption').textContent = caption;
  document.getElementById('lightbox-credit').textContent  = 'Foto: Wikimedia Commons (CC BY-SA)';
  document.getElementById('lightbox').classList.add('open');
}
window.closeLightbox = () => document.getElementById('lightbox').classList.remove('open');
document.getElementById('lightbox').addEventListener('click', e => { if (e.target===e.currentTarget) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key==='Escape') { closeModal(); closeLightbox(); closeMobileMenu(); } });

/* ── RENDER GALLERY ─────────────────────────────────────────────── */
const galleryGrid = document.getElementById('gallery-grid');
galleryItems.forEach(g => {
  const item = document.createElement('div');
  item.className = 'gallery-item' + (g.tall ? ' tall' : '') + (g.wide ? ' wide' : '');
  item.innerHTML = `<div class="gallery-skel"></div><div class="gallery-overlay"><span>${g.label}</span></div>`;
  item.addEventListener('click', () => openLightbox(photoCache[g.label], g.label));
  galleryGrid.appendChild(item);
  fetchWikiPhoto(g.label, g.wikis).then(url => {
    if (!url) return;
    const img = document.createElement('img');
    img.src = url; img.alt = g.label; img.loading = 'lazy';
    img.style.cssText = 'opacity:0;transition:opacity .5s;';
    item.prepend(img);
    img.onload = () => { img.style.opacity = '1'; item.querySelector('.gallery-skel')?.remove(); };
  });
});

/* ── RENDER CARDS ───────────────────────────────────────────────── */
const cardsContainer = document.getElementById('cards-container');
pontos.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'card reveal';
  card.dataset.cat  = p.tag;
  card.dataset.name = p.nome.toLowerCase();
  card.dataset.id   = p.id;
  card.style.transitionDelay = `${i * 0.06}s`;
  const isFav = favorites.has(p.id);
  card.innerHTML = `
    <div class="card-photo">
      <div class="photo-skeleton"></div>
      <img class="card-real-img" src="" alt="${p.nome}" loading="lazy">
      <div class="card-art" aria-hidden="true">${p.svg}</div>
      <div class="photo-credit">Wikimedia Commons · CC BY-SA</div>
      <button class="fav-btn ${isFav?'favorited':''}" aria-label="Favoritar ${p.nome}">${isFav?'♥':'♡'}</button>
    </div>
    <div class="card-body">
      <span class="card-tag ${p.tagClass}">${p.tag}</span>
      <h3>${p.nome}</h3>
      <p>${p.desc.slice(0,110)}…</p>
    </div>
    <div class="card-footer">
      <span>${p.horario}</span>
      <span class="rating">${p.rating}</span>
    </div>`;

  card.querySelector('.fav-btn').addEventListener('click', e => { e.stopPropagation(); toggleFavorite(p.id, e.currentTarget); });
  card.querySelector('.card-photo').addEventListener('click', e => { e.stopPropagation(); if (photoCache[p.id]) { openLightbox(photoCache[p.id], p.nome); } else openModal(p); });
  card.addEventListener('click', () => openModal(p));
  cardsContainer.appendChild(card);

  fetchWikiPhoto(p.id, p.wikis).then(url => {
    if (!url) { card.querySelector('.photo-skeleton')?.remove(); return; }
    const img = card.querySelector('.card-real-img');
    img.src = url;
    img.onload  = () => { img.classList.add('loaded'); card.querySelector('.card-art')?.classList.add('hidden'); card.querySelector('.photo-skeleton')?.remove(); };
    img.onerror = () => card.querySelector('.photo-skeleton')?.remove();
  });
});

/* ── RENDER DICAS ───────────────────────────────────────────────── */
const dicasContainer = document.getElementById('dicas-container');
dicas.forEach((d, i) => {
  const el = document.createElement('div');
  el.className = 'dica-card reveal';
  el.style.transitionDelay = `${i * 0.05}s`;
  el.innerHTML = `<div class="dica-num" aria-hidden="true">Nº ${String(i + 1).padStart(2, '0')}</div><h4>${d.title}</h4><p>${d.text}</p>`;
  dicasContainer.appendChild(el);
});

/* ── SCROLL / PROGRESS / BACK-TO-TOP ───────────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold:.08, rootMargin:'0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

const progressBar = document.getElementById('progress-bar');
const backTop     = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  const s = window.scrollY, t = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = t > 0 ? `${(s/t)*100}%` : '0%';
  backTop.classList.toggle('visible', s > 500);
}, { passive:true });

/* ── MOBILE MENU ────────────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});
window.closeMobileMenu = () => { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); };

updateNavFav();

/* ── CITY 3D CANVAS ─────────────────────────────────────────────── */
(function cityCanvas() {
  const canvas = document.getElementById('city-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, rotY = 0.5, autoRot = true, dragging = false, lastMX = 0, rafId = null;

  function resize() { const wrap = document.getElementById('city-canvas-wrapper'); W = canvas.width = wrap.clientWidth; H = canvas.height = wrap.clientHeight; }

  const ELEV=.50,CAM_D=14,FOV=210;
  const cosE=Math.cos(ELEV),sinE=Math.sin(ELEV);

  function proj(wx,wy,wz){
    const cy=Math.cos(rotY),sy=Math.sin(rotY);
    const rx=wx*cy-wz*sy,rz=wx*sy+wz*cy;
    const ryCam=-wy*cosE+rz*sinE,rzCam=wy*sinE+rz*cosE+CAM_D;
    if(rzCam<.1) return null;
    const s=FOV/rzCam;
    return{sx:W/2+rx*s,sy:H*.52+ryCam*s,depth:rzCam};
  }

  function hexRgb(h){const n=parseInt(h.replace('#',''),16);return[(n>>16)&255,(n>>8)&255,n&255];}
  function tint(hex,f){const[r,g,b]=hexRgb(hex);return`rgb(${Math.round(Math.min(255,r*f))},${Math.round(Math.min(255,g*f))},${Math.round(Math.min(255,b*f))})`;}
  function faceZ(pts){let s=0,n=0;pts.forEach(([x,y,z])=>{const p=proj(x,y,z);if(p){s+=p.depth;n++;}});return n?s/n:999;}
  function poly(pts3,fill,edge){const p2=pts3.map(([x,y,z])=>proj(x,y,z));if(p2.some(p=>!p))return;ctx.beginPath();ctx.moveTo(p2[0].sx,p2[0].sy);for(let i=1;i<p2.length;i++)ctx.lineTo(p2[i].sx,p2[i].sy);ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(edge){ctx.strokeStyle=edge;ctx.lineWidth=.7;ctx.stroke();}}

  function boxFaces(cx,cz,w,d,h,col,base=0){
    const x1=cx-w/2,x2=cx+w/2,z1=cz-d/2,z2=cz+d/2,y0=base,y1=base+h;
    return [{pts:[[x1,y1,z1],[x2,y1,z1],[x2,y1,z2],[x1,y1,z2]],c:tint(col,1.00)},{pts:[[x1,y0,z1],[x2,y0,z1],[x2,y1,z1],[x1,y1,z1]],c:tint(col,.68)},{pts:[[x1,y0,z2],[x2,y0,z2],[x2,y1,z2],[x1,y1,z2]],c:tint(col,.50)},{pts:[[x1,y0,z1],[x1,y0,z2],[x1,y1,z2],[x1,y1,z1]],c:tint(col,.58)},{pts:[[x2,y0,z1],[x2,y0,z2],[x2,y1,z2],[x2,y1,z1]],c:tint(col,.62)}].map(f=>({depth:faceZ(f.pts),draw(){poly(f.pts,f.c,'rgba(0,0,0,.22)');}}));
  }

  function discFace(cx,y,cz,r,col,N=24){const pts=Array.from({length:N},(_,i)=>{const a=(i/N)*Math.PI*2;return[cx+Math.cos(a)*r,y,cz+Math.sin(a)*r];});return{depth:faceZ(pts),draw(){poly(pts,col,tint(col,.55));}};}
  function domeFace(cx,y,cz,r,col){const corners=[[cx-r,y,cz-r],[cx+r,y,cz-r],[cx+r,y,cz+r],[cx-r,y,cz+r]];return{depth:faceZ(corners),draw(){const c=proj(cx,y,cz),e=proj(cx+r,y,cz);if(!c||!e)return;const rx=Math.abs(e.sx-c.sx),ry=rx*.52;const g=ctx.createRadialGradient(c.sx-rx*.15,c.sy-ry*.3,0,c.sx,c.sy,rx);g.addColorStop(0,tint(col,1.7));g.addColorStop(.5,col);g.addColorStop(1,tint(col,.42));ctx.beginPath();ctx.ellipse(c.sx,c.sy,Math.max(1,rx),Math.max(1,ry),0,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle=tint(col,.5);ctx.lineWidth=1;ctx.stroke();}};}
  function bowlFace(cx,y,cz,r,col){const corners=[[cx-r,y,cz-r],[cx+r,y,cz-r],[cx+r,y,cz+r],[cx-r,y,cz+r]];return{depth:faceZ(corners),draw(){const c=proj(cx,y,cz),e=proj(cx+r,y,cz);if(!c||!e)return;const rx=Math.abs(e.sx-c.sx),ry=rx*.45;const g=ctx.createRadialGradient(c.sx,c.sy,0,c.sx,c.sy,rx);g.addColorStop(0,tint(col,.30));g.addColorStop(.6,tint(col,.65));g.addColorStop(1,col);ctx.beginPath();ctx.ellipse(c.sx,c.sy,Math.max(1,rx),Math.max(1,ry),0,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle=tint(col,.7);ctx.lineWidth=1;ctx.stroke();}};}

  function drawWins(cx,cz,w,h,base,col){const z1=cz-w*.01;const p0=proj(cx-w/2,base,z1),p1=proj(cx+w/2,base,z1),p2=proj(cx+w/2,base+h,z1),p3=proj(cx-w/2,base+h,z1);if(!p0||!p1||!p2||!p3)return;const rows=Math.max(2,Math.floor(h*2.5)),cols=Math.max(2,Math.floor(w*2.2));const wc=col==='#d4a820'||col==='#f5c842'?'rgba(255,210,80,.75)':'rgba(185,220,255,.68)';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){if(((r*cols+c)*2654435761>>>0)%100>60)continue;const u=(c+.5)/cols,v=(r+.35)/rows;const bx=p0.sx+(p1.sx-p0.sx)*u,by=p0.sy+(p1.sy-p0.sy)*u,tx=p3.sx+(p2.sx-p3.sx)*u,ty=p3.sy+(p2.sy-p3.sy)*u;ctx.fillStyle=wc;ctx.fillRect(bx+(tx-bx)*v-1.5,by+(ty-by)*v-1.5,3,2.5);}}

  function lbl(cx,y,cz,text,col){const p=proj(cx,y,cz);if(!p||!text)return;ctx.save();ctx.font='bold 9px "Archivo",sans-serif';ctx.textAlign='center';const tw=ctx.measureText(text).width;ctx.fillStyle='rgba(4,10,22,.72)';ctx.fillRect(p.sx-tw/2-4,p.sy-11,tw+8,14);ctx.fillStyle=col;ctx.globalAlpha=.92;ctx.fillText(text,p.sx,p.sy);ctx.restore();}

  const CITY=[
    {t:'box',cx:7.0,cz:.5,w:.85,d:.85,h:3.8,col:'#2a5fa8',lbl:''},{t:'box',cx:8.2,cz:2.5,w:.65,d:.65,h:2.9,col:'#1e3a6e',lbl:''},{t:'box',cx:-7.2,cz:1.5,w:.8,d:.8,h:3.2,col:'#2a5fa8',lbl:''},{t:'box',cx:-8.5,cz:3.0,w:.65,d:.65,h:2.3,col:'#1e3a6e',lbl:''},{t:'box',cx:5.5,cz:-3.5,w:.6,d:.6,h:2.2,col:'#1e3a6e',lbl:''},{t:'box',cx:-5.0,cz:-4.0,w:.75,d:.75,h:1.9,col:'#2a3a5e',lbl:''},{t:'box',cx:6.5,cz:4.5,w:.7,d:.7,h:2.7,col:'#253060',lbl:''},{t:'box',cx:-6.5,cz:5.0,w:.85,d:.85,h:2.1,col:'#1e3a6e',lbl:''},{t:'box',cx:9.0,cz:-1.5,w:.55,d:.55,h:1.6,col:'#1a2a50',lbl:''},
    {t:'congress',cx:0.0,cz:0.0,w:5.5,d:1.5,h:.5,col:'#4a90d9',lbl:'Congresso Nacional'},
    {t:'tower',cx:-5.5,cz:-.5,w:.38,d:.38,h:7.5,col:'#74b0ff',lbl:'Torre de TV'},
    {t:'dome',cx:3.5,cz:-2.5,r:1.4,h:2.2,col:'#c89fff',lbl:'Museu Nacional'},
    {t:'box',cx:-2.0,cz:2.5,w:3.0,d:1.2,h:1.3,col:'#d4a820',lbl:'Palácio do Itamaraty'},
    {t:'box',cx:1.5,cz:3.2,w:3.2,d:1.1,h:.9,col:'#1dba9a',lbl:'Palácio do Planalto'},
    {t:'cathedral',cx:-1.5,cz:-3.2,r:1.1,h:3.0,col:'#1de9b6',lbl:'Catedral'},
  ];

  function collectFaces(){
    const faces=[];
    CITY.forEach(m=>{
      if(m.t==='box'){boxFaces(m.cx,m.cz,m.w,m.d,m.h,m.col).forEach(f=>faces.push(f));}
      else if(m.t==='congress'){boxFaces(m.cx,m.cz,m.w,m.d,m.h,m.col).forEach(f=>faces.push(f));faces.push(bowlFace(m.cx-m.w*.19,m.h,m.cz,.72,m.col));faces.push(domeFace(m.cx+m.w*.19,m.h+.05,m.cz,.82,tint(m.col,1.15)));}
      else if(m.t==='tower'){boxFaces(m.cx,m.cz,m.w*2.8,m.d*2.8,.12,tint(m.col,.45)).forEach(f=>faces.push(f));boxFaces(m.cx,m.cz,m.w,m.d,m.h*.64,tint(m.col,.75)).forEach(f=>faces.push(f));boxFaces(m.cx,m.cz,m.w*4.2,m.d*4.2,m.h*.07,m.col,m.h*.63).forEach(f=>faces.push(f));boxFaces(m.cx,m.cz,m.w*.65,m.d*.65,m.h*.29,tint(m.col,.85),m.h*.70).forEach(f=>faces.push(f));}
      else if(m.t==='dome'){boxFaces(m.cx,m.cz,m.r*.6,m.r*.6,.20,tint(m.col,.38)).forEach(f=>faces.push(f));faces.push(domeFace(m.cx,m.h*.82,m.cz,m.r,m.col));}
      else if(m.t==='cathedral'){faces.push(discFace(m.cx,.02,m.cz,m.r*1.15,tint(m.col,.22)));for(let i=0;i<16;i++){const a=(i/16)*Math.PI*2;boxFaces(m.cx+Math.cos(a)*m.r*.82,m.cz+Math.sin(a)*m.r*.82,.12,.12,m.h,tint(m.col,.88)).forEach(f=>faces.push(f));}faces.push(discFace(m.cx,m.h*.87,m.cz,m.r*.26,tint(m.col,1.1)));}
    });
    return faces;
  }

  const STARS=Array.from({length:130},()=>({x:Math.random(),y:Math.random()*.58,r:Math.random()*1.4+.3,ph:Math.random()*Math.PI*2}));

  function draw(){
    ctx.clearRect(0,0,W,H);
    const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#020810');sky.addColorStop(.65,'#050f22');sky.addColorStop(1,'#060d1c');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    const t=Date.now()*.001;
    STARS.forEach(s=>{const a=.25+.65*(.5+.5*Math.sin(t*.9+s.ph));ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${a.toFixed(2)})`;ctx.fill();});
    const gc=[[-14,0,-10],[14,0,-10],[14,0,9],[-14,0,9]].map(([x,y,z])=>proj(x,y,z));
    if(gc.every(p=>p)){const gg=ctx.createLinearGradient(W*.2,H*.35,W*.8,H);gg.addColorStop(0,'#091830');gg.addColorStop(1,'#040c18');ctx.beginPath();ctx.moveTo(gc[0].sx,gc[0].sy);gc.forEach(p=>ctx.lineTo(p.sx,p.sy));ctx.closePath();ctx.fillStyle=gg;ctx.fill();}
    ctx.save();ctx.globalAlpha=.08;ctx.strokeStyle='#4a90d9';ctx.lineWidth=.6;
    for(let gx=-12;gx<=12;gx+=2){const a=proj(gx,0,-10),b=proj(gx,0,9);if(a&&b){ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.stroke();}}
    for(let gz=-10;gz<=9;gz+=2){const a=proj(-12,0,gz),b=proj(12,0,gz);if(a&&b){ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);ctx.stroke();}}
    ctx.restore();
    const lk=[[3,0,2.5],[9,0,2.5],[9,0,9],[3,0,9]].map(([x,y,z])=>proj(x,y,z));
    if(lk.every(p=>p)){const lg=ctx.createLinearGradient(W*.55,H*.5,W*.9,H);lg.addColorStop(0,'rgba(13,80,220,.22)');lg.addColorStop(1,'rgba(5,40,130,.1)');ctx.beginPath();ctx.moveTo(lk[0].sx,lk[0].sy);lk.forEach(p=>ctx.lineTo(p.sx,p.sy));ctx.closePath();ctx.fillStyle=lg;ctx.fill();ctx.strokeStyle='rgba(30,120,255,.18)';ctx.lineWidth=1;ctx.stroke();}
    const faces=collectFaces();faces.sort((a,b)=>b.depth-a.depth);faces.forEach(f=>f.draw());
    CITY.filter(m=>m.t==='box'&&m.h>.95).forEach(m=>drawWins(m.cx,m.cz,m.w,m.h,0,m.col));
    const tw=CITY.find(m=>m.t==='tower');
    if(tw){const tp=proj(tw.cx,tw.h,tw.cz),ap=proj(tw.cx,tw.h+1.3,tw.cz);if(tp&&ap){ctx.beginPath();ctx.moveTo(tp.sx,tp.sy);ctx.lineTo(ap.sx,ap.sy);ctx.strokeStyle='#ddeeff';ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle=Math.sin(t*3)>0?'#ff2222':'#881111';ctx.beginPath();ctx.arc(ap.sx,ap.sy,2.5,0,Math.PI*2);ctx.fill();}}
    CITY.forEach(m=>{if(!m.lbl)return;const ly=m.t==='tower'?m.h+1.6:m.t==='dome'?m.h+.5:m.t==='cathedral'?m.h+.6:m.h+.45;lbl(m.cx,ly,m.cz,m.lbl,m.col);});
    if(autoRot) rotY+=.003;
    rafId = requestAnimationFrame(draw);
  }

  // Pausa o loop quando a aba não está visível — economiza CPU e bateria.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }
    else if (rafId === null) { draw(); }
  });

  canvas.addEventListener('mousedown',e=>{dragging=true;autoRot=false;lastMX=e.clientX;});
  window.addEventListener('mousemove',e=>{if(!dragging)return;rotY+=(e.clientX-lastMX)*.006;lastMX=e.clientX;});
  window.addEventListener('mouseup',()=>{dragging=false;autoRot=true;});
  canvas.addEventListener('touchstart',e=>{dragging=true;autoRot=false;lastMX=e.touches[0].clientX;},{passive:true});
  window.addEventListener('touchmove',e=>{if(!dragging)return;rotY+=(e.touches[0].clientX-lastMX)*.006;lastMX=e.touches[0].clientX;},{passive:true});
  window.addEventListener('touchend',()=>{dragging=false;autoRot=true;});
  new ResizeObserver(resize).observe(document.getElementById('city-canvas-wrapper'));
  resize(); draw();
})();

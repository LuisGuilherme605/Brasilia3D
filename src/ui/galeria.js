// Mosaico de fotos. Cada item começa como esqueleto e recebe a foto quando ela chega.

import { $, criarElemento } from '../nucleo/dom.js';
import { buscarFoto, fotoEmCache } from '../nucleo/wikimedia.js';
import { abrirLightbox } from './lightbox.js';

export function iniciarGaleria(itens) {
  const grade = $('#gallery-grid');
  if (!grade) return;

  const fragmento = document.createDocumentFragment();

  for (const item of itens) {
    const classes = ['gallery-item', item.tall && 'tall', item.wide && 'wide']
      .filter(Boolean)
      .join(' ');
    const figura = criarElemento('button', {
      classe: classes,
      atributos: { type: 'button', 'aria-label': `Ampliar foto: ${item.label}` },
      html: '<div class="gallery-skel"></div><div class="gallery-overlay"><span></span></div>',
    });
    figura.querySelector('.gallery-overlay span').textContent = item.label;
    figura.addEventListener('click', () => abrirLightbox(fotoEmCache(item.label), item.label));
    fragmento.append(figura);

    buscarFoto(item.label, item.wikis).then((url) => {
      if (!url) return;
      const img = criarElemento('img', {
        atributos: { alt: item.label, loading: 'lazy', decoding: 'async' },
      });
      img.classList.add('gallery-img');
      // onload antes do src: com a foto em cache o load dispara na hora, e
      // ligando depois o esqueleto nunca sairia e a imagem ficaria oculta.
      const mostrar = () => {
        img.classList.add('carregada');
        figura.querySelector('.gallery-skel')?.remove();
      };
      img.onload = mostrar;
      figura.prepend(img);
      img.src = url;
      if (img.complete && img.naturalWidth > 0) mostrar();
    });
  }

  grade.append(fragmento);
}

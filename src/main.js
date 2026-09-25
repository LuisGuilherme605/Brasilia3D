// Ponto de entrada: liga os dados aos módulos de interface.

import { pontos } from './dados/pontos.js';
import { itensGaleria } from './dados/galeria.js';
import { dicas } from './dados/dicas.js';
import { iniciarModal } from './ui/modal.js';
import { iniciarLightbox } from './ui/lightbox.js';
import { iniciarGaleria } from './ui/galeria.js';
import { iniciarCards } from './ui/cards.js';
import { iniciarDicas } from './ui/dicas.js';
import { iniciarNavegacao } from './ui/navegacao.js';
import { iniciarSkyline } from './skyline/index.js';
import { iniciarJornada } from './ui/jornada.js';

iniciarModal();
iniciarLightbox();
iniciarJornada();
iniciarGaleria(itensGaleria);
iniciarCards(pontos);
iniciarDicas(dicas);
iniciarNavegacao();
iniciarSkyline();

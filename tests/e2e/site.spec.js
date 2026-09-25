import { test, expect } from '@playwright/test';

// As fotos vêm da Wikipédia. Nos testes a chamada é interceptada para o
// resultado não depender da rede nem da disponibilidade da API.
test.beforeEach(async ({ page }) => {
  await page.route('**/*.wikipedia.org/**', (rota) =>
    rota.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );
  await page.goto('/');
});

test('renderiza os nove pontos turísticos', async ({ page }) => {
  await expect(page.locator('#cards-container .card')).toHaveCount(9);
});

test('a busca ignora acentos', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Buscar ponto turístico' }).fill('brasilia');
  const visiveis = page.locator('#cards-container .card:not(.hidden)');
  await expect(visiveis).toHaveCount(3);
  await expect(page.locator('#results-count')).toHaveText('3 resultados');
});

test('a busca sem resultado avisa o visitante', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Buscar ponto turístico' }).fill('xyz');
  await expect(page.locator('#results-count')).toHaveText('Nenhum ponto encontrado');
});

test('o filtro por categoria mostra apenas a categoria escolhida', async ({ page }) => {
  await page.getByRole('button', { name: 'Natureza', exact: true }).click();
  const visiveis = page.locator('#cards-container .card:not(.hidden)');
  await expect(visiveis).toHaveCount(2);
  await expect(visiveis.first()).toContainText('Natureza');
});

test('o modal abre, prende o foco e fecha no Esc', async ({ page }) => {
  await page.locator('#cards-container .card').first().click();
  const modal = page.locator('#modal-overlay');
  await expect(modal).toHaveClass(/open/);
  await expect(page.locator('#modal-title')).toHaveText('Congresso Nacional');
  await expect(page.locator('#modal-close')).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(modal).not.toHaveClass(/open/);
});

test('o favorito persiste depois de recarregar a página', async ({ page }) => {
  await page.locator('#cards-container .card .fav-btn').first().click();
  await expect(page.locator('#fav-nav-count')).toHaveText('1');

  await page.reload();
  await expect(page.locator('#cards-container .card .fav-btn').first()).toHaveClass(/favorited/);
  await expect(page.locator('#nav-fav')).toBeVisible();
});

test('o atalho de favoritos filtra só o que foi marcado', async ({ page }) => {
  await page.locator('#cards-container .card .fav-btn').first().click();
  await page.locator('#nav-fav').click();
  await expect(page.locator('#cards-container .card:not(.hidden)')).toHaveCount(1);
});

test('o skyline desenha no canvas e gira pelo teclado', async ({ page }) => {
  const canvas = page.locator('#city-canvas');
  await canvas.scrollIntoViewIfNeeded();
  await expect(canvas).toBeVisible();

  const antes = await canvas.screenshot();
  await canvas.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(200);
  const depois = await canvas.screenshot();
  expect(Buffer.compare(antes, depois)).not.toBe(0);
});

test('o skip link leva direto para os pontos turísticos', async ({ page }) => {
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Pular para os pontos turísticos' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page).toHaveURL(/#pontos$/);
});

test('não registra erro de javascript nem violação de CSP', async ({ page }) => {
  const erros = [];
  page.on('pageerror', (erro) => erros.push(erro.message));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const texto = msg.text();
    // Falha de rede em recurso externo (fontes, fotos) não é erro da página.
    if (texto.includes('Failed to load resource') || texto.includes('net::')) return;
    erros.push(texto);
  });
  await page.reload();
  await page.waitForTimeout(1500);
  expect(erros).toEqual([]);
});

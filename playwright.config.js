import { defineConfig, devices } from '@playwright/test';

const PORTA = 4173;

// Permite apontar para um Chromium já instalado na máquina, sem baixar outro.
const chromiumLocal = process.env.PLAYWRIGHT_CHROMIUM_PATH;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORTA}`,
    trace: 'on-first-retry',
    ...(chromiumLocal ? { launchOptions: { executablePath: chromiumLocal } } : {}),
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `python3 -m http.server ${PORTA} --bind 127.0.0.1`,
    url: `http://127.0.0.1:${PORTA}`,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
  },
});

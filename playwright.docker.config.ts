import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', {open: 'never'}],
    ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://naveenautomationlabs.com/opencart/index.php',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    //connect to Docker Playwright server
    connectOptions:{
      wsEndpoint: 'ws://localhost:3000',
    },

    //httpCredentials is unique, no duplicates
    httpCredentials: {
      username: 'admin',
      password: 'admin'
    }
  },

  metadata: {
    appUsername: 'sk09@test.com',
    appPassword: 'test123'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chromium-docker',
      use: { 
        ...devices['Desktop Chrome']
      },
    },

    {
      name: 'Firefox-docker',
      use: { 
        ...devices['Desktop Firefox']
      },
    },

    {
      name: 'Webkit-docker',
      use: { 
        ...devices['Desktop Safari']
      },
    },

  ],

});

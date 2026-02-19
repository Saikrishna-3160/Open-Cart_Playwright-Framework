import { LoginPage } from '../pages/LoginPage.js';
import { test, expect } from '../fixtures/baseFixtures.js';

test('verify valid login @login', async ({homePage}) => {
    await expect(homePage.page).toHaveTitle('My Account');
});

test('verify invalid login', async ({page, baseURL}) => {
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    await loginPage.doLogin('abc@nal.com', 'test652');
    const errorMesg = await loginPage.getInvalidLoginMessage();
    expect(errorMesg).toContain('Warning: Your account has exceeded allowed number of login attempts.');
})
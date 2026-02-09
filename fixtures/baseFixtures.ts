import {test as base, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { log } from 'node:console';


type MyFixtures = {
    homePage: HomePage;
};

export const test = base.extend<MyFixtures> ({
    homePage: async ({page, baseURL}, userInfo, testInfo) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        const username = testInfo.project.metadata.appUsername;
        const password = testInfo.project.metadata.appPassword;

        const homePage = await loginPage.doLogin(username, password);
        expect(await homePage.isUserloggedIn()).toBeTruthy();

        await userInfo(homePage);
    }
})

export {expect};

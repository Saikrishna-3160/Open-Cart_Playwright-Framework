import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../utils/elementUtils.spec.js';
import {LoginPage} from '../pages/LoginPage.js';
import {ResultsPage} from '../pages/ResultsPage.js';

export class HomePage {

    //1. page locators/objects/object repo:
    readonly page: Page;
    private readonly eleUtil;
    private readonly loginLink: Locator;
    private readonly logoutLink: Locator;
    private readonly search: Locator;
    private readonly searchIcon: Locator;

    //2. page class constructor..
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.loginLink = page.getByRole('link', {name: 'Login'});
        this.logoutLink = page.getByRole('link', {name: 'Logout'});
        this.search = page.getByRole('textbox', {name: 'Search'});
        this.searchIcon = page.locator(`#search > span.input-group-btn > button.btn`)
    }

    //3. page actions/methods
    async isUserloggedIn(): Promise<boolean> {
        return await this.eleUtil.isVisible(this.logoutLink, 0);
    }

    async logout(): Promise<LoginPage> {
        await this.eleUtil.click(this.logoutLink, {timeout: 5000});
        await this.eleUtil.click(this.loginLink, {timeout: 5000});
        return new LoginPage(this.page);
    }

    async doSearch(searchKey: string): Promise<ResultsPage>{
        console.log('search key: ' + searchKey);
        await this.eleUtil.fill(this.search, searchKey);
        await this.eleUtil.click(this.searchIcon);
        return new ResultsPage(this.page);
    }

}
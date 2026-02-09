import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/elementUtils.spec.js';
import { HomePage } from '../pages/HomePage.js';
import {  RegisterPage} from '../pages/RegisterPage.js';

export class LoginPage{

    //1. page locators/objects/Object repo:
    private readonly page: Page;
    private readonly eleUtil;
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly warningMsg: Locator;
    private readonly registerLink: Locator;

    //2. page class constructor...
    constructor(page: Page){
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.warningMsg = page.locator('.alert.alert-danger.alert-dismissible');
        this.registerLink = page.getByText('Register', {exact: true});
    }

    /**
     * navigate to the login page
     */
    //3. page actions/methods:
    async goToLoginPage(baseURL: string | undefined) {
        await this.page.goto(`${baseURL}?route=account/login`);
    }

    /**
     * login to app using username/password
     * @param email
     * @param password 
     * @returns 
     */
    async doLogin(email: string, password: string): Promise<HomePage> {
        await this.eleUtil.fill(this.emailId, email);
        await this.eleUtil.fill(this.password, password);
        await this.eleUtil.click(this.loginBtn, {force: true, timeout: 5000});
        return new HomePage(this.page);
    }

    /**
     * get the warning message in case of invalid login
     * @returns 
     */
    async getInvalidLoginMessage(): Promise<string | null> {
        const errorMesg = await this.eleUtil.getText(this.warningMsg);
        console.log(`invalid login warning message: ${errorMesg}`);
        return errorMesg;
    }

    async navigateToRegistrationPage(): Promise<RegisterPage> {
        await this.eleUtil.click(this.registerLink, {force: true}, 1);
        return new RegisterPage(this.page);
    }
}
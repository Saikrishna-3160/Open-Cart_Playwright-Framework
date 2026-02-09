import {expect, Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/elementUtils.spec.js';

export class RegisterPage {

    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly newsletterYesRadio: Locator;
    private readonly newsletterNoRadio: Locator;
    private readonly agreeCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly successMsg: Locator;
    private readonly eleUtil;

    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);

        this.firstNameInput = page.locator(`#input-firstname`);
        this.lastNameInput = page.locator(`#input-lastname`);
        this.emailInput = page.locator(`#input-email`);
        this.telephoneInput = page.locator(`#input-telephone`);
        this.passwordInput = page.locator(`#input-password`);
        this.confirmPasswordInput = page.locator(`#input-confirm`);
        this.newsletterYesRadio = page.getByRole('radio', {name: 'Yes'});
        this.newsletterNoRadio = page.getByRole('radio', {name: 'No'});
        this.agreeCheckbox = page.locator(`[name="agree"]`);
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.successMsg = page.getByText('Your Account Has Been Created!', {exact: true});
    }
    
    async registerUser (firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        subscribeNewsletter: string
    ): Promise<boolean> {
        await this.eleUtil.fill(this.firstNameInput, firstName);
        await this.eleUtil.fill(this.lastNameInput, lastName);
        await this.eleUtil.fill(this.emailInput, email);
        await this.eleUtil.fill(this.telephoneInput, telephone);
        await this.eleUtil.fill(this.passwordInput, password);
        await this.eleUtil.fill(this.confirmPasswordInput, password);

        if (subscribeNewsletter === 'Yes') {
            await this.eleUtil.click(this.newsletterYesRadio);
        }
        else{
            await this.eleUtil.click(this.newsletterNoRadio);
        }

        await this.eleUtil.click(this.agreeCheckbox);
        await this.eleUtil.click(this.continueButton);
        return await this.eleUtil.isVisible(this.successMsg);
    }
    
    // async verifyAccountCreated() {
    //     await expect(this.successMsg).toBeVisible();
    // }

}
import {test, Locator, expect, Page, FrameLocator} from '@playwright/test';

type flexibleLocator = string | Locator;

export class ElementUtil{
    private page: Page;
    private defaultTimeout: number = 30000;

    constructor(page: Page, timeOut: number = 30000){
        this.page = page;
        this.defaultTimeout = timeOut;
    }

    /**
     * 
     * @param locator  this method is to convert the string to Locator else will return the sementic based locators
     * @returns 
     */
    private getLocator(locator: flexibleLocator, index?: number): Locator{
        if(typeof(locator) === 'string'){
            if (index) {
                return this.page.locator(locator).nth(index);
            }
            else{
                return this.page.locator(locator).first();
            }
        }
        else{
            if (index) {
                return locator.nth(index);
            }
            else{
                return locator.first();
            }
        }
    }

    /**
     * Click on an element
     * @param locator 
     * @param options 
     */
    async click(locator: flexibleLocator, options?: {force?: boolean; timeout?: number}, number?: number): Promise<void> {
        await this.getLocator(locator, number).click({
            force: options?.force,
            timeout: options?.timeout || this.defaultTimeout
        });
        console.log(`Clicked on the element : ${locator}`);
    }

    /**
     * Fill text into the element
     * @param locator 
     * @param text 
     */
    async fill(locator: flexibleLocator, text: string): Promise<void>{
        await this.getLocator(locator).fill(text, {timeout: this.defaultTimeout});
        console.log(`Filled the text ${text} into the element ${locator}`);        
    }

    /**
     * Double click on element
     * @param locator 
     */
    async dbclick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).dblclick({timeout: this.defaultTimeout});
        console.log(`Double clicked on the element : ${locator}`);
    }

    /**
     * Right click on the element
     * @param locator 
     */
    async rightClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).click({button: 'right', timeout: this.defaultTimeout});
        console.log(`Double clicked on the element : ${locator}`);
    }

    /**
     * Type text with delay {default delay: 200 ms}
     * @param locator 
     * @param text 
     * @param delay 
     */
    async type(locator: flexibleLocator, text: string, delay: number = 200): Promise<void> {
        await this.getLocator(locator).pressSequentially(text, {delay, timeout: this.defaultTimeout});
        console.log(`Typed text as human : ${text} into element : ${locator}`);
    }

    async clear(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).clear({timeout: this.defaultTimeout});
        console.log(`cleared the element : ${locator}`);
    }

    /**
     * Get the text context of an element
     */
    async getText(locator: flexibleLocator): Promise< string | null> {
        const text = await this.getLocator(locator).textContent({timeout: this.defaultTimeout});
        return text;
    }

    /**
     * Get the innertext of an element
     */
    async getInnerText(locator: flexibleLocator): Promise<string> {
        const text = await this.getLocator(locator).innerText({timeout: this.defaultTimeout});
        return text.trim();
    }

    /**
     * Get attribute value of an element
     */
    async getAttribute(locator: flexibleLocator, attributeName: string): Promise<string | null> {
        return await this.getLocator(locator).getAttribute(attributeName);  
    }

    /**
     * Get input value of an element
     */
    async getInputValue(locator: flexibleLocator): Promise<string | null> {
        return await this.getLocator(locator).inputValue({timeout: this.defaultTimeout});  
    }

    /**
     * Get all text context from multiple elements
     */
    async getAllInnerTexts(locator: flexibleLocator): Promise<string[]> {
        return await this.getLocator(locator).allInnerTexts();
    }

    //=========================Element Visibility & State Check ==================================//

    /**
     * Check element is visible
     */
    async isVisible(locator: flexibleLocator, index?: number): Promise<boolean> {
        try{
            await this.getLocator(locator, index).isVisible({timeout: this.defaultTimeout});
            return true;
        }
        catch{
            return false;
        }
    }

    /**
     * check element is hidden
     */
    async isHidden(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isHidden();
    }

    /**
     * Check element is enabled
     */
    async isEnabled(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isEnabled();
    }

    /**
     * Check element is disabled
     */
    async isDisabled(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isDisabled();
    }

    /**
     * Check element is checked (radio/checkbox)
     */
    async isChecked(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isChecked();
    }

    /**
     * Check element is editable
     */
    async isEditable(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isEditable({timeout: this.defaultTimeout
        });
    }

    //============================== Wait Utils =========================//

    /**
     * Wait for element to be visible
     */
    async waitForElementVisible(locator: flexibleLocator, timeOut: number = 5000): Promise<boolean> {
        try{
            await this.getLocator(locator).waitFor({state: 'visible', timeout: this.defaultTimeout});
            console.log('waited for element to be visible')
            return true;
        }
        catch{
            return false;
        }
    }

    /**
     * wait for element to be attached to DOM
     */
    async waitForElementAttached(locator: flexibleLocator, timeOut: number = 5000): Promise<boolean> {
        try{
            await this.getLocator(locator).waitFor({state: 'attached', timeout: this.defaultTimeout});
            console.log('waited for element to be attached')
            return true;
        }
        catch{
            return false;
        }
    }

    /**
     * wait for element to be detached from DOM
     */
    async waitForElementDetached(locator: flexibleLocator): Promise<boolean> {
        try{
            await this.getLocator(locator).waitFor({state: 'detached', timeout: this.defaultTimeout});
            console.log('waited for element to be detached');
            return true;
        }
        catch{
            return false;
        }
    }

    /**
     * wait for page load state
     */
    async waitForPageLoad(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
        console.log(`wait for page load state: ${state}`);
    }

    /**
     * wait for a specific timeout (static)
     */
    async sleep(timeOut: number): Promise<void> {
        this.page.waitForTimeout(timeOut);
        console.log(`waited for ${timeOut} ms`);
    }

    //============================== Drop Down Util / Select based Drop Downs ============================//

    async slectByText(locator: flexibleLocator, text: string) {
        await this.getLocator(locator).selectOption({label: text}, {timeout: this.defaultTimeout});
        console.log(`selected option ${text} from the drop down`);
    }

    async slectByValue(locator: flexibleLocator, value: string) {
        await this.getLocator(locator).selectOption({value: value}, {timeout: this.defaultTimeout});
        console.log(`selected option ${value} from the drop down`);
    }

    async slectByIndex(locator: flexibleLocator, index: number) {
        await this.getLocator(locator).selectOption({index: index}, {timeout: this.defaultTimeout});
        console.log(`selected option ${index} from the drop down`);
    }


    //================================== Scrolling =====================================//

    /**
     * Scroll to the element
     */
    async scrollToElement(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).scrollIntoViewIfNeeded({timeout: this.defaultTimeout});
    }

    /**
     * Scroll down to the bottom of the page
     */
    async scrollToBottomOfPage(): Promise<void> {
        await this.page.evaluate( () => {
            window.scrollTo(0, document.body.scrollHeight);
        })
    }

    /**
     * Scroll to the top of the Page
     */
    async scrollToTopOfPage(): Promise<void> {
        await this.page.evaluate( () => {
            window.scrollTo(0, 0);
        })
    }

    //================================= Select IFrame =========================================//
    
    /**
     * Select the iframe element
     */
    async getFrameLocator(page: Page, frameSelector: string): Promise<FrameLocator> {
        return page.frameLocator(frameSelector);
    }

    /**
    * Returns a nested FrameLocator
    * @param page Playwright Page
    * @param frameSelectors ordered iframe selectors (outer → inner)
    */
    async getNestedFrameLocator(page: Page, ...frameSelectors: string[]): Promise<FrameLocator> {
      if (frameSelectors.length === 0) {
        throw new Error('At least one iframe selector is required');
      }

    return frameSelectors.reduce<FrameLocator>(
       (current, selector, index) =>
          index === 0? page.frameLocator(selector): current.frameLocator(selector),
        null as unknown as FrameLocator
       );
    }
}


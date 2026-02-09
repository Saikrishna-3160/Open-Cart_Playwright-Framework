import {Locator, Page} from '@playwright/test';
import {ElementUtil} from '../utils/elementUtils.spec.js';
import {ProductInfoPage} from '../pages/ProductInfoPage.js';

export class ResultsPage {

    //1. page locators/objects/object repo:
    private readonly page: Page;
    private readonly eleUtil;
    private readonly results: Locator;


    //2. page class constructor..
    constructor(page: Page) {
        this.page = page;
        this.eleUtil = new ElementUtil(page);
        this.results = page.locator('.product-thumb');
        
    }

    //3. page actions/methods
    async searchResultsCount(): Promise<number> {
        return await this.results.count();
    }

    async selectProduct(productName: string): Promise<ProductInfoPage>{
        console.log(`===========product name: ${productName} =========`);
        await this.eleUtil.click(this.page.getByRole('link', {name: `${productName}`}));
        return new ProductInfoPage(this.page);
    }

}
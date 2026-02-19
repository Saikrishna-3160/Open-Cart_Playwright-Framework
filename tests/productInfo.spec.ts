import { test, expect } from '../fixtures/baseFixtures.js';
import { ResultsPage } from '../pages/ResultsPage.js';
import { ProductInfoPage } from '../pages/ProductInfoPage.js';

let search = [
    {searchkey: 'macbook', productname: 'MacBook Pro', imagecount: 4},
    {searchkey: 'macbook', productname: 'MacBook Air', imagecount: 4},
    {searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1', imagecount: 7}
];

for (let product of search){

    test(`verify product Headers ${product.productname}`, {tag: ['@product', '@sanity'], 
        annotation: [{type: 'epic', description: 'EPIC-100 Validate the products info'},
            {type: 'feature', description: 'Product page feature'},
            {type: 'story', description: 'US 50 - the selected product label is displayed'},
            {type: 'severity', description: 'High'},
            {type: 'owner', description: 'Sai krishna'}
        ]}, 
        async ({homePage}) => {

    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
    expect(await productInfoPage.getProductHeader()).toBe(product.productname);
    })
}

for (let product of search){

    test(`verify product Images ${product.productname} : ${product.imagecount}`, {tag: ['@product', '@sanity', '@search']}, async ({homePage}) => {

     let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
    expect(await productInfoPage.getProductImagesCount()).toBe(product.imagecount);
    })
}

test(`verify product MetaData`, async ({homePage}) => {

    let resultsPage: ResultsPage = await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');
    let actualProductFullDetails = await productInfoPage.getProductDetails();
    
    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('Brand')).toBe('Apple');
    expect.soft(actualProductFullDetails.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductFullDetails.get('Reward Points')).toBe('800');
    expect.soft(actualProductFullDetails.get('Availability')).toBe('Out Of Stock');
    })

test.skip(`verify product Pricing`, async ({homePage, page}) => {

    let resultsPage: ResultsPage = await homePage.doSearch('macbook');

    let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');
    let actualProductFullDetails = await productInfoPage.getProductDetails();
    
    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('price')).toBe('$2,000.00');
    await page.waitForTimeout(3000);
    expect.soft(actualProductFullDetails.get('extaxprice')).toBe('$2,000.00');
    })

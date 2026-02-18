
import { ResultsPage } from '../pages/ResultsPage.js';
import { test, expect } from '../fixtures/baseFixtures.js';

//data provider for product serach key and results count
let searchData = [
    {searchkey: 'macbook', resultscount: 3},
    {searchkey: 'imac', resultscount: 1},
    {searchkey: 'samsung', resultscount: 2},
    {searchkey: 'Dummy', resultscount: 0},
    {searchkey: 'canon', resultscount: 1}
];

for (let product of searchData) {
    test(`@search verify product search ${product.searchkey}`, async ({homePage}) => {

    let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
    expect(await resultsPage.searchResultsCount()).toBe(product.resultscount);
    })
}
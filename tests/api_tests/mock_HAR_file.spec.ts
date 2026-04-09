import {test, expect} from '@playwright/test';

test('Mock API from HAR file in Playwright', async ({page}) => {

    //Recording the HAR file
    await page.routeFromHAR('./har/fruits.har', {
        url: '*/**/api/v1/fruits',
        update: false
    });

    //Go to URL
    await page.goto('https://demo.playwright.dev./api-mocking/');
    await page.screenshot({path: './test-results/HARtest.png'});

    //Validate text
    await expect(page.getByText('Strawberry')).toBeVisible();
    await expect(page.getByText('Sharukh khan')).toBeVisible();
    await expect(page.getByText('Salman Khan')).toBeVisible();
    await expect(page.getByText('Irfan pathan')).toBeVisible();

});
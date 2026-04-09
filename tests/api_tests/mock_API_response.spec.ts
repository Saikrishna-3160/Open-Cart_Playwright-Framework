import {test, expect} from '@playwright/test';

test('Mock API response in Playwright', async ({page}) => {
    
    //Mock API response
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({name: 'Lion', id: 12});
        json.push({name: 'Tiger', id: 13});
        json.push({name: 'Leopard', id: 14});
        json.push({name: 'Jaguar', id: 15});

        await route.fulfill({response, json});
    });

    //Go to URL
    await page.goto('https://demo.playwright.dev/api-mocking/');
    await page.waitForTimeout(2000);
    await page.screenshot({path: './test-results/mock-APIresponse.png'});

    //Validate the text
    await expect(page.getByText('Lion')).toBeVisible();
    await expect(page.getByText('Tiger')).toBeVisible();
    await expect(page.getByText('Leopard')).toBeVisible();
    await expect(page.getByText('Jaguar')).toBeVisible();

});
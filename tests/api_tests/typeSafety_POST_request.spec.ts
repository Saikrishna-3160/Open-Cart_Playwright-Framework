import {test, expect} from '@playwright/test';

test.use({
    baseURL: process.env.API_BASE_URL
});

test('Create POST API request using type safety function', async ({request}) => {
    const requestBody = {
            "firstname": "Sai",
            "lastname": "Krishna",
            "totalprice": 1000,
            "depositpaid": true,    
            "bookingdates": {
                    "checkin": "2026-04-04",
                    "checkout": "2026-04-10"
                },
            "additionalneeds": "Breakfast"
        };

    const response = await request.post('/booking', {data: requestBody});

    const jsonResponse = await response.json();
    console.log('POST API response body ' + JSON.stringify(jsonResponse, null, 2));

    expect(response.status()).toBe(200);

});
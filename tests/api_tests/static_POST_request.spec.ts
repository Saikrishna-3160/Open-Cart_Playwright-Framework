import { test, expect } from "@playwright/test";
import fs, { rmSync } from 'fs';

const postAPIRequest = JSON.parse(
    fs.readFileSync('./schemas/POST_API_Request_static.json', 'utf-8')
);

test.use({
    baseURL: process.env.API_BASE_URL!
});

test(`Create POST API Request using static file`, async({request}) => {

    //Create POST API request
    const response = await request.post(`/booking`, {data: postAPIRequest});
    const jsonPostAPIresponse = await response.json();

    //Print the JSON response
    console.log('POST API response: ' + JSON.stringify(jsonPostAPIresponse, null, 2));

    //Validate the API response
    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe('OK');
    expect(response.headers()['content-type']).toContain('application/json');

    //Validate response property/key names
    expect(jsonPostAPIresponse.booking).toHaveProperty('firstname');
    expect(jsonPostAPIresponse.booking).toHaveProperty('lastname');
    expect(jsonPostAPIresponse.booking.bookingdates).toHaveProperty('checkin');
    expect(jsonPostAPIresponse.booking.bookingdates).toHaveProperty('checkout');

    //Validate API response body
    expect(jsonPostAPIresponse.bookingid).toBeGreaterThan(0);
    expect(jsonPostAPIresponse.booking.firstname).toBe('Sai');
    expect(jsonPostAPIresponse.booking.lastname).toBe('Krishna');
    expect(jsonPostAPIresponse.booking.bookingdates.checkin).toBe('2026-04-04');
    expect(jsonPostAPIresponse.booking.bookingdates.checkout).toBe('2026-04-10');

});
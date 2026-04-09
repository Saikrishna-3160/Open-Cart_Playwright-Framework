import {test, expect} from '@playwright/test';
import fs from 'fs';
import {formatAPIRequest} from '../../utils/API_helper.js';
import {faker} from '@faker-js/faker';

test.use({
    baseURL: process.env.API_BASE_URL!
});

test(`Create POST API Request using dynamic file`, async ({request}) => {

    const jsonTemplate = fs.readFileSync('./schemas/POST_API_Request_Dynamic.json', 'utf-8');

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalPrice = faker.number.int({min: 1000, max: 10000});

    const values = [firstname, lastname, totalPrice];

    const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

    //Create POST API Request
    const response = await request.post('/booking', {data: JSON.parse(postAPIRequest)});    

    //Print JSON API response
    const jsonPostAPIresponse = await response.json();
    console.log('POST API response' + JSON.stringify(jsonPostAPIresponse, null, 2));

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
    expect(jsonPostAPIresponse.booking.firstname).toBe(firstname);
    expect(jsonPostAPIresponse.booking.lastname).toBe(lastname);
    expect(jsonPostAPIresponse.booking.bookingdates.checkin).toBe('2026-04-04');
    expect(jsonPostAPIresponse.booking.bookingdates.checkout).toBe('2026-04-10');
})
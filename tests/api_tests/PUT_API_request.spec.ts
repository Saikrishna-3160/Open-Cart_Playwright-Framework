import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import fs from 'fs';

test.use({
    baseURL: process.env.API_BASE_URL,
});

const putAPIPayload = fs.readFileSync('./schemas/PUT_API_Request.json', 'utf-8');

test("Create PUT API Request using the id taken from the POST request", async ({ request, }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 1000, max: 10000 });

    const requestBody = {
        firstname: firstName,
        lastname: lastName,
        totalprice: totalPrice,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-04-04",
            checkout: "2026-04-10",
        },
        additionalneeds: "Breakfast",
    };

    const response = await request.post("/booking", { data: requestBody });

    const jsonResponse = await response.json();
    console.log("POST API response body " + JSON.stringify(jsonResponse, null, 2));

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");

    //Store the booking id from the response
    const bookingId = jsonResponse.bookingid;
    console.log("Booking Id: " + bookingId);

    //Generate the token
    const authPayload = {
        "username": process.env.auth_username,
        "password": process.env.auth_password
    }
    const authResponse = await request.post('/auth', { data: authPayload });

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");

    const authJsonResponse = await authResponse.json();
    const token = authJsonResponse.token;
    console.log('Token: ' + token);

    //PUT API request, updating the record
    const requestHeaders = {
        "Content-Type": "application/json",
        "Cookie": `token=${token}`
    }

    const putAPIresponse = await request.put(`/booking/${bookingId}`, {headers: requestHeaders, data: putAPIPayload});
    expect(putAPIresponse.status()).toBe(200);
    expect(putAPIresponse.statusText()).toBe("OK");

    const putAPIjsonResponse = await putAPIresponse.json();
    console.log("PUT API response body " + JSON.stringify(putAPIjsonResponse, null, 2));
});

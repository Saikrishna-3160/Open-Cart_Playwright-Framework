import { test, expect } from '@playwright/test';
import { request } from 'node:http';

const TOKEN = '8c9e30498814930457e700a131029ca872c5e5498da57a029cdbc26c127fb31c';

test('GET - fetch all the users', async ({request}) => {
    const response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});

test('GET - fetch a single user', async ({request}) => {
    const response = await request.get('https://gorest.co.in/public/v2/users/7795576', {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});

function getRandomEmail(): string {
    let randomValue= Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`
}

test(`POST - create a new user`, async ({request}) => {

    const requestBody = {
        "name": "PW Test user",
        "email": `pwtest${Date.now()}@mail.com`,
        "gender": "male",
        "status": "active"
    }

    const response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }, 
        data: requestBody
    })

    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);
})

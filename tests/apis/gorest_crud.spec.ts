import {test, expect} from '@playwright/test';
import { request } from 'node:http';

const TOKEN = '8c9e30498814930457e700a131029ca872c5e5498da57a029cdbc26c127fb31c';
const BASE_URL = 'https://gorest.co.in/public/v2/users';

//common headers:
const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': '*/*'
};

test('GET - fetch all the users', async ({request}) => {
    const response = await request.get(BASE_URL, {headers});
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});

test('POST - create a new user', async ({request}) => {
    const requestBody = {
        "name": "PW Test user",
        "email": `pwtest${Date.now()}@mail.com`,
        "gender": "male",
        "status": "active"
    }
    const response = await request.post(BASE_URL, {headers,
        data: requestBody
    });
    
    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);
})

test('PUT - update the user', async ({request}) => {
    const userId = 8368784;
    const requestBody = {
        "status": "inactive"
    }
    const response = await request.put(`${BASE_URL}/${userId}`, {headers,
        data: requestBody
    })
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
})

test('GET - fetch the single user', async ({request}) => {
    const userId = 8368784;
    const response = await request.get(`${BASE_URL}/${userId}`, {headers});
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});

test('DELETE - delete the user', async ({request}) => {
    const userId = 8363861;
    const response = await request.delete(`${BASE_URL}/${userId}`, {headers});
    expect(response.status()).toBe(204);
    //const data = await response.json(); //No content responses for 204
    console.log("User deleted successfully");
})


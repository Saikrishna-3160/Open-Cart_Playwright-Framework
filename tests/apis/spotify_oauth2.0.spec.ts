import {test, expect} from '@playwright/test';
import { request } from 'node:http';

const CLIENT_ID = '120135dc844f4a40a6248e123e316303';
const CLIENT_SECRET = '8620358323534275913361b86127871d';

let accessToken: string;

test.beforeEach(async ({request}) => {
    const response = await request.post('https://accounts.spotify.com/api/token', {
        headers: {
            'Content_Type': 'application/x-www-form-urlencoded'
        },
        form: {
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log('Token API response: ' + data);
    accessToken = data.access_token;
    console.log('Token : ===> ' + accessToken); 
});

test('get album', async ({request}) => {
    const response = await request.get('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

})

test('get tracks', async ({request}) => {
    const response = await request.get('https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

})
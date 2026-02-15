import {test, expect} from '@playwright/test';
import { request } from 'node:http';

const TOKEN = '8c9e30498814930457e700a131029ca872c5e5498da57a029cdbc26c127fb31c';
const BASE_URL = 'https://gorest.co.in/public/v2/users';
const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    'Action': '*/*'
};

test('e2e crud flow test', async ({request}) => {

    //Step 1: Create a new user
    const requestBody = {
        "name": "PW Test user",
        "email": `pwtest${Date.now()}@mail.com`,
        "gender": "male",
        "status": "active"
    }

    const POSTresponse = await request.post(BASE_URL, {headers,
        data: requestBody
    });
        
    expect(POSTresponse.status()).toBe(201);
    const createdUser = await POSTresponse.json();
    console.log(createdUser);
    const userId = await createdUser.id;
    console.log('Created User ID: ' + userId);
    console.log('User is created successfully');

    console.log("============GET CALL======================");

    //Step 2: Get the same user by using user id = userId
    const GETresponse = await request.get(`${BASE_URL}/${userId}`, {headers});

    expect(GETresponse.status()).toBe(200);
    const userDetails = await GETresponse.json();
    console.log(userDetails);
    expect(userId).toEqual(userDetails.id);
    console.log("User details fetched successfully");

    console.log("=============UPDATE CALL==================");

    //Step 3: Update the same user by using id = userId
    const updatedReqBody = {
        'name': 'PW Test Automation User',
        'status': 'inactive'
    };

    const PUTresponse = await request.put(`${BASE_URL}/${userId}`, {
        headers,
        data: updatedReqBody
    })

    expect(PUTresponse.status()).toBe(200);
    const updatedUserDetails = await PUTresponse.json();
    console.log(updatedUserDetails);
    console.log("User details updated successfully");

    console.log("=============DELETE CALL=====================")

    //Step 4: Delete the same user by using the user id = userId
    const DELETEresponse = await request.delete(`${BASE_URL}/${userId}`, {headers});
    expect(DELETEresponse.status()).toBe(204);
    console.log("User deleted successfully");

    console.log("============GET CALL======================");

    //Step 5: Get the same user by using user id = userId after deleting the user
    const GETresponseAfterDelete = await request.get(`${BASE_URL}/${userId}`, {headers});

    expect(GETresponseAfterDelete.status()).toBe(404);
    const deletedUserDetails = await GETresponseAfterDelete.json();
    console.log(deletedUserDetails);
    // expect(userId).toEqual(deletedUserDetails.id);
    // console.log("User details fetched successfully");

});
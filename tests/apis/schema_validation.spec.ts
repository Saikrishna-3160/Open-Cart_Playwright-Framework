import {test, expect} from '@playwright/test';
import {Ajv} from 'ajv';
import fs from 'fs';
import path from 'path';

const TOKEN = '8c9e30498814930457e700a131029ca872c5e5498da57a029cdbc26c127fb31c';
const BASE_URL = 'https://gorest.co.in/public/v2/users';

//setup ajv
const ajv = new Ajv();

//load the schema files:
const getUsersSchema = JSON.parse(fs.readFileSync(path.resolve('./schemas/getusersschema.json'), 'utf-8'));


test('GET - fetch all users', async ({request}) => {
    const response = await request.get(BASE_URL, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    //console.log(data);

    //validate the json scheama:
    const validate = ajv.compile(getUsersSchema);
    const isValid = validate(data);

    if(!isValid){
        console.log(`scheama errors: `, validate.errors); 
    }
    
    expect(isValid).toBe(true);
    console.log(`API response scheama is validated -- PASS`);
    
});
import {test,expect} from '@playwright/test';
import { JSONPath } from 'jsonpath-plus';

const BASE_URL = 'https://fakestoreapi.com/products';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

test('GET -- all the products test',async ({request}) => {
    const response = await request.get(BASE_URL, {headers});
    const data = await response.json();
    console.log(data);

    console.log('===================');

    //get all titles:
    const titles = JSONPath({path: '$[*].title', json: data});
    console.log(titles);

    console.log('===================');
    
    //get all Ids:
    const ids = JSONPath({path: '$[*].id', json: data});
    console.log(ids);

    console.log('===================');
    
    //get all Rates:
    const rates = JSONPath({path: '$[*].rating.rate', json: data});
    console.log(rates);

    //get all the products titles where category = 'jewelery'
    //$[?(@.category == 'jewelery')].title
    const jewelery = JSONPath({path: `$[?(@.category == 'jewelery')].title`, json: data});
    console.log(jewelery); 
})


// import { test, expect } from '../fixtures/dataFixtures.js';
// import { LoginPage } from '../pages/LoginPage.js'
// import { RegisterPage } from '../pages/RegisterPage.js';

// function getRandomEmail() : string{
//     const randomValue = Math.random().toString(36).substring(2, 9);
//     return `auto_${randomValue}@nal.com`;
// }

  
// test('Register a user from CSV', async ({ regData, page, baseURL }) => {
    
//     for (const user of regData) {
//         const loginPage = new LoginPage(page);
//                 await loginPage.goToLoginPage(baseURL);
//                 const registerPage: RegisterPage = await loginPage.navigateToRegistrationPage();
//                 const isUserRegistered: boolean = await registerPage.registerUser(
//                     user.firstName,
//                     user.lastName,
//                     getRandomEmail(),
//                     user.telephone,
//                     user.password, 
//                     user.subscribeNewsletter);
//                 expect(isUserRegistered).toBeTruthy();
//     }


// });



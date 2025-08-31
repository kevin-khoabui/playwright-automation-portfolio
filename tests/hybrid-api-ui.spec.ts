import { test, expect }  from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Hybrid API and UI Test', ()=>{
    // Store API details in varaibles
    const baseURL = 'https://practice.expandtesting.com/notes/api';
    let userToken; // To Store the authentication token

    

    test('should create a note via API and verify it in the UI', async ({request, page} )=> {
        //Generate random user details using faker
        const randomUser = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const randomNote = {
            title: faker.lorem.sentence(3),
            description: faker.lorem.paragraph(),
        };

        // 1. API SETUP 
        // Step 1: Register a new user via API
        await request.post(`${baseURL}/users/register`,{
            data: randomUser,
        });

        // Step 2: Login in as a new user to get authentication token
        const loginResponse = await request.post(`${baseURL}/users/login`,{
            data: {
                email: randomUser.email,
                password: randomUser.password,
            },
        });

     // UNCOMMENT THIS LINE: First, check if the response is successful
       //  expect(loginResponse.ok(), "Login API call failed").toBeTruthy();

        const loginResponseBody = await loginResponse.json();
        userToken = loginResponseBody.data.token; // Save the token

        // Step 3: Create a new note using the authentication token
        await request.post(`${baseURL}/notes`, {
        //const noteCreationResponse = await request.post(`${baseURL}/notes`, {
            headers:{
                'x-auth-token': userToken,
            },
            data: {
                title: randomNote.title,
                description: randomNote.description,
                category: 'Personal',
            },
        });

        // UNCOMMENT THIS LINE: Check if the note creation was successful
        // expect(noteCreationResponse.ok(), "Note creation API call failed").toBeTruthy();

        // === 2. UI VERIFICATION ===

        // Step 4: Go to the web app and inject the auth token into the browser
        await page.goto('https://practice.expandtesting.com/notes/app');
        await page.evaluate(token => {
            localStorage.setItem('token',token);
        }, userToken); // This is like loggin instantly

        // Step 5: Refresh the page to apply the token and load the notes
        await page.reload();

        // Step 6: Verify the newly created note is displayed in the UI
        const noteTitle = page.locator(`[data-testid="note-card-title"]:text-is("${randomNote.title}")`);
        const noteDescription = page.locator(`[data-testid="note-card-description"]:text-is("${randomNote.description}")`);

        await expect(noteTitle).toBeVisible();
        await expect(noteDescription).toBeVisible();
    })
})
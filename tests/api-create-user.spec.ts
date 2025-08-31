import { test, expect } from '@playwright/test';
test.describe('User Creation API',()=>{
    test('should create a new user successfully and return a 201 status code',async({
        request}) =>{
            //ACT: Send a POST request to create a new user
            const response = await request.post('https://reqres.in/api/users',{
                headers: {
                 'x-api-key': "reqres-free-v1" // We provide the token here
            },
                data: {
                    "name": "Kevin Khoa Bui",
                    "job": "Software QA Engineer"
                }
            });

            // ASSERT: Verify the response status code and body
            // 1. Verify the status code is 201
            expect(response.status()).toBe(201);

            // 2. Parse the response body from JSON format to JavaScript object
            const responseBody = await response.json();

            // 3. Verify the response body contains the expected data
            expect(responseBody.name).toBe('Kevin Khoa Bui');
            expect(responseBody.job).toBe('Software QA Engineer');
            expect(responseBody).toHaveProperty('id');
            expect(responseBody).toHaveProperty('createdAt');
    });
});
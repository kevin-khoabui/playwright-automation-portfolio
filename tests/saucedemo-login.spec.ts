import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';


test('should allow a user to log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Assertions is still in the test file
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Second, check that a unique element on the new page is visible.
    await expect(page.locator('.title').getByText('Products')).toBeVisible();
}
)

test('should show error message when  a user to log in with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page); // Create new instance of the class

    // 1. Navigate and SauceDemo login page
    await loginPage.goto()

    // 2. Full in the valid username and invalid password
    await loginPage.login('standard_user', 'invalid_secret_sauce');
    await loginPage.loginButton.click();
    
    // First, check the URL is correct.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // Second, check that a unique element on the new page is visible.
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
}
)
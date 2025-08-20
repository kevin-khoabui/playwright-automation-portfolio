import {test, expect} from '@playwright/test';
test('should allow a user to log in successfully', async ({ page }) => {
    // 1. Navigate and SauceDemo login page
    await page.goto('https://www.saucedemo.com/');
    // 2. Full in the username and password
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password','secret_sauce');
    await page.click('#login-button');

    // First, check the URL is correct.
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Second, check that a unique element on the new page is visible.
    await expect(page.locator('.title').getByText('Products')).toBeVisible();
}
)

test('should show error message when  a user to log in with invalid password', async ({ page }) => {
    // 1. Navigate and SauceDemo login page
    await page.goto('https://www.saucedemo.com/');
    // 2. Full in the username and password
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password','invalid_secret_sauce');
    await page.click('#login-button');

    // First, check the URL is correct.
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // Second, check that a unique element on the new page is visible.
    const errorLocator = page.locator('[data-test="error"]')
    await expect(errorLocator).toHaveText('Epic sadface: Username and password do not match any user in this service');
}
)
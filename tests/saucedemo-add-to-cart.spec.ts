import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sauce Demo Add to Cart Tests',() =>{

    test('should add an item to the cart successfully', async ({ page}) =>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        // 1. Navigate to the SauceDemo login page
        await loginPage.goto();

        // 2. Login with valid credentials
        await loginPage.login('standard_user', 'secret_sauce');

        // 3. Verify that the user is on the inventory page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.pageLogo).toBeVisible();

        // 4. Add the Sauce Labs Backpack to the cart
        await inventoryPage.addBackpackToCartButton.click();

        // 5. Verify that the cart icon is visible and has the correct number of items (1 item)
        await expect(inventoryPage.shoppingCartLink).toHaveText('1');

    });
});
// Import our custom 'test' and 'expect' from the fixtures file.

import { test, expect } from '../my-fixtures';;
import { HeaderPage } from '../pages/HeaderPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Logout Functionality',()=>{

    test('should logout successfully and redirect to login page', async({loggedInPage})=>{
        const headerPage = new HeaderPage(loggedInPage);
        const loginPage = new LoginPage(loggedInPage);

        await headerPage.logout();

        await expect(loggedInPage).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();
    });
});
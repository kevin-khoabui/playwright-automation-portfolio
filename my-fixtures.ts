import { test as base, type Page, type Locator} from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { InventoryPage } from './pages/InventoryPage';

// Define a new type for our custom fixtures
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    loggedInPage: Page; // This will be our speciall logged-in page
};

// Extend the base test with our custom fixtures
export const test = base.extend<MyFixtures>({
    // Define the loginPage fixture
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    // Define the inventoryPage fixture
    inventoryPage: async ({page},use)=>{
        await use(new InventoryPage(page));
    },

    // Define the logginInPage fixture
    loggedInPage: async({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');
        await use(page);
    },
});

export {expect} from '@playwright/test';
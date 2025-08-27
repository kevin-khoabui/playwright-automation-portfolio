// IMPORTANT: Import 'test' and 'expect' from our custom fixtures file, not from '@playwright/test'.
import { test, expect } from '../my-fixtures';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Add to Cart using Fixtures', () => {

    test('should add an item to the cart from a logged-in state', async ({ loggedInPage }) => {
        // This test starts on the inventory page because the 'loggedInPage' fixture already handled the login.
        const inventoryPage = new InventoryPage(loggedInPage);

        // ACT: Add the backpack to the cart
        await inventoryPage.addBackpackTocart();
        //await inventoryPage.addBackpackToCart();

        // ASSERT: Verify the shopping cart badge shows "1"
        await expect(inventoryPage.shoppingCartLink).toHaveText('1');
    });

});
import {type Page, type Locator} from '@playwright/test';

export class InventoryPage{
    // Class variables for the page and locators
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly shoppingCartLink: Locator;
    readonly addBackpackToCartButton: Locator;
    readonly pageLogo: Locator;

    constructor(page: Page){
        this.page = page;
        this.pageLogo = page.locator('.app_logo')
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        // A locator to find the "add to cart" button specifically for the "Sauce Labs Backpack" item
        this.addBackpackToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
    }
    
    // Method to add backpack item to the cart
    async addBackpackTocart() {
        await this.addBackpackToCartButton.click();
    }
}

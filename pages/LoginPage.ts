import {type Page, type Locator} from '@playwright/test';

export class LoginPage {
    // 1. Create class variables for the page and locators
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor (page: Page){
        // 2. Initialize the variables in the constructor
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // 3. Create a methods for the actions a user can perform async goto(){
    async goto() {
        // Navigate to the SauceDemo login page
        await this.page.goto('https://www.saucedemo.com/');
    }    

    async login(username, passsword){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(passsword);
        await this.loginButton.click();
    }
}
import {test, expect} from '@playwright/test';

test('should search for playwright and navigate to the official website', async({ page }) => {

    // 1. Navigate and dismiss login prompt
    await page.goto('https://google.com/');
    // getByRole is slightly better here because it's more specific than getByText
    //await page.getByRole('button', { name: 'Không đăng nhập' }).click();

    // 2. Handle the OPTIONAL login pop-up
    const loginPopup = page.getByRole('button', { name: 'Không đăng nhập' });

    // This 'if' statement is the key to fixing the flaky test.
    if (await loginPopup.isVisible()) {
        await loginPopup.click();
    }


    // 2. Search for "Playwright"
    const searchInput = page.locator('textarea[name="q"]');
    await searchInput.fill('Playwright');
    await searchInput.press('Enter');

    // 3. Wait for the results page and find the official link
    // We use a robust locator that looks for the link's destination
    const playwrightLink = page.locator('a[href="https://playwright.dev/"]');

    // 4. Click the link
    await playwrightLink.click();

    // 5. NOW that we have clicked, verify the URL
    // We also add a { timeout: 10000 } to give the page extra time to load
    await expect(page).toHaveURL("https://playwright.dev/", { timeout: 10000 });
});
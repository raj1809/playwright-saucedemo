// difference between getByRole and getByTestId? When would you use each?
// getByRole is used to locate by explicit and implicit accessibility attributes. It us used as it is the closest way to how users and assistive technology perceive the page.
// getByTestId is used to locate an element based on its data-testid attribute (other attributes can be configured).We can use test ids when we choose to use the test id methodology 
// or when we can't locate by role or text.

import { test, expect } from '@playwright/test'

test.describe('End to end test', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/')
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByTestId('password').fill('secret_sauce')
        await page.getByTestId('login-button').click()
    })

        test('1st Test : One End-To-End est', async ({ page }) => {
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click()
            await page.getByTestId('add-to-cart-sauce-labs-bike-light').click()
            await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2')
            await page.getByTestId('shopping-cart-link').click()
            await expect(page).toHaveURL(/\/cart\.html/)     
            await expect(page.getByTestId('inventory-item-name')).toHaveCount(2)
            await page.getByTestId('checkout').click()
            await page.getByPlaceholder('First Name').fill('John')
            await page.getByPlaceholder('Last Name').fill('Cena')
            await page.getByTestId('postalCode').fill('12345')
            await page.getByTestId('continue').click()
            await expect(page).toHaveURL(/\/checkout-step-two\.html/)
            await page.getByTestId('finish').click()
            await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!')
        })

        test('2nd Test: Add a product, then remove it from the inventory page, assert cart badge is hidden', async ({ page }) => {
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click()
            await page.getByTestId('shopping-cart-link').click()
            await page.getByTestId('remove-sauce-labs-backpack').click()
            await expect(page.getByTestId('shopping-cart-badge')).toBeHidden()
        })













})
import {test, expect} from '@playwright/test'


test.describe('Inventory tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByText('Login').click()
      })

      test.afterEach(async ({ page}) => {
        console.log('Test finished')
      })

        test('Assert inventory has 6 products', async ({ page }) => {

            const inventory = await page.locator('[data-test="inventory-item"]')            
            await expect(inventory).toHaveCount(6)
        })


        test('Add a product to cart, assert badge shows 1', async ({ page }) => {

                await page.getByTestId('add-to-cart-sauce-labs-backpack').click()
                await expect(page.getByText('1', { exact: true })).toHaveCount(1)
        })

        test('Open the cart, assert URL contains /cart.html', async ({ page }) => {
                await page.getByTestId('shopping-cart-link').click()
                await expect(page).toHaveURL(/\/cart\.html/)     
                       
        })









})
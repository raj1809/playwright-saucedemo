// Why is for...of better than forEach when you need await inside the loop?
// forEach just fires the async callback and immediately moves on — it doesn't wait. It doesn't understand promises at all.
// for...of respects await



import {test, expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {

       await page.goto('https://www.saucedemo.com/')
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByTestId('password').fill('secret_sauce')
        await page.getByTestId('login-button').click()

})

    test('Get all 6 product name locators using .all(), loop through with for...of, console.log each product name', async ({ page }) => {
                const products = await page.locator('[data-test="inventory-item-name"]').all()

                for (const product of products){
                    // console.log(await product.textContent())
                    console.log(await product.innerText());
                    
                }
    })

    test('Use allTextContents() to get all 6 names in one line, log the array', async ({ page }) => {
                const products = await page.locator('[data-test="inventory-item-name"]').allTextContents()
                    console.log(products);
                    
    })

    test('Loop through all products and assert each name is not empty (use expect inside the loop)', async ({ page }) => {
                            const products = await page.locator('[data-test="inventory-item-name"]')
                           const texts = await products.allTextContents();
                           texts.forEach(text => {
                                 expect(text.trim()).not.toBe('')
            })
                          
    })
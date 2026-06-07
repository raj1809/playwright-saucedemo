// What's the difference between .map() and .forEach()? 
// Use .map() when converting UI text into usable data. Use .forEach() when clicking, logging, or asserting each item.
//  When would you use .reduce() in a real test?
// .reduce() is useful when you need to combine many values into one result.
import {test, expect} from '@playwright/test'
import { loadavg } from 'node:os'

test.beforeEach(async ({ page }) => {

        await page.goto('https://www.saucedemo.com/')
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByTestId('password').fill('secret_sauce')
        await page.getByTestId('login-button').click()

})

test('Get all 6 product prices from inventory page as text Use .map() to convert them into numbers. Log the array of numbers.', async ({page}) => {

    const priceTexts = await page.locator('.inventory_item_price').allTextContents();
const prices = priceTexts.map(price => 
    parseFloat(price.replace('$', ''))
)
  console.log(prices)
})

test('Add 3 products & Go to cart page.Get all cart item prices,use .map() to convert to numbers,use .reduce() to sum them.Assert the total is greater than 0.', async ({ page }) => {

            await page.getByTestId('add-to-cart-sauce-labs-backpack').click()
            await page.getByTestId('add-to-cart-sauce-labs-bike-light').click()
            await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
            await page.getByTestId('shopping-cart-link').click()

                const priceTexts = await page.locator('.inventory_item_price').allTextContents();
                const prices = priceTexts.map(price => 
                      parseFloat(price.replace('$', ''))
            )
                 console.log(prices)

                const total = prices.reduce((acc, price) => acc + price, 0)
                    console.log(total)
             expect(total).toBeGreaterThan(0)
})

test('Final test', async ({ page }) => {
         await page.getByTestId('add-to-cart-sauce-labs-backpack').click()
            await page.getByTestId('add-to-cart-sauce-labs-bike-light').click()
            await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()
               await page.getByTestId('add-to-cart-sauce-labs-fleece-jacket').click()
               await page.getByTestId('add-to-cart-sauce-labs-onesie').click()
               await page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)').click()

            await page.getByTestId('shopping-cart-link').click()
          //  await page.getByTestId('checkout').click()

                      await page.getByRole('button', { name: 'Checkout' }).click()

            await page.getByPlaceholder('First Name').fill('paul')
            await page.getByPlaceholder('Last Name').fill('test')
            await page.getByPlaceholder('Zip/Postal Code').fill("12345")
            await page.locator('[data-test="continue"]').click()

            const totalPrice = await page.getByTestId('subtotal-label').innerText()
               // console.log(await totalPrice.innerText());

                const subtotal = parseFloat(
                          totalPrice.replace('Item total: $', '')
);
                
                const priceTexts = await page.locator('.inventory_item_price').allTextContents()

                const prices = priceTexts.map(price => 
                      parseFloat(price.replace('$', ''))
            )
                 console.log(prices)

                const total = prices.reduce((acc, price) => acc + price, 0)
                    console.log(total)

                    expect(total).toBeCloseTo(subtotal, 2)
})
// The .filter() method is better than complex CSS selectors because it allows for dynamic JavaScript execution, handles programmatic DOM manipulation, 
// and offers chaining. It eliminates complex regex or long selector strings.

// Use .nth() to target elements strictly by their position in the DOM (e.g., getting the 2nd row). Use .filter({ hasText }) (or filter(':contains(...)') 
// in jQuery) to locate elements by their content rather than their placement on the page.


import { test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/')
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByTestId('password').fill('secret_sauce')
        await page.getByTestId('login-button').click()
    })

    test('On inventory page, click the "Add to cart" button of the 3rd product using .nth(2). Assert cart badge shows 1', async ({page}) => {
           const addToCartButton =  page.getByRole('button', { name: 'Add to cart' })
           await addToCartButton.nth(2).click() 
           await expect(page.getByTestId('shopping-cart-badge')).toHaveText("1")
    })

test('Use .filter hasText:Sauce LabsBackpack to locate the inventory item,click its Add to cart button via.getByRole(button),and verify the cart badge displays 1', async ({page}) => {
       const item = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack'})
       await item.getByRole('button').click()
       await expect(page.getByTestId('shopping-cart-badge')).toHaveText("1")
})

test('Add 3 products to cart. Go to cart page. For the 2nd cart item, get its name and price by scoping locators within that item (use .nth(1) then chain .locator(...) inside it). Log both', async ({page}) => {
                 const addToCartButton =  page.getByRole('button', { name: 'Add to cart' })
                     await addToCartButton.nth(0).click()
                     await addToCartButton.nth(1).click()
                     await addToCartButton.nth(2).click()

                     await page.getByTestId('shopping-cart-link').click()


                     const secondCartItem = page.locator('.cart_item').nth(1);

                     const name = await secondCartItem
                      .getByTestId('inventory-item-name')
                      .textContent();

                     const price = await secondCartItem
                     .getByTestId('inventory-item-price')
                     .textContent();

                     console.log('name', name);
                     console.log('price', price);
})

              test('test 4', async ({page}) => {
                      const addToCartButton =  page.getByRole('button', { name: 'Add to cart' })
                       await addToCartButton.nth(0).click()
                      await addToCartButton.nth(1).click()

                     const addedItems = page
                .locator('.inventory_item')
                .filter({
                         has: page.getByRole('button', { name: 'Remove' })
         });

                      await expect(addedItems).toHaveCount(2);

})
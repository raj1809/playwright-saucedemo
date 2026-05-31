import {test, expect} from '@playwright/test'

test('Login, then use waitForURL to wait for the inventory page before asserting', async ({ page }) => {
      await page.goto("https://www.saucedemo.com/")

      await page.getByPlaceholder('Username').fill('standard_user')
      await page.getByPlaceholder('Password').fill('secret_sauce')
      await page.getByTestId('login-button').click()

      await page.waitForURL('https://www.saucedemo.com/inventory.html')
      await expect(page).toHaveURL(/\/inventory\.html/)
})

test('Login, click the cart icon, use locator.waitForstate: visible on the cart page heading before asserting', async ({page}) => {
      await page.goto("https://www.saucedemo.com/")

      await page.getByPlaceholder('Username').fill('standard_user')
      await page.getByPlaceholder('Password').fill('secret_sauce')
      await page.getByTestId('login-button').click()

      const cartLink = page.getByTestId('shopping-cart-link')
      await cartLink.click()
        await cartLink.waitFor({ state: 'visible' })
        await expect(cartLink).toBeVisible()


})

test('Login, add a product to cart, and wait for the cart badge to appear using waitFor', async ({page}) => {
      await page.goto("https://www.saucedemo.com/")

      await page.getByPlaceholder('Username').fill('standard_user')
      await page.getByPlaceholder('Password').fill('secret_sauce')
      await page.getByTestId('login-button').click()

      await page.getByTestId('add-to-cart-sauce-labs-backpack').click()

      const badge = page.getByTestId('shopping-cart-badge')
      await badge.waitFor({ state: 'visible' });

})


// difference between Playwright auto-wait and Selenium explicit wait
// playwright waits are native whereas slenium explicit waits shold be manually defined
// playwright waits remove flakness, selenium waits sometimes slows down the test
// playwright wait --> no extra code is required, selenium wait --> extra code is written


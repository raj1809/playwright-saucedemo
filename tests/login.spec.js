// @ts-check
import {test, expect} from '@playwright/test'

test("Login using placeholder locator & assert the title", async ({page}) => {
        await page.goto("https://www.saucedemo.com/")
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByText('Login').click()
        await expect(page).toHaveURL(/\/inventory\.html/)
        await expect(page.getByText('Products')).toHaveText('Products')
})


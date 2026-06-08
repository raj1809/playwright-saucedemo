// When would you use bracket notation over dot notation?
// bracket notation is used over dot notation when the data have special keys, spaces and have Dynamic property name
// also, bracket notation becomes important when we are creating reusable framework

import {test, expect} from '@playwright/test'
import {userData} from '../test-data/users'


test(' Log in using users.standardUser (dot notation). Assert URL is /inventory.html', async ({ page}) => {

        await page.goto('https://www.saucedemo.com/')
        await page.getByPlaceholder('Username').fill(userData.standardUser.username)
        await page.getByPlaceholder('Password').fill(userData.standardUser.password)
        await page.getByTestId('login-button').click()
        await expect(page).toHaveURL(/\/inventory\.html/)
})


test('Log in using users.lockedUser. Assert error message visible', async ({page}) => {
         await page.goto('https://www.saucedemo.com/')
        await page.getByPlaceholder('Username').fill(userData.lockedUser.username)
        await page.getByPlaceholder('Password').fill(userData.lockedUser.password)
        await page.getByTestId('login-button').click()
        await  expect(page.getByTestId("error")).toHaveText('Epic sadface: Sorry, this user has been locked out.')
})

test("Log in using bracket notation: users['problemUser']. Assert URL is /inventory.html", async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        await page.getByPlaceholder('Username').fill(userData["problemUser"].username)
        await page.getByPlaceholder('Password').fill(userData["problemUser"].password)
        await page.getByTestId('login-button').click()
        await expect(page).toHaveURL(/\/inventory\.html/)
})
// Why is destructuring useful in test code? 
// Makes test code cleaner and more readable.
// Reduces repetitive object access.
// Useful when working with test data, API responses, and fixtures.
// Helps extract only the fields needed for a test.
// Why is spread useful for negative test cases?
//The spread operator allows me to reuse a base test-data object and override only the fields relevant to a specific test scenario. 
// This reduces duplication, improves maintainability, and keeps test data consistent across tests.

import { test, expect} from '@playwright/test'
import { userData } from '../test-data/users'

const {username, password} = userData.standardUser

test('Destructure username and password from userData.standardUser at the top of the test.Use them in the fill calls. Assert URL.', async ({page}) => {

      await page.goto("https://www.saucedemo.com/");
        await page.getByPlaceholder("Username").fill(username)
        await page.getByPlaceholder("Password").fill(password)
        await page.getByTestId('login-button').click()
  await expect(page).toHaveURL(/\/inventory\.html/);

})

test('Create a new user object using spread:take standardUser and override the password with "wrong_password",log in with it.Assert error message is visible', async ({page}) => {
    const newUser = {
        ...userData.standardUser,
        password: 'wrong_password'
    }
        await page.goto("https://www.saucedemo.com/");
        await page.getByPlaceholder("Username").fill(newUser.username)
        await page.getByPlaceholder("Password").fill(newUser.password)
        await page.getByTestId('login-button').click()
        // await expect(page.getByTestId('error')).toHaveText('Epic sadface: Username and password do not match any user in this service')
        const errorMsg = page.getByTestId('error')
        await expect(errorMsg).toHaveText('Epic sadface: Username and password do not match any user in this service')
})

test.only('Destructure with renaming:destructure username from lockedUser and rename to lockedUsername.Use it to attempt login.Assert locked-out error', async ({page}) => {
        const {username : lockedUsername, password} = userData.lockedUser
        await page.goto("https://www.saucedemo.com/")
        await page.getByPlaceholder("Username").fill(lockedUsername)
        await page.getByPlaceholder("Password").fill(password)
        await page.getByTestId('login-button').click()
await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.')
})
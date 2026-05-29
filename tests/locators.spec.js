import {test, expect} from '@playwright/test'

test('Locators testing - login flow using only getByRole for username, password, and login button', async ({page}) =>{
    await page.goto('https://www.saucedemo.com/')
    await page.getByRole('textbox', { name : 'username'}).fill('standard_user')
    await page.getByRole('textbox', { name : 'password'}).fill('secret_sauce')
    await page.getByRole('button', { name : 'Login'}).click()
    await expect(page.getByText('Products')).toBeVisible()

})

test('Locators using getByLabel or getByTestId', async ({page}) =>{

    await page.goto('https://www.saucedemo.com/')
    await page.getByTestId('username').fill('standard_user')
    await page.getByTestId('password').fill('secret_sauce')
    await page.getByTestId('login-button').click()
    const header =  page.getByText('Products')
    await expect(header).toBeVisible()
    const headerText = await header.textContent()
    console.log(headerText);
    
})
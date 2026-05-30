import { test, expect } from "@playwright/test";

test("Assertion tests", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await expect(page).toHaveTitle("Swag Labs");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByTestId("login-button").click();

  await expect(page).toHaveURL(/\/inventory\.html/);
  await expect(page.locator("div.inventory_item_name")).toHaveCount(6);
  await expect(
     page.getByTestId("add-to-cart-sauce-labs-backpack"),
  ).toBeEnabled();
  await expect(page.locator("span.shopping_cart_badge")).toBeHidden();
});

test("logging in with locked_out_user / secret_sauce and assert the error message contains the right text", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("locked_out_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByTestId("login-button").click();

  await expect(page.getByTestId('error')).toContainText('Sorry, this user has been locked out.')


  
});

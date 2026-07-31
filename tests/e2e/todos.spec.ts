import { test, expect } from "@playwright/test";

test("user can create a todo", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("login-email-input")
    .fill("demo@taskforge.dev");

  await page.getByTestId("login-password-input")
    .fill("password123");

  await page.getByTestId("login-submit-button")
    .click();

  await expect(page).toHaveURL("/dashboard");

  await page.getByTestId("todo-title-input")
    .fill("Learn Playwright");

  await page.getByTestId("todo-add-button")
    .click();

  await expect(
    page.getByText("Learn Playwright")
  ).toBeVisible();
});
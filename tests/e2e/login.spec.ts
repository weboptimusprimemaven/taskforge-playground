import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { demoUser } from "../data/users";

test("user can login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(demoUser);
    await loginPage.expectLoggedIn();
});

test("user can logout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(demoUser);
    await dashboardPage.expectVisible();
    await dashboardPage.logout();
    await dashboardPage.expectLoggedOut();
});


import { expect, type Page } from "@playwright/test";

import { BasePage } from "./BasePage.js";
import type { User } from "../models/User";

export class LoginPage extends BasePage {

    emailInput() {
        return this.locator("login-email-input");
    }

    passwordInput() {
        return this.locator("login-password-input");
    }

    submitButton() {
        return this.locator("login-submit-button");
    }

    async goto() {
        await super.goto("/");
    }

    async login(user: User) {
        await this.emailInput().fill(user.email);
        await this.passwordInput().fill(user.password);
        await this.submitButton().click();
    }

    async expectLoggedIn() {
        await this.expectUrl("/dashboard");
    }
}
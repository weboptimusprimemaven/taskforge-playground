import { expect, type Locator, type Page } from "@playwright/test";

export class BasePage {
    constructor(protected readonly page: Page) { }

    async goto(url: string) {
        await this.page.goto(url);
    }

    locator(testId: string): Locator {
        return this.page.getByTestId(testId);
    }

    async expectUrl(path: string) {
        await expect(this.page).toHaveURL(path);
    }
}
import { expect, type Page } from "@playwright/test";

import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {

    logoutButton() {
        return this.locator("logout-button");
    }

    todoInput() {
        return this.locator("todo-title-input");
    }

    addButton() {
        return this.locator("todo-add-button");
    }

    async logout() {
        await this.logoutButton().click();
    }

    async addTodo(title: string) {
        await this.todoInput().fill(title);
        await this.addButton().click();
    }

    async search(value: string) {
        await this.locator("search-task-field").fill(value);
    }

    async sortBy(sort: "newest" | "oldest" | "alphabetical" | "reverse-alphabetical" | "completed") {
        await this.locator("sort-select").selectOption(sort);
    }

    async filterBy(filter: "all" | "active" | "completed") {
        const button = {
            all: this.locator("filter-all-button"),
            active: this.locator("filter-active-button"),
            completed: this.locator("filter-completed-button"),
        }[filter];

        await button.click();
    }

    async expectVisible() {
        await this.expectUrl("/dashboard");
    }

    async expectLoggedOut() {
        await this.expectUrl("/");
    }
}

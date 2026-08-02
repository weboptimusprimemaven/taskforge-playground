import { expect, type Locator, type Page } from "@playwright/test";

import { BasePage } from "./BasePage";

export class TodoPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private todoItem(title: string): Locator {
        const exactTitle = new RegExp(
            `^${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`
        );

        return this.page.getByTestId("todo-item").filter({
            has: this.page.getByTestId("todo-title").filter({
                hasText: exactTitle,
            }),
        });
    }

    async expectTodo(title: string) {
        await expect(this.todoItem(title)).toBeVisible();
    }

    async expectTodoMissing(title: string) {
        await expect(this.todoItem(title)).toHaveCount(0);
    }

    async expectTodoCount(title: string, count: number) {
        await expect(this.todoItem(title)).toHaveCount(count);
    }

    async expectTodoOrder(titles: string[]) {
        await expect(this.page.getByTestId("todo-title")).toHaveText(titles);
    }

    async complete(title: string) {
        await this.todoItem(title)
            .getByTestId("todo-checkbox")
            .check();
    }

    async uncomplete(title: string) {
        await this.todoItem(title)
            .getByTestId("todo-checkbox")
            .uncheck();
    }

    async edit(title: string, newTitle: string) {
        await this.startEditing(title);
        await this.fillEditInput(newTitle);
        await this.saveEdit();
    }

    async startEditing(title: string) {
        await this.todoItem(title).getByTestId("todo-edit-button").click();
    }

    async fillEditInput(title: string) {
        await this.page.getByTestId("todo-edit-input").fill(title);
    }

    async saveEdit() {
        await this.page.getByTestId("todo-save-button").click();
    }

    async cancelEdit() {
        await this.page.getByTestId("todo-cancel-button").click();
    }

    async pressEditKey(key: "Enter" | "Escape") {
        await this.page.getByTestId("todo-edit-input").press(key);
    }

    async expectSaveDisabled() {
        await expect(this.page.getByTestId("todo-save-button")).toBeDisabled();
    }

    async delete(title: string) {
        await this.openDeleteDialog(title);
        await this.page.getByTestId("confirm-button").click();
    }

    async openDeleteDialog(title: string) {
        await this.todoItem(title).getByTestId("todo-delete-button").click();
    }

    async expectDeleteDialogInViewport() {
        const dialog = this.page.getByTestId("confirm-dialog");
        await expect(dialog).toBeVisible();
        await expect(dialog.locator("..")).toHaveCSS("position", "fixed");

        const box = await dialog.boundingBox();
        const viewport = this.page.viewportSize();

        expect(box).not.toBeNull();
        expect(viewport).not.toBeNull();
        expect(box!.y).toBeGreaterThanOrEqual(0);
        expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);
    }

    async expectCompleted(title: string) {
        await expect(
            this.todoItem(title).getByTestId("todo-title")
        ).toHaveClass(/completed/);
    }

    async expectActive(title: string) {
        await expect(
            this.todoItem(title).getByTestId("todo-title")
        ).not.toHaveClass(/completed/);
    }
}

import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { TodoPage } from "../pages/TodoPage";
import { demoUser } from "../data/users";

test("user can create a todo", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Buy milk ${Date.now()}`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await todoPage.expectTodo(title);
});

test("user can edit and complete a todo", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Buy oat milk ${Date.now()}`;
  const updatedTitle = `${title} - organic`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await todoPage.edit(title, updatedTitle);
  await todoPage.expectTodo(updatedTitle);
  await todoPage.complete(updatedTitle);
  await todoPage.expectCompleted(updatedTitle);
});

test("user can cancel editing a todo", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Keep original ${Date.now()}`;
  const discardedTitle = `${title} changed`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await todoPage.startEditing(title);
  await todoPage.fillEditInput(discardedTitle);
  await todoPage.cancelEdit();
  await todoPage.expectTodo(title);
  await todoPage.expectTodoMissing(discardedTitle);
});

test("user can save an edit with Enter", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Keyboard save ${Date.now()}`;
  const updatedTitle = `${title} updated`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await todoPage.startEditing(title);
  await todoPage.fillEditInput(updatedTitle);
  await todoPage.pressEditKey("Enter");
  await todoPage.expectTodo(updatedTitle);
  await todoPage.expectTodoMissing(title);
});

test("user can cancel an edit with Escape", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Keyboard cancel ${Date.now()}`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await todoPage.startEditing(title);
  await todoPage.fillEditInput(`${title} changed`);
  await todoPage.pressEditKey("Escape");
  await todoPage.expectTodo(title);
});

test("user cannot save an empty todo title", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Required title ${Date.now()}`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await todoPage.startEditing(title);
  await todoPage.fillEditInput("   ");
  await todoPage.expectSaveDisabled();
  await todoPage.pressEditKey("Enter");
  await todoPage.cancelEdit();
  await todoPage.expectTodo(title);
});

test("editing a completed todo preserves its completed state", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Completed edit ${Date.now()}`;
  const updatedTitle = `${title} updated`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await todoPage.complete(title);
  await todoPage.edit(title, updatedTitle);
  await todoPage.expectCompleted(updatedTitle);
});

test("user cannot create duplicate todo titles", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Unique title ${Date.now()}`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await dashboardPage.addTodo(`  ${title.toUpperCase()}  `);
  await todoPage.expectTodoCount(title, 1);
});

test("user can search todos by a case-insensitive partial title", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const groceries = `Weekly Groceries ${Date.now()}`;
  const laundry = `Laundry ${Date.now() + 1}`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(groceries);
  await dashboardPage.addTodo(laundry);

  await dashboardPage.search("GROCER");
  await todoPage.expectTodo(groceries);
  await todoPage.expectTodoMissing(laundry);

  await dashboardPage.search("");
  await todoPage.expectTodo(groceries);
  await todoPage.expectTodo(laundry);
});

test("user can sort todos", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const stamp = Date.now();
  const bravo = `Bravo ${stamp}`;
  const zulu = `Zulu ${stamp}`;
  const alpha = `Alpha ${stamp}`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(bravo);
  await dashboardPage.addTodo(zulu);
  await dashboardPage.addTodo(alpha);

  await dashboardPage.sortBy("newest");
  await todoPage.expectTodoOrder([alpha, zulu, bravo]);

  await dashboardPage.sortBy("oldest");
  await todoPage.expectTodoOrder([bravo, zulu, alpha]);

  await dashboardPage.sortBy("alphabetical");
  await todoPage.expectTodoOrder([alpha, bravo, zulu]);

  await dashboardPage.sortBy("reverse-alphabetical");
  await todoPage.expectTodoOrder([zulu, bravo, alpha]);

  await todoPage.complete(zulu);
  await dashboardPage.sortBy("completed");
  await todoPage.expectTodoOrder([zulu, bravo, alpha]);
});

test("user can filter todos by completion status", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const groceries = `Groceries ${Date.now()}`;
  const laundry = `Laundry ${Date.now() + 1}`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(groceries);
  await dashboardPage.addTodo(laundry);
  await todoPage.complete(groceries);

  await dashboardPage.filterBy("active");
  await todoPage.expectTodoMissing(groceries);
  await todoPage.expectTodo(laundry);

  await dashboardPage.filterBy("completed");
  await todoPage.expectTodo(groceries);
  await todoPage.expectTodoMissing(laundry);
});

test("user can delete a todo", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const todoPage = new TodoPage(page);
  const title = `Delete me ${Date.now()}`;

  await loginPage.goto();
  await loginPage.login(demoUser);
  await dashboardPage.addTodo(title);
  await todoPage.expectTodo(title);
  await todoPage.delete(title);
  await todoPage.expectTodoMissing(title);
});

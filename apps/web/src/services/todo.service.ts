import type { Todo } from "../types/todo";

let TODOS: Todo[] = [
  {
    id: "1",
    title: "Learn Playwright",
    completed: false,
  },
  {
    id: "2",
    title: "Build awesome portfolio",
    completed: false,
  },
  {
    id: "3",
    title: "Get hired",
    completed: true,
  },
];

const DELAY = 300;

function wait() {
  return new Promise((resolve) => setTimeout(resolve, DELAY));
}

export async function getTodos(): Promise<Todo[]> {
  await wait();

  return [...TODOS];
}

export async function addTodo(title: string): Promise<Todo> {
  await wait();

  const todo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };

  TODOS = [...TODOS, todo];

  return todo;
}

export async function toggleTodo(id: string): Promise<Todo> {
  await wait();

  TODOS = TODOS.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          completed: !todo.completed,
        }
      : todo
  );

  const updated = TODOS.find((todo) => todo.id === id);

  if (!updated) {
    throw new Error("Todo not found");
  }

  return updated;
}

export async function deleteTodo(id: string): Promise<void> {
  await wait();

  TODOS = TODOS.filter((todo) => todo.id !== id);
}
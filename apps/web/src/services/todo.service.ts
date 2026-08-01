import type { Todo } from "../types/todo";

const STORAGE_KEY = "taskforge-todos";

function loadTodos(): Todo[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Todo[];
  } catch {
    return [];
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export async function getTodos(): Promise<Todo[]> {
  return loadTodos();
}

export async function addTodo(title: string): Promise<Todo> {
  const todos = loadTodos();

  const todo: Todo = {
  id: crypto.randomUUID(),
  title,
  completed: false,
};

  const updated = [...todos, todo];

  saveTodos(updated);

  return todo;
}

export async function toggleTodo(id: string): Promise<Todo> {
  const todos = loadTodos();

  const updated = todos.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          completed: !todo.completed,
        }
      : todo
  );

  saveTodos(updated);

  const todo = updated.find((t) => t.id === id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return todo;
}

export async function deleteTodo(id: string): Promise<void> {
  const updated = loadTodos().filter((todo) => todo.id !== id);

  saveTodos(updated);
}
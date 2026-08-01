import { useEffect, useState } from "react";

import type { Todo } from "../types/todo";

import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "../services/todo.service";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const result = await getTodos();

      setTodos(result);
      setLoading(false);
    }

    load();
  }, []);

  async function create(title: string) {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }
    const exists = todos.some(
      todo =>
        todo.title.trim().toLowerCase() ===
        title.trim().toLowerCase()
    );

    if (exists) {
      return;
    }

    const todo = await addTodo(title);

    setTodos(current => [...current, todo]);
  }

  async function toggle(id: string) {
    const updated = await toggleTodo(id);

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? updated : todo
      )
    );
  }

  async function remove(id: string) {
    await deleteTodo(id);

    setTodos((current) =>
      current.filter((todo) => todo.id !== id)
    );
  }

  async function edit(
    id: string,
    title: string
  ) {
    const updated = await updateTodo(id, title);

    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? updated : todo
      )
    );
  }

  return {
    todos,
    loading,
    create,
    toggle,
    remove,
    edit,
  };
}
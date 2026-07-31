import { useEffect, useState } from "react";

import type { Todo } from "../types/todo";

import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
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
    const todo = await addTodo(title);

    setTodos((current) => [...current, todo]);
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

  return {
    todos,
    loading,
    create,
    toggle,
    remove,
  };
}
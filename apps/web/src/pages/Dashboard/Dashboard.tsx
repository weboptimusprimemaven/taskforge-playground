import { useAuth } from "../../context/AuthContext";

import { AddTodoForm } from "../../components/todo/AddTodoForm";
import { TodoList } from "../../components/todo/TodoList";

import { useTodos } from "../../hooks/useTodos";

export function Dashboard() {
  const { user } = useAuth();

  const {
    todos,
    loading,
    create,
    toggle,
    remove,
  } = useTodos();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>TaskForge Playground</h1>

      <p>Welcome back, {user?.email}</p>

      <AddTodoForm onAdd={create} />

      <TodoList
        todos={todos}
        onToggle={toggle}
        onDelete={remove}
      />
    </main>
  );
}
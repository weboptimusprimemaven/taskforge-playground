import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AddTodoForm } from "../../components/todo/AddTodoForm";
import { TodoList } from "../../components/todo/TodoList";
import type { Filter } from "../../types/filter";
import "../../styles/dashboard.css";
import { Button } from "../../components/ui/Button";

import { useTodos } from "../../hooks/useTodos";

export function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [filter, setFilter] = useState<Filter>("all");

  const {
    todos,
    loading,
    create,
    toggle,
    remove,
  } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "active":
        return !todo.completed;

      case "completed":
        return todo.completed;

      default:
        return true;
    }
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
  <main className="dashboard">
    <div className="dashboard-header">
      <div>
        <h1>TaskForge Playground</h1>
        <p>Welcome back, {user?.email}</p>
      </div>

      <Button
        type="button"
        data-testid="logout-button"
        onClick={() => {
        logout();
        navigate("/");
        }}
      >
        Logout
      </Button>
      </div>

    <AddTodoForm onAdd={create} />

    <div className="dashboard-toolbar">
      <Button
        onClick={() => setFilter("all")}
        disabled={filter === "all"}
      >
        All ({todos.length})
      </Button>

      <Button
        onClick={() => setFilter("active")}
        disabled={filter === "active"}
      >
        Active ({todos.filter((t) => !t.completed).length})
      </Button>

      <Button
        onClick={() => setFilter("completed")}
        disabled={filter === "completed"}
      >
        Completed ({todos.filter((t) => t.completed).length})
      </Button>
    </div>

    <TodoList
      todos={filteredTodos}
      onToggle={toggle}
      onDelete={remove}
    />
  </main>
)};
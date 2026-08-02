import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AddTodoForm } from "../../components/todo/AddTodoForm";
import { TodoList } from "../../components/todo/TodoList";
import type { Filter } from "../../types/filter";
import "../../styles/dashboard.css";
import { Button } from "../../components/ui/Button";
import { useEffect } from "react";
import { useTodos } from "../../hooks/useTodos";
import { Toast } from "../../components/ui/Toast";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import type { SortOption } from "../../types/sort";
import { Input } from "../../components/ui/Input";

export function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [filter, setFilter] = useState<Filter>("all");
  const [toast, setToast] = useState("");
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");
  const [search, setSearch] = useState("");

  const {
    todos,
    loading,
    create,
    toggle,
    remove,
    edit,
  } = useTodos();

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
          ? !todo.completed
          : todo.completed;

    const matchesSearch =
      todo.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const sortedTodos = [...filteredTodos];

  switch (sort) {
    case "newest":
      sortedTodos.reverse();
      break;

    case "oldest":
      break;

    case "alphabetical":
      sortedTodos.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;

    case "reverse-alphabetical":
      sortedTodos.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      break;

    case "completed":
      sortedTodos.sort(
        (a, b) =>
          Number(b.completed) -
          Number(a.completed)
      );
      break;

    default:
      break;
  }



  if (loading) {
    return <p data-testid="loading-state">Loading...</p>;
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

      <AddTodoForm
        onAdd={async (title) => {
          try {
            await create(title);
            setToast("✅ Todo created");
          } catch {
            setToast("⚠️ Todo already exists");
          }
        }}


      />

      <Input
        placeholder="Search tasks..."
        data-testid="search-task-field"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-buttons">
        <Button
          data-testid="filter-all-button"
          onClick={() => setFilter("all")}
          disabled={filter === "all"}
        >
          All ({todos.length})
        </Button>

        <Button
          data-testid="filter-active-button"
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
        >
          Active ({todos.filter(t => !t.completed).length})
        </Button>

        <Button
          data-testid="filter-completed-button"
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          Completed ({todos.filter(t => t.completed).length})
        </Button>
      </div>

      <div className="dashboard-sort">
        <label htmlFor="sort">
          Sort:
        </label>

        <select
          data-testid="sort-select"
          id="sort"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as SortOption)
          }
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="alphabetical">
            A → Z
          </option>

          <option value="reverse-alphabetical">
            Z → A
          </option>

          <option value="completed">
            Completed first
          </option>
        </select>
      </div>

      <div className="dashboard-stats" data-testid="dashboard-stats">
        <span>Total: {todos.length}</span>

        <span>
          Active: {todos.filter(t => !t.completed).length}
        </span>

        <span>
          Completed: {todos.filter(t => t.completed).length}
        </span>
      </div>

      {todos.length === 0 ? (
        <div className="empty-state" data-testid="empty-state">
          <h3>No tasks yet</h3>
          <p>Create your first task to get started.</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-state" data-testid="empty-state">
          <h3>No matching tasks</h3>
          <p>Try selecting another filter.</p>
        </div>
      ) : (
        <TodoList
          todos={sortedTodos}
          onToggle={toggle}
          onDelete={(id) => { setTodoToDelete(id) }}
          onEdit={edit}
        />
      )}
      {todoToDelete && (
        <ConfirmDialog
          title="Delete task?"
          message="This action cannot be undone."
          onCancel={() => setTodoToDelete(null)}
          onConfirm={async () => {
            await remove(todoToDelete);


            setToast("🗑 Todo deleted");

            setTodoToDelete(null);
          }}
        />
      )}

      {toast && <Toast message={toast} />}
    </main>
  )
};

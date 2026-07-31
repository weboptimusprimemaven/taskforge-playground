import type { Todo } from "../../types/todo";

interface Props {
  todo: Todo;
  onToggle(id: string): void;
  onDelete(id: string): void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
}: Props) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem",
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span
          style={{
            marginLeft: "0.5rem",
            textDecoration: todo.completed
              ? "line-through"
              : "none",
          }}
        >
          {todo.title}
        </span>
      </label>

      <button
        data-testid={`delete-${todo.id}`}
        onClick={() => onDelete(todo.id)}
      >
        🗑
      </button>
    </li>
  );
}
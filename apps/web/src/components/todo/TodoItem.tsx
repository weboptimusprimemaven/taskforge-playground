import "./../../styles/components/todo-item.css";

import { Button } from "../ui/Button";
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
    <li className="todo-item">
      <div className="todo-item-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span
          className={`todo-item-title ${
            todo.completed ? "completed" : ""
          }`}
        >
          {todo.title}
        </span>
      </div>

      <Button
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </Button>
    </li>
  );
}
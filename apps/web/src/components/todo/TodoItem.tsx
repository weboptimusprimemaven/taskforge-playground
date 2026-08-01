import type { Todo } from "../../types/todo";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import "../../styles/components/todo-item.css";
import { Pencil, Trash2, Save, X, } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  todo: Todo;
  onToggle(id: string): void;
  onDelete(id: string): void;
  onEdit(id: string, title: string): Promise<void>;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSave() {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    setIsSaving(true);

    try {
      await onEdit(todo.id, trimmed);
      setEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setTitle(todo.title);
    setEditing(false);
  }

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {editing ? (
        <div className="todo-item-edit">
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void handleSave();
              }
              if (event.key === "Escape") {
                handleCancel();
              }
            }}
            maxLength={120}
          />

          <div className="todo-item-actions">
            <Button
              variant="success"
              type="button"
              onClick={handleSave}
              disabled={!title.trim() || isSaving}
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save"}
            </Button>

            <Button
              variant="secondary"
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X size={16} />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed
                ? "line-through"
                : "none",
            }}
          >
            {todo.title}
          </span>

          <div className="todo-item-actions">
            <Button
              variant="primary"
              type="button"
              onClick={() => setEditing(true)}
              title="Edit task"
            >
              <Pencil size={16} />
              Edit
            </Button>

            <Button
              variant="danger"
              type="button"
              onClick={() => onDelete(todo.id)}
              title="Delete task"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </div>
        </>
      )}
    </li>
  );
}
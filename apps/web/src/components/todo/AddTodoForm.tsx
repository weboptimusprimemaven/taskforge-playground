import { useState } from "react";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface Props {
  onAdd(title: string): Promise<void>;
}

export function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    setIsSaving(true);

    try {
      await onAdd(trimmed);
      setTitle("");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        data-testid="todo-title-input"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={120}
      />

      <p>{title.length}/120</p>

      <Button
        data-testid="todo-add-button"
        type="submit"
        disabled={!title.trim() || isSaving}
      >
        {isSaving ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
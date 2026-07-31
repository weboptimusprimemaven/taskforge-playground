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

    await onAdd(trimmed);

    setTitle("");
    setIsSaving(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        data-testid="todo-title-input"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Button
        data-testid="todo-add-button"
        type="submit"
        disabled={isSaving}
      >
        {isSaving ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
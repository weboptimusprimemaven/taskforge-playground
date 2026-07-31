import { useState } from "react";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface TodoFormProps {
  onAdd(title: string): void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAdd(trimmedTitle);

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        data-testid="todo-title-input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <Button
        data-testid="todo-add-button"
        type="submit"
      >
        Add Todo
      </Button>
    </form>
  );
}
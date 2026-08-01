import type { Todo } from "../../types/todo";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle(id: string): void;
  onDelete(id: string): void;
  onEdit(id: string, title: string): Promise<void>;
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
}: Props) {

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
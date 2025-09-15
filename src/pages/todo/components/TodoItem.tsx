import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../../../types/todo";
import Checkbox from "../../../ui-components/Checkbox";
import Button from "../../../ui-components/Button";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, value: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleEditSubmit = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if (
      (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter" ||
      (e as React.FocusEvent<HTMLInputElement>).type === "blur"
    ) {
      setEditing(false);
      if (editValue.trim() && editValue !== todo.text) {
        onEdit(todo.id, editValue.trim());
      } else {
        setEditValue(todo.text);
      }
    }
  };

  return (
    <li data-testid="todo-item" className={todo.completed ? "completed" : ""}>
      <div className="view">
        <Checkbox
          aria-label="Toggle Todo"
          className="toggle"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {!editing ? (
          <label
            data-testid="todo-title"
            onDoubleClick={() => setEditing(true)}
            onClick={() => setEditing(true)}
          >
            {todo.text}
          </label>
        ) : (
          <input
            aria-label="Edit"
            className="edit"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleEditSubmit}
            onBlur={handleEditSubmit}
            ref={inputRef}
          />
        )}
        <Button
          aria-label="Delete"
          className="destroy"
          onClick={() => onDelete(todo.id)}
        />
      </div>
    </li>
  );
};

export default TodoItem;

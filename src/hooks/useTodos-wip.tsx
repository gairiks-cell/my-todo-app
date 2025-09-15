import { useState } from "react";
import { Todo, Filter, FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED } from "../types/todo";

// Action types for all operations
type Action =
  | { type: "add"; text: string }
  | { type: "toggle"; id: number }
  | { type: "edit"; id: number; text: string }
  | { type: "delete"; id: number }
  | { type: "clearCompleted" };

export function useTodos(initialTodos: Todo[] = []) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Filter>(FILTER_ALL);

  // Shared state-setter wrapper
  const setTodosState = (updater: (prev: Todo[]) => Todo[]) => {
    setTodos(prev => updater(prev));
  };

  // Reusable helper to update a single todo by id
  const updateById = (
    id: number,
    changes: Partial<Todo> | ((todo: Todo) => Partial<Todo>)
  ) => {
    setTodosState(prev => {
      const index = prev.findIndex(todo => todo.id === id);
      if (index === -1) return prev;

      const newTodos = [...prev];
      const oldTodo = newTodos[index];

      newTodos[index] = {
        ...oldTodo,
        ...(typeof changes === "function" ? changes(oldTodo) : changes),
      };

      return newTodos;
    });
  };

  // Main update dispatcher
  const updateTodos = (action: Action) => {
    switch (action.type) {
      case "add":
        setTodosState(prev => [
          ...prev,
          { id: Date.now(), text: action.text, completed: false },
        ]);
        break;

      case "toggle":
        updateById(action.id, todo => ({ completed: !todo.completed }));
        break;

      case "edit":
        updateById(action.id, { text: action.text });
        break;

      case "delete":
        setTodosState(prev => prev.filter(todo => todo.id !== action.id));
        break;

      case "clearCompleted":
        setTodosState(prev => prev.filter(todo => !todo.completed));
        break;

      default:
        const _exhaustive: never = action;
        return _exhaustive;
    }
  };

  // Apply current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FILTER_ACTIVE:
        return !todo.completed;
      case FILTER_COMPLETED:
        return todo.completed;
      case FILTER_ALL:
      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    updateTodos,
    activeCount,
  };
}

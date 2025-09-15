import { useState, useEffect } from "react";
import {
  Todo,
  Filter,
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
} from "../types/todo";

// Action type
type Action =
  | { type: "add"; text: string }
  | { type: "toggle"; id: number }
  | { type: "edit"; id: number; text: string }
  | { type: "delete"; id: number }
  | { type: "clearCompleted" };

const STORAGE_KEY = "todos";

export function useTodos(initialTodos: Todo[] = []) {
  // Load localStorage on render
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTodos;
  });

  const [filter, setFilter] = useState<Filter>(FILTER_ALL);

  // Save todos to localStorage after change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Common setter
  const setTodosState = (updater: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => updater(prev));
  };

  // Single handler for actions
  const updateTodos = (action: Action) => {
    switch (action.type) {
      case "add":
        setTodosState((prev) => [
          ...prev,
          { id: Date.now(), text: action.text, completed: false },
        ]);
        break;
      case "toggle":
        setTodosState((prev) =>
          prev.map((todo) =>
            todo.id === action.id
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        );
        break;
      case "edit":
        setTodosState((prev) =>
          prev.map((todo) =>
            todo.id === action.id ? { ...todo, text: action.text } : todo
          )
        );
        break;
      case "delete":
        setTodosState((prev) => prev.filter((todo) => todo.id !== action.id));
        break;
      case "clearCompleted":
        setTodosState((prev) => prev.filter((todo) => !todo.completed));
        break;
      default:
        const _exhaustive: never = action;
        return _exhaustive;
    }
  };

  // Apply filter
  const filteredTodos = todos.filter((todo) => {
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

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    updateTodos,
    activeCount,
  };
}

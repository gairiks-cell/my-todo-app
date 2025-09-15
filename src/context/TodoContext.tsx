import React, { createContext, useContext } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo, Filter } from "../types/todo";

interface TodoContextProps {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  updateTodos: (action: any) => void;
  activeCount: number;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const todosState = useTodos();
  return (
    <TodoContext.Provider value={todosState}>{children}</TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

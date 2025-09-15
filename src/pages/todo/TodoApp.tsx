import React, { useEffect, useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

const TodoApp: React.FC = () => {
  const { filteredTodos, filter, setFilter, updateTodos, activeCount } =
    useTodoContext();

  return (
    <section className="todo-app-container">
      <header>
        <h1 className="todo-app__title">todos</h1>
      </header>
      <div className="todo-main">
        <TodoInput onAdd={(text) => updateTodos({ type: "add", text })} />
        <TodoList
          todos={filteredTodos}
          onToggle={(id) => updateTodos({ type: "toggle", id })}
          onDelete={(id) => updateTodos({ type: "delete", id })}
          onEdit={(id, text) => updateTodos({ type: "edit", id, text })}
        />
        <TodoFilter
          filter={filter}
          setFilter={setFilter}
          clearCompleted={() => updateTodos({ type: "clearCompleted" })}
          activeCount={activeCount}
        />
      </div>
    </section>
  );
};

export default TodoApp;

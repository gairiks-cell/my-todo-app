import React from "react";
import Button from "../../../ui-components/Button";
import {
  Filter,
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
} from "../../../types/todo";

interface TodoFilterProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  clearCompleted: () => void;
  activeCount: number;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  setFilter,
  clearCompleted,
  activeCount,
}) => (
  <footer className="todo-footer">
    <span>
      {activeCount} item{activeCount !== 1 ? "s" : ""} left
    </span>
    <div className="todo-footer__filters">
      {[FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED].map((f) => (
        <Button
          key={f}
          className={filter === f ? "selected" : ""}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </Button>
      ))}
    </div>
    <Button onClick={clearCompleted} className="todo-footer__clear">
      Clear completed
    </Button>
  </footer>
);

export default TodoFilter;

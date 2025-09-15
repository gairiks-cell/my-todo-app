import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoApp from "./pages/todo/TodoApp";
import "./styles/main.scss";

const App: React.FC = () => (
  <TodoProvider>
    <TodoApp />
  </TodoProvider>
);

export default App;

import React, { useState, FormEvent } from "react";
import Input from "../../../ui-components/Input";
import Button from "../../../ui-components/Button";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <Input
        className="todo-input__field"
        placeholder="What needs to be done?"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <Button className="todo-input__button" type="submit">Add</Button>
    </form>
  );
};

export default TodoInput;

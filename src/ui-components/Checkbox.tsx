import React, { InputHTMLAttributes } from "react";
//import "./Checkbox.scss";

const Checkbox: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input type="checkbox" className="checkbox" {...props} />;
};

export default Checkbox;

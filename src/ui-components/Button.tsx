import React, { ButtonHTMLAttributes } from "react";
//import "./Button.scss";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button className="button" {...props} />;
};

export default Button;

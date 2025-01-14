import React from "react";
import "./Button.css";

interface Props {
  label: string;
  disabled? : boolean
  parentMethod?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: "submit" | "reset" | "button";
}

export const Button = ({ label, parentMethod, buttonType = "button", disabled = false}: Props) => {
  return (
    <button className="custom-button" onClick={parentMethod} type={buttonType} disabled = {disabled}>
      {label}
    </button>
  );
};
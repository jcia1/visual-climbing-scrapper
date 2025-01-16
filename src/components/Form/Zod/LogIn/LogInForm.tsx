import React from "react";
import { InputData, ZodValidableForm } from "../ZodValidableForm";
import { LogInSchema } from "./LogInSchema";

const inputsData: InputData[] = [
  { name: "name", label: "Name", type: "string" },
  { name: "password", label: "Password", type: "string" },
];

export const LogInForm = () => {

    return (
        <ZodValidableForm schema = {LogInSchema} inputs={inputsData}></ZodValidableForm>
    )
}



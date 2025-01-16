import React from "react";
import { InputData, ZodValidableForm } from "../ZodValidableForm";
import { SignInSchema } from "./SignInSchema";

const inputsData: InputData[] = [
  { name: "name", label: "Name", type: "string" },
  { name: "email", label: "Email", type: "string" },
  { name: "password", label: "Password", type: "string" },
  { name: "confirmPassword", label: "Confirm Password", type: "string" }
];

export const SignInForm = () => {

    return (
        <ZodValidableForm schema = {SignInSchema} inputs={inputsData}></ZodValidableForm>
    )
}



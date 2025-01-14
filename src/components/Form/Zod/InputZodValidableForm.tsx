import React from "react";
import { Controller } from "react-hook-form";
import './InputZodValidableForm.css';

interface Props {
    name: string;
    control: any;
    label: string;
    type: string;
    error?: any;
}

export const InputZodValidableForm = ({ name, control, label, type, error }: Props) => {
    console.log(error); // Agrega esto para verificar el contenido de error

    return (
        <div className='input-zod-validable-form'>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        id={name}
                        type={type}
                        {...field}
                        className={`form-control ${error ? "is-invalid" : ""}`}
                    />
                )}
            />
            {error && <div className="invalid-feedback">{error.message}</div>}
        </div>
    );
}

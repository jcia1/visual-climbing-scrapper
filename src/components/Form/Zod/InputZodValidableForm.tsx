import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import './InputZodValidableForm.css';

interface Props {
    name: string;
    control: any;
    label: string;
    type: string;
    error?: FieldErrors;
}

export const InputZodValidableForm = ({ name, control, label, type, error }: Props) => {

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
                        // If only add '' React doesnt enable to edit, and if only add field.value, 
                        // throws an error because of the component changing from controled to uncontrolled.
                        value={field.value || ''}
                        className={`form-control ${error ? "is-invalid" : ""}`}
                    />
                )}
            />
            {error && error[name] && (
                <div className="invalid-feedback">
                    {error[name].message.toString()}
                </div>
            )}
        </div>
    );
}

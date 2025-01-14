import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "./schema";
import React from "react";
import { InputZodValidableForm } from "./InputZodValidableForm";
import '../Form.css'
import { Button } from "../../Button/Button";

export const ZodValidableForm = () => {

    const { control, handleSubmit, formState: { errors, isDirty, dirtyFields } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('Formulario enviado', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
            <InputZodValidableForm 
                name="name" 
                control={control}
                label="Name"
                type="string"
                error={errors.name} />
            <InputZodValidableForm 
                name="email" 
                control={control}
                label="Email"
                type="string"
                error={errors.email} />
            <InputZodValidableForm 
                name="password" 
                control={control}
                label="Password"
                type="string"
                error={errors.password} />
            <InputZodValidableForm 
                name="confirmPassword" 
                control={control}
                label="Confirm Password"
                type="string"
                error={errors.confirmPassword} />
            <div className="button-group">
                <Button label = 'Enviar' buttonType="submit"></Button>
            </div>
        </form>
    )
}

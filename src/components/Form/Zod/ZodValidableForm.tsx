import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { HTMLInputTypeAttribute } from "react";
import { InputZodValidableForm } from "./InputZodValidableForm";
import '../Form.css';
import { Button } from "../../Button/Button";
import { z, ZodSchema } from "zod";

export interface InputData {
    name: string
    label: string
    type: HTMLInputTypeAttribute

}
interface Props <T>{
    inputs: InputData[]
    schema: ZodSchema<T>;
}

export const ZodValidableForm = <T,>({ schema, inputs }: Props<T>) => {

    type FormValues = z.infer<typeof schema>

    const { control, handleSubmit, formState: { errors, isDirty, dirtyFields } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('Formulario enviado', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
            {
                inputs.map(input => {
                    return <InputZodValidableForm
                        name = {input.name}
                        control={control}
                        label= {input.label}
                        type={input.type}
                        error={errors} />
                })
            }
            <div className="button-group">
                <Button label='Enviar' buttonType="submit"></Button>
            </div>
        </form>
    )
}

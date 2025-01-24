import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { HTMLInputTypeAttribute } from "react";
import { InputZodValidableForm } from "./InputZodValidableForm";
import '../Form.css';
import { Button } from "../../Button/Button";
import { z, ZodSchema } from "zod";
import { useGlobalContext } from "../../../context/global.context";
import { SchemaGeneral } from "./SchemaGeneral";

export interface InputData {
    name: string
    label: string
    type: HTMLInputTypeAttribute

}
interface Props <T extends z.infer<typeof SchemaGeneral>>{
    inputs: InputData[]
    schema: ZodSchema<T>;
}

export const ZodValidableForm = <T extends z.infer<typeof SchemaGeneral>,>({ schema, inputs }: Props<T>) => {

    type FormValues = z.infer<typeof schema>

    const {value, setValue} = useGlobalContext() 
    
    const { control, handleSubmit, formState: { errors, isDirty, dirtyFields } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log(data.name)
        setValue(data.name)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
            {
                inputs.map((input,index) => {
                    return <InputZodValidableForm
                        key={index}
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

import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import React from "react";

export const schema = z.object({

    name: z.string().min(1, "El nombre es obligatorio manolo."),
    email: z.string().email("No es un email.").min(1, "El email es obligatorio manolo."),
    password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres."),
    confirmPassword: z.string().min(4, "La contraseña debe tener al menos 4 caracteres.")

}
).refine(data => data.password === data.confirmPassword, {
    message: "Contraseñas diferentes.",
    path: ["confirmPassword"]
})

export type FormValues = z.infer<typeof schema>

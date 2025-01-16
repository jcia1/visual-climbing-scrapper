import { z } from "zod";

export const LogInSchema = z.object({

    name: z.string().min(1, "El nombre es obligatorio manolo."),
    password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres."),

}
)
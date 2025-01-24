import { z } from 'zod';

export const SchemaGeneral = z.object({
  name: z.string().min(1, "El nombre es obligatorio manolo."),

});
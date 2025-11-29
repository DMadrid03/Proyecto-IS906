import * as z from "zod"

z.config(z.locales.es())

// Enum para frecuencia
const frecuenciaEnum = z.enum(["MONTHLY", "ANNUAL"])

const gastoSchema = z.object({
  descripcion: z.string().min(3).max(255),
  monto: z.number().positive(),
  fechaPago: z.number().int().min(1).max(31),
  frecuencia: frecuenciaEnum
})

// Validación completa para POST
export const validateGasto = (gasto: unknown) =>
  gastoSchema.safeParse(gasto)

// Validación parcial para PATCH/PUT
export const validateGastoPartial = (gasto: unknown) =>
  gastoSchema.partial().safeParse(gasto)

import * as z from "zod";
import {Gasto, GastoUpdate } from "../interfaces/gasto.interface";

z.config(z.locales.es());

const gastoSchema = z.object({
    descripcion: z.string().min(3).max(255),
    monto: z.number().positive(),
    fechaPago: z.number().int().min(1).max(31)
})

export const validateGasto = (gasto: unknown) =>
    gastoSchema.safeParse(gasto);

export const validateGastoPartial = (gasto: unknown) =>
    gastoSchema.partial().safeParse(gasto);

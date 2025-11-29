import { prisma } from "../db/client";
import { Gasto, GastoUpdate } from "../interfaces/gasto.interface";

// Obtener todos los gastos
export const getGastos = async (): Promise<Gasto[]> => {
  return prisma.gasto.findMany({
    orderBy: { monto: "desc" },
  });
};

// Buscar por ID
export const findGastoById = async (id: number): Promise<Gasto | null> => {
  return prisma.gasto.findUnique({
    where: { id },
  });
};

// Crear gasto
export const createGasto = async (
  gasto: Pick<Gasto, "descripcion" | "monto" | "fechaPago" | "frecuencia">
): Promise<Gasto> => {
  return prisma.gasto.create({
    data: {
      descripcion: gasto.descripcion,
      monto: gasto.monto,
      fechaPago: gasto.fechaPago,
      frecuencia: gasto.frecuencia ?? "MONTHLY", // Default backend-friendly
    },
  });
};

// Actualizar gasto
export const modificarGasto = async (
  id: number,
  payload: GastoUpdate
): Promise<Gasto | null> => {
  return prisma.gasto.update({
    where: { id },
    data: payload,
  });
};

// Eliminar gasto
export const eliminarGasto = async (id: number): Promise<Gasto> => {
  return prisma.gasto.delete({
    where: { id },
  });
};

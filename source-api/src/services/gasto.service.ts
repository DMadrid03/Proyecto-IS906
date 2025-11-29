import { prisma } from "./../db/client";
import Gasto from "../interfaces/gasto.interface";


export const getGastos = async (): Promise<Gasto[]> => {
    return await prisma.gasto.findMany(
        {orderBy: { monto: 'desc'} }
    );

}

export const createGasto = async (gasto: Pick<Gasto, "descripcion" | "monto" | "fechaPago">): Promise<Gasto> => {
    return await prisma.gasto.create({
        data: gasto
    });
}

export const modificarGasto = async( id: number, gasto: Pick<Gasto, "descripcion" | "monto" | "fechaPago">): Promise<Gasto> => {
    return await prisma.gasto.update({
        where: { id },
        data: gasto
    });
}

export const eliminarGasto = async (id: number): Promise<Gasto> => {
    return await prisma.gasto.delete({
        where: { id }
    });
}

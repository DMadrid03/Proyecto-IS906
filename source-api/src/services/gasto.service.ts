import { prisma } from "./../db/client";
import {Gasto, GastoUpdate } from "../interfaces/gasto.interface";


export const getGastos = async (): Promise<Gasto[]> => {
    return await prisma.gasto.findMany(
        {orderBy: { monto: 'desc'} }
    );

}
export const findGastoById = async (id: number): Promise<Gasto | null> => {
    return await prisma.gasto.findUnique({
        where: { id }
    });
}

export const createGasto = async (gasto: Pick<Gasto, "descripcion" | "monto" | "fechaPago">): Promise<Gasto> => {
    return await prisma.gasto.create({
        data: gasto
    });
}


export const modificarGasto = async( 
    id: number, 
    payl: GastoUpdate
): Promise<Gasto | null> => {
    return await prisma.gasto.update({
        where: { id },
        data: payl
    });
}

export const eliminarGasto = async (id: number): Promise<Gasto> => {
    return await prisma.gasto.delete({
        where: { id }
    });
}

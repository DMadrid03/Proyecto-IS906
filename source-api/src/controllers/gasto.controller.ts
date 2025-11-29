import { Request, Response, NextFunction } from 'express';
import * as Service from '../services/gasto.service';
import { validateGasto, validateGastoPartial } from '../schemas/gasto.schema.zod';
import { GastoUpdate } from '../interfaces/gasto.interface';

export const getGastos = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const gastos = await Service.getGastos();
        if (gastos.length === 0) {
            return res.status(404).json({ message: 'No hay gastos registrados' });
        }
        res.json(gastos);
    } catch (err) {
        next(err);
    }
}

export const createGasto = async (req: Request, res: Response, next: NextFunction) => {

    const { success, data, error } = validateGasto(req.body);

    if (!success) {
        return res.status(400).json({ message: 'Datos inválidos', error: error.message });
    }
    try {
        const newGasto = await Service.createGasto(data);
        res.status(201).json(newGasto);
    } catch (err) {
        next(err);
    }
}

export const modificarGasto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id ? parseInt(req.params.id) : NaN;

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const { success, data, error } = validateGastoPartial(req.body);

        if (!success) {
            return res.status(400).json({ message: 'Datos inválidos', error: error.issues });
        }

        const result = await Service.findGastoById(id);
        if (!result) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }

        const updatedGasto = await Service.modificarGasto(id, data as GastoUpdate);
        res.json(updatedGasto);
    } catch (err) {
        next(err);
    }
}

export const eliminarGasto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id ? parseInt(req.params.id) : NaN;
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const result = await Service.findGastoById(id);
        if (!result) {
            return res.status(404).json({ message: 'Gasto no encontrado' });
        }

        const deletedGasto = await Service.eliminarGasto(id);
        res.json(deletedGasto);
    } catch (err) {
        next(err);
    }
}
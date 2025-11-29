import {Router} from 'express';
import {getGastos, getGastoById, createGasto, modificarGasto, eliminarGasto} from '../controllers/gasto.controller';


const router = Router();

router.get('/', getGastos);
router.get('/:id', getGastoById);
router.post('/', createGasto);
router.put('/:id', modificarGasto);
router.delete('/:id', eliminarGasto);

export default router;
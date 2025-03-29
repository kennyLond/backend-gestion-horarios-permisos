import { Router } from 'express';
import { getAsistencias, registrarEntrada, registrarSalida } from '../controllers/asistenciaController';

const router = Router();

router.get('/asistencias', getAsistencias);
router.post('/asistencia/entrada', registrarEntrada);
router.post('/asistencia/salida', registrarSalida);

export default router;
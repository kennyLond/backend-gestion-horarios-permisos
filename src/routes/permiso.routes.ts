import { Router } from 'express';
import { obtenerPermisosConPersona, subirDocumento } from '../controllers/permisos.controller';

const router = Router();

router.get('/', obtenerPermisosConPersona);
router.post('/subir-documento', subirDocumento);

export { router };
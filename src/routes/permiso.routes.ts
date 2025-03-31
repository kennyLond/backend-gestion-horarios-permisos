import { Router } from 'express';
import { obtenerPermisosConPersona } from '../controllers/permisos.controller';

const router = Router();

// Ruta para obtener los permisos junto con el nombre y apellido de la persona
router.get('/', obtenerPermisosConPersona);

export default router;


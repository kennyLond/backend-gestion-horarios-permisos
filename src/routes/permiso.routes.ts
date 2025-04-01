import express from 'express';
import {
  obtenerPermisosConPersona,
  subirDocumento,
} from '../controllers/permisos.controller';

const router = express.Router();

// Ruta para obtener todos los permisos con información de la persona
router.get('/', obtenerPermisosConPersona);

// Ruta para crear un nuevo permiso (incluyendo la carga del documento)
router.post('/', subirDocumento);

export default router;

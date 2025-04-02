import express from 'express';
import {
  obtenerPermisosConPersona,
  crearPermiso, 
} from '../controllers/permisos.controller';

const router = express.Router();

// Ruta para obtener todos los permisos con información de la persona
router.get('/', obtenerPermisosConPersona);

// Ruta correcta para crear un permiso
router.post('/', crearPermiso);

export default router;

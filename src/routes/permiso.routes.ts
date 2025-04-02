import express from 'express';
import {
  obtenerPermisosConPersona,
  crearPermiso, // Importar la función crearPermiso
} from '../controllers/permisos.controller';

const router = express.Router();

// Ruta para obtener todos los permisos con información de la persona
router.get('/', obtenerPermisosConPersona);

// Ruta para crear un nuevo permiso (sin carga de documentos)
router.post('/1', crearPermiso); // Usar la función crearPermiso

export default router;
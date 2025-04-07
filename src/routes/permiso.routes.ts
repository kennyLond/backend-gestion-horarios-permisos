import express from 'express';
import {
  obtenerPermisosConPersona,
  crearPermiso,
  descargarDocumento,
  actualizarEstadoPermiso
} from '../controllers/permisos.controller';
import multer from 'multer';
import storage from '../utils/uploads';

const upload = multer({ storage });

const router = express.Router();

// Obtener todos los permisos con datos de persona
router.get('/', obtenerPermisosConPersona);

// Crear un nuevo permiso con archivo
router.post('/', upload.single('documento'), crearPermiso);

// Descargar el documento PDF asociado al permiso
router.get('/descargar/:filename', descargarDocumento);

// Actualizar el estado del permiso (APROBADO / DENEGADO)
router.put('/:id/estado', actualizarEstadoPermiso);

export default router;

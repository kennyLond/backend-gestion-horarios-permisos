import { Router } from 'express';
import multer from 'multer';
import storage from '../utils/uploads';
import {
  crearPermiso,
  obtenerPermisosConPersona,
  descargarDocumento,
  actualizarEstadoPermiso
} from '../controllers/permisos.controller';

const router = Router();
const upload = multer({ storage });

router.get('/', obtenerPermisosConPersona);
router.post('/', upload.single('documento'), crearPermiso);
router.put('/estado/:id', actualizarEstadoPermiso);

export default router;

import { Router } from 'express';
import { 
    getPermisos, 
    getPermiso
} from '../controllers/permisos.controller';

const router = Router();

router.get('/', getPermisos);
router.get('/:id', getPermiso);

export default router;

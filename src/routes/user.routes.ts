import { Router } from 'express';
import { loginUser, newUser } from '../controllers/user.controller';

const router = Router();
router.post('/', newUser); // Ahora será /api/users
router.post('/login', loginUser); // Ahora será /api/users/login


export default router;
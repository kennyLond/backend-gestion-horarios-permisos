import { Router } from 'express';
import {
  getPersonas,
  getPersona,
  deletePersona,
  postPersona,
  putPersona
} from '../controllers/persona.controller';

const router = Router();

// Obtener todas las personas
router.get('/', getPersonas);

// Obtener una persona por ID
router.get('/:id', getPersona);

// Crear una nueva persona
router.post('/', postPersona);

// Actualizar una persona por ID
router.put('/:id', putPersona);

// Eliminar una persona por ID
router.delete('/:id', deletePersona);

export default router;

import express from 'express';
import {
  obtenerAsistencias,
  registrarEntrada,
  registrarSalida
} from '../controllers/asistencias.controller';

const router = express.Router();

// Ruta para obtener asistencias, opcionalmente filtradas por persona_id
router.get('/', obtenerAsistencias);

// Ruta para registrar entrada
router.post('/entrada', registrarEntrada);

// Ruta para registrar salida
router.post('/salida', registrarSalida);

export default router;
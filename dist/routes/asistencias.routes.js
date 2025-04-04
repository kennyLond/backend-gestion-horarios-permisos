"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asistencias_controller_1 = require("../controllers/asistencias.controller");
const router = express_1.default.Router();
// Ruta para obtener asistencias, opcionalmente filtradas por persona_id
router.get('/', asistencias_controller_1.obtenerAsistencias);
// Ruta para registrar entrada
router.post('/entrada', asistencias_controller_1.registrarEntrada);
// Ruta para registrar salida
router.post('/salida', asistencias_controller_1.registrarSalida);
exports.default = router;

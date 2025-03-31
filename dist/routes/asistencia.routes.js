"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asistencia_controller_1 = require("../controllers/asistencia.controller");
const router = (0, express_1.Router)();
router.get('/asistencias', asistencia_controller_1.getAsistencias);
router.post('/asistencia/entrada', asistencia_controller_1.registrarEntrada);
router.post('/asistencia/salida', asistencia_controller_1.registrarSalida);
exports.default = router;

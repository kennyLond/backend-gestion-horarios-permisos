"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asistenciaController_1 = require("../controllers/asistenciaController");
const router = (0, express_1.Router)();
router.get('/asistencias', asistenciaController_1.getAsistencias);
router.post('/asistencia/entrada', asistenciaController_1.registrarEntrada);
router.post('/asistencia/salida', asistenciaController_1.registrarSalida);
exports.default = router;

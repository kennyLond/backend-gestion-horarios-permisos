"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const permisos_controller_1 = require("../controllers/permisos.controller");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', permisos_controller_1.obtenerPermisosConPersona);
router.post('/subir-documento', permisos_controller_1.subirDocumento);

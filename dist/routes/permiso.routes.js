"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisos_controller_1 = require("../controllers/permisos.controller");
const router = (0, express_1.Router)();
// Ruta para obtener los permisos junto con el nombre y apellido de la persona
router.get('/', permisos_controller_1.obtenerPermisosConPersona);
exports.default = router;

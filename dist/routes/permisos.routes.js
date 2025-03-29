"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisos_controller_1 = require("../controllers/permisos.controller");
const router = (0, express_1.Router)();
// Obtener todos los permisos
router.get('/', permisos_controller_1.getPermisos);
// Obtener un permiso por ID
router.get('/:id', permisos_controller_1.getPermiso);
// Crear un nuevo permiso
router.post('/', permisos_controller_1.solicitarPermiso);
// Actualizar estado de un permiso
router.put('/:id', permisos_controller_1.actualizarEstadoPermiso);
exports.default = router;

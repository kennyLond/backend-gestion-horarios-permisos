"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisos_controller_1 = require("../controllers/permisos.controller");
const router = (0, express_1.Router)();
router.get('/', permisos_controller_1.getPermisos);
router.get('/:id', permisos_controller_1.getPermiso);
exports.default = router;

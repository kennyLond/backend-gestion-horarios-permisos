"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const uploads_1 = __importDefault(require("../utils/uploads"));
const permisos_controller_1 = require("../controllers/permisos.controller");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: uploads_1.default });
router.get('/', permisos_controller_1.obtenerPermisosConPersona);
router.post('/', upload.single('documento'), permisos_controller_1.crearPermiso);
router.put('/estado/:id', permisos_controller_1.actualizarEstadoPermiso);
exports.default = router;

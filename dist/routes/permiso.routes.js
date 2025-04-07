"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const permisos_controller_1 = require("../controllers/permisos.controller");
const multer_1 = __importDefault(require("multer"));
const uploads_1 = __importDefault(require("../utils/uploads"));
const upload = (0, multer_1.default)({ storage: uploads_1.default });
const router = express_1.default.Router();
// Obtener todos los permisos con datos de persona
router.get('/', permisos_controller_1.obtenerPermisosConPersona);
// Crear un nuevo permiso con archivo
router.post('/', upload.single('documento'), permisos_controller_1.crearPermiso);
// Descargar el documento PDF asociado al permiso
router.get('/descargar/:filename', permisos_controller_1.descargarDocumento);
// Actualizar el estado del permiso (APROBADO / DENEGADO)
router.put('/estado/:id', permisos_controller_1.actualizarEstadoPermiso);
exports.default = router;

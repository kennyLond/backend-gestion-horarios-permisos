"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarEstadoPermiso = exports.obtenerPermisos = exports.crearPermiso = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración de multer para guardar archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const extension = path_1.default.extname(file.originalname);
        const filename = `${Date.now()}${extension}`;
        cb(null, filename);
    }
});
// Middleware de subida de archivos
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.png'];
        const fileExt = path_1.default.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExt)) {
            return cb(new Error('Formato de archivo no permitido'));
        }
        cb(null, true);
    }
}).single('documento');
// Crear un permiso y subir el archivo
const crearPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        const { persona_id, tipo_permiso, estado_permiso } = req.body;
        if (!persona_id || !tipo_permiso || !estado_permiso) {
            return res.status(400).json({ error: 'Faltan parámetros necesarios (persona_id, tipo_permiso, estado_permiso)' });
        }
        try {
            const documento = req.file ? req.file.filename : null;
            const fecha_solicitud = new Date();
            const result = yield connection_1.default.query(`INSERT INTO permisos (persona_id, tipo_permiso, estado_permiso, documento, fecha_solicitud) VALUES (?, ?, ?, ?, ?)`, [persona_id, tipo_permiso, estado_permiso, documento, fecha_solicitud]);
            // Manejo correcto de la respuesta de pool.query
            if (Array.isArray(result) && result.length > 0) {
                res.status(201).json({ msg: 'Permiso creado con éxito', permiso_id: result[0].insertId });
            }
            else {
                console.error('Error: Resultado inesperado de pool.query:', result);
                res.status(500).json({ error: 'Error al crear el permiso: Resultado inesperado de la base de datos' });
            }
        }
        catch (error) {
            console.error('Error al crear el permiso:', error);
            if (error instanceof Error) {
                res.status(500).json({ error: 'Error al crear el permiso', details: error.message });
            }
            else {
                res.status(500).json({ error: 'Error al crear el permiso', details: 'Un error desconocido ocurrió' });
            }
        }
    }));
});
exports.crearPermiso = crearPermiso;
// Exportar la función de obtener permisos con el nombre y apellido de la persona
const obtenerPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield connection_1.default.query(`
            SELECT 
                permisos.*, 
                personas.nombre AS nombre_persona, 
                personas.apellido AS apellido_persona
            FROM permisos
            JOIN personas ON permisos.persona_id = personas.id
        `);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error al obtener permisos:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: 'Error al obtener los permisos', details: error.message });
        }
        else {
            res.status(500).json({ error: 'Error al obtener los permisos', details: 'Un error desconocido ocurrió' });
        }
    }
});
exports.obtenerPermisos = obtenerPermisos;
// Exportar la función para actualizar el estado del permiso
const actualizarEstadoPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { estado_permiso } = req.body;
    try {
        yield connection_1.default.query('UPDATE permisos SET estado_permiso = ? WHERE id = ?', [estado_permiso, id]);
        res.status(200).json({ msg: 'Estado del permiso actualizado con éxito' });
    }
    catch (error) {
        console.error('Error al actualizar el estado del permiso:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: 'Error al actualizar el estado del permiso', details: error.message });
        }
        else {
            res.status(500).json({ error: 'Error al actualizar el estado del permiso', details: 'Un error desconocido ocurrió' });
        }
    }
});
exports.actualizarEstadoPermiso = actualizarEstadoPermiso;

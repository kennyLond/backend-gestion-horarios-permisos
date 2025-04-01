"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirDocumento = exports.obtenerPermisosConPersona = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración de multer para la carga de archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Nombre único para el archivo
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const obtenerPermisosConPersona = (req, res) => {
    const query = `
        SELECT 
            permisos.tipo_permiso, 
            permisos.estado_permiso, 
            permisos.documento, 
            permisos.fecha_solicitud, 
            persona.nombre, 
            persona.apellido
        FROM permisos
        JOIN persona ON permisos.persona_id = persona.id;
    `;
    connection_1.default.query(query, (err, data) => {
        if (err) {
            console.error('Error al obtener permisos:', err);
            res.status(500).json({ error: 'Error al obtener los permisos' });
            return;
        }
        res.json(data);
    });
};
exports.obtenerPermisosConPersona = obtenerPermisosConPersona;
const subirDocumento = (req, res) => {
    upload.single('documento')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ msg: 'Error al subir el archivo.' });
        }
        const { persona_id, tipo_permiso, fecha_solicitud } = req.body;
        const documento = req.file ? req.file.filename : null; // Obtener el nombre del archivo
        // 1. Verificar persona_id
        connection_1.default.query('SELECT * FROM persona WHERE id = ?', [persona_id], (err, personaData) => {
            if (err) {
                console.error('Error en la base de datos:', err);
                return res.status(500).json({ msg: 'Error en la base de datos.' });
            }
            if (personaData.length === 0) {
                return res.status(404).json({ msg: 'La persona no existe.' });
            }
            // 2. Verificar tipo_permiso
            connection_1.default.query('SELECT * FROM permisos WHERE persona_id = ? AND tipo_permiso = ?', [persona_id, tipo_permiso], (err, permisoData) => {
                if (err) {
                    console.error('Error en la base de datos:', err);
                    return res.status(500).json({ msg: 'Error en la base de datos.' });
                }
                if (permisoData.length > 0) {
                    return res
                        .status(409)
                        .json({ msg: 'Ya existe un permiso de este tipo para esta persona.' });
                }
                // 3. Guardar permiso
                connection_1.default.query('INSERT INTO permisos (persona_id, tipo_permiso, estado_permiso, documento, fecha_solicitud) VALUES (?, ?, ?, ?, ?)', [persona_id, tipo_permiso, 'pendiente', documento, fecha_solicitud], (err, data) => {
                    if (err) {
                        console.error('Error en la base de datos:', err);
                        return res.status(500).json({ msg: 'Error al registrar el permiso.' });
                    }
                    res.json({ msg: 'Permiso agregado con éxito.' });
                });
            });
        });
    });
};
exports.subirDocumento = subirDocumento;

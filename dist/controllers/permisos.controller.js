"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerPermisosConPersona = void 0;
const connection_1 = __importDefault(require("../db/connection"));
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
            return res.status(500).json({ error: 'Error al obtener los permisos' });
        }
        res.json(data);
    });
};
exports.obtenerPermisosConPersona = obtenerPermisosConPersona;

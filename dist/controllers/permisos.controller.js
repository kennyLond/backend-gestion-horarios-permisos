"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarEstadoPermiso = exports.solicitarPermiso = exports.getPermiso = exports.getPermisos = void 0;
const connection_1 = __importDefault(require("../db/connection"));
// Obtener todas las solicitudes de permisos
const getPermisos = (req, res) => {
    connection_1.default.query('SELECT permisos.id, persona.nombre AS personaNombre, permisos.tipoPermiso, permisos.estadoPermiso FROM permisos INNER JOIN persona ON permisos.idPersona = persona.id', // Línea corregida
    (err, data) => {
        if (err) {
            console.error('Error al obtener permisos:', err);
            return res.status(500).json({ error: 'Error en el servidor', details: err.message });
        }
        res.json(data);
    });
};
exports.getPermisos = getPermisos;
// Obtener un permiso por ID
const getPermiso = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM permisos WHERE id = ?', [id], (err, data) => {
        if (err) {
            console.error('Error al obtener permiso:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json(data[0]);
    });
};
exports.getPermiso = getPermiso;
// Registrar una solicitud de permiso
const solicitarPermiso = (req, res) => {
    const { idPersona, tipoPermiso } = req.body;
    const nuevoPermiso = {
        idPersona,
        tipoPermiso,
        estadoPermiso: 'pendiente',
    };
    connection_1.default.query('INSERT INTO permisos SET ?', [nuevoPermiso], (err, data) => {
        if (err) {
            console.error('Error al solicitar permiso:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json({ msg: 'Permiso solicitado con éxito' });
    });
};
exports.solicitarPermiso = solicitarPermiso;
// Actualizar el estado de un permiso
const actualizarEstadoPermiso = (req, res) => {
    const { id } = req.params;
    const { estadoPermiso } = req.body;
    connection_1.default.query('UPDATE permisos SET estadoPermiso = ? WHERE id = ?', [estadoPermiso, id], (err, data) => {
        if (err) {
            console.error('Error al actualizar estado del permiso:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.json({ msg: 'Estado del permiso actualizado con éxito' });
    });
};
exports.actualizarEstadoPermiso = actualizarEstadoPermiso;

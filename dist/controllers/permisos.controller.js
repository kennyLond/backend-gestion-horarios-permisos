"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearPermiso = exports.obtenerPermisosConPersona = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const obtenerPermisosConPersona = (req, res) => {
    const query = `
    SELECT 
      permisos.tipo_permiso, 
      permisos.estado_permiso, 
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
const crearPermiso = (req, res) => {
    const { persona_id, tipo_permiso, fecha_solicitud } = req.body;
    // 1. Verificar persona_id
    connection_1.default.query('SELECT * FROM persona WHERE id = ?', [persona_id], (err, personaData) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            res.status(500).json({ msg: 'Error en la base de datos.' });
            return;
        }
        if (personaData.length === 0) {
            res.status(404).json({ msg: 'La persona no existe.' });
            return;
        }
        // 2. Verificar tipo_permiso
        connection_1.default.query('SELECT * FROM permisos WHERE persona_id = ? AND tipo_permiso = ?', [persona_id, tipo_permiso], (err, permisoData) => {
            if (err) {
                console.error('Error en la base de datos:', err);
                res.status(500).json({ msg: 'Error en la base de datos.' });
                return;
            }
            if (permisoData.length > 0) {
                res.status(409).json({ msg: 'Ya existe un permiso de este tipo para esta persona.' });
                return;
            }
            // 3. Guardar permiso
            connection_1.default.query('INSERT INTO permisos (persona_id, tipo_permiso, estado_permiso, fecha_solicitud) VALUES (?, ?, ?, ?)', [persona_id, tipo_permiso, 'pendiente', fecha_solicitud], (err) => {
                if (err) {
                    console.error('Error en la base de datos:', err);
                    res.status(500).json({ msg: 'Error al registrar el permiso.' });
                    return;
                }
                res.json({ msg: 'Permiso agregado con éxito.' });
            });
        });
    });
};
exports.crearPermiso = crearPermiso;

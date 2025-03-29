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
exports.actualizarEstadoPermiso = exports.solicitarPermiso = exports.getPermiso = exports.getPermisos = void 0;
const connection_1 = __importDefault(require("../db/connection"));
// Obtener todas las solicitudes de permisos con el nombre de la persona
const getPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connection_1.default.query(`SELECT permisos.id, persona.nombre AS personaNombre, permisos.tipoPermiso, permisos.estadoPermiso 
      FROM permisos 
      INNER JOIN persona ON permisos.idPersona = persona.id`, (err, data) => {
            if (err) {
                console.error('Error al obtener permisos:', err);
                return res.status(500).json({ error: 'Error en el servidor', details: err.message });
            }
            res.json(data);
        });
    }
    catch (error) {
        console.error('Error en getPermisos:', error);
        res.status(500).json({ error: 'Error en el servidor', details: error.message });
    }
});
exports.getPermisos = getPermisos;
// Obtener un permiso por ID incluyendo el nombre de la persona
const getPermiso = (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: 'ID inválido' });
    }
    connection_1.default.query(`SELECT permisos.id, persona.nombre AS personaNombre, permisos.tipoPermiso, permisos.estadoPermiso 
    FROM permisos 
    INNER JOIN persona ON permisos.idPersona = persona.id
    WHERE permisos.id = ?`, [id], (err, data) => {
        if (err) {
            console.error('Error al obtener permiso:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }
        res.json(data[0]);
    });
};
exports.getPermiso = getPermiso;
// Registrar una solicitud de permiso
const solicitarPermiso = (req, res) => {
    const { idPersona, tipoPermiso } = req.body;
    if (!idPersona || !tipoPermiso) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
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
        res.status(201).json({ msg: 'Permiso solicitado con éxito', id: data.insertId });
    });
};
exports.solicitarPermiso = solicitarPermiso;
// Actualizar el estado de un permiso
const actualizarEstadoPermiso = (req, res) => {
    const { id } = req.params;
    const { estadoPermiso } = req.body;
    if (!id || isNaN(Number(id)) || !estadoPermiso) {
        return res.status(400).json({ error: 'Datos inválidos' });
    }
    connection_1.default.query('UPDATE permisos SET estadoPermiso = ? WHERE id = ?', [estadoPermiso, id], (err, data) => {
        if (err) {
            console.error('Error al actualizar estado del permiso:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Permiso no encontrado' });
        }
        res.json({ msg: 'Estado del permiso actualizado con éxito' });
    });
};
exports.actualizarEstadoPermiso = actualizarEstadoPermiso;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarSalida = exports.registrarEntrada = exports.getAsistencias = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
// Obtener todas las asistencias con el nombre de la persona
const getAsistencias = (req, res) => {
    const query = `
        SELECT a.id, a.persona_id, p.nombre, a.hora_entrada, a.hora_salida
        FROM asistencias a
        JOIN personas p ON a.persona_id = p.id
        ORDER BY a.hora_entrada DESC
    `;
    connection_1.default.query(query, (err, data) => {
        if (err) {
            console.error('Error al obtener asistencias:', err);
            return res.status(500).json({ error: 'Error al obtener las asistencias' });
        }
        res.json(data);
    });
};
exports.getAsistencias = getAsistencias;
// Registrar hora de entrada
const registrarEntrada = (req, res) => {
    const { persona_id } = req.body;
    const horaActual = (0, moment_timezone_1.default)().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
    connection_1.default.query('INSERT INTO asistencias (persona_id, hora_entrada) VALUES (?, ?)', [persona_id, horaActual], (err, result) => {
        if (err) {
            console.error('Error al registrar entrada:', err);
            return res.status(500).json({ error: 'Error al registrar la entrada' });
        }
        res.json({ msg: 'Hora de entrada registrada', asistencia_id: result.insertId });
    });
};
exports.registrarEntrada = registrarEntrada;
// Registrar hora de salida
const registrarSalida = (req, res) => {
    const { persona_id } = req.body;
    const horaActual = (0, moment_timezone_1.default)().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
    connection_1.default.query('UPDATE asistencias SET hora_salida = ? WHERE persona_id = ? AND hora_salida IS NULL ORDER BY hora_entrada DESC LIMIT 1', [horaActual, persona_id], (err, result) => {
        if (err) {
            console.error('Error al registrar salida:', err);
            return res.status(500).json({ error: 'Error al registrar la salida' });
        }
        if (result.affectedRows > 0) {
            res.json({ msg: 'Hora de salida registrada' });
        }
        else {
            res.status(400).json({ error: 'No hay entrada registrada para esta persona' });
        }
    });
};
exports.registrarSalida = registrarSalida;

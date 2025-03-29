import { Request, Response } from 'express';
import pool from '../db/connection';
import moment from 'moment-timezone';

// Obtener todas las asistencias con el nombre de la persona
export const getAsistencias = (req: Request, res: Response) => {
    const query = `
        SELECT a.id, a.persona_id, p.nombre, a.hora_entrada, a.hora_salida
        FROM asistencias a
        JOIN personas p ON a.persona_id = p.id
        ORDER BY a.hora_entrada DESC
    `;

    pool.query(query, (err, data) => {
        if (err) {
            console.error('Error al obtener asistencias:', err);
            return res.status(500).json({ error: 'Error al obtener las asistencias' });
        }
        res.json(data);
    });
};

// Registrar hora de entrada
export const registrarEntrada = (req: Request, res: Response) => {
    const { persona_id } = req.body;
    const horaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

    pool.query(
        'INSERT INTO asistencias (persona_id, hora_entrada) VALUES (?, ?)',
        [persona_id, horaActual],
        (err, result) => {
            if (err) {
                console.error('Error al registrar entrada:', err);
                return res.status(500).json({ error: 'Error al registrar la entrada' });
            }
            res.json({ msg: 'Hora de entrada registrada', asistencia_id: result.insertId });
        }
    );
};

// Registrar hora de salida
export const registrarSalida = (req: Request, res: Response) => {
    const { persona_id } = req.body;
    const horaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

    pool.query(
        'UPDATE asistencias SET hora_salida = ? WHERE persona_id = ? AND hora_salida IS NULL ORDER BY hora_entrada DESC LIMIT 1',
        [horaActual, persona_id],
        (err, result) => {
            if (err) {
                console.error('Error al registrar salida:', err);
                return res.status(500).json({ error: 'Error al registrar la salida' });
            }

            if (result.affectedRows > 0) {
                res.json({ msg: 'Hora de salida registrada' });
            } else {
                res.status(400).json({ error: 'No hay entrada registrada para esta persona' });
            }
        }
    );
};

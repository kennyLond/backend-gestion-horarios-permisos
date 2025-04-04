import { Request, Response } from 'express';
import connection from '../db/connection';

// Obtener asistencias con información de la persona
export const obtenerAsistencias = (req: Request, res: Response): void => {
  let query = `
    SELECT 
      asistencias.id,
      asistencias.persona_id,
      persona.nombre,
      persona.apellido,
      asistencias.hora_entrada,
      asistencias.hora_salida
    FROM asistencias
    JOIN persona ON asistencias.persona_id = persona.id
  `;

  // Obtener personaId de los parámetros de consulta
  const personaId = req.query.persona_id;

  if (personaId) {
    query += ` WHERE asistencias.persona_id = ${personaId}`;
  }

  connection.query(query, (err, data) => {
    if (err) {
      console.error('❌ Error al obtener asistencias:', err);
      res.status(500).json({ error: 'Error al obtener asistencias' });
      return;
    }
    res.json(data);
  });
};

// Registrar entrada
export const registrarEntrada = (req: Request, res: Response): void => {
  const { persona_id } = req.body;

  if (!persona_id) {
    res.status(400).json({ msg: '⚠️ El ID de la persona es obligatorio.' });
    return;
  }

  const horaEntrada = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Verificar si ya tiene una entrada sin salida
  connection.query(
    'SELECT * FROM asistencias WHERE persona_id = ? AND hora_salida IS NULL',
    [persona_id],
    (err, results) => {
      if (err) {
        console.error('❌ Error en la base de datos:', err);
        res.status(500).json({ msg: 'Error al verificar asistencia previa.' });
        return;
      }

      if (results.length > 0) {
        res.status(409).json({ msg: '⚠️ Ya existe una asistencia sin salida registrada para esta persona.' });
        return;
      }

      // Insertar nueva entrada
      connection.query(
        'INSERT INTO asistencias (persona_id, hora_entrada) VALUES (?, ?)',
        [persona_id, horaEntrada],
        (err) => {
          if (err) {
            console.error('❌ Error al registrar entrada:', err);
            res.status(500).json({ msg: 'Error al registrar la entrada.' });
            return;
          }
          res.status(201).json({ msg: '✅ Entrada registrada con éxito.', horaEntrada });
        }
      );
    }
  );
};

// Registrar salida
export const registrarSalida = (req: Request, res: Response): void => {
  const { persona_id } = req.body;

  if (!persona_id) {
    res.status(400).json({ msg: '⚠️ El ID de la persona es obligatorio.' });
    return;
  }

  const horaSalida = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Verificar si hay una entrada sin salida
  connection.query(
    'SELECT * FROM asistencias WHERE persona_id = ? AND hora_salida IS NULL',
    [persona_id],
    (err, results) => {
      if (err) {
        console.error('❌ Error en la base de datos:', err);
        res.status(500).json({ msg: 'Error al verificar asistencia activa.' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ msg: '⚠️ No se encontró una asistencia activa para registrar salida.' });
        return;
      }

      // Registrar salida
      connection.query(
        'UPDATE asistencias SET hora_salida = ? WHERE persona_id = ? AND hora_salida IS NULL',
        [horaSalida, persona_id],
        (err, result) => {
          if (err) {
            console.error('❌ Error al registrar salida:', err);
            res.status(500).json({ msg: 'Error al registrar la salida.' });
            return;
          }

          res.status(200).json({ msg: '✅ Salida registrada con éxito.', horaSalida });
        }
      );
    }
  );
};
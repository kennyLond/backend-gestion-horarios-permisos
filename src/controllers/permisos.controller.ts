import { Request, Response } from 'express';
import connection from '../db/connection';

export const obtenerPermisosConPersona = (req: Request, res: Response): void => {
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

  connection.query(query, (err, data) => {
    if (err) {
      console.error('Error al obtener permisos:', err);
      res.status(500).json({ error: 'Error al obtener los permisos' });
      return;
    }

    res.json(data);
  });
};

export const crearPermiso = (req: Request, res: Response): void => {
  const { persona_id, tipo_permiso, fecha_solicitud } = req.body;

  // 1. Verificar persona_id
  connection.query('SELECT * FROM persona WHERE id = ?', [persona_id], (err, personaData) => {
    if (err) {
      console.error('Error en la base de datos:', err);
      return res.status(500).json({ msg: 'Error en la base de datos.' });
    }

    if (personaData.length === 0) {
      return res.status(404).json({ msg: 'La persona no existe.' });
    }

    // 2. Verificar tipo_permiso
    connection.query(
      'SELECT * FROM permisos WHERE persona_id = ? AND tipo_permiso = ?',
      [persona_id, tipo_permiso],
      (err, permisoData) => {
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
        connection.query(
          'INSERT INTO permisos (persona_id, tipo_permiso, estado_permiso, fecha_solicitud) VALUES (?, ?, ?, ?)',
          [persona_id, tipo_permiso, 'pendiente', fecha_solicitud],
          (err, data) => {
            if (err) {
              console.error('Error en la base de datos:', err);
              return res.status(500).json({ msg: 'Error al registrar el permiso.' });
            }
            res.json({ msg: 'Permiso agregado con éxito.' });
          }
        );
      }
    );
  });
};
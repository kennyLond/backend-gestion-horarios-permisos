import { Request, Response } from 'express';
import connection from '../db/connection';

// Función para obtener permisos con información de la persona
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

// Función para crear un permiso
export const crearPermiso = (req: Request, res: Response): void => {
  const { persona_id, tipo_permiso, fecha_solicitud } = req.body;

  // Validar que los campos obligatorios están presentes
  if (!persona_id || !tipo_permiso || !fecha_solicitud) {
    res.status(400).json({ msg: 'Todos los campos son obligatorios.' });
    return;
  }

  // Validar el formato de la fecha
  const fechaRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!fechaRegex.test(fecha_solicitud)) {
    res.status(400).json({ msg: 'Formato de fecha inválido. Use YYYY-MM-DD HH:MM:SS' });
    return;
  }

  // 1. Verificar si la persona existe
  connection.query(
    'SELECT * FROM persona WHERE id = ?',
    [persona_id],
    (err, personaData) => {
      if (err) {
        console.error('Error en la base de datos:', err);
        res.status(500).json({ msg: 'Error en la base de datos.' });
        return;
      }

      if (personaData.length === 0) {
        res.status(404).json({ msg: 'La persona no existe.' });
        return;
      }

      // 2. Verificar si ya existe un permiso de este tipo para la persona
      connection.query(
        'SELECT * FROM permisos WHERE persona_id = ? AND tipo_permiso = ?',
        [persona_id, tipo_permiso],
        (err, permisoData) => {
          if (err) {
            console.error('Error en la base de datos:', err);
            res.status(500).json({ msg: 'Error en la base de datos.' });
            return;
          }

          if (permisoData.length > 0) {
            res.status(409).json({ msg: 'Ya existe un permiso de este tipo para esta persona.' });
            return;
          }

          // 3. Insertar el nuevo permiso
          connection.query(
            'INSERT INTO permisos (persona_id, tipo_permiso, estado_permiso, fecha_solicitud) VALUES (?, ?, ?, ?)',
            [persona_id, tipo_permiso, 'pendiente', fecha_solicitud],
            (err) => {
              if (err) {
                console.error('Error en la base de datos:', err);
                res.status(500).json({ msg: 'Error al registrar el permiso.' });
                return;
              }
              res.status(201).json({ msg: 'Permiso agregado con éxito.' });
            }
          );
        }
      );
    }
  );
};

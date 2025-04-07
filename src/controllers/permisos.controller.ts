import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import connection from '../db/connection';

// Obtener permisos con información de la persona
export const obtenerPermisosConPersona = (req: Request, res: Response): void => {
  const query = `
    SELECT 
      permisos.id,
      permisos.tipo_permiso, 
      permisos.estado_permiso, 
      permisos.fecha_solicitud, 
      permisos.dias,
      permisos.documento,
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

// Crear un permiso
export const crearPermiso = (req: Request, res: Response): void => {
  const { persona_id, tipo_permiso, fecha_solicitud, dias } = req.body;
  const archivo = req.file;

  if (!persona_id || !tipo_permiso || !fecha_solicitud || !dias || !archivo) {
    res.status(400).json({ msg: 'Todos los campos son obligatorios, incluido el archivo.' });
    return;
  }

  const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!fechaRegex.test(fecha_solicitud)) {
    res.status(400).json({ msg: 'Formato de fecha inválido. Use YYYY-MM-DD' });
    return;
  }

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

          const documento = archivo.filename;

          connection.query(
            'INSERT INTO permisos (persona_id, tipo_permiso, estado_permiso, fecha_solicitud, dias, documento) VALUES (?, ?, ?, ?, ?, ?)',
            [persona_id, tipo_permiso, 'PENDIENTE', fecha_solicitud, dias, documento],
            (err) => {
              if (err) {
                console.error('Error al registrar el permiso:', err);
                res.status(500).json({ msg: 'Error al registrar el permiso.' });
                return;
              }
              res.status(201).json({ msg: 'Permiso registrado correctamente.' });
            }
          );
        }
      );
    }
  );
};

// 📥 Descargar archivo PDF
export const descargarDocumento = (req: Request, res: Response): void => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ msg: 'Archivo no encontrado.' });
    return;
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('Error al descargar el archivo:', err);
      res.status(500).json({ msg: 'Error al descargar el archivo.' });
    }
  });
};

// ✅ Cambiar estado del permiso (APROBADO / DENEGADO)
export const actualizarEstadoPermiso = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { estado } = req.body;

  // Solo permitimos APROBADO o DENEGADO en mayúsculas
  if (!['APROBADO', 'DENEGADO'].includes(estado)) {
    res.status(400).json({ msg: 'Estado inválido. Debe ser "APROBADO" o "DENEGADO".' });
    return;
  }

  connection.query(
    'UPDATE permisos SET estado_permiso = ? WHERE id = ?',
    [estado, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar estado:', err);
        res.status(500).json({ msg: 'Error al actualizar el estado del permiso.' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ msg: 'Permiso no encontrado.' });
        return;
      }

      res.json({ msg: 'Estado actualizado correctamente.' });
    }
  );
};

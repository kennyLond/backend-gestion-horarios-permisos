import { Request, Response } from 'express';
import connection from '../db/connection';

// Obtener todas las solicitudes de permisos con el nombre de la persona
export const getPermisos = (req: Request, res: Response) => {
  connection.query(
    `SELECT permisos.id, persona.nombre AS personaNombre, permisos.tipoPermiso, permisos.estadoPermiso 
    FROM permisos 
    INNER JOIN persona ON permisos.idPersona = persona.id`,
    (err, data) => {
      if (err) {
        console.error('Error al obtener permisos:', err);
        return res.status(500).json({ error: 'Error en el servidor', details: err.message });
      }
      return res.json(data);
    }
  );
};

// Obtener un permiso por ID
export const getPermiso = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  connection.query(
    `SELECT permisos.id, persona.nombre AS personaNombre, permisos.tipoPermiso, permisos.estadoPermiso 
    FROM permisos 
    INNER JOIN persona ON permisos.idPersona = persona.id
    WHERE permisos.id = ?`, 
    [id], 
    (err, data) => {
      if (err) {
        console.error('Error al obtener permiso:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      if (data.length === 0) {
        return res.status(404).json({ error: 'Permiso no encontrado' });
      }
      return res.json(data[0]);
    }
  );
};

// Registrar una solicitud de permiso
export const solicitarPermiso = (req: Request, res: Response) => {
  const { idPersona, tipoPermiso } = req.body;

  if (!idPersona || !tipoPermiso) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const nuevoPermiso = {
    idPersona,
    tipoPermiso,
    estadoPermiso: 'pendiente',
  };

  connection.query('INSERT INTO permisos SET ?', [nuevoPermiso], (err, data) => {
    if (err) {
      console.error('Error al solicitar permiso:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    return res.status(201).json({ msg: 'Permiso solicitado con éxito', id: data.insertId });
  });
};

// Actualizar el estado de un permiso
export const actualizarEstadoPermiso = (req: Request, res: Response) => {
  const { id } = req.params;
  const { estadoPermiso } = req.body;

  if (!id || isNaN(Number(id)) || !estadoPermiso) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  connection.query(
    'UPDATE permisos SET estadoPermiso = ? WHERE id = ?',
    [estadoPermiso, id],
    (err, data) => {
      if (err) {
        console.error('Error al actualizar estado del permiso:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      if (data.affectedRows === 0) {
        return res.status(404).json({ error: 'Permiso no encontrado' });
      }
      return res.json({ msg: 'Estado del permiso actualizado con éxito' });
    }
  );
};

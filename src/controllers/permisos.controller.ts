import { Request, Response } from 'express';
import connection from '../db/connection';

export const obtenerPermisosConPersona = (req: Request, res: Response): void => {
    const query = `
        SELECT 
            permisos.tipo_permiso, 
            permisos.estado_permiso, 
            permisos.documento, 
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

export const subirDocumento = (req: Request, res: Response): void => {
    const { documento } = req.body;

    if (!documento) {
        res.status(400).json({ error: 'No se recibió el documento' });
        return;
    }

    const query = 'INSERT INTO permisos (documento) VALUES (?)';
    connection.query(query, [documento], (err, result) => {
        if (err) {
            console.error('Error al guardar el documento:', err);
            res.status(500).json({ error: 'Error al guardar el documento' });
            return;
        }

        res.json({ mensaje: 'Documento guardado con éxito', id: result.insertId });
    });
};

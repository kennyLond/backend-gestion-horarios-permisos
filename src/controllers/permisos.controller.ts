import { Request, Response } from 'express';
import connection from '../db/connection';

export const obtenerPermisosConPersona = (req: Request, res: Response) => {
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
            return res.status(500).json({ error: 'Error al obtener los permisos' });
        }

        res.json(data);
    });
};

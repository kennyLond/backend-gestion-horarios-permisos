import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path'; // 👈 Importar path para servir archivos estáticos

import routesAsistencias from '../routes/asistencias.routes';
import routesPersonas from '../routes/persona.routes';
import routesUser from '../routes/user.routes';
import permisosRoutes from '../routes/permiso.routes';
import pool from '../db/connection';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        console.log('🚀 Iniciando servidor...');
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.conectarDB();
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`✅ Aplicación corriendo en el puerto ${this.port}`);
        });
    }

    private middlewares(): void {
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(cors());
        this.app.use(helmet());

        // ✅ Servir archivos estáticos desde la carpeta "uploads"
        this.app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

        this.app.use(this.errorHandler);
    }

    private routes(): void {
        this.app.use('/api/personas', routesPersonas);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/permisos', permisosRoutes);
        this.app.use('/api/asistencias', routesAsistencias);
    }

    private conectarDB(): void {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('❌ Error en la conexión a la base de datos:', err);
                return;
            }
            console.log('✅ CONECTADO A BASE DE DATOS');
            connection.release();
        });
    }

    private errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
        console.error('Error no controlado:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export default Server;

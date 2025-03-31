import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Importamos helmet
import routesPersonas from '../routes/persona.routes';
import routesUser from '../routes/user.routes';
import routesPermiso from '../routes/permiso.routes'
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
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(helmet()); // Agregamos helmet para seguridad
        this.app.use(this.errorHandler); // Middleware de manejo de errores global
    }

    private routes(): void {
        this.app.use('/api/personas', routesPersonas);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/permisos', routesPermiso);

    
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
import express from 'express';
import routesPersonas from '../routes/persona.routes';
import routesUser from '../routes/user.routes';
import routesPermisos from '../routes/permisos.routes'; // ✅ Importamos las rutas de permisos
import pool from '../db/connection'; // ✅ Asegurar que el archivo de conexión a la BD es correcto
import cors from 'cors';

class Server {
    private app: express.Application;
    private port: string;

    constructor() {
        console.log('🚀 Iniciando servidor...');
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.conectarDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`✅ Aplicación corriendo en el puerto ${this.port}`);
        });
    }

    middlewares() {
        this.app.use(express.json()); // Habilita lectura de JSON en requests
        this.app.use(express.urlencoded({ extended: true })); // Soporte para datos urlencoded
        this.app.use(cors()); // Habilita CORS
    }

    routes() {
        this.app.use('/api/personas', routesPersonas);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/permisos', routesPermisos); // ✅ Nueva ruta para permisos
    }

    conectarDB() {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('❌ Error en la conexión a la base de datos:', err);
                return;
            }
            console.log('✅ CONECTADO A BASE DE DATOS');
            connection.release();
        });
    }
}

export default Server;

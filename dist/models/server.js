"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const persona_routes_1 = __importDefault(require("../routes/persona.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const permisos_routes_1 = __importDefault(require("../routes/permisos.routes")); // ✅ Importamos las rutas de permisos
const connection_1 = __importDefault(require("../db/connection")); // ✅ Asegurar que el archivo de conexión a la BD es correcto
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        console.log('🚀 Iniciando servidor...');
        this.app = (0, express_1.default)();
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
        this.app.use(express_1.default.json()); // Habilita lectura de JSON en requests
        this.app.use(express_1.default.urlencoded({ extended: true })); // Soporte para datos urlencoded
        this.app.use((0, cors_1.default)()); // Habilita CORS
    }
    routes() {
        this.app.use('/api/personas', persona_routes_1.default);
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/permisos', permisos_routes_1.default); // ✅ Nueva ruta para permisos
    }
    conectarDB() {
        connection_1.default.getConnection((err, connection) => {
            if (err) {
                console.error('❌ Error en la conexión a la base de datos:', err);
                return;
            }
            console.log('✅ CONECTADO A BASE DE DATOS');
            connection.release();
        });
    }
}
exports.default = Server;

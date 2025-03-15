"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const persona_routes_1 = __importDefault(require("../routes/persona.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const connection_1 = __importDefault(require("../db/connection")); // Cambié "connection" a "pool" para reflejar el uso de createPool()
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        console.log('Iniciando servidor...');
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middlewares(); // Llamar siempre antes de las rutas
        this.routes();
        this.conectarDB(); // Conexión a la base de datos
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    middlewares() {
        this.app.use(express_1.default.json()); // Habilita la lectura de JSON en requests
        this.app.use(express_1.default.urlencoded({ extended: true })); // ✅ Soporte para datos urlencoded
        this.app.use((0, cors_1.default)()); // Habilita CORS
    }
    routes() {
        this.app.use('/api/personas', persona_routes_1.default);
        this.app.use('/api/users', user_routes_1.default);
    }
    conectarDB() {
        connection_1.default.getConnection((err, connection) => {
            if (err) {
                console.error('❌ Error en la conexión a la base de datos:', err);
                return;
            }
            console.log('✅ CONECTADO A BASE DE DATOS');
            connection.release(); // Liberar la conexión
        });
    }
}
exports.default = Server;

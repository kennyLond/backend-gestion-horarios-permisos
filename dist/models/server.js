"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path")); // 👈 Importar path para servir archivos estáticos
const asistencias_routes_1 = __importDefault(require("../routes/asistencias.routes"));
const persona_routes_1 = __importDefault(require("../routes/persona.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const permiso_routes_1 = __importDefault(require("../routes/permiso.routes"));
const connection_1 = __importDefault(require("../db/connection"));
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
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        // ✅ Servir archivos estáticos desde la carpeta "uploads"
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
        this.app.use(this.errorHandler);
    }
    routes() {
        this.app.use('/api/personas', persona_routes_1.default);
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/permisos', permiso_routes_1.default);
        this.app.use('/api/asistencias', asistencias_routes_1.default);
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
    errorHandler(err, req, res, next) {
        console.error('Error no controlado:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
exports.default = Server;

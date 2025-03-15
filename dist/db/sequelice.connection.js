"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('supermercado', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
sequelize.authenticate()
    .then(() => {
    console.log('Conexión con la base de datos Sequeliza establecida correctamente.');
})
    .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
});
exports.default = sequelize;

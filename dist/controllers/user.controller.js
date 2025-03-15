"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = __importDefault(require("../db/connection")); // Importa el pool de conexiones
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validamos si el usuario ya existe en la base de datos
    connection_1.default.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(500).json({ msg: 'Error al consultar la base de datos' });
        }
        if (Array.isArray(results) && results.length > 0) {
            return res.status(400).json({ msg: `Ya existe un usuario con el nombre ${username}` });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        try {
            // Guardarmos usuario en la base de datos
            connection_1.default.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error, results) => {
                if (error) {
                    return res.status(500).json({ msg: 'Error al insertar usuario' });
                }
                res.json({ msg: `Usuario ${username} creado exitosamente!` });
            });
        }
        catch (error) {
            res.status(400).json({ msg: 'Upps ocurrio un error', error });
        }
    }));
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Validamos si el usuario existe en la base de datos
    connection_1.default.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(500).json({ msg: 'Error al consultar la base de datos' });
        }
        if (!Array.isArray(results) || results.length === 0) {
            return res.status(400).json({ msg: `No existe un usuario con el nombre ${username} en la base datos` });
        }
        const user = results[0]; // Obtener el primer resultado
        // Validamos password
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({ msg: `Password Incorrecta` });
        }
        // Generamos token
        const token = jsonwebtoken_1.default.sign({ username: username }, process.env.SECRET_KEY || 'pepito123');
        res.json(token);
    }));
});
exports.loginUser = loginUser;

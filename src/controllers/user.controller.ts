import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/connection';// Importa el pool de conexiones

export const newUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validamos si el usuario ya existe en la base de datos
    pool.query('SELECT * FROM users WHERE username = ?', [username], async (error: any, results: any) => {
        if (error) {
            return res.status(500).json({ msg: 'Error al consultar la base de datos' });
        }
        if (Array.isArray(results) && results.length > 0) {
            return res.status(400).json({ msg: `Ya existe un usuario con el nombre ${username}` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            // Guardarmos usuario en la base de datos
            pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (error: any, results: any) => {
                if (error) {
                    return res.status(500).json({ msg: 'Error al insertar usuario' });
                }
                res.json({ msg: `Usuario ${username} creado exitosamente!` });
            });
        } catch (error) {
            res.status(400).json({ msg: 'Upps ocurrio un error', error });
        }
    });
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validamos si el usuario existe en la base de datos
    pool.query('SELECT * FROM users WHERE username = ?', [username], async (error: any, results: any) => {
        if (error) {
            return res.status(500).json({ msg: 'Error al consultar la base de datos' });
        }
        if (!Array.isArray(results) || results.length === 0) {
            return res.status(400).json({ msg: `No existe un usuario con el nombre ${username} en la base datos` });
        }

        const user: any = results[0]; // Obtener el primer resultado
        // Validamos password
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({ msg: `Password Incorrecta` });
        }

        // Generamos token
        const token = jwt.sign({ username: username }, process.env.SECRET_KEY || 'pepito123');

        res.json(token);
    });
};
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.loginController = void 0;
const auth_service_1 = require("./auth.service");
const auth_service_2 = require("./auth.service");
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email y contraseña son requeridos' });
            return;
        }
        const result = await (0, auth_service_1.loginService)(email, password);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(401).json({ message: error.message || 'Error al iniciar sesión' });
    }
};
exports.loginController = loginController;
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
            return;
        }
        const result = await (0, auth_service_2.registerService)(name, email, password);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.registerController = registerController;
